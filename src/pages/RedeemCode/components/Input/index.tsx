/* eslint-disable max-len, @typescript-eslint/no-unused-vars, react/jsx-props-no-spreading, no-param-reassign, react/prop-types, @typescript-eslint/no-shadow */
import React, { useEffect, useRef } from 'react';

import { TextInputProps, useColorScheme } from 'react-native';

import { useField } from '@unform/core';

import * as S from './styles';

interface InputProps extends TextInputProps {
  name: string;
  children?: any;
}

function RedeemInput<InputProps>({ name, children, ...rest }) {
  const inputRef = useRef<any>(null);

  const {
    fieldName, registerField, defaultValue, error,
  } = useField(name);

  const deviceTheme = useColorScheme();

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        inputRef.current.value = value;
      },
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <S.Container isFocused>
      <S.TextInput
        ref={inputRef}
        keyboardAppearance={deviceTheme === 'dark' ? 'dark' : 'light'}
        defaultValue={defaultValue}
        onChangeText={(value) => {
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
        {...rest}
      />
      {children}
    </S.Container>
  );
}
export default RedeemInput;
