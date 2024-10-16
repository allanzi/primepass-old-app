/* eslint-disable react/jsx-props-no-spreading, react/require-default-props */
import React from 'react';
import { Modal as ModalReactNative, StatusBar } from 'react-native';

import Check from '../../assets/img/noti-check.svg';
import Error from '../../assets/img/noti-error.svg';
import * as S from './styles';

export interface Footer {
  text: string;
  action: () => any;
  props?: any;
}

export interface ModalMessageProps {
  title: string;
  subtitle?: string | null;
  message?: string | null;
  visible: boolean;
  error?: boolean | false;
  children?: any;
  handleClose(): void;
  footer?: Footer[] | null;
  iconSuccess?: boolean | false;
  iconError ?: boolean | false;
}

const ModalMessage: React.FC<ModalMessageProps> = ({
  title,
  subtitle,
  message,
  visible,
  error = false,
  children,
  handleClose,
  footer,
  iconSuccess,
  iconError,
}) => (
  <S.ModalWrapper>
    <ModalReactNative visible={visible} animationType="fade" transparent>
      <StatusBar backgroundColor="rgba(0,0,0, 0.8)" />
      <S.ContainerContent>
        <S.InsideModalContainer>
          <S.ModalTitle>
            {iconSuccess && <Check margin={16} />}
            {iconError && <Error margin={16} />}
            <S.ModalTitleText error={error}>{title}</S.ModalTitleText>
            {subtitle && (
              <S.ModalSubtitleText>{subtitle}</S.ModalSubtitleText>
            )}
          </S.ModalTitle>
          {message !== null && (
            <S.Message>
              <S.MessageText>{message}</S.MessageText>
              {children}
            </S.Message>
          )}
          {footer ? (
            footer.map((elem: Footer) => (
              <S.OkContainer
                key={elem.text}
                onPress={elem.action}
                style={{
                  borderTopColor: '#6B6B6B',
                  borderTopWidth: 1,
                  paddingTop: 12,
                }}
              >
                <S.OkButton>
                  <S.OkText {...elem.props}>{elem.text}</S.OkText>
                </S.OkButton>
              </S.OkContainer>
            ))
          ) : (
            <S.OkContainer onPress={() => handleClose()}>
              <S.OkButton>
                <S.OkText>Ok</S.OkText>
              </S.OkButton>
            </S.OkContainer>
          )}
        </S.InsideModalContainer>
      </S.ContainerContent>
    </ModalReactNative>
  </S.ModalWrapper>
);

export default ModalMessage;
