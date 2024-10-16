/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/ban-types */
import React from 'react';
import { Modal as ModalReactNative } from 'react-native';

import CloseIcon from '../../assets/img/close.svg';
import Info from '../../assets/img/info.svg';
import * as S from './styles';

export interface CovidModalProps {
  visible: boolean;
  handleClose(): void;
}

const CovidModal: React.FC<CovidModalProps> = ({
  visible,
  handleClose,
}) => (
  <S.ModalWrapper>
    <ModalReactNative visible={visible} animationType="slide" transparent>
      <S.ContainerContent>
        <S.InsideModalContainer>
          <S.Left>
            <Info width={20} heigth={20} />
          </S.Left>

          <S.ContainerInfo>
            <S.Title>O seu bem-estar é prioridade</S.Title>
            <S.Text>
              Por causa do COVID-19, é necessário verificar as iniciativas
              de segurança e bem-estar de cada complexo de cinema.
            </S.Text>

          </S.ContainerInfo>

          <S.Right onPress={() => handleClose()}>
            <CloseIcon width={20} heigth={20} />
          </S.Right>

        </S.InsideModalContainer>
      </S.ContainerContent>
    </ModalReactNative>
  </S.ModalWrapper>
);

export default CovidModal;
