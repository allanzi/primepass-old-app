/* eslint-disable react/prop-types, no-nested-ternary */
import React, { useState, useRef } from 'react';
import { Animated, FlatList } from 'react-native';
import {
  useNavigation,
} from '@react-navigation/native';

import ArrowUpIcon from '../../assets/img/arrow-up.svg';
import CalendarIcon from '../../assets/img/calendar.svg';
import Clock from '../../assets/img/clock.png';
import CloseIcon from '../../assets/img/close.png';
import Dialog from '../Dialog';
import Prime from '../../assets/img/prime.png';
import QuestionIcon from '../../assets/img/question.svg';
import Service from '../Service';
import TicketIcon from '../../assets/img/ticket.svg';
import * as S from './styles';
import type { PlanCoreProps } from './types';

const PlanCore: React.FC<PlanCoreProps> = ({
  name,
  logo,
  color,
  expirationDate,
  services,
  ticketsQuantity,
  screen,
  room,
  availability,
  period,
  parentSignature,
  isB2C,
}) => {
  const navigation = useNavigation();
  const [dialogServices, setDialogServices] = useState(false);
  const [dialogCinema, setDialogCinema] = useState(false);

  const SERVICE_HEIGHT = 55;
  const BASE_HEIGHT = 260;
  const SERVICE_LINES = services.length / 3;

  const cardHeight = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const [open, setOpen] = useState(false);

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
      cardHeight.setValue(BASE_HEIGHT + (SERVICE_LINES * SERVICE_HEIGHT));
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
        toValue: BASE_HEIGHT + (SERVICE_LINES * SERVICE_HEIGHT),
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
    setTimeout(() => setOpen(!open), 500);

    if (open) {
      handleClose();
      return;
    }

    handleOpen();
  };

  const handleRedirectMyTickets = () => {
    navigation.navigate('MyTickets');
  };

  const handleRedirectUnsubscribe = () => {
    navigation.navigate('Unsubscribe', {
      parentId: parentSignature.id,
    });
  };

  function CancelPlan() {
    if (isB2C) {
      return (
        <>
          { parentSignature.dateCancel ? (
            <S.CanceledContent>
              <S.Icon source={Clock} />
              <S.TextCanceled>
                Plano foi cancelado e será válido até a vigência
              </S.TextCanceled>
            </S.CanceledContent>
          ) : (
            <S.CancelContent onPress={handleRedirectUnsubscribe}>
              <S.CloseIcon>
                <S.Icon source={CloseIcon} />
              </S.CloseIcon>
              <S.TextCancel>Cancelar assinatura</S.TextCancel>
            </S.CancelContent>
          )}
        </>
      );
    }
    return <></>;
  }

  return (
    <S.Card>
      <S.CardHeader color={color}>
        <S.PlanContainer>
          {logo
            ? (
              <S.PartnerLogo
                source={{ uri: logo }}
              />
            )
            : (
              <S.PartnerLogo
                source={Prime}
              />
            )}
          <S.ViewText>
            <S.SignatureText>
              Plano
              {' '}
              {name}
            </S.SignatureText>
            <S.PeriodText>{period}</S.PeriodText>
          </S.ViewText>
        </S.PlanContainer>

        <S.SignatureContainer>
          <CalendarIcon />
          <S.ViewText>
            <S.SignatureText>
              Vigência:
              {' '}
              {expirationDate}
            </S.SignatureText>
            <S.PeriodText>
              Status:
              {' '}
              {parentSignature.dateCancel ? 'Cancelado' : 'Ativo' }
            </S.PeriodText>
          </S.ViewText>
        </S.SignatureContainer>
      </S.CardHeader>
      <Dialog
        title="Streaming de filmes, séries e músicas"
        message="Pacote de serviços de entretenimento por streaming disponíveis para você desfrutar mais de 60 milhões de músicas e mais de 250.000 vídeos de alta definição especialmente selecionado para você."
        visible={dialogServices}
        handleClose={() => setDialogServices(false)}
      />
      <Dialog
        title="Ingressos para cinema"
        message="Ingressos de cinema para você assistir todas as estreias. Mais de 2400 salas de cinema (com salas 2D, 3D, REAL 3D, VIP, IMAX e 4DX)."
        visible={dialogCinema}
        handleClose={() => setDialogCinema(false)}
      />
      <S.CardContent style={{ height: cardHeight }}>
        <S.CardContentContainer style={{ opacity: cardOpacity }}>
          <S.SectionServices>
            <S.TitleSection>
              <S.TextContent>Streaming de filmes, séries e música </S.TextContent>
              <QuestionIcon onPress={() => setDialogServices(true)} />
            </S.TitleSection>
            <S.ServicesContainer>
              <FlatList
                data={services}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                  <Service logo={item.type.name !== 'cinema' ? item.logo : null} />
                )}
              />
            </S.ServicesContainer>
          </S.SectionServices>

          {ticketsQuantity > 0 && (
            <S.SectionCinema>
              <S.TitleSection>
                <S.TextContent>Ingressos de cinema </S.TextContent>
                <QuestionIcon onPress={() => setDialogCinema(true)} />
              </S.TitleSection>

              <S.TicketContainer>
                <TicketIcon fill="#A2A2A2" />
                <S.TicketsInfo>
                  <S.TicketsInfoSpan>
                    {ticketsQuantity}
                    {' '}
                    ingressos
                    {' '}
                  </S.TicketsInfoSpan>
                  de cinema
                  {screen && room ? ` (${typeof screen !== undefined ? screen : ''} / ${room || ''})` : ''}
                </S.TicketsInfo>
              </S.TicketContainer>

              <S.Availability>
                Disponibilidade:
                {' '}
                <S.SpanAvailability>
                  {availability}
                </S.SpanAvailability>
              </S.Availability>
              <S.Tickets>
                <S.TicketsAmount>
                  {ticketsQuantity}
                  {' '}
                  ingressos mensais
                  {' '}
                </S.TicketsAmount>
                <S.SpanRecharge>
                  - Verifique sua recarga em
                </S.SpanRecharge>
                <S.TicketsRecharge>
                  {' '}
                  <S.MyticketsLink onPress={handleRedirectMyTickets}>
                    <S.SpanRechargeLink>
                      Meus ingressos
                    </S.SpanRechargeLink>
                  </S.MyticketsLink>
                </S.TicketsRecharge>
              </S.Tickets>
            </S.SectionCinema>
          )}

          <CancelPlan />

        </S.CardContentContainer>
      </S.CardContent>
      <S.CardFooter color={color} onPress={toggleCard}>
        {open ? <ArrowUpIcon /> : <ArrowUpIcon style={{ transform: [{ rotate: '180deg' }] }} />}
      </S.CardFooter>
    </S.Card>

  );
};

export default PlanCore;
