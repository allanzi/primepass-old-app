/* eslint-disable max-len, react/jsx-props-no-spreading, react/default-props-match-prop-types, react/require-default-props */
import React, { useContext } from 'react';
import { TouchableOpacityProps, ActivityIndicator, Platform } from 'react-native';
import { ThemeContext } from 'styled-components';
import * as S from './styles';

interface ButtonProps extends TouchableOpacityProps {
  children?: string | any;
  disable: boolean;
  outline?: boolean;
  isLoading?: boolean;
  onPress?: () => {} | void;
}

const defaultProps: ButtonProps = {
  disable: true,
  outline: false,
};

const Button: React.FC<ButtonProps> = ({
  children,
  disable,
  outline,
  isLoading,
  onPress,
  ...rest
}) => {
  const theme = useContext(ThemeContext);

  return (
    <S.Container
      {...rest}
      disable={disable}
      outline={outline}
      delayPressIn={0}
      onPress={() => {
        if (!disable) {
          if (onPress) {
            onPress();
          }
        }
      }}
    >
      <S.ButtonText disable={disable}>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={theme.colors.colorTextButton}
            style={{ paddingTop: Platform.OS === 'ios' ? 5 : 0 }}
          />
        ) : (
          children
        )}
      </S.ButtonText>
    </S.Container>
  );
};

Button.defaultProps = defaultProps;

export default Button;
