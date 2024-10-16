[![react-native-android-build-apk](https://github.com/PrimePassCinema/primepass-app/actions/workflows/main.yml/badge.svg)](https://github.com/PrimePassCinema/primepass-app/actions/workflows/main.yml)

# Primepass APP

Developed with react native and rest api to consume backend informartion with Axios and GraphQL.

If you nead, use these short-cut to: [Report bug](https://github.com/PrimePassCinema/primepass-app/issues) ,
[Report feature](https://github.com/PrimePassCinema/primepass-app/issues) ,
[Pull request](https://github.com/PrimePassCinema/primepass-app/pulls) ,
[Actions](https://github.com/PrimePassCinema/primepass-app/actions) .

## Getting Started with React Native App

This project was developed with [react native](https://github.com/facebook/react-native).

To start and execute the app you neead to clone our repository before using the command bellow:
```
git clone https://github.com/PrimePassCinema/primepass-app.git
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
```
yarn start
```

### `yarn android`

Compile the app under Android platform.
```
yarn android
```

### `yarn ios`

Compile the app under IOS platform.
```
yarn ios
```

### `adb port setup`

If you are using an mobile under usb port you need to configure the port 8081 for auto deploy after the bundle start:
```
adb reverse tcp:8081 tcp:8081
```
For Reactotron uses the port 9090 and execute this command:
```
adb reverse tcp:9090 tcp:9090
```
For debug the communication with the Firebase Analytics, we need to configure adb with the command bellow:
```
adb shell setprop debug.firebase.analytics.app com.cinema.primepass
```

## Advanced Configuration

### `reactotron`
To configure the App to send data to Reactotron you need to be using the same network area and change the file ./src/config/ReactotronConfig.ts and change to use your IP if localhost is not running for you.
```
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({
    name: 'Primepass',
    host: 'localhost', <<<<----- Change here, if necessary
  })
    .useReactNative({ overlay: false })
    .connect();
  tron.clear();
  console.tron = tron;
}
```

### `.env`
This file indicates to the App what are the servers to consume information for: API, Data, Images and other ones.

This .env file is only LOCAL and not linked with out git repository, into .gitignore.

It is necessary to be executed once before use the app.
```
cp .env.example .env
```
## Android environment
### `APK generation`
For generates the APK, you need to go to directory ./android and execute the command below:
```
cd ./android
./gradlew assembleRelease
```

## Contact
Project Link: [https://github.com/PrimePassCinema/primepass-app](https://github.com/PrimePassCinema/primepass-app)

## Possible errors
- "Command PhaseScriptExecution failed with a nonzero exit code" when archiving: [https://stackoverflow.com/a/70944459/7267813](https://stackoverflow.com/a/70944459/7267813)
