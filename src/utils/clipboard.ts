import { Platform } from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import { showToastAndroid, showAlertIOS } from './toasts';

function showAlert(isIOS: boolean, message: string) {
  if (isIOS) {
    showAlertIOS(message);
    return;
  }
  showToastAndroid(message);
}

export default async (text: string): Promise<void> => {
  const isIOS = Platform.OS === 'ios';
  const SUCCESS_MSG = 'Copiado!';
  const ERROR_MSG = 'Algo aconteceu de errado, tente novamente!';
  try {
    await Clipboard.setString(text);
    showAlert(isIOS, SUCCESS_MSG);
  } catch {
    showAlert(isIOS, ERROR_MSG);
  }
};
