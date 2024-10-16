import styled, { css } from 'styled-components/native';
import { Platform, Animated } from 'react-native';

interface ContainerProps {
  title?: string;
}

interface TitleContainerProps {
  hasTrailer: boolean;
}

export const Container = styled.View<ContainerProps>`
  height: 60px;
  width: 100%;
  flex-direction: row;
  padding: 0 10px;
  position: absolute;
  ${Platform.OS !== 'ios' ? css`
    margin-top:25px;
    top: 0;
  ` : css`
    top: 0;
    margin-top: 35px;
  `}
  z-index: 201;
  align-items: center;
  justify-content: space-between;

`;

export const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const TitleContainer = styled.View<TitleContainerProps>`
  ${({ hasTrailer }) => {
    if (!hasTrailer) {
      return css`width: 80%;`;
    }

    return css`
      width: ${Platform.OS === 'ios' ? '50%' : '46%'};
    `;
  }}
  margin-left: 20px;
  position: relative;
  left: -10px;
`;

export const Title = styled(Animated.Text)`
  font-size: 18px;
`;

export const TrailerContainer = styled.View`
  height: 40px;
  margin: 5px 10px 0 0;
`;

export const Span = styled.Text`
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
