/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react';
import { Animated, FlatList } from 'react-native';
import HTML from 'react-native-render-html';

import Dialog from '../Dialog';
import ArrowUpIcon from '../../assets/img/arrow-up.svg';
import QuestionIcon from '../../assets/img/question.svg';
import { PlanAdditionalProps } from './types';
import * as S from './styles';

const PlanAdditional: React.FC<PlanAdditionalProps> = ({
  name,
  description,
  services,
  modalContent,
}) => {
  const [dialog, setDialog] = useState(false);

  const SERVICE_HEIGHT = 60;
  const BASE_HEIGHT = 100;
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
        duration: 300,
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
        duration: 300,
        useNativeDriver: false,
      },
    ).start();

    setTimeout(() => {
      cardOpacity.setValue(0);
      Animated.timing(
        cardOpacity,
        {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        },
      ).start();
    }, 150);
  };

  const toggleCard = () => {
    setTimeout(() => setOpen(!open), 100);

    if (open) {
      handleClose();
      return;
    }

    handleOpen();
  };

  return (
    <S.Card>
      <Dialog
        title={name}
        visible={dialog}
        handleClose={() => setDialog(false)}
      >
        <HTML
          source={{ html: modalContent }}
          baseFontStyle={{
            lineHeight: 22,
            fontSize: 12,
            color: '#FFFFFF',
          }}
        />
      </Dialog>
      <S.CardHeader>
        <S.HeaderContainer>
          <S.Title>
            {name}
          </S.Title>
          <QuestionIcon onPress={() => setDialog(true)} />
        </S.HeaderContainer>
      </S.CardHeader>

      <S.CardContent style={{ height: cardHeight }}>
        <S.CardContentContainer style={{ opacity: cardOpacity }}>
          <S.DescriptionSection>
            <S.TextContent>
              {description}
            </S.TextContent>
          </S.DescriptionSection>
          <S.ServicesContainer>
            <FlatList
              scrollEnabled={false}
              data={services}
              keyExtractor={(item) => item.id}
              numColumns={3}
              renderItem={({ item }) => (
                item.logo
                  ? (
                    <S.ServiceContainer>
                      <S.Service uri={item.logo} uriDefault="https://primepass-imagens.s3.us-east-1.amazonaws.com/primepass-w-94x34.png" />
                    </S.ServiceContainer>
                  )
                  : (
                    <S.ServiceContainer>
                      <S.ServiceDefault
                        uri="https://primepass-imagens.s3.us-east-1.amazonaws.com/primepass-w-94x34.png"
                        uriDefault="https://primepass-imagens.s3.us-east-1.amazonaws.com/primepass-w-94x34.png"
                      />
                    </S.ServiceContainer>
                  )
              )}
            />
          </S.ServicesContainer>

        </S.CardContentContainer>
      </S.CardContent>
      <S.CardFooter onPress={toggleCard}>
        {open ? <ArrowUpIcon /> : <ArrowUpIcon style={{ transform: [{ rotate: '180deg' }] }} />}
      </S.CardFooter>
    </S.Card>

  );
};

export default PlanAdditional;
