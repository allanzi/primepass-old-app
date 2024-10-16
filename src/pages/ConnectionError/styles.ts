import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';
import { css } from 'styled-components';
import ButtonRN from '../../components/Button';

interface ButtonProps {
  outline?: boolean;
  disabled?: boolean;
}

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  align-items: center;
`;

export const ImageContainer = styled.View`
  align-items: center;
  margin-top: 64px;
  margin-bottom: 32px;
`;

export const ButtonContainer = styled.View`
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  margin: 0 32px 64px 32px;
`;

export const Button = styled(ButtonRN)<ButtonProps>`
  margin: 8px 0 0 0;

  ${({ outline, theme, disable }) => (!outline
    ? css`
          background: ${disable
      ? theme.colors.backgrounButtonDisable
      : theme.colors.backgroundConfirmTicket};
        `
    : css`
          background: rgba(21, 21, 21, 0.3);
          border-width: 2px;
          border-color: ${disable
      ? theme.colors.backgrounButtonDisable
      : theme.colors.backgroundConfirmTicket};
        `)}
`;

export const CodigoErro = styled.Text`
  font-size: 16px;
  margin-bottom: 32px;
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Title = styled.Text`
  font-size: 24px;
  margin-top: 24px;
  margin-bottom: 30px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Text = styled.Text`
  font-size: 18px;
  line-height: 25px;
  margin: 0 16px 8px 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Label = styled.View`
  padding-top: 8px;
  padding-left: 15px;
  padding-right: 15px;
`;

export const Image = styled(FastImage)`
  width: ${(WIDTH * 296) / 360}px;
  height: ${(HEIGHT * 180) / 640}px;
  align-self: center;
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

export const ContainerGenre = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

export const Genre = styled.Text`
  font-size: 10px;
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

export const Blur = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.6);
`;
