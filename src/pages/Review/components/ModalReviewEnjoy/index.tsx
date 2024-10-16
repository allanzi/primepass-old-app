/* eslint-disable react/no-unused-prop-types */
import React, { useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import * as StoreReview from 'react-native-store-review';
import { Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { getVersion, getBuildNumber } from 'react-native-device-info';

import closeIcon from '../../../../assets/img/close.png';
import { useAuth } from '../../../../hooks/auth';
import { useAction } from '../../../../hooks/actions';

import * as S from './styles';

interface ModalReviewEnjoyProps {
  step: string;
  setStep: (step: string) => void;
  setVisible: (visible: boolean) => void;
}

const ModalReviewEnjoy: React.FC<ModalReviewEnjoyProps> = ({
  setStep,
  setVisible,
}) => {
  const { user } = useAuth();
  const { logEvent } = useAction();

  const reviewImage = 'https://primepass-imagens.s3.amazonaws.com/ilustracoes-primepass-final_5-stars.png';
  const APP_STORE_LINK = 'itms-apps://apps.apple.com/app/id932251566?action=write-review';
  const PLAY_STORE_LINK = 'market://details?id=com.cinema.primepass';
  const STORE_LINK = Platform.select({
    ios: APP_STORE_LINK,
    android: PLAY_STORE_LINK,
  });

  const handleClose = () => {
    setStep('ModalReviewEnjoyAsk');
    setVisible(false);
  };

  const handleWant = async () => {
    if (StoreReview.isAvailable && Platform.OS === 'ios') {
      StoreReview.requestReview();
    } else {
      Linking.openURL(STORE_LINK);
    }

    AsyncStorage.setItem(
      'review-version',
      `${getVersion()}-${getBuildNumber()}`,
    );

    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'review',
      section: 'evaluate-now',
      description: 'I want to evaluate now.',
      userId: user ? user.id : '0',
    });

    setStep('ModalReviewEnjoyAsk');
    setVisible(false);
  };

  const handleLater = () => {
    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'review',
      section: 'remind-later',
      description: 'Remind me later.',
      userId: user ? user.id : '0',
    });
    setStep('ModalReviewEnjoyAsk');
    setVisible(false);
  };

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'review',
      section: 'evaluate',
      description: "Glad you're enjoying!",
      userId: user ? user.id : '0',
    });
  }, [user]);

  return (
    <S.InsideModalContainer>
      <S.ModalCloseButtonContainer>
        <S.ModalCloseButton onPress={handleClose}>
          <S.ModalCloseIcon
            resizeMode={FastImage.resizeMode.contain}
            source={closeIcon}
          />
        </S.ModalCloseButton>
      </S.ModalCloseButtonContainer>
      <S.ModalBody>
        <S.ModalBodyTop>
          <S.ModalTitle>
            <S.ModalTitleText>Que bom que esta curtindo!</S.ModalTitleText>
          </S.ModalTitle>
          <S.ModalBodyImage
            resizeMode={FastImage.resizeMode.contain}
            source={{ uri: reviewImage }}
          />
          <S.ModalBodyText>
            Gostaríamos de saber o que você está
            {' '}
            {'\n'}
            achando do nosso aplicativo.
          </S.ModalBodyText>
          <S.ModalBodyText>
            Sua avaliação faz toda e diferença!
            {' '}
            {'\n'}
            É rapidinho, poderia nos
            ajudar ?
          </S.ModalBodyText>
        </S.ModalBodyTop>
        <S.ModalButtons>
          <S.ModalButton disable={false} onPress={handleWant}>
            <S.ModalButtonText>Quero avaliar agora</S.ModalButtonText>
          </S.ModalButton>
          <S.ModalButton
            disable={false}
            outline
            onPress={handleLater}
            style={{
              backgroundColor: '#515151',
            }}
          >
            <S.ModalButtonText>Me lembre depois</S.ModalButtonText>
          </S.ModalButton>
        </S.ModalButtons>
      </S.ModalBody>
    </S.InsideModalContainer>
  );
};

export default ModalReviewEnjoy;
