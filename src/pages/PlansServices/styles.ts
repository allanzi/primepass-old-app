/* eslint-disable consistent-return */
import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
interface StatusProps {
  status: string;
}

export const ServiceCardContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const PlansContainer = styled.View`
  margin-top: 16px;
`;

export const PlansDivisor = styled.View`
  margin: 5px 0;
  flex: 1
`;

export const ButtonStyled = styled.TouchableOpacity`
  width: 50%;
  border-color: #54BC94;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border-width: 2px;
  padding: 10px 0;
  margin: 15px auto;

`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 15px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 15px;
  margin-bottom: 15px;
  margin-top: 5px;
`;

export const ContainerLoader = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Fragment = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  width: ${WIDTH}px;
`;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 14px;
  margin-bottom: 15px;
  margin-left: 10px;
`;

export const EmptyText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 24px;
  text-align: left;
  padding: 16px 32px;
`;

export const Separator = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const LineSeparator = styled.View`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.colors.borderConfigColor};
`;

export const MenuItem = styled.TouchableOpacity`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-top-width: 0px;
  border-color: ${({ theme }) => theme.colors.borderConfigColor};
`;

export const ContentInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 2;
`;

export const Info = styled.View`
  align-items: flex-start;
  flex: 1;
`;

export const Label = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const IconMenu = styled.Image`
  width: 30px;
  height: 30px;
  flex: 1;
`;

export const Icon = styled.Image`
  width: 12px;
  height: 12px;
`;

export const Status = styled.View`
  align-items: flex-start;
  flex-direction: row;
  flex: 1;
`;

export const StatusDate = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  flex: 1;
  padding-right: 8px;
`;

export const StatusText = styled.Text<StatusProps>`
  font-size: 11px;

  ${(props) => {
    switch (props.status) {
      case 'authorized':
        return css`
          color: ${({ theme }) => theme.colors.colorActive};
        `;
      case 'canceled':
        return css`
          color: ${({ theme }) => theme.colors.colorError};
        `;
      case 'paid':
        return css`
          color: ${({ theme }) => theme.colors.colorUtilized};
        `;
      default:
    }
  }}
`;

export const TextLight = styled.Text`
  color: ${({ theme }) => theme.colors.colorTextHistLight};
  font-size: 11px;
`;
export const Row = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  flex: 1;
`;

export const CardContainer = styled(FastImage)`
  margin-top: 16px;
  width: ${(WIDTH * 296) / 360}px;
  height: ${(HEIGHT * 180) / 640}px;
  align-self: center;
`;

export const ServiceContainer = styled.View`
  height: ${WIDTH / 2 - 50}px;
  flex-grow: .5;
  flex-basis: 0;
  margin-right: 8px;
  margin-bottom: 150px;
`;

export const ServiceCard = styled.ImageBackground`
  background-color: #313131;
  height: 110%;
  border-radius: 8px;
  overflow: hidden;
  resize-mode: cover;
`;

export const ServiceCardOverlay = styled.View`
  width: 100%;
  height: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
`;

export const OverlayIcon = styled.Image`
  max-width: 100%;
  min-width: 80%;
  max-height: 100%;
  min-height: 50px;
  resize-mode: cover;
`;

export const OverlayIconUnavailable = styled.Image`
  width: 50px;
  height: 50px;
  resize-mode: contain;
`;

export const ServiceTitle = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 13px;
  margin-top: 8px;
  text-align: center;
`;

export const ServiceSubtitle = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 10px;
  margin-top: 8px;
  text-align: center;
`;
