import styled from 'styled-components/native';
import { Pressable } from 'react-native';
import ImageCustom from '../Image';

export const Wrapper = styled.View`
  padding-left: 15px;
`;

export const Container = styled(Pressable)`
  flex: 1;
  overflow: hidden;
  justify-content: space-between;
`;

export const ImageContainer = styled.View`
  width: 160px;
  height: 160px;
`;

export const Image = styled(ImageCustom)`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const BadgeContainer = styled.View`
  position: relative;
  top: 25px;
  left: 8px;
  z-index: 100;
`;

export const LabelContainer = styled.View`
  padding: 5px 8px;
`;

export const Label = styled.Text`
  width: 160px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 2px;
`;

export const Owner = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 10px;
`;
