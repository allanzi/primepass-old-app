/* eslint-disable no-nested-ternary, @typescript-eslint/no-shadow, react/require-default-props */

import React, {
  useContext,
  useEffect,
  useRef,
  forwardRef,
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

const InputMask: React.ForwardRefRenderFunction<InputRef, InputProps> = ({
  name,
  icon = 'times-circle',
  enableButton = () => { },
  label,
  rawValue,
  isPassword,
  upperCase,
  errorCenter = false,
  onChangeText,
  ...rest
}) => {
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
  const [iconVisible, setIconVisible] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    clearError();
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIconVisible(false);
  }, []);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
      },
      clearValue() {
        inputValueRef.current.value = '';
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
            setIconVisible(true);
            // eslint-disable-next-line no-param-reassign
            value = upperCase ? value.toUpperCase() : value;
            inputValueRef.current.value = value;
            enableButton();
          }}
          secureTextEntry={isPassword && !passwordVisibility}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />

        {iconVisible && (
          <S.SetEmptyButton
            onPress={() => {
              if (!isPassword) {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();

                if (onChangeText) {
                  onChangeText('');
                }

                setIconVisible(false);
              } else {
                setPasswordVisibility(!passwordVisibility);
              }
            }}
          >
            {!isPassword ? (
              <Icon
                name={icon}
                size={20}
                color={
                  isFocused
                    ? error
                      ? theme.colors.colorError
                      : theme.colors.colorBorderInput
                    : theme.colors.colorBorderInputNotFocused
                }
              />
            ) : (
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

export default forwardRef(InputMask);
