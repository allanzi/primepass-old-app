import React, { useState } from 'react';
import { Modal as ModalReactNative, StatusBar } from 'react-native';

import ModalReviewEnjoyAsk from './components/ModalReviewEnjoyAsk';
import ModalReviewComment from './components/ModalReviewComment';
import ModalReviewThanks from './components/ModalReviewThanks';
import ModalReviewEnjoy from './components/ModalReviewEnjoy';

import * as S from './styles';

interface ModalReviewEnjoyAskProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const Review: React.FC<ModalReviewEnjoyAskProps> = ({
  visible,
  setVisible,
}) => {
  const [step, setStep] = useState('ModalReviewEnjoyAsk' as string);

  return (
    <S.ModalWrapper>
      <ModalReactNative
        visible={visible}
        animationType="fade"
        transparent
      >
        <StatusBar backgroundColor="rgba(0,0,0, 0.8)" />
        <S.ContainerContent>
          {step === 'ModalReviewEnjoyAsk' && (
            <ModalReviewEnjoyAsk step={step} setStep={setStep} />
          )}
          {step === 'ModalReviewComment' && (
            <ModalReviewComment
              step={step}
              setStep={setStep}
              setVisible={setVisible}
            />
          )}
          {step === 'ModalReviewThanks' && (
            <ModalReviewThanks
              step={step}
              setStep={setStep}
              setVisible={setVisible}
            />
          )}
          {step === 'ModalReviewEnjoy' && (
            <ModalReviewEnjoy
              step={step}
              setStep={setStep}
              setVisible={setVisible}
            />
          )}
        </S.ContainerContent>
      </ModalReactNative>
    </S.ModalWrapper>
  );
};

export default Review;
