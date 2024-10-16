import styled, { css } from 'styled-components/native';
import { Animated, Platform } from 'react-native';

interface TextProps {
  disable?: boolean;
}

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background};
`;

export const Card = styled.View`
  background: ${({ theme }) => theme.colors.backgroundModal};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  shadow-color: #000;
  shadow-offset: 0px 12px;
  shadow-opacity: 1;
  elevation: 24;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  padding: 16px 16px 5px 16px;
  justify-content: space-between;
`;

export const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ValueContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  margin-right: 4px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const TextValue = styled.Text<TextProps>`
  font-size: 14px;
  line-height: 14px;
  ${({ theme, disable }) => (disable
    ? css`
    font-weight: 400;
    color: ${theme.colors.colorLabel};
    `
    : css`
    font-weight: 700;
    color: ${theme.colors.white};
    `)
}
`;

export const TextDetail = styled.Text`
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.white};
  margin-top: 8px;
`;

export const CardContent = styled(Animated.View)`
  width: 100%;
  background: #313131;
`;

export const PaddingComponent = styled(Animated.View)`
  padding: 8px 16px;
`;

export const Info = styled.View`
  flex-direction: row;
  padding-bottom: 8px;
`;

export const Divider = styled.View`
  border-style: ${Platform.OS === 'ios' ? 'solid' : 'dashed'};
  border-color: #515151;
  border-bottom-width: 1px;
  width: 100%;
  align-self: center;
  margin-bottom: 8px;
`;

export const ContainerDetails = styled.View``;

export const TextFooter = styled.Text`
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-top: 4px;
`;

export const CardFooter = styled.TouchableOpacity`
  width: 100%;
  padding: 5px 16px 16px 16px;
  align-items: center;
  justify-content: center;
`;
