import { Linking, Platform } from 'react-native';

import { showAlertIOS, showToastAndroid } from './toasts';

export default async (link: string) => {
  const ERROR_MESSAGE = 'Opps, something went wrong, try again.';
  const isIOS = Platform.OS === 'ios';

  try {
    await Linking.openURL(link);
  } catch {
    if (isIOS) {
      showAlertIOS(ERROR_MESSAGE);
      return;
    }
    showToastAndroid(ERROR_MESSAGE);
  }
};
