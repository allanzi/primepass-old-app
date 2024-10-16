/* eslint-disable no-nested-ternary, @typescript-eslint/no-shadow, react/require-default-props */

import React, {
  useContext,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';
import { ThemeContext } from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useField } from '@unform/core';
import * as S from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
  enableButton?(): void;
  handleClear?():void;
  label?: string;
  isPassword?: boolean;
  rawValue?: string;
  upperCase?: boolean;
  errorCenter?: boolean;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  {
    name,
    enableButton = () => { },
    label,
    rawValue,
    isPassword,
    upperCase,
    errorCenter = false,
    onChangeText,
    handleClear,
    ...rest
  },
  ref,
) => {
  const theme = useContext(ThemeContext);
  const inputElementRef = useRef<any>(null);
  const {
    registerField,
    defaultValue = '',
    fieldName,
    error,
    clearError,
  } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    clearError();
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
      getValue(ref: any) {
        // eslint-disable-next-line react/destructuring-assignment
        return rawValue || ref.value;
      },
    });
  }, [fieldName, rawValue, registerField]);

  return (
    <>
      {label && (
        <S.LabelContainer>
          <S.Label>
            {label}
            :
          </S.Label>
        </S.LabelContainer>
      )}
      <S.Container isFocused={isFocused} error={error}>
        <S.TextInput
          ref={inputElementRef}
          placeholderTextColor={theme.colors.colorBorderInput}
          error={error}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={(value: string) => {
            // eslint-disable-next-line no-param-reassign
            value = upperCase ? value.toUpperCase() : value;
            inputValueRef.current.value = value;
            inputElementRef.current.setNativeProps({ text: value });
            enableButton();
          }}
          secureTextEntry={isPassword && !passwordVisibility}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />

        {isFocused && (
          <S.SetEmptyButton
            onPress={() => {
              if (isPassword) {
                setPasswordVisibility(!passwordVisibility);
                return;
              }
              if (handleClear) {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
                handleClear();
              }
            }}
          >
            {isPassword
               && (
                 <Icon
                   name={passwordVisibility ? 'eye-slash' : 'eye'}
                   size={20}
                   color={
                     isFocused
                       ? error
                         ? theme.colors.colorError
                         : theme.colors.colorBorderInput
                       : theme.colors.colorBorderInputNotFocused
                   }
                 />
               )}

            {handleClear && (
              <Icon
                name="times-circle"
                size={20}
                color={theme.colors.colorBorderInput}
              />
            )}

          </S.SetEmptyButton>
        )}
      </S.Container>
      {error && (
        <S.ErrorContainer errorCenter={errorCenter}>
          <S.ErrorText errorCenter={errorCenter}>{error}</S.ErrorText>
        </S.ErrorContainer>
      )}
    </>
  );
};

export default forwardRef(Input);

/*
UTIL INPUT PROPS

- autoCorrect={true || false}
- autoCapitalize="none"
- keyboardType (consultar documentação)
- secureTextEntry (Input para senhas)
- returnKeyType (Define o tipo do botão de ENTER no teclado - consultar documentação)
- onSubmitEditing (Executa função ao clicar no ENTER do teclado)
- textContentType="newPassword"

*/
