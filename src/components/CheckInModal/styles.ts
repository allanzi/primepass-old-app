import styled from 'styled-components/native';
import { Animated, Platform } from 'react-native';
import { css } from 'styled-components';

import ButtonRN from '../Button';

interface Props {
  expanded ?: boolean;
}
interface ButtonProps {
  outline?: boolean;
}

export const Fragment = styled.View`
  background: ${({ theme }) => theme.colors.backgroundModalDetails};
  position: absolute;
  bottom: -22px;
  left: 0;
  right: 0;
  height: ${Platform.OS === 'ios' ? '56px' : '0'};
`;

export const Container = styled.View`
  flex: 1;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  shadow-color: rgba(0,0,0,.8);
  shadow-opacity: 0.5;
  elevation: 1;
  background: ${({ theme }) => theme.colors.backgroundModalDetails};
`;

export const SafeAreaView = styled.SafeAreaView`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

export const Header = styled.TouchableOpacity`
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
`;

export const Group = styled.View<Props>`
  align-items: center;
  ${({ expanded }) => (
    css`
      flex-direction: ${expanded ? 'column' : 'row'};
    `
  )
}
`;

export const QuantityContainer = styled.View<Props>`
  height: 20px;
  border: 0.5px solid #6B6B6B;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0 4px;

  ${({ expanded }) => (expanded ? (
    css`
      width: 60px;
      height: 32px;
    `
  ) : (
    css`
      width: 40px;
      height: 24px;
    `
  ))
}
`;

export const Quantity = styled.Text<Props>`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  padding-right: 2px;

  ${({ expanded }) => (expanded ? (
    css`
    font-size: 20px;
    line-height: 22px;
    `
  ) : (
    css`
    font-size: 14px;
    line-height: 16px;
    `
  ))
}
`;

export const Text = styled.Text<Props>`
  color: ${({ theme }) => theme.colors.white};
  ${({ expanded }) => (expanded ? (
    css`
    font-size: 12px;
    line-height: 14px;
    font-weight: 700;
    margin-left: 8px;

    `
  ) : (
    css`
    font-size: 10px;
    line-height: 11px;
    font-weight: 400;
    margin-left: 6px;

    `
  ))
}
`;

export const Timer = styled.Text<Props>`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-left: 2px;

  ${({ expanded }) => (expanded ? (
    css`
      font-size: 16px;
      line-height: 19px;
      margin-top: 4px;
      `
  ) : (
    css`
      font-size: 12px;
      line-height: 14px;
      `
  ))
}
`;

export const TextBlue = styled.Text`
  font-size: 9px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.colorUtilized};
  margin: 0 2px;
`;

export const Indicator = styled.View<Props>`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.colorUtilized};
  margin-left: 4px;
  ${({ expanded }) => (expanded ? (
    css`
    width: 10px;
    height: 10px;
    `
  ) : (
    css`
    width: 8px;
    height: 8px;

    `
  ))
}
`;

export const Expand = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 6px;
`;

export const TitleExpanded = styled.Text`
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.white};
  margin-left: 6px;
`;

export const Content = styled(Animated.View)`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundModalDetails};
`;

export const PaddingComponent = styled(Animated.View)`
  padding: 12px 24px 24px 24px;
`;
export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export const Button = styled(ButtonRN)<ButtonProps>`
  width: 48%;
  height: 30px;
  ${({ theme, outline }) => (
    css`
     background: ${outline
      ? 'transparent'
      : theme.colors.primaryBlue};
      `)
}
`;

export const ButtonText = styled.Text`
  font-size: 14px;
`;
