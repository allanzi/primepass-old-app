import styled from 'styled-components/native';
import { Animated } from 'react-native';

import Image from '../Image';

interface CardProps {
  color: string;
}

export const Card = styled.View`
  width: 100%;
`;

export const CardHeader = styled.View<CardProps>`
  width: 100%;
  height: 60px;
  background: #313131;
  border-top-width: 12px;
  border-color: #147EB5;
  border-radius: 8px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 50%;
  margin-left: 16px;
`;

export const SignatureContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 50%;
`;

export const Title = styled.Text`
  color: #FFFFFF;
  font-size: 13px;
  font-weight: bold;
  margin-right: 8px;
`;

export const CardContent = styled(Animated.View)<CardProps>`
  width: 100%;
  background: #313131;
`;

export const CardContentContainer = styled(Animated.View)`
  padding: 16px;
`;

export const SectionServices = styled.View`
  margin-bottom: 16px;
`;

export const ServicesContainer = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

export const DescriptionSection = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

export const TextContent = styled.Text`
  color: #FFFFFF;
  font-size: 12px;
  font-weight: normal;
  margin-right: 10px;
  line-height: 20px;
`;

export const Service = styled(Image)`
  max-width: 100%;
  min-width: 94px;
  max-height: 100%;
  min-height: 34px;
  resize-mode: cover;
`;

export const ServiceContainer = styled.View`
  width: 94px;
  height: 36px;
  align-items: center;
  justify-content: center;
  margin: 6px;
`;

export const ServiceDefault = styled(Image)`
  max-width: 100%;
  max-height: 100%;
  min-width: 94px;
  min-height: 24px;
  resize-mode: cover;
`;

export const CardFooter = styled.TouchableOpacity`
  width: 100%;
  height: 24px;
  background: #313131;
  border-radius: 8px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;
