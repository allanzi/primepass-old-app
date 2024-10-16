import React from 'react';
import { Modal as ModalReactNative, StatusBar } from 'react-native';
import FastImage from 'react-native-fast-image';

import securityCodeIcon from '../../../../assets/img/icon-card-sample.png';
import * as S from './styles';

interface ModalSecurityCodeProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const ModalSecurityCode: React.FC<ModalSecurityCodeProps> = ({
  visible,
  setVisible,
}) => (
  <S.ModalWrapper>
    <ModalReactNative
      visible={visible}
      animationType="fade"
      transparent
    >
      <StatusBar backgroundColor="rgba(0,0,0, 0.8)" />
      <S.ContainerContent>
        <S.InsideModalContainer>
          <S.ModalTitle>
            <S.ModalTitleText>Código de segurança</S.ModalTitleText>
          </S.ModalTitle>
          <S.ModalBody>
            <S.SecurityCodeImage
              resizeMode={FastImage.resizeMode.contain}
              source={securityCodeIcon}
            />
            <S.ModalBodyText>
              Digite o código de segurança (CVV) de 3 ou 4 dígitos que está escrito
              no verso do cartão.
            </S.ModalBodyText>
          </S.ModalBody>
          <S.ModalButtons>
            <S.Separator>
              <S.LineSeparator />
            </S.Separator>
            <S.ButtonContainer>
              <S.Button onPress={() => setVisible(false)}>
                <S.ButtonText>Ok</S.ButtonText>
              </S.Button>
            </S.ButtonContainer>
          </S.ModalButtons>
        </S.InsideModalContainer>
      </S.ContainerContent>
    </ModalReactNative>
  </S.ModalWrapper>
);

export default ModalSecurityCode;
