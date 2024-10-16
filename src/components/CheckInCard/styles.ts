import styled from 'styled-components/native';
import { Animated, Platform } from 'react-native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding: 0 16px 16px 16px;
`;

export const ContainerTitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 20px;
  line-height: 23px;
  color: ${({ theme }) => theme.colors.white};
  margin-right: 10px;
`;

export const TextModal = styled.Text`
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.white};
  margin: 0 auto;
`;

export const Bold = styled.Text`
  font-weight: 700;
`;

export const TextBlue = styled.Text`
  color: ${({ theme }) => theme.colors.colorInfoText};
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Card = styled.View`
  background: #515151;
  margin: 8px 0;
  border-radius: 8px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  padding: 8px;
  justify-content: space-between;
`;

export const Group = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const QuantityContainer = styled.View`
  border: 1px solid #6B6B6B;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  padding: 0px 4px;
`;

export const Quantity = styled.Text`
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: ${({ theme }) => theme.colors.white};
  margin-left: 4px;
  margin-right: 6px;
`;

export const TitleCard = styled.Text`
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.white};
  margin-left: 8px;
  margin-right: 2px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const Column = styled.View`
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

export const Indicator = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 100px;
`;

export const TextMinimum = styled.Text`
  font-size: 8px;
  line-height: 9px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 4px;
`;

export const Timer = styled.Text`
  font-weight: 700;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.white};
`;

export const CardContent = styled(Animated.View)`
  width: 100%;
  background: #313131;
`;

export const PaddingComponent = styled(Animated.View)`
  padding: 16px;
`;

export const TextSmall = styled.Text`
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.white};
`;

export const CardFooter = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
`;

export const Text = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.white};
`;

export const TextBold = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
`;

export const Distance = styled.View`
  flex-direction: row;
  margin-right: 16px;
`;

export const Shopping = styled.Text`
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.white};
  margin-top: 4px;
`;

export const Address = styled.Text`
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.white};
  margin-top: 4px;
  margin-bottom: 8px;
`;

export const Divider = styled.View`
  border-style: ${Platform.OS === 'ios' ? 'solid' : 'dashed'};
  border-color: #515151;
  border-bottom-width: 1px;
  width: 100%;
  align-self: center;
  margin-bottom: 8px;
`;

export const Label = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.colorText};
  margin-right: 4px;
`;
