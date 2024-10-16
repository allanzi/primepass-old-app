/* eslint-disable react/jsx-props-no-spreading, react/require-default-props */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { TextInputProps } from 'react-native';
import { ThemeContext } from 'styled-components';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import { Container, ErrorMessage, InputContainer } from './styles';

type Align = 'flex-start' | 'center' | 'flex-end';
interface PinCodeProps extends TextInputProps {
  codeLength: number;
  value?: string;
  hasError: boolean;
  error?: string;
  align?: Align;
  onTextChange(code: string): void;
}

const PinCode: React.FC<PinCodeProps> = ({
  hasError, error, align, ...rest
}) => {
  const inputRef = useRef(null);
  const theme = useContext(ThemeContext);
  const [errorMessage, setErrorMessage] = useState('Por favor, revise o código / número inserido.');

  useEffect(() => {
    setErrorMessage(error?.toString());
  }, [error]);

  return (
    <Container>
      <InputContainer>
        <SmoothPinCodeInput
          {...rest}
          ref={inputRef}
          cellStyle={{
            borderWidth: 2,
            borderRadius: 25,
            borderColor: hasError
              ? `${theme.colors.colorError}`
              : `${theme.colors.colorBorderInputNotFocused}`,
            margin: 10,
          }}
          cellStyleFocused={{
            borderColor: `${theme.colors.colorBorderInput}`,
          }}
          textStyle={{
            fontSize: 24,
            color: `${theme.colors.colorText}`,
          }}
          textStyleFocused={{
            color: `${theme.colors.colorText}`,
          }}
          keyboardType="numeric"
          animationFocused={null}
        />
        {hasError && (
          <ErrorMessage align={align}>
            {errorMessage}
          </ErrorMessage>
        )}
      </InputContainer>
    </Container>
  );
};

export default PinCode;
