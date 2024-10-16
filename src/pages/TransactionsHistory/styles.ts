import { css } from 'styled-components';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import ButtonCustom from '../../components/Button';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

interface Props {
  status?: string;
}

export const Fragment = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Separator = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 32px;
`;

export const LineSeparator = styled.View`
  height: 0.8px;
  width: 100%;
  background: ${({ theme }) => theme.colors.borderConfigColor};
`;

export const Title = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: #FFFFFF;
`;

export const ItemContainer = styled.View`
  border-bottom-width: .8px;
  border-color: ${({ theme }) => theme.colors.borderConfigColor};
`;

export const Item = styled.TouchableOpacity`
  padding: 16px 16px 16px 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContentInfo = styled.View`
  flex-direction: row;
  align-items: center;
  width: 95%;
`;

export const MenuIcon = styled.Image`
  width: 30px;
  height: 30px;
`;

export const MenuInfo = styled.View`
  align-items: flex-start;
  margin-left: 10px;
`;

export const MenuLabel = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Subtitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
`;

export const Text = styled.Text`
  font-size: 10px;
  line-height: 12px;
  width: 50%;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const TextColor = styled.Text<Props>`
  font-size: 10px;
  line-height: 12px;

  ${(props) => {
    switch (props.status) {
      case 'Cancelado':
        return css`
          color: ${({ theme }) => theme.colors.colorError}
        `;
      case 'Expirado':
        return css`
          color: ${({ theme }) => theme.colors.colorError}
        `;
      case 'Aguardando Check-in':
        return css`
          color: ${({ theme }) => theme.colors.parentalRatingColors.doze}
        `;
      case 'Ativo':
        return css`
          color: ${({ theme }) => theme.colors.primaryGreen}
          `;
      default:
        return css`
          color: ${({ theme }) => theme.colors.primaryBlue}
        `;
    }
  }}
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const CardContainer = styled(FastImage)`
  margin-top: 16px;
  width: ${(WIDTH * 296) / 360}px;
  height: ${(HEIGHT * 180) / 640}px;
  align-self: center;
`;

export const EmptyText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 20px;
  text-align: left;
  padding: 16px 32px;
`;

export const EmptySubtitle = styled.Text`
  font-size: 14px;
  color: #cccccc;
  padding: 16px 32px;
  align-self: flex-start;
  line-height: 28px;
`;

export const ActionsContainer = styled.View`
  align-items: center;
`;

export const Button = styled(ButtonCustom)`
  width: 90%;
  margin: 8px auto;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
`;
