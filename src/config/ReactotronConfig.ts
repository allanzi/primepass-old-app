/* eslint-disable no-console, import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({
    name: 'Primepass',
  })
    .useReactNative({ overlay: false })
    .connect();
  tron.clear();
  console.tron = tron;
}
