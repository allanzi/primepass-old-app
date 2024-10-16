/* eslint-disable react/require-default-props */

import React, { useRef, useState } from 'react';
import { Animated } from 'react-native';

import { TicketResumeModalProps } from './types';
import ArrowUpIcon from '../../assets/img/arrow-up.svg';
import Credit from '../../assets/img/credit.svg';
import Toggle from '../../assets/img/toggle.svg';
import * as S from './styles';

const TicketResumeModal: React.FC<TicketResumeModalProps> = ({
  ticketQuantity,
  value,
  theaterName,
  screenType,
  roomType,
  details,
}) => {
  const cardHeight = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const [open, setOpen] = useState(false);

  const DETAIL_HEIGHT = 35;
  const DETAIL_LINES = (details && details.length > 0) ? details.length + 1 : 0;
  const BASE_HEIGHT = 80;

  const labelTicketQuantity = () => {
    if (ticketQuantity) {
      return `${ticketQuantity} ${ticketQuantity > 1 ? 'ingressos' : 'ingresso'}`;
    }
    return '- -';
  };

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
      cardHeight.setValue(BASE_HEIGHT + (DETAIL_LINES * DETAIL_HEIGHT));
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
        toValue: BASE_HEIGHT + (DETAIL_LINES * DETAIL_HEIGHT),
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

  return (
    <S.Container>
      <S.Card>
        <S.CardHeader>
          <S.QuantityContainer>
            <Toggle width={12} height={12} marginRight={4} />
            <S.Text>Quantidade:</S.Text>
            <S.TextValue disable={ticketQuantity <= 0}>
              { labelTicketQuantity() }
            </S.TextValue>
          </S.QuantityContainer>
          <S.ValueContainer>
            <Credit width={12} height={12} marginRight={4} />
            <S.Text style={{ color: value ? '#88E3C0' : '#CCCCCC' }}>Valor:</S.Text>
            <S.TextValue disable={!value}>
              R$
              {' '}
              {value || '- -' }
            </S.TextValue>
          </S.ValueContainer>
        </S.CardHeader>

        <S.CardContent style={{ height: cardHeight }}>
          <S.PaddingComponent style={{ opacity: cardOpacity }}>
            <S.Info>
              <S.Text>Local: </S.Text>
              <S.TextValue>{theaterName}</S.TextValue>
            </S.Info>
            <S.Divider />
            <S.Info>
              <S.Text>Tela: </S.Text>
              <S.TextValue disable={!screenType}>
                {screenType || '- -'}
              </S.TextValue>
            </S.Info>
            <S.Info>
              <S.Text>Sala: </S.Text>
              <S.TextValue disable={!roomType}>
                {roomType || '- -'}
              </S.TextValue>
            </S.Info>
            {(details && details.length > 0)
              && (
                <S.ContainerDetails>
                  <S.Divider />
                  <S.Text>
                    Detalhes do resgate:
                  </S.Text>
                  {details?.map((detail) => (
                    <S.TextDetail key={detail}>
                      {detail}
                    </S.TextDetail>
                  ))}
                </S.ContainerDetails>
              ) }
          </S.PaddingComponent>
        </S.CardContent>

        <S.CardFooter onPress={toggleCard}>
          {!open
            ? <ArrowUpIcon />
            : <ArrowUpIcon style={{ transform: [{ rotate: '180deg' }] }} />}
          <S.TextFooter>
            {!open ? 'Exibir detalhes' : 'Ocultar detalhes'}
          </S.TextFooter>
        </S.CardFooter>
      </S.Card>
    </S.Container>
  );
};

export default TicketResumeModal;
