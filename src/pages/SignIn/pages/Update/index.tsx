import React, {
  useRef, useCallback, useState, useEffect,
} from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../../../hooks/auth';
import InputMask from '../../../../components/InputMask';
import Button from '../../../../components/Button';
import { useAction } from '../../../../hooks/actions';
import * as S from './styles';

interface FormData {
  phone: string;
}

interface Details {
  phone: string;
}
interface ErrorFormat {
  code: string;
  details: Details;
  message: string;
}

interface ResponseError {
  error: ErrorFormat;
}

interface ServerError {
  response: {
    data: ResponseError;
    status: number;
  };
}
interface RouteParams {
  next?: string;
  flow?: string;
}

const Update: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const { verify } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as RouteParams;
  const next = params ? params?.next : 'Home';
  const flow = params ? params?.flow : 'update';

  const { logEvent } = useAction();

  const enableButton = () => {
    setButtonVisible(!buttonVisible);
  };

  const verifyPhone = useCallback(async (phone: string) => {
    try {
      const formattedNumber = `+${phone}`;
      const response = await verify('primepass', {
        type: 'sms',
        phone: formattedNumber,
      });
      navigation.navigate('ValidationCode', {
        ...response,
        update: true,
        flow,
        next,
        authConfig: {
          phone: formattedNumber,
          type: 'sms',
        },
      });
      return true;
    } catch (error) {
      if (error && error.response) {
        const apiError = error as ServerError;
        const {
          response: {
            data: {
              error: { details },
            },
          },
        } = apiError;
        formRef.current?.setErrors({
          phone: details.phone,
        });
      }
      return false;
    }
  }, []);

  const handleSubmit = useCallback(async ({ phone }: FormData) => {
    try {
      formRef.current?.setErrors({
        phone: null,
      });
      setLoading(true);
      await verifyPhone(phone);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'update',
      group: 'scrn',
      context: 'update',
      section: 'page',
      description: 'Update entry Phone Number',
      userId: '0',
    });
  }, []);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <S.TitleContainer>
          <S.Title>
            Vamos lá, para atualizar seu cadastro, poderia nos informar seu
            número de celular?
          </S.Title>
        </S.TitleContainer>
        <S.FormContainer>
          <InputMask
            name="phone"
            type="cel-phone"
            icon="times-circle"
            placeholder="Número do celular"
            enableButton={enableButton}
          />
        </S.FormContainer>
      </Form>

      <S.Footer>
        <Button
          disable={buttonVisible}
          onPress={() => formRef.current?.submitForm()}
          isLoading={loading}
        >
          Continuar
        </Button>
      </S.Footer>
    </S.Container>
  );
};

export default Update;
