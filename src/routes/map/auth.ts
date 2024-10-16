import LogInEmail from '../../pages/LogInEmail';
import Register from '../../pages/SignUp/pages/Register';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';

import Update from '../../pages/SignIn/pages/Update';
import UpdateRequest from '../../pages/SignIn/pages/UpdateRequest';
import Success from '../../pages/SignUp/pages/Success';
import ValidationCode from '../../pages/ValidationCode';
import Welcome from '../../pages/Welcome';
import ConfirmPhoneNumber from '../../pages/SignIn/pages/ConfirmPhoneNumber';
import WrongPhoneNumber from '../../pages/SignIn/pages/WrongPhoneNumber';

export default [
  {
    name: 'LogInEmail',
    component: LogInEmail,
    options: {},
  },
  {
    name: 'Register',
    component: Register,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'SignIn',
    component: SignIn,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'SignUp',
    component: SignUp,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Update',
    component: Update,
    options: {},
  },
  {
    name: 'UpdateRequest',
    component: UpdateRequest,
    options: {},
  },
  {
    name: 'Success',
    component: Success,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ValidationCode',
    component: ValidationCode,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Welcome',
    component: Welcome,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
  },
  {
    name: 'ConfirmPhoneNumber',
    component: ConfirmPhoneNumber,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'WrongPhoneNumber',
    component: WrongPhoneNumber,
    options: {
      headerShown: false,
    },
  },
  // {
  //   name: '',
  //   Component: ''
  // },
];

/* {
   <Auth.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Auth.Screen
        name="SignIn"
        component={SignIn}
      />
      <Auth.Screen
        name="SignUp"
        component={SignUp}
      />
      <Auth.Screen
        name="Register"
        component={Register}
      />
      <Auth.Screen
        name="ValidationCode"
        component={ValidationCode}
      />
      <Auth.Screen
        name="LogInEmail"
        component={LogInEmail}
      />
      <Auth.Screen
        name="GenericScreen"
        component={GenericScreen}
      />
      <Auth.Screen
        name="Update"
        component={Update}
      />
      <Auth.Screen
        name="UpdateSuccess"
        component={UpdateSuccess}
      />
      <Auth.Screen
        name="UpdateRequest"
        component={UpdateRequest}
      />
} */

// import SignIn from '../pages/SignIn';
// import SignUp from '../pages/SignUp';
// import Welcome from '../pages/Welcome';
// import Register from '../pages/Register';
// import ValidationCode from '../pages/ValidationCode';
// import GenericScreen from '../pages/GenericScreen';
// import Update from '../pages/Update';
// import LogInEmail from '../pages/LogInEmail';
// import UpdateSuccess from '../pages/UpdateSuccess';
// import UpdateRequest from '../pages/UpdateRequest';
