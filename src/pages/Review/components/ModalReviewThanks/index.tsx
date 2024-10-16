/* eslint-disable react/no-unused-prop-types */
import React, { useEffect } from 'react';
import FastImage from 'react-native-fast-image';

import closeIcon from '../../../../assets/img/close.png';
import { useAuth } from '../../../../hooks/auth';
import { useAction } from '../../../../hooks/actions';

import * as S from './styles';

interface ModalReviewThanksProps {
  step: string;
  setStep: (step: string) => void;
  setVisible: (visible: boolean) => void;
}

const ModalReviewThanks: React.FC<ModalReviewThanksProps> = ({
  setStep,
  setVisible,
}) => {
  const { user } = useAuth();
  const { logEvent } = useAction();
  const thanksIllustration = 'https://primepass-imagens.s3.amazonaws.com/ilustracoes-primepass-final-v2_sorry.png';
  const handleClose = () => {
    setStep('ModalReviewEnjoyAsk');
    setVisible(false);
  };

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'review',
      section: 'menu-thanks',
      description: 'We appreciate your help',
      userId: user ? user.id : '0',
    });
  }, [user]);

  return (
    <S.InsideModalContainer>
      <S.ModalCloseButtonContainer>
        <S.ModalCloseButton onPress={handleClose}>
          <S.ModalCloseIcon source={closeIcon} />
        </S.ModalCloseButton>
      </S.ModalCloseButtonContainer>
      <S.ModalBody>
        <S.ModalBodyTop>
          <S.ModalTitle>
            <S.ModalTitleText>Agradecemos sua ajuda</S.ModalTitleText>
          </S.ModalTitle>
          <S.ModalBodyImage
            source={{ uri: thanksIllustration }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <S.ModalBodyBottom>
            <S.ModalTitle>
              <S.ModalTitleText>Obrigado pelo seu comentário</S.ModalTitleText>
            </S.ModalTitle>
            <S.ModalBodyText>
              Nosso time de atendimento poderá entrar
              {'\n'}
              em contato para proporcionar uma melhor
              {'\n'}
              experiência em nosso aplicativo e serviços.
            </S.ModalBodyText>
          </S.ModalBodyBottom>
        </S.ModalBodyTop>
        <S.ModalButtons>
          <S.Separator>
            <S.LineSeparator />
          </S.Separator>
          <S.ButtonContainer>
            <S.Button onPress={handleClose}>
              <S.ButtonText>Fechar</S.ButtonText>
            </S.Button>
          </S.ButtonContainer>
        </S.ModalButtons>
      </S.ModalBody>
    </S.InsideModalContainer>
  );
};

export default ModalReviewThanks;
