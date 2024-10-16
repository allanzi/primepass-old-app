/* eslint-disable no-restricted-syntax, no-await-in-loop, @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useRef } from 'react';
import FastImage from 'react-native-fast-image';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as ValidCard from 'card-validator';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import Dialog from '../../../../components/Dialog';
import ModalSecurityCode from '../../components/ModalSecurityCode';
import Header from '../../../../components/Header';
import Input from '../../../../components/Input';
import InputMask from '../../../../components/InputMask';
import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';
import getValidationErrors from '../../../../utils/getValidationErrors';
import VisaIcon from '../../../../assets/img/visa.svg';
import MasterIcon from '../../../../assets/img/mastercard.svg';
import AmexIcon from '../../../../assets/img/americanexpress.svg';
import DinnerIcon from '../../../../assets/img/dinnersclub.svg';
import questionIcon from '../../../../assets/img/question.png';
import padlockIcon from '../../../../assets/img/padlock.png';
import * as S from './styles';

interface FormDataProps {
  cardNumber: string;
  cardName: string;
  cardValidate: string;
  cardCVV: string;
}

const CreditCardCreate: React.FC = () => {
  const { user } = useAuth();
  const [modalSecurityVisible, setModalSecurityVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  Yup.addMethod(Yup.string, 'isValidCreditCard', (msg: string) => Yup.string().test({
    name: 'isValidCreditCard',
    message: msg,
    test(value) {
      if (value.length === 0) {
        return false;
      }

      const validCardNumber = ValidCard.number(value);
      if (!validCardNumber.isValid || !validCardNumber.isPotentiallyValid) {
        return false;
      }
      return true;
    },
  }));

  Yup.addMethod(Yup.string, 'isValidExpirationDate', (msg: string) => Yup.string().test({
    name: 'isValidExpirationDate',
    message: msg,
    test(value) {
      if (value.length === 0) {
        return false;
      }
      const validCardValidate = ValidCard.expirationDate(value);
      if (
        !validCardValidate.isValid
          || !validCardValidate.isPotentiallyValid
      ) {
        return false;
      }
      return true;
    },
  }));

  const yupShapes = {
    cardNumber: Yup.object().shape({
      cardNumber: Yup.string()
        .isValidCreditCard('Cartão crédito Inválido')
        .min(14, 'Cartão crédito incompleto.')
        .required('Número do cartáo é obrigatório.'),
    }),
    cardName: Yup.object().shape({
      cardName: Yup.string()
        .required('Nome do titular é obrigatório.')
        .min(5, 'Nome invállido.'),
    }),
    cardValidate: Yup.object().shape({
      cardValidate: Yup.string()
        .isValidExpirationDate('Validade incorreta.')
        .min(5, 'Validade incompleta.')
        .required('Validade é obrigatório.'),
    }),
    cardCVV: Yup.object().shape({
      cardCVV: Yup.string()
        .min(3, '3 a 4 dígitos.')
        .max(4, '4 no máximo.')
        .required('CVV é obrigatório.'),
    }),
  };

  const validateFormField = useCallback(async (field: string, values: {}) => {
    let isValid = true;
    await yupShapes[field]
      .validate(values, {
        abortEarly: false,
      })
      .catch((e: any) => {
        formRef.current?.setFieldError(field, getValidationErrors(e)[field]);
        isValid = false;
      });
    return isValid;
  }, []);

  const validateForm = useCallback(async (fields: FormDataProps) => {
    let isValid = true;
    formRef.current?.setErrors({});
    for (const key of Object.keys(yupShapes)) {
      const result = await validateFormField(key, fields);
      if (!result) {
        isValid = false;
      }
    }
    return isValid;
  }, []);

  const onToggleModalSecurity = useCallback(
    (param: boolean) => {
      setModalSecurityVisible(param);
    },
    [setModalSecurityVisible],
  );

  const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const replaceAll = (str: string, find: string, replace: string) => str.replace(new RegExp(escapeRegExp(find), 'g'), replace);

  const handleSubmit = useCallback(
    async (fields: FormDataProps) => {
      try {
        setLoading(true);
        const isValid = await validateForm(fields);

        const postData = {
          userId: user?.id,
          number: replaceAll(fields.cardNumber, ' ', ''),
          holder: fields.cardName,
          expiration: fields.cardValidate,
          cvv: fields.cardCVV,
          isDefault: true,
        };
        if (isValid) {
          await api.post('/credit-cards', postData);
          navigation.navigate('CreditCards', {
            screen: 'List',
            params: {
              screenName: 'List',
            },
          });
        }
      } catch (error: any) {
        const { status } = error.response;
        if (status === 500) {
          setErrorMessage(
            'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
          );
          setModalErrorVisible(true);
          return;
        }
        const { message, details } = error.response.data.error;
        if (details) {
          if (details.number) {
            formRef.current?.setFieldError('cardNumber', details.number);
          }
          if (details.holder) {
            formRef.current?.setFieldError('cardName', details.holder);
          }
          if (details.expiration) {
            formRef.current?.setFieldError('cardValidate', details.expiration);
          }
          if (details.cvv) {
            formRef.current?.setFieldError('cardCVV', details.cvv);
          }
        }
        if (message.length > 0 && !details) {
          setErrorMessage(message);
          setModalErrorVisible(true);
        }
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  return (
    <S.Fragment>
      <ModalSecurityCode
        visible={modalSecurityVisible}
        setVisible={onToggleModalSecurity}
      />

      <Dialog
        title="Ops, algo deu errado"
        message={errorMessage}
        visible={modalErrorVisible}
        error
        handleClose={() => setModalErrorVisible(false)}
      />

      <S.Container>
        <Header title="Adicionar cartão de crédito" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <S.CardContainer>
            <>
              <S.Title>Cartão de Crédito</S.Title>

              <S.CardImageContainer>
                <MasterIcon width={42} marginRight={8} />
                <AmexIcon width={42} marginRight={8} />
                <DinnerIcon width={42} marginRight={8} />
                <VisaIcon width={42} />
              </S.CardImageContainer>

              <S.FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <S.GroupContainer>
                    <S.CardNumberContainer>
                      <InputMask
                        keyboardType="number-pad"
                        name="cardNumber"
                        placeholder="Número do cartão"
                        mask="[0000] [0000] [0000] [0000]"
                        onChangeText={(formatted: string) => {
                          formRef.current?.setFieldValue('cardNumber', formatted);
                        }}
                        returnKeyType="done"
                      />
                    </S.CardNumberContainer>
                    <S.IconButton>
                      <S.Icon
                        resizeMode={FastImage.resizeMode.contain}
                        source={padlockIcon}
                      />
                    </S.IconButton>
                  </S.GroupContainer>
                  <S.GroupContainer>
                    <S.ValidateContainer>
                      <InputMask
                        type="custom"
                        keyboardType="number-pad"
                        mask="[00]/[00]"
                        name="cardValidate"
                        placeholder="Validade"
                        onChangeText={(text: string) => {
                          formRef.current?.setFieldValue('cardValidate', text);
                        }}
                        returnKeyType="done"
                      />
                    </S.ValidateContainer>
                    <S.CVVContainer>
                      <InputMask
                        type="custom"
                        keyboardType="number-pad"
                        mask="[0000]"
                        name="cardCVV"
                        placeholder="CVV"
                        onChangeText={(text: string) => {
                          formRef.current?.setFieldValue('cardCVV', text);
                        }}
                        returnKeyType="done"
                      />
                    </S.CVVContainer>
                    <S.IconButton
                      onPress={() => onToggleModalSecurity(!modalSecurityVisible)}
                    >
                      <S.Icon
                        resizeMode={FastImage.resizeMode.contain}
                        source={questionIcon}
                      />
                    </S.IconButton>
                  </S.GroupContainer>

                  <Input
                    autoCapitalize="none"
                    name="cardName"
                    keyboardType="default"
                    placeholder="Nome do titular"
                    onChangeText={(text) => {
                      formRef.current?.setFieldValue('cardName', text);
                    }}
                    returnKeyType="send"
                    onSubmitEditing={() => formRef.current?.submitForm()}
                  />
                </Form>
              </S.FormContainer>

              <S.SaveButton
                isLoading={isLoading}
                disable={false}
                onPress={() => formRef.current?.submitForm()}
              >
                <S.SaveButtonText>Salvar</S.SaveButtonText>
              </S.SaveButton>
            </>
          </S.CardContainer>
        </TouchableWithoutFeedback>
      </S.Container>
    </S.Fragment>
  );
};

export default CreditCardCreate;
