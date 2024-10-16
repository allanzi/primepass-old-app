import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import 'moment/locale/pt-br';

import ArrowIcon from '../../assets/img/arrow-right-blue.svg';
import Dialog from '../Dialog';
import PromoPassIcon from '../../assets/img/promo-pass.svg';
import * as S from './styles';
import { Transaction } from '../../@types/graphql/schemas';

interface Props {
  transaction: Transaction | null;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const CheckInModal: React.FC<Props> = ({ transaction, visible, setVisible }) => {
  const navigation = useNavigation();
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardHeight = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef();

  const [dialogVisible, setDialogVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [seconds, setSeconds] = useState(transaction?.ttl || 0);

  const decreaseNum = () => {
    if (seconds > 0) {
      setSeconds((prev) => prev - 1);
    }
  };

  const formatTimeRemain = () => {
    if (expanded) {
      return moment.utc(moment.duration(seconds, 'seconds').as('milliseconds')).format('HH[h] mm[m] ss[s]');
    }
    return moment.utc(moment.duration(seconds, 'seconds').as('milliseconds')).format('HH[h] mm[m]');
  };

  const getQuantity = () => {
    if (transaction) {
      const transactionTheater = transaction.transactionItems.filter((transactionItem) => transactionItem.itemType === 'theater');
      if (transactionTheater.length > 0) {
        return transactionTheater[0].quantity;
      }
      return 0;
    }
    return 0;
  };

  useEffect(() => {
    if (seconds === 0 && visible) {
      setDialogVisible(true);
      setVisible(false);
    }
    intervalRef.current = BackgroundTimer.setInterval(decreaseNum, 1000);
    return () => BackgroundTimer.clearInterval(intervalRef.current);
  }, [seconds]);

  const handleClose = () => {
    cardOpacity.setValue(1);
    Animated.timing(
      cardOpacity,
      {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      },
    ).start();

    cardHeight.setValue(120);
    Animated.timing(
      cardHeight,
      {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      },
    ).start();

    setTimeout(() => { setExpanded(false); }, 500);
  };

  const handleOpen = () => {
    cardHeight.setValue(0);
    Animated.timing(
      cardHeight,
      {
        toValue: 120,
        duration: 500,
        useNativeDriver: false,
      },
    ).start();

    cardOpacity.setValue(0);
    Animated.timing(
      cardOpacity,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      },
    ).start();

    setExpanded(true);
  };

  const toggleCard = () => {
    if (expanded) {
      handleClose();
      return;
    }

    handleOpen();
  };

  const handleNavigateTransactionTheaters = useCallback(() => {
    navigation.navigate('Transactions', {
      screen: 'TransactionTheaters',
    });
  }, []);

  const handleNavigateTransactionCheckIn = () => {
    const address = transaction?.solicitation?.theater?.address;
    const formattedAddress = (address?.name || '')
    + (address?.name && address.number ? ', ' : '')
    + (address?.number || '')
    + (address?.number && address.district ? ' - ' : '')
    + (address?.district)
    + (address?.district && address.city?.name ? ', ' : '')
    + (address?.city?.name || '')
    + (address?.city?.name && address.city?.state ? '/' : '')
    + (address?.city?.state || '');

    navigation.navigate('Transactions', {
      screen: 'TransactionCheckIn',
      params: {
        theaterName: transaction?.solicitation?.theater?.name || '',
        ticketQuantity: getQuantity(),
        screenType: transaction?.solicitation?.screens[0] || '--',
        roomType: transaction?.solicitation?.rooms[0] || '--',
        transactionId: transaction ? transaction.id : '',
        address: formattedAddress || '',
        ttl: seconds,
        from: 'Home',
      },
    });
  };

  return (
    <>
      <Dialog
        title="Tempo para check-in esgotado"
        message={'O tempo para realizar o check-in esgotou.'
              + ' Se houver valor, este será extornado e o saldo de ingressos retornará à sua conta.'
              + ' Você precisará refazer o processo de resgate.'
              + '\n\n'
              + 'Quer reiniciar o resgate do seu saldo de ingressos?'}
        visible={dialogVisible}
        footer={[
          {
            text: 'Sim, quero reiniciar o resgate',
            action: () => {
              handleNavigateTransactionTheaters();
              setDialogVisible(false);
            },
            props: {
              style: {
                color: '#72B1D2',
              },
            },
          },
          {
            text: 'Não, voltar a navegar no app',
            action: () => {
              setDialogVisible(false);
            },
          },
        ]}
        handleClose={() => setDialogVisible(false)}
      />
      {visible
      && (
        <S.SafeAreaView>
          <S.Fragment />
          <S.Container>

            <S.Header onPress={toggleCard}>
              {expanded ? (
                <S.TitleExpanded>
                  Status dos seus ingressos resgatados
                </S.TitleExpanded>
              ) : (
                <>
                  <S.Group>
                    <S.QuantityContainer>
                      <PromoPassIcon width={18} />
                      <S.Quantity>
                        {getQuantity()}
                      </S.Quantity>
                    </S.QuantityContainer>
                    <S.Text>ingressos habilitados</S.Text>
                    <S.Indicator />
                  </S.Group>

                  <S.Group>
                    <S.Text>Tempo para resgate: </S.Text>
                    <S.Timer>
                      {formatTimeRemain()}
                    </S.Timer>
                  </S.Group>
                </>
              )}

              <S.Expand>
                <S.TextBlue>
                  {expanded ? 'Ocultar' : 'Expandir'}
                </S.TextBlue>
                {expanded
                  ? <ArrowIcon style={{ transform: [{ rotate: '90deg' }] }} />
                  : <ArrowIcon style={{ transform: [{ rotate: '270deg' }] }} />}
              </S.Expand>
            </S.Header>
            {expanded && (
              <S.Content style={{ height: cardHeight }}>
                <S.PaddingComponent style={{ opacity: cardOpacity }}>
                  <S.Row>
                    <S.Group>
                      <S.QuantityContainer expanded={expanded}>
                        <PromoPassIcon width={24} />
                        <S.Quantity expanded={expanded}>
                          {getQuantity()}
                        </S.Quantity>
                      </S.QuantityContainer>
                      <S.Text expanded={expanded}>ingressos habilitados</S.Text>
                      <S.Indicator />
                    </S.Group>
                    <S.Group expanded={expanded}>
                      <S.Text>Tempo para resgate: </S.Text>
                      <S.Timer expanded={expanded}>
                        {formatTimeRemain()}
                        {' '}
                      </S.Timer>
                    </S.Group>
                  </S.Row>
                  <S.Actions>
                    <S.Button
                      disable={false}
                      onPress={() => handleNavigateTransactionCheckIn()}
                    >
                      <S.ButtonText>Fazer check-in</S.ButtonText>
                    </S.Button>
                  </S.Actions>
                </S.PaddingComponent>
              </S.Content>
            )}

          </S.Container>
        </S.SafeAreaView>
      )}
    </>
  );
};

export default CheckInModal;
