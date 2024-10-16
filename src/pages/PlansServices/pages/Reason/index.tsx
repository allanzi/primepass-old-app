import React, {
  useCallback, useRef, useState, useContext, useEffect,
} from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { ThemeContext } from 'styled-components';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

import api from '../../../../services/api';
import Dialog from '../../../../components/Dialog';
import Header from '../../../../components/Header';
import Input from '../../../../components/Input';
import * as S from './styles';
import { Params } from './types';
import { useAction } from '../../../../hooks/actions';
import { useAuth } from '../../../../hooks/auth';

const Reason: React.FC = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const route = useRoute();
  const formRef = useRef<FormHandles>(null);
  const { logEvent } = useAction();
  const { user } = useAuth();

  const [inputText, setInputText] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false as boolean);

  const params = route.params as Params;

  useFocusEffect(
    useCallback(() => {
      setInputText('');
    }, []),
  );

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'reason-unsubscribed',
      section: 'reason-unsubscribed',
      description: 'Reason unsubscribed',
      userId: user ? user.id : '0',
    });
  }, [user]);

  const reasons = [
    { value: 'Quero suspender minha conta temporariamente' },
    { value: 'Já assisti a tudo o que eu queria' },
    { value: 'Muito caro/não posso mais pagar' },
    { value: 'Não encontrei filmes e programas que procurava' },
    { value: 'Achei difícil navegar na Primepass' },
    { value: 'Problemas técnicos' },
    { value: 'Problemas na cobrança' },
    { value: 'Outros' },
  ];

  const handleSubmit = async () => {
    try {
      const cancelReason = reason === 'Outros' ? `${reason}: ${inputText}` : reason;
      logEvent({
        type: 'log-event',
        flow: 'app',
        group: 'prss',
        context: 'reason-unsubscribed',
        section: 'reason-unsubscribed',
        description: 'confirm unsubscribed',
        payloadData: {
          cancelReason,
        },
        userId: user ? user.id : '0',
      });

      setLoading(true);
      await api.post(`signatures/${params.parentId}/cancel`, {
        cancelReason,
      });

      setInputText('');
      navigation.navigate('SuccessfullyUnsubscribed');
    } catch (_) {
      setDialogVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribeNavigate = () => {
    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'reason-unsubscribed',
      section: 'reason-unsubscribed',
      description: 'back unsubscribe',
      userId: user ? user.id : '0',
    });
    navigation.navigate('Unsubscribe', {
      parentId: params.parentId,
    });
  };

  return (
    <S.Fragment>
      <Header
        title="Sim, quero cancelar a assinatura"
        translucent
        color="white"
        handleGoBack={handleUnsubscribeNavigate}
      />
      <Dialog
        title="Ops, algo deu errado"
        message="Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
        error
        visible={dialogVisible}
        handleClose={() => setDialogVisible(false)}
        footer={null}
      />
      <S.Container>
        <S.Title>Motivo do cancelamento</S.Title>
        <S.Subtitle>Antes de cancelar, poderia nos contar o porquê está saindo? </S.Subtitle>

        <S.ContentReasons>
          {reasons.map((item) => (
            <S.ContainerItem key={item.value}>
              <S.InputCheckBox
                value={reason === item.value}
                onValueChange={(value: boolean) => (value ? setReason(item.value) : setReason(''))}
                tintColors={{ true: theme.colors.primaryBlue }}
                onCheckColor={theme.colors.primaryBlue}
                onAnimationType="one-stroke"
                offAnimationType="one-stroke"
              />
              <S.Item>
                {item.value}
              </S.Item>
            </S.ContainerItem>
          ))}
        </S.ContentReasons>

        {reason === 'Outros'
        && (
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="reason"
              placeholder="Descreva o motivo do cancelamento"
              keyboardType="default"
              autoCapitalize="none"
              enableButton={() => false}
              value={inputText}
              onChangeText={(text) => {
                setInputText(text);
              }}
            />

          </Form>
        ) }

        <S.ButtonStyled
          disable={reason === ''}
          onPress={handleSubmit}
          isLoading={loading}
        >
          Confirmar cancelamento

        </S.ButtonStyled>

      </S.Container>
    </S.Fragment>
  );
};

export default Reason;
