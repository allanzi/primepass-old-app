/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import 'moment/locale/pt-br';

import { CheckInCardProps, ModalMessageProps } from './types';
import ArrowUpIcon from '../../assets/img/arrow-up.svg';
import Dialog from '../Dialog';
import QuestionIcon from '../../assets/img/question.svg';
import PinIcon from '../../assets/img/pinInactive.svg';
import PromoPassIcon from '../../assets/img/promo-pass.svg';
import PromoPassGreenIcon from '../../assets/img/promo-pass-green.svg';
import * as S from './styles';

const CheckInCard: React.FC<CheckInCardProps> = ({
  roomType,
  screenType,
  step,
  theaterLocation,
  ticketQuantity,
  timeRemain,
  validDate,
}) => {
  const navigation = useNavigation();

  const cardHeight = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    message: null,
    iconSuccess: false,
    iconError: false,
    footer: null,
  } as ModalMessageProps);

  const handleClose = () => {
    cardOpacity.setValue(1);
    Animated.timing(
      cardOpacity,
      {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      },
    ).start();

    setTimeout(() => {
      cardHeight.setValue(200);
      Animated.timing(
        cardHeight,
        {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        },
      ).start();
    }, 150);
  };

  const handleOpen = () => {
    cardHeight.setValue(0);
    Animated.timing(
      cardHeight,
      {
        toValue: 200,
        duration: 400,
        useNativeDriver: false,
      },
    ).start();

    setTimeout(() => {
      cardOpacity.setValue(0);
      Animated.timing(
        cardOpacity,
        {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        },
      ).start();
    }, 150);
  };

  const toggleCard = () => {
    setTimeout(() => setOpen(!open), 200);

    if (open) {
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

  const handleNavigateHome = useCallback(() => {
    navigation.navigate('Home');
  }, []);

  const handleDialogCheckin = () => {
    setDialogContent({
      title: 'Faça o check-in',
      message: '',
      footer: null,
    });

    setDialogVisible(true);
  };

  const handleDialogSuccess = () => {
    setDialogContent({
      title: 'Códigos liberados',
      message: '',
      footer: null,
    });

    setDialogVisible(true);
  };

  const handleDialogTimeout = () => {
    setDialogContent({
      title: 'Tempo para check-in esgotado',
      message: 'O tempo para realizar o check-in esgotou.'
      + ' Se houver valor, este será extornado e o saldo de ingressos retornará à sua conta.'
      + ' Você precisará refazer o processo de resgate.'
      + '\n\n'
      + 'Quer reiniciar o resgate do seu saldo de ingressos?',
      footer: [
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
          text: 'Não, voltar para a página inicial',
          action: () => {
            handleNavigateHome();
            setDialogVisible(false);
          },
        },
      ],
    });

    setDialogVisible(true);
  };

  const intervalRef = useRef();
  const [seconds, setSeconds] = useState(timeRemain);
  const decreaseNum = () => {
    if (!loading && seconds > 0 && step === 2) {
      setSeconds((prev) => prev - 1);
    }
  };
  const formatTimeRemain = () => moment.utc(moment.duration(seconds, 'seconds').as('milliseconds')).format('HH:mm:ss');

  useEffect(() => {
    setLoading(true);
    setSeconds(timeRemain);
    setLoading(false);
  }, [timeRemain]);

  useEffect(() => {
    if (!loading && seconds === 0 && step === 2) {
      handleDialogTimeout();
    }
    intervalRef.current = BackgroundTimer.setInterval(decreaseNum, 1000);
    return () => BackgroundTimer.clearInterval(intervalRef.current);
  }, [seconds, loading]);

  const contentDialogSuccess = () => (
    <S.TextModal>
      Utilize os códigos
      {' '}
      <S.Bold>dentro do prazo de validade</S.Bold>
      {' '}
      no balcão do cinema escolhido anteriormente ou no site da
      {' '}
      <S.Bold>ingresso.com</S.Bold>
      {' '}
      para obter os ingressos de cinema.
    </S.TextModal>
  );

  const contentDialogCheckIn = () => (
    <S.TextModal>
      Para fazer o check-in
      {' '}
      <S.TextBlue>
        você precisa estar em um raio
        de 3km do cinema escolhido e dentro do prazo limite

      </S.TextBlue>
      . Os códigos de ingressos de cinema serão liberados
      para você logo após a confirmação.
    </S.TextModal>
  );

  return (
    <S.Container>
      {!loading && (
        <>
          <Dialog
            title={dialogContent.title}
            message={dialogContent.message}
            visible={dialogVisible}
            iconSuccess={dialogContent.iconSuccess}
            iconError={dialogContent.iconError}
            footer={dialogContent.footer}
            handleClose={() => setDialogVisible(false)}
          >
            {dialogContent.title === 'Faça o check-in'
          && contentDialogCheckIn()}
            {dialogContent.title === 'Códigos liberados'
          && contentDialogSuccess()}

          </Dialog>
          <S.ContainerTitle>
            <S.Title>
              {step === 2 ? 'Faça o check-in' : 'Códigos liberados'}
            </S.Title>
            <QuestionIcon onPress={() => (
              step === 2
                ? handleDialogCheckin()
                : handleDialogSuccess()
            )}
            />
          </S.ContainerTitle>
          <S.Subtitle>Detalhes dos ingressos</S.Subtitle>
          <S.Card>

            <S.CardHeader>
              <S.Group>
                <S.QuantityContainer>
                  {step === 2
                    ? <PromoPassIcon />
                    : <PromoPassGreenIcon />}
                  <S.Quantity>
                    {ticketQuantity}
                  </S.Quantity>
                </S.QuantityContainer>
                <S.TitleCard>
                  {step === 2 ? 'Aguardando Check-in' : 'Ingressos ativos'}
                </S.TitleCard>
                <S.Indicator style={{ backgroundColor: step === 2 ? '#72B1D2' : '#66CF97' }} />
              </S.Group>
              <S.Group>
                <S.Column>
                  <S.TextMinimum>{step === 2 ? 'Tempo para resgate:' : ''}</S.TextMinimum>
                  <S.Timer
                    style={{ fontSize: step === 2 ? 16 : 12 }}
                  >
                    {step === 2 ? formatTimeRemain() : ''}

                  </S.Timer>
                </S.Column>
              </S.Group>
            </S.CardHeader>

            <S.CardContent style={{ height: cardHeight }}>
              <S.PaddingComponent style={{ opacity: cardOpacity }}>
                <S.Row>
                  <S.Distance>
                    <PinIcon width={24} height={24} marginRight={2} />
                  </S.Distance>
                  <S.TextBold>
                    {theaterLocation.theaterName}
                  </S.TextBold>
                </S.Row>
                {/* <S.Shopping>
              {theaterLocation.shoppingName}
            </S.Shopping> */}
                <S.Address>
                  {theaterLocation.address}
                </S.Address>
                <S.Divider />
                <S.Row>
                  <S.Label>
                    Tipo de tela:
                  </S.Label>
                  <S.TextBold>
                    {screenType}
                  </S.TextBold>
                </S.Row>
                <S.Row>
                  <S.Label>
                    Tipo de sala:
                  </S.Label>
                  <S.TextBold>
                    {roomType}
                  </S.TextBold>
                </S.Row>
                <S.Divider />
                <S.Row>
                  <S.Label>
                    Quantidade de ingressos:
                  </S.Label>
                  <S.TextBold>
                    {ticketQuantity}
                    {' '}
                    {ticketQuantity > 1 ? 'ingressos' : 'ingresso'}
                  </S.TextBold>
                </S.Row>
              </S.PaddingComponent>
            </S.CardContent>

            <S.CardFooter onPress={toggleCard}>
              {open
                ? <ArrowUpIcon />
                : <ArrowUpIcon style={{ transform: [{ rotate: '180deg' }] }} />}
              <S.TextMinimum>
                {!open ? 'Exibir detalhes' : 'Ocultar detalhes'}
              </S.TextMinimum>
            </S.CardFooter>
          </S.Card>
        </>
      ) }

    </S.Container>
  );
};

export default CheckInCard;
