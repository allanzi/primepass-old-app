/* eslint-disable max-len, @typescript-eslint/no-use-before-define */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ModalMessageProps, Params } from './types';
import { Transaction } from '../../../../@types/graphql/schemas';
import { useAction } from '../../../../hooks/actions';
import { useAuth } from '../../../../hooks/auth';
import { useLocation } from '../../../../hooks/location';
import { useTransactionsHistory } from '../../../../hooks/transactionsHistory';
import api from '../../../../services/api';
import CheckInCard from '../../../../components/CheckInCard';
import Dialog from '../../../../components/Dialog';
import Faq from '../../../../components/Faq';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import TransactionCheckInCodes from '../../../../components/TransactionCheckInCodes';
import TransactionSteps from '../../../../components/TransactionSteps';
import * as S from './styles';

export enum Step {
  PENDING = 2,
  CONFIRM = 3,
}

const TransactionCheckIn: React.FC = () => {
  const { user } = useAuth();
  const { logEvent } = useAction();
  const navigation = useNavigation();
  const route = useRoute();
  const { geoLocation, latitude, longitude } = useLocation();
  const {
    theaterName,
    ticketQuantity,
    screenType,
    roomType,
    transactionId,
    address,
    ttl,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status,
    from,
    transaction,
  } = route.params as Params;

  const [step, setStep] = useState(Step.PENDING);
  const [transactions, setTransactions] = useState<Array<Transaction>>([] as Array<Transaction>);
  const [loadingCheckin, setLoadingCheckin] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    message: null,
    type: null,
    iconSuccess: false,
    iconError: false,
    footer: null,
  } as ModalMessageProps);

  const {
    data, loadTransactionsHistory,
  } = useTransactionsHistory();

  useLayoutEffect(() => {
    if (transaction) {
      setTransactions([transaction]);
    }
    if (status && status === 'authorized') {
      setStep(Step.PENDING);
    }
    if (status && status === 'paid') {
      setStep(Step.CONFIRM);
    }
  }, [status, transaction]);

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'transaction-check-in',
      section: 'page',
      description: 'transaction check in',
      userId: user ? user.id : '0',
    });
  }, [user]);

  useEffect(() => {
    if (data) {
      setTransactions(data);
    }
  }, [data]);

  const handleDialogCheckin = () => {
    setDialogContent({
      title: 'Tem certeza que gostaria de fazer check-in agora?',
      message: null,
      footer: [
        {
          text: 'Sim, fazer check-in agora',
          action: () => {
            setDialogVisible(false);
            handleCheckin();
          },
          props: {
            style: {
              color: '#72B1D2',
            },
          },
        },
        {
          text: 'Não, mudei de ideia',
          action: () => {
            setDialogVisible(false);
          },
        },
      ],
    });

    setDialogVisible(true);
  };

  const handleDialogCheckinConfirm = () => {
    setDialogContent({
      title: `Tudo certo! ${'\n'} Check-in confirmado.`,
      iconSuccess: true,
      message: null,
      footer: [
        {
          text: 'Ok',
          action: () => {
            setStep(3);
            setDialogVisible(false);
          },
        },
      ],
    });

    setDialogVisible(true);
  };

  const handleDialogCheckinCancel = () => {
    setDialogContent({
      title: 'Gostaria de cancelar o resgate dos vouchers de ingressos de cinema?',
      message: 'Não se preocupe. Caso queira cancelar, o saldo de ingressos retornará para sua carteira e os valores adicionais serão extornados.',
      footer: [
        {
          text: 'Sim, quero cancelar',
          action: () => {
            handleCancel();
          },
          props: {
            style: {
              color: '#FF6666',
            },
          },
        },
        {
          text: 'Não, mudei de ideia',
          action: () => {
            setDialogVisible(false);
          },
        },
      ],
    });

    setDialogVisible(true);
  };

  const handleDialogLocationError = () => {
    setDialogContent({
      title: 'Ops, você não está próximo ao cinema',
      type: 'location',
      message: '',
      footer: null,
    });

    setDialogVisible(true);
  };

  const handleDialogError = () => {
    setDialogContent({
      title: 'Ops, algo deu errado',
      message: 'Tente novamente mais tarde ou entre em contato com nossa central de atendimento.',
      footer: null,
    });

    setDialogVisible(true);
  };

  const handleDialogCancel = () => {
    setDialogContent({
      title: 'Seu resgate de ingressos foi cancelado',
      iconSuccess: true,
      message: null,
      footer: [
        {
          text: 'Ok',
          action: () => {
            navigation.navigate('Home');
            setDialogVisible(false);
          },
        },
      ],
    });

    setDialogVisible(true);
  };

  const handleCheckin = async () => {
    try {
      setLoadingCheckin(true);
      await geoLocation({ ok: true });

      if (latitude && longitude) {
        const {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          data: dataCheckin,
        } = await api.post('/v2/check-in', {
          transaction_id: transactionId,
          latitude,
          longitude,
        });

        await loadTransactionsHistory({
          userId: user.id,
          id: dataCheckin.data.transaction_id,
          status: undefined,
        });

        setTimeout(() => handleDialogCheckinConfirm(), 200);
      }
    } catch (error: any) {
      if (error.response.data.error && error.response.data.error.code === 'A4001') {
        handleDialogLocationError();
        return;
      }
      handleDialogError();
    } finally {
      setLoadingCheckin(false);
    }
  };

  const handleCancel = async () => {
    try {
      setDialogVisible(false);
      setCancelLoading(true);

      await api.post(`/v2/transaction/${transactionId}/cancel`, {
        reason_cancellation: 'Usuário cancelou sessão',
      });

      handleDialogCancel();
    } catch (_) {
      handleDialogError();
    } finally {
      setCancelLoading(false);
    }
  };

  const contentModalCheckInError = () => (
    <S.TextModal>
      Caso a sua sessão não seja liberada no tempo previsto ela
      será cancelada automaticamente. Você precisa estar no mínimo a
      <S.TextAlert>
        {' '}
        3km de distância do cinema
        {' '}
      </S.TextAlert>
      para poder prosseguir com o check-in.
    </S.TextModal>
  );

  const handleRedirectBack = () => {
    if (from && from === 'TransactionHistory') {
      navigation.navigate('Transactions', {
        screen: 'TransactionsHistory',
      });
      return;
    }

    navigation.navigate('Home');
  };

  const getTransaction = (listTransactions: Array<Transaction> | undefined) => {
    if (!listTransactions || listTransactions.length <= 0) {
      return null;
    }
    const result = listTransactions.filter((item) => item.id === transactionId);
    return result.length > 0 ? result[0] : null;
  };

  return (
    <AndroidBackHandler
      onBackPress={() => {
        if (from && from === 'TransactionHistory') {
          handleRedirectBack();
        }

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
        >
          {dialogContent.type === 'location' && contentModalCheckInError()}
        </Dialog>

        <S.ScrollView keyboardDismissMode="on-drag">
          <Header
            title="Ingressos de cinema"
            handleGoBack={handleRedirectBack}
            hideBackButton={!!(from && from !== 'TransactionHistory')}
          />
          <TransactionSteps steps={['Cinemas', 'Ingressos', 'Check-in']} active={step} />

          <CheckInCard
            step={step}
            ticketQuantity={ticketQuantity}
            timeRemain={ttl}
            validDate="-"
            screenType={screenType}
            roomType={roomType}
            theaterLocation={{
              theaterName,
              shoppingName: '',
              address,
            }}
          />

          {step === Step.PENDING && (
            <>
              <S.Info>
                O tempo para resgate total é de 24h a
                partir da confirmação da escolha dos ingressos.
              </S.Info>

              <S.Actions>
                <S.Button
                  disable={false}
                  onPress={() => handleDialogCheckin()}
                  isLoading={loadingCheckin}
                >
                  <S.ButtonText>
                    Fazer check-in
                  </S.ButtonText>
                </S.Button>

                <S.Button
                  disable={false}
                  outline
                  onPress={() => handleDialogCheckinCancel()}
                  isLoading={cancelLoading}
                >
                  <S.ButtonText>
                    Cancelar resgate
                  </S.ButtonText>
                </S.Button>

                <S.Button
                  disable={false}
                  outline
                  onPress={handleRedirectBack}
                >
                  <S.ButtonText>
                    Voltar para
                    {' '}
                    {(from && from === 'TransactionHistory') ? 'o histórico' : 'página inicial'}
                  </S.ButtonText>
                </S.Button>
              </S.Actions>
            </>
          )}

          {step === Step.CONFIRM
              && (
                <TransactionCheckInCodes
                  codes={getTransaction(transactions)?.ticketCodes || []}
                  days={getTransaction(transactions)?.solicitation?.days || []}
                  hasSeat={getTransaction(transactions)?.solicitation?.theater?.seat || false}
                  seatUrl={getTransaction(transactions)?.solicitation?.theater?.theaterUrl || ''}
                  steps={getTransaction(transactions)?.solicitation?.theater?.cinema?.ticketRedemption?.steps || []}
                />
              )}

          <Faq categoryLimit={4} />

          <Footer />
        </S.ScrollView>

      </S.Container>
    </AndroidBackHandler>
  );
};

export default TransactionCheckIn;
