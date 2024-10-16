import React, { useEffect, useState, useCallback } from 'react';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { formatNumber } from 'react-native-currency-input';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Platform, Switch } from 'react-native';

import { useAction } from '../../../../hooks/actions';
import { useAuth } from '../../../../hooks/auth';
import { useCreditResume } from '../../../../hooks/creditResume';
import { useLocation } from '../../../../hooks/location';
import { useSetupQuery } from '../../../../hooks/graphql/hooks';
import { useWallet } from '../../../../hooks/wallet';
import {
  Params, Upgrade, TransactionSummary, CardProps, ModalMessageProps,
} from './types';
import api from '../../../../services/api';
import Dialog from '../../../../components/Dialog';
import Header from '../../../../components/Header';
import InfoIcon from '../../../../assets/img/info.svg';
import PaymentCard from '../../../../components/PaymentCard';
import TicketForm from '../../../../components/TicketForm';
import TicketResumeModal from '../../../../components/TicketResumeModal';
import TransactionSteps from '../../../../components/TransactionSteps';
import * as S from './styles';

const TransactionTicketConfirm: React.FC = React.memo(() => {
  const route = useRoute();
  const { user } = useAuth();
  const { logEvent } = useAction();
  const navigation = useNavigation();
  const { geoLocation, stateCode } = useLocation();
  const {
    theaterName,
    theaterId,
    rooms,
    screens,
    address,
  } = route.params as Params;

  const [loading, setLoading] = useState(false);
  const [enablePaymentWallet, setEnablePaymentWallet] = useState(true);
  const [cardLoading, setCardLoading] = useState(false);
  const [defaultCard, setDefaultCard] = useState({} as CardProps);
  const [summary, setTransactionSummary] = useState({} as TransactionSummary | {});
  const [details, setDetails] = useState([] as Array<string>);
  const [disableContinue, setDisableContinue] = useState(true);
  const [creditQuantity, setCreditQuantity] = useState(0);
  const [creditScreenType, setCreditScreenType] = useState('');
  const [creditRoomType, setCreditRoomType] = useState('');
  const [showWalletButton, setShowWalletButton] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    message: null,
    iconSuccess: false,
    iconError: false,
    footer: null,
  } as ModalMessageProps);

  const { data: dataSetup } = useSetupQuery({
    variables: {
      setup_page: 'ticket-confirm',
    },
  });

  const {
    creditPlansAmount, creditVoucherAmount, loadCreditResume,
  } = useCreditResume();

  const { balance, fetchWallet } = useWallet();

  const handleNavigateTransactionCheckIn = (transactionId: string, ttl: number) => {
    navigation.navigate('Transactions', {
      screen: 'TransactionCheckIn',
      params: {
        theaterName,
        ticketQuantity: creditQuantity,
        screenType: creditScreenType,
        roomType: creditRoomType,
        transactionId,
        address,
        ttl,
        from: 'Home',
      },
    });
  };

  const handleDialogConfirm = useCallback(() => {
    const buy = creditQuantity > (creditVoucherAmount + creditPlansAmount);

    setDialogContent({
      title: 'Deseja confirmar e continuar?',
      message: null,
      footer: [
        {
          text: 'Sim, quero continuar',
          action: () => {
            setDialogVisible(false);
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            handleStartTransaction();
          },
          props: {
            style: {
              color: buy ? '#66CF97' : '#72B1D2',
            },
          },
        },
        {
          text: 'Não, mudei de ideia',
          action: () => setDialogVisible(false),
        },
      ],
    });
    setDialogVisible(true);
  }, [
    creditQuantity,
    creditVoucherAmount,
    creditPlansAmount,
    defaultCard,
    theaterId,
    creditRoomType,
    creditScreenType,
    stateCode,
    summary,
    enablePaymentWallet,
  ]);

  const handleDialogSucess = useCallback((transactionId: string | null = null, ttl: number) => {
    const buy = creditQuantity > (creditVoucherAmount + creditPlansAmount);

    setDialogContent({
      title: buy
        ? `Sua compra foi ${'\n'} efetuada com sucesso!`
        : `Seu resgate foi ${'\n'} efetuado com sucesso!`,
      iconSuccess: true,
      message: null,
      footer: [
        {
          text: 'Ok',
          action: () => {
            setDialogVisible(false);
            handleNavigateTransactionCheckIn(transactionId || '', ttl);
          },
        },
      ],
    });

    setDialogVisible(true);
  }, [
    creditVoucherAmount,
    creditPlansAmount,
    creditQuantity,
    theaterName,
    creditScreenType,
    creditRoomType,
    address,
  ]);

  const handleDialogError = useCallback((
    message: string | null = null,
  ) => {
    setDialogContent({
      title: `Ops! Ocorreu um erro inesperado.${'\n'} Por favor, tente novamente mais tarde`,
      iconError: true,
      message,
      footer: [
        {
          text: 'Ok',
          action: () => {
            setDialogVisible(false);
          },
        },
      ],
    });
    setDialogVisible(true);
  }, []);

  const getPaymentDetails = () => {
    const payments = [];

    if (enablePaymentWallet) {
      if (summary.total_amount > 0 && summary.total_amount <= balance) {
        payments.push({
          provider: 'wallet',
          price: summary.total_amount,
        });
      }

      if (balance > 0 && summary.total_amount > balance) {
        payments.push(
          {
            provider: 'wallet',
            price: balance,
          },
          {
            provider: 'creditCard',
            token: defaultCard.token,
            price: summary.total_amount - balance,
          },
        );
      }
    }
    if ((balance === 0 || !enablePaymentWallet) && summary.total_amount > 0) {
      payments.push(
        {
          provider: 'creditCard',
          token: defaultCard.token,
          price: summary.total_amount,
        },
      );
    }

    return payments;
  };

  const handleStartTransaction = async () => {
    try {
      setLoading(true);

      let additionalCredit = creditQuantity - (creditVoucherAmount + creditPlansAmount);
      additionalCredit = additionalCredit <= 0 ? 0 : additionalCredit;

      const payments = getPaymentDetails();

      const body = {
        user_id: user.id,
        items: {
          ticket: {
            theater_id: theaterId,
            room: creditRoomType.toUpperCase(),
            screen: creditScreenType.toUpperCase(),
            credit_quantity: creditQuantity - additionalCredit,
            additional_quantity: additionalCredit,
          },
        },
      };

      if (payments.length > 0) {
        body.payments = payments;
      }

      const {
        data: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          data: { transaction_id, ttl },
        },
      } = await api.post('/v2/start-transaction', body);

      handleDialogSucess(transaction_id, ttl);
    } catch (error: any) {
      let message = null;

      if (error.response && error.response.data.error && error.response.data.error.message) {
        message = error.response.data.error.message;
      }

      handleDialogError(message);

      if (!defaultCard?.cardId) {
        setDisableContinue(false);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const getCreditCardsList = async (userId: string) => {
    const { data } = await api.get(`/credit-cards?userId=${userId}`);
    return data;
  };

  const setCardAsDefault = async (card: string) => {
    try {
      await api.put('/credit-cards', {
        userId: user?.id,
        creditCardId: card,
      });
    } catch (error) {
      handleDialogError();
    }
  };

  const getDefaultCard = async () => {
    try {
      setCardLoading(true);
      const { data: cards } = await getCreditCardsList(user.id);
      let card = cards.find((cardSelected: any) => cardSelected.isDefault === true);
      if (!card && cards.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        card = cards[0];
        setCardAsDefault(card.id);
      }

      if (card) {
        setDefaultCard({
          cardId: card.id,
          cardNumber: card.masked,
          cardBrand: card.brand,
          selected: true,
          token: card.token,
        });
        return;
      }
      setDefaultCard({} as CardProps);
    } catch (error) {
      handleDialogError();
    } finally {
      setCardLoading(false);
    }
  };

  const handleCardDelete = useCallback(async () => {
    try {
      await api.delete(
        `/credit-cards/${defaultCard?.cardId}`,
      );
      getDefaultCard();
    } catch (error) {
      handleDialogError();
    }
  }, [defaultCard, user]);

  const handleNavigateTransactionTheaters = useCallback(() => {
    navigation.navigate('Transactions', {
      screen: 'TransactionTheaters',
      params: {
        from: 'ticketConfirm',
      },
    });
  }, []);

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'transaction-ticket',
      section: 'page',
      description: 'transaction ticket',
      userId: user ? user.id : '0',
    });
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      getDefaultCard();
      if (user) {
        loadCreditResume({ user_id: user.id });
        fetchWallet(user.id);
      }
    }, [user]),
  );

  useEffect(() => {
    const handleTransactionSummaryRequest = async () => {
      try {
        setLoading(true);

        if (creditQuantity <= 0 || creditScreenType.length <= 0 || creditRoomType.length <= 0) {
          setTransactionSummary({});
          setDisableContinue(true);
          return;
        }

        await geoLocation({ ok: true });

        let additionalCredit = creditQuantity - (creditVoucherAmount + creditPlansAmount);
        additionalCredit = additionalCredit <= 0 ? 0 : additionalCredit;

        const { data: { data } } = await api.post('/v2/transaction-summary', {
          user_id: user.id,
          theater_id: theaterId,
          room: creditRoomType.toUpperCase(),
          screen: creditScreenType.toUpperCase(),
          credit_quantity: creditQuantity - additionalCredit,
          additional_quantity: additionalCredit,
        });
        setTransactionSummary(data);

        setDisableContinue(false);
        if (!defaultCard?.cardId && balance <= 0 && data?.total_amount > 0) {
          setDisableContinue(true);
        }

        const newDetails = [] as Array<string>;
        newDetails.push(`${data.credit_quantity} ingresso(s) do seu saldo`);

        if (data.additional_quantity > 0) {
          const additionalAmount = formatNumber(data.additional_amount / 100, {
            separator: ',',
            precision: 2,
            delimiter: '.',
            ignoreNegative: true,
          });

          newDetails.push(`${data.additional_quantity} ingresso(s) extra - ${additionalAmount}`);
        }

        if (data.upgrade.length > 0) {
          data.upgrade.map((upgrade: Upgrade) => {
            const unitPrice = formatNumber(upgrade.unit_price / 100, {
              separator: ',',
              precision: 2,
              delimiter: '.',
              ignoreNegative: true,
            });
            newDetails.push(`Upgrade do(s) ${upgrade.quantity} ingresso(s): ${upgrade.type} — ${unitPrice}`);
            return newDetails;
          });
        }

        setDetails(newDetails);
      } catch (error: any) {
        let message = null;

        if (error.response && error.response.data.error && error.response.data.error.message) {
          message = error.response.data.error.message;
        }

        handleDialogError(message);

        if (!defaultCard?.cardId && summary?.total_amount > 0) {
          setDisableContinue(true);
          return;
        }

        setDisableContinue(false);
      } finally {
        setLoading(false);
      }
    };

    handleTransactionSummaryRequest();
  }, [
    creditQuantity,
    creditRoomType,
    creditScreenType,
    stateCode,
    creditVoucherAmount,
    creditPlansAmount,
    defaultCard,
  ]);

  useEffect(() => {
    const setupRedeemButton = dataSetup?.setup_list?.setups?.filter((setup) => setup?.category?.name === 'wallet');
    if (setupRedeemButton && setupRedeemButton?.length >= 1) {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        setShowWalletButton(Boolean(setupRedeemButton[0]?.tag?.device[Platform.OS]));
      }
    }
  }, [dataSetup]);

  return (
    <AndroidBackHandler
      onBackPress={() => {
        handleNavigateTransactionTheaters();
        return true;
      }}
    >
      <S.Container>
        <Dialog
          title={dialogContent.title}
          message={dialogContent.message}
          visible={dialogVisible}
          iconSuccess={dialogContent.iconSuccess}
          iconError={dialogContent.iconError}
          footer={dialogContent.footer}
          handleClose={() => setDialogVisible(false)}
        />

        <S.ScrollView>
          <Header
            title="Ingressos de cinema"
            handleGoBack={() => handleNavigateTransactionTheaters()}
          />
          <TransactionSteps steps={['Cinemas', 'Ingressos', 'Check-in']} active={1} />
          <TicketForm
            creditsAvailable={(creditVoucherAmount + creditPlansAmount)}
            creditQuantity={creditQuantity}
            onChangeQuantity={setCreditQuantity}
            creditScreenType={creditScreenType}
            creditRoomType={creditRoomType}
            onChangeScreenType={setCreditScreenType}
            onChangeRoomType={setCreditRoomType}
            rooms={rooms}
            screens={screens}
          />

          {summary?.total_amount > 0 && (
            <S.ContainerPayment>
              {(balance > 0 && showWalletButton) && (
                <S.WalletContainer>
                  <S.Row>
                    <S.Text>Saldo Primepass</S.Text>
                    <S.Balance>
                      R$
                      {' '}
                      {formatNumber(balance / 100, {
                        separator: ',',
                        precision: 2,
                        delimiter: '.',
                        ignoreNegative: true,
                      })}
                    </S.Balance>
                  </S.Row>
                  <S.RowSwitch>
                    <S.Text>Utilizar meu saldo</S.Text>
                    <Switch
                      trackColor={{ false: '#767577', true: '#147EB5' }}
                      thumbColor="#f4f3f4"
                      value={enablePaymentWallet}
                      onValueChange={() => setEnablePaymentWallet(!enablePaymentWallet)}
                      style={{ marginLeft: 24 }}
                    />

                  </S.RowSwitch>

                </S.WalletContainer>
              )}

              <S.CardContainer>
                <S.Title>Forma de pagamento</S.Title>
                <PaymentCard
                  key={defaultCard.cardId}
                  card={defaultCard.cardNumber}
                  brand={defaultCard.cardBrand}
                  edit
                  selected={defaultCard.selected}
                  onDelete={handleCardDelete}
                  loading={cardLoading}
                />

                {(!defaultCard.cardId && (balance <= summary?.total_amount))
                  && (
                    <S.ContainerWarning>
                      <InfoIcon width={10} height={10} />
                      <S.Warning>
                        Adicione um cartão de crédito para prosseguir
                      </S.Warning>
                    </S.ContainerWarning>
                  )}

              </S.CardContainer>

            </S.ContainerPayment>
          )}

          <S.Button
            disable={disableContinue}
            green={summary?.total_amount > 0}
            onPress={handleDialogConfirm}
            isLoading={loading}
          >
            <S.ButtonText disable={disableContinue}>
              {summary?.total_amount > 0 ? 'Confirmar e prosseguir' : 'Prosseguir'}
            </S.ButtonText>
          </S.Button>

        </S.ScrollView>
      </S.Container>

      <TicketResumeModal
        ticketQuantity={creditQuantity}
        value={summary?.total_amount > 0
          ? formatNumber(summary?.total_amount / 100, {
            separator: ',',
            precision: 2,
            delimiter: '.',
            ignoreNegative: true,
          }) : null}
        theaterName={theaterName}
        screenType={creditScreenType}
        roomType={creditRoomType}
        details={details}
      />
    </AndroidBackHandler>
  );
});

export default TransactionTicketConfirm;
