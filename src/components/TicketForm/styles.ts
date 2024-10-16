import styled, { css } from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';

import ButtonCustom from '../Button';

interface DropdownProps {
  disable?: boolean;
}

interface BalanceProps {
  disable: boolean;
}

interface CreditProps {
  disable: boolean;
}

export const Container = styled.ScrollView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding: 0 16px;
`;

export const ContainerTitle = styled.View`
  flex-direction: row;
  display: flex;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.white};
  margin-right: 10px;
`;

export const ContainerBalance = styled.View`
  flex-direction: row;
  margin-top: 16px;
  display: flex;
  align-items: center;
`;

export const TextSubtitle = styled.Text`
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const ContentTextDialog = styled.View`
  display: flex;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 12px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.white};
`;

export const TextGreen = styled.Text`
  color: #66CF97;
`;

export const TextBold = styled.Text`
  font-weight: 700;
`;

export const Balance = styled.View<BalanceProps>`
  padding: 4px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  border-radius: 4px;
  ${({ theme, disable }) => (
    css`
    background: ${disable
      ? theme.colors.backgrounButtonDisable
      : '#00AF51'};
    `)
}
`;

export const TextBalance = styled.Text<BalanceProps>`
  font-size: 18px;
  font-weight: 700;
  ${({ theme, disable }) => (
    css`
    color: ${disable
      ? theme.colors.colorTextButtonDisable
      : theme.colors.white};
    `)
}
`;

export const ContainerCredits = styled.View`
  border: 1px solid ${({ theme }) => theme.colors.colorTextButtonDisable};
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const TitleCredit = styled.Text`
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 8px;
`;

export const ButtonCredits = styled(ButtonCustom)<CreditProps>`
  width: 94px;
  height: 64px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  ${({ disable }) => (
    css`
    background: ${disable
      ? '#313131'
      : '#147EB5'};
    `)
}
`;

export const CreditBox = styled.View<CreditProps>`
  width: 94px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border-width: 2px;
  ${({ theme, disable }) => (
    css`
    border: ${disable
      ? theme.colors.backgrounButtonDisable
      : theme.colors.colorTitleText};
    `)
}
`;

export const CreditText = styled.Text<CreditProps>`
  font-weight: 700;
  font-size: 40px;
  ${({ theme, disable }) => (
    css`
    color: ${disable
      ? theme.colors.colorTextButtonDisable
      : theme.colors.white};
    `)
}
`;

export const ContainerWarning = styled.View`
  margin-top: 16px;
  flex-direction: row;
`;

export const Warning = styled.Text`
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.colorText};
  margin-left: 4px;
`;

export const ContentDropdowns = styled.View`
    flex-direction: row;
`;

export const DropdownBoxAndroid = styled.View<DropdownProps>`
  width: 49%;
  background: ${({ theme }) => theme.colors.background};
  border-width: 2px;
  border-radius: 100px;
  margin-right: 8px;
  padding-left: 8px;
  display: flex;
  justify-content: center;
  z-index: 1;

  ${({ theme, disable }) => (disable
    ? css`
    border-color: ${theme.colors.backgrounButtonDisable};
    `
    : css`
    border-color: ${theme.colors.colorBorderInput};
    `
  )
}
`;

export const DropdownBox = styled.TouchableOpacity<DropdownProps>`
  width: 49%;
  background: ${({ theme }) => theme.colors.background};
  border-width: 2px;
  border-radius: 100px;
  margin-right: 8px;
  padding-left: 8px;
  display: flex;
  justify-content: center;
  z-index: 1;

  ${({ theme, disable }) => (disable
    ? css`
    border-color: ${theme.colors.backgrounButtonDisable};
    `
    : css`
    border-color: ${theme.colors.colorBorderInput};
    `
  )
}
`;

export const Dropdown = styled(Picker)<DropdownProps>`
  color: white;
  width: 100%;
  height: 32px !important;
  z-index: -1;

  ${({ theme, disable }) => (disable
    ? css`
    color: ${theme.colors.colorTextButtonDisable};
    `
    : css`
    color: ${theme.colors.white};
    `)
}
`;

export const DropdownIOS = styled.View<DropdownProps>`
  color: white;
  width: 100%;
  height: 32px !important;
  z-index: 2;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0 10px 0 5px;

  ${({ theme, disable }) => (disable
    ? css`
    color: ${theme.colors.colorTextButtonDisable};
    `
    : css`
    color: ${theme.colors.white};
    `)
}
`;

export const DropdownText = styled.Text<DropdownProps>`
  ${({ theme, disable }) => (disable
    ? css`
    color: ${theme.colors.colorTextButtonDisable};
    `
    : css`
    color: ${theme.colors.white};
    `)
}
`;

export const SelectTypes = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

export const ContentValue = styled.TouchableOpacity`
  flex-direction: row;
  max-width: 31%;
  display: flex;
  align-items: center;
  background: #313131;
  border-radius: 2.5px;
  height: 26px;
  padding: 3px 12px;
  margin: 0px 4px;
`;

export const Value = styled.Text`
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.white};
  width: 82%;
`;

export const Divisor = styled.View`
  border-left-width: 1px;
  width: 1px;
  height: 20px;
  align-self: center;
  border-color: #212121;
  margin-right: 4px;
`;

export const DeleteContainer = styled.View`
  flex-direction: row;
`;
