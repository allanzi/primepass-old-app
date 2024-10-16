import { Alert, ToastAndroid } from 'react-native';

const showAlertIOS = (msg: string): void => {
  Alert.alert(msg);
};

const showToastAndroid = (msg: string): void => {
  ToastAndroid.showWithGravity(
    msg,
    ToastAndroid.LONG,
    ToastAndroid.TOP,
  );
};

export { showAlertIOS, showToastAndroid };
