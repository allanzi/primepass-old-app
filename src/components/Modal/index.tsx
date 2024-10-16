/* eslint-disable react/jsx-no-bind, react/require-default-props */
import React, {
  useState, useEffect, useContext, useCallback,
} from 'react';
import {
  Modal as ModalReactNative, StatusBar, View,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';
import HTML from 'react-native-render-html';
import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';

import * as S from './styles';

interface ModalProps {
  title?: string;
  onChange?(param: boolean): void;
  visible: boolean;
  screenName?: string;
  message?: string;
  transactionId?: string;
  isHtml?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  onChange,
  visible,
  screenName,
  message,
  transactionId,
  isHtml = false,
}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const { user, signOut } = useAuth();
  const navigation = useNavigation();
  const { logEvent } = useAction();

  async function handleCancelTicket(reason: string): Promise<void> {
    if (screenName === 'CheckIn') {
      logEvent({
        type: 'log-event',
        flow: 'app',
        group: 'prss',
        context: 'cancel-ticket',
        section: 'cancel',
        description: 'Cancel ticket',
        userId: user ? user.id : '0',
        payloadData: {
          reason,
        },
      });
    }
    navigation.dispatch(CommonActions.navigate('Theaters'));
    navigation.navigate('Home');
    try {
      api.post(`/transaction/${transactionId}/cancel`, {
        reason_cancellation: 'Covid19',
      });
      setModalVisible(!modalVisible);
    } catch (err) {
      setModalVisible(!modalVisible);
    }
  }

  async function handleSignOut(): Promise<void> {
    navigation.dispatch(CommonActions.navigate('Welcome'));
    navigation.navigate('Login', {
      screen: 'Welcome',
    });
    setModalVisible(!modalVisible);
    await signOut();
  }

  function handleCancel() {
    if (screenName === 'CheckIn') {
      logEvent({
        type: 'log-event',
        flow: 'app',
        group: 'prss',
        context: 'cancel-ticket',
        section: 'changed-my-mind',
        description: 'Cancel ticket, changed my mind',
        userId: user ? user.id : '0',
      });
    }
    setModalVisible(!modalVisible);
  }

  useEffect(() => {
    if (onChange) {
      onChange(false);
    }
  }, [modalVisible]);

  const theme = useContext(ThemeContext);

  if (screenName === 'CheckIn') {
    const [value, setValue] = useState(1);

    const handleSelected = useCallback((item) => {
      setValue(item.key);
    }, []);

    useEffect(() => {
      setValue(1);
    }, []);

    const options = [
      {
        key: 0,
        text: 'Covid 19',
      },
      {
        key: 1,
        text: 'Outros',
      },
    ];
    return (
      <S.ModalWrapper>
        <ModalReactNative
          visible={visible}
          animationType="fade"
          transparent
        >
          <StatusBar backgroundColor="rgba(0,0,0, 0.8)" />
          <S.ContainerContent>
            <S.InsideModalContainer>
              {title && (
                <S.ModalTitle style={{ width: '75%' }}>
                  <S.ModalTitleText>{title}</S.ModalTitleText>
                </S.ModalTitle>
              )}
              <S.Separator>
                <S.LineSeparator />
              </S.Separator>

              <S.OptionList>
                {options.map((item) => (
                  <S.ButtonContainer key={item.key}>
                    <S.Circle onPress={() => handleSelected(item)}>
                      {value === item.key ? (
                        <S.CheckedCircle
                          style={{
                            backgroundColor: theme.colors.borderConfigColor,
                          }}
                        />
                      ) : (
                        <S.CheckedCircle
                          style={{ backgroundColor: theme.colors.white }}
                        />
                      )}
                    </S.Circle>
                    <S.OptionText>
                      {' '}
                      {item.text}
                    </S.OptionText>
                  </S.ButtonContainer>
                ))}
              </S.OptionList>
              <S.Separator>
                <S.LineSeparator />
              </S.Separator>
              <View>
                <S.AcceptContainer>
                  <S.AcceptButton
                    onPress={() => handleCancelTicket(options[value].text)}
                  >
                    <S.AcceptText>Cancelar ingresso</S.AcceptText>
                  </S.AcceptButton>
                </S.AcceptContainer>
              </View>
              <S.Separator>
                <S.LineSeparator />
              </S.Separator>
              <View>
                <S.CancelContainer>
                  <S.CancelButton onPress={handleCancel}>
                    <S.CancelText>Mudei de ideia</S.CancelText>
                  </S.CancelButton>
                </S.CancelContainer>
              </View>
            </S.InsideModalContainer>
          </S.ContainerContent>
        </ModalReactNative>
      </S.ModalWrapper>
    );
  }

  if (screenName === 'Content') {
    return (
      <S.ModalWrapper>
        <ModalReactNative
          visible={visible}
          animationType="fade"
          transparent
        >
          <StatusBar backgroundColor="rgba(0,0,0, 0.8)" />
          <S.ContainerContent>
            <S.InsideModalContainer>
              {title && (
                <S.ModalTitle>
                  <S.ModalTitleText>{title}</S.ModalTitleText>
                </S.ModalTitle>
              )}
              <S.Separator>
                <S.LineSeparator />
              </S.Separator>
              <S.Separator>
                <S.LineSeparator />
              </S.Separator>
              <S.Container>
                <S.CancelButton onPress={handleCancel}>
                  <S.CancelText>Cancelar</S.CancelText>
                </S.CancelButton>
              </S.Container>
            </S.InsideModalContainer>
          </S.ContainerContent>
        </ModalReactNative>
      </S.ModalWrapper>
    );
  }

  if (screenName === 'CodeRedemption') {
    return (
      <S.ModalWrapper>
        <ModalReactNative
          visible={visible}
          animationType="fade"
          transparent
        >
          <StatusBar backgroundColor="rgba(0,0,0, 0.8)" />
          <S.ContainerContent>
            <S.InsideModalContainer>
              {title && (
                <S.ModalTitle>
                  <S.ModalTitleText>{title}</S.ModalTitleText>
                </S.ModalTitle>
              )}
              <S.Separator>
                <S.LineSeparator />
              </S.Separator>
              {isHtml ? (
                <S.Message>
                  {message && (
                    <HTML
                      source={{ html: message }}
                      baseFontStyle={{
                        lineHeight: 22,
                        fontSize: 12,
                        color: theme.colors.white,
                      }}
                    />
                  )}
                </S.Message>
              ) : (
                <S.Message>
                  {message && <S.MessageText>{message}</S.MessageText>}
                </S.Message>
              )}
              <S.Separator>
                <S.LineSeparator />
              </S.Separator>
              <S.Container>
                <S.CancelButton onPress={handleCancel}>
                  <S.CancelText>Fechar</S.CancelText>
                </S.CancelButton>
              </S.Container>
            </S.InsideModalContainer>
          </S.ContainerContent>
        </ModalReactNative>
      </S.ModalWrapper>
    );
  }

  return (
    <S.ModalWrapper>
      <ModalReactNative
        visible={visible}
        animationType="fade"
        transparent
      >
        <StatusBar backgroundColor="rgba(0,0,0, 0.8)" />
        <S.ContainerContent>
          <S.InsideModalContainer>
            {title && (
              <S.ModalTitle>
                <S.ModalTitleText>{title}</S.ModalTitleText>
              </S.ModalTitle>
            )}
            <S.Separator>
              <S.LineSeparator />
            </S.Separator>
            <View>
              <S.AcceptContainer>
                <S.AcceptButton onPress={handleSignOut}>
                  <S.AcceptText>Sair da conta</S.AcceptText>
                </S.AcceptButton>
              </S.AcceptContainer>
            </View>
            <S.Separator>
              <S.LineSeparator />
            </S.Separator>
            <S.Container>
              <S.CancelButton onPress={handleCancel}>
                <S.CancelText>Cancelar</S.CancelText>
              </S.CancelButton>
            </S.Container>
          </S.InsideModalContainer>
        </S.ContainerContent>
      </ModalReactNative>
    </S.ModalWrapper>
  );
};

export default Modal;
