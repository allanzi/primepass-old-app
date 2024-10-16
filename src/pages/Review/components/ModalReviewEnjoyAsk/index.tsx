/* eslint-disable react/no-unused-prop-types */
import React, { useEffect } from 'react';

import { useAuth } from '../../../../hooks/auth';
import { useAction } from '../../../../hooks/actions';

import * as S from './styles';

interface ModalReviewEnjoyAskProps {
  step: string;
  setStep: (step: string) => void;
}

const ModalReviewEnjoyAsk: React.FC<ModalReviewEnjoyAskProps> = ({
  setStep,
}) => {
  const { user } = useAuth();
  const { logEvent } = useAction();

  const handleYes = () => {
    logEvent({
      type: 'log-login',
      flow: 'app',
      group: 'prss',
      context: 'review',
      section: 'like-yes',
      description: 'Yes I am',
      userId: user ? user.id : '0',
    });
    setStep('ModalReviewEnjoy');
  };

  const handleNo = () => {
    logEvent({
      type: 'log-login',
      flow: 'app',
      group: 'prss',
      context: 'review',
      section: 'like-no',
      description: "No, I'm not",
      userId: user ? user.id : '0',
    });
    setStep('ModalReviewComment');
  };

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'review',
      section: 'menu-like',
      description: 'Are you enjoying our app?',
      userId: user ? user.id : '0',
    });
  }, [user]);

  return (
    <S.InsideModalContainer>
      <S.ModalTitle>
        <S.ModalTitleText>Está curtindo nosso app?</S.ModalTitleText>
      </S.ModalTitle>
      <S.ModalButtons>
        <S.Separator>
          <S.LineSeparator />
        </S.Separator>
        <S.ButtonContainer>
          <S.Button onPress={handleYes}>
            <S.ButtonText>Sim</S.ButtonText>
          </S.Button>
        </S.ButtonContainer>
        <S.Separator>
          <S.LineSeparator />
        </S.Separator>
        <S.ButtonContainer>
          <S.Button onPress={handleNo}>
            <S.ButtonText>Não</S.ButtonText>
          </S.Button>
        </S.ButtonContainer>
      </S.ModalButtons>
    </S.InsideModalContainer>
  );
};

export default ModalReviewEnjoyAsk;
