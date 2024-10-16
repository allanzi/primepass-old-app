import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      icon: string;
      background: string;
      primaryBlue: string;
      colorTextButtonOutline: string;
      colorTextButton: string;
      colorText: string;
      colorTextSessions: string;
      colorTextDisabled: string;
      colorError: string;
      backgrounButtonDisable: string;
      colorTextButtonDisable: string;
      colorBorderInput: string;
      colorInfoText: string;
      colorBorderInputNotFocused: string;
      colorTextNotRecivedCode: string;
      colorTitleText: string;
      colorLabel: string;
      white: string;
      opacity: string;
      borderMenuColor: string;
      backgroundModalDetails: string;
      backgroundModal: string;
      profile: string;
      backgroundPicker: string;
      backgroundDropDown: string;
      colorTheaterSessionLabel: string;
      backgroundTheaterSessionTime: string;
      colorArrowRight: string;
      borderConfigColor: string;
      primaryGreen: string;
      parentalRatingColors: {
        livre: string;
        dez: string;
        doze: string;
        quatorze: string;
        dezasseis: string;
        dezoito: string;
      };
      backgroundConfirmTicket: string;
      colorTextHistLight: string;
      colorActive: string;
      colorUtilized: string;
    };
  }
}
