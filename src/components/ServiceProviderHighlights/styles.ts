import styled from 'styled-components/native';
import { Pressable } from 'react-native';

import ImageCustom from '../Image';

export const Container = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  height: 40%;
`;

export const ButtonWrapper = styled(Pressable)`
  width: 100%;
  height: 100%;
`;

export const Label = styled.View`
  height: 65px;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding-top: 8px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.colorText};
  margin-bottom: 7px;
`;

export const Image = styled(ImageCustom)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const HighlightInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const ContainerLogo = styled.View`
  margin: 0 0 0 10px;
  width: 70px;
  height: 24px;
`;

export const ServiceLogo = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ContainerText = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-left: 12px;
`;

export const Text = styled.Text`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const LikeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LikesCount = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: #fff;
  margin-left: 6px;
`;

export const TrailerContainer = styled.View`
  height: 40px;
  margin: 5px 10px 0 0;
`;

export const TarilerText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 15px;
  margin-right: 5px;
`;

export const TrailerButton = styled.TouchableOpacity`
  border: 2px solid ${({ theme }) => theme.colors.white};
  padding: 5px 10px;
  flex-direction: row;
  border-radius: 20px;
  width: auto;
  align-items: center;
`;
