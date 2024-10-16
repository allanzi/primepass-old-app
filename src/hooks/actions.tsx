/* eslint-disable max-len, array-callback-return, @typescript-eslint/no-shadow, no-case-declarations, @typescript-eslint/no-unused-vars, @typescript-eslint/no-use-before-define, no-param-reassign, @typescript-eslint/naming-convention, import/no-cycle */
import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import analytics from '@react-native-firebase/analytics';
import DeviceInfo from 'react-native-device-info';
import { Platform, useColorScheme } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { requestTrackingPermission } from 'react-native-tracking-transparency';

import { removeAccent } from '../utils/removeAccent';
import { trackUser, registerUser, checkUserExists } from '../lib/Dito';
import { useAuth } from './auth';

interface ActionContextState {
  logEvent(event: LogEventParam): void;
  logDeviceInfo(eventFlow: string, userId: string): void;
  logConvertArrayToString(data: any): string;
  logAdjustStrings(text: string): string;
  logClearSpaces(text: string): string;
  logUserLogin(method: string, userId: string): void;
  logUserLogout(method: string, userId: string): void;
  logUserData(payloadData: Object): void;
  logUserRegister(data: LogUserRegisterParam): void;
}
export interface LogEventParam {
  type: string;
  userId: string;
  flow?: string;
  group?: string;
  context?: string;
  section?: string;
  name?: string;
  payloadData?: Object;
  description?: string;
  method?: string;
}

interface LogEventNameParam {
  flow?: string;
  group?: string;
  context?: string;
  section?: string;
  name?: string;
  userId: string;
}

interface LogUserRegisterParam {
  id: string;
  name?: string;
  email?: string;
}

interface LogDeviceInfoParam {
  device_sdk_version: string;
  device_system_version: string;
  device_app_name_version: string;
  device_model: string;
  device_mode: string;
  device_id: string;
  device_platform: string;
}

const AuthContext = createContext<ActionContextState>({} as ActionContextState);

const ActionsProvider: React.FC = ({ children }) => {
  const deviceTheme = useColorScheme();
  const isDark = deviceTheme === 'dark';
  const { user } = useAuth();
  const defaultId = 'INITIAL-VALUE';
  let deviceInfo = {} as LogDeviceInfoParam;
  let ditoId = '0';
  const device = 'mobile';

  const logLoadDeviceInfo = () => {
    const app_name = DeviceInfo.getApplicationName();
    const app_version = DeviceInfo.getVersion();
    const app_name_version = `${app_name}_${app_version}`;
    const device_model = DeviceInfo.getModel();
    const system_name = DeviceInfo.getSystemName().toLowerCase();
    const system_name_version = `${system_name}_${DeviceInfo.getSystemVersion()}`;
    const platform = Platform.OS;
    const device_mode = `${platform}_${isDark ? 'dark' : 'light'}`;
    const platform_name_version = `${
      Platform.OS
    }_${Platform.Version.toString()}`;

    let current_device_id = DeviceInfo.getUniqueId();
    if (current_device_id === undefined || current_device_id == null) {
      current_device_id = defaultId;
    }
    const info = {
      device_sdk_version: platform_name_version,
      device_system_version: system_name_version,
      device_app_name_version: app_name_version,
      device_model,
      device_mode,
      device_id: current_device_id,
      device_platform: platform,
    };

    deviceInfo = info;

    return info;
  };

  async function loadData() {
    deviceInfo = logLoadDeviceInfo();
  }

  useEffect(() => {
    loadData();
  }, []);

  const composeEventName = (event: LogEventNameParam) => {
    let composedEventName = '';
    if (event.name) {
      composedEventName = event.name !== undefined ? event.name : event.context;
    } else {
      composedEventName = event.context !== undefined ? event.context : 'without-context';
    }
    return composedEventName;
  };

  const logAdjustStrings = (text: string) => (!text
    ? text
    : text
      .replace(/-/g, '_')
      .replace(/ /g, '_')
      .replace(/\|_/g, '')
      .replace(/\|/g, '')
      .toLowerCase());

  const logConvertArrayToString = (data: any) => {
    let result = '';
    if (Array.isArray(data)) {
      result = data
        .map((txt) => removeAccent(logAdjustStrings(txt)))
        .join('_');
    } else {
      result = removeAccent(logAdjustStrings(data));
    }
    return result;
  };

  const logClearSpaces = (text: string) => (!text ? text : text.replace(/ /g, ''));

  const logEvent = useCallback(async (event: LogEventParam) => {
    const trackingStatus = await requestTrackingPermission();

    if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
      event.name = removeAccent(
        logAdjustStrings(
          composeEventName({
            flow: event.flow,
            group: event.group,
            context: event.context,
            section: event.section,
            name: event.name,
            userId: event.userId,
          }),
        ),
      );

      event.flow = event.flow ? event.flow : 'app';
      event.group = event.group ? event.group : 'prss';
      event.context = event.context ? event.context : 'notdefined';
      event.section = event.section ? event.section : 'notdefined';

      Sentry.addBreadcrumb({
        category: event.context,
        message: event.description,
        level: Sentry.Severity.Info,
      });

      if (!__DEV__) {
        await logEventDito(event);
        await logEventAnalytics(event);
      }
    }
  }, []);

  function adjustuserIdToDito(userId: string): string {
    let email = '';
    let name = '';
    if (userId === undefined || !userId || userId === '0') {
      // nesse caso iremos usar o DEVICE-ID
      if (user && user.id !== '0') {
        userId = user.id;
        name = user.name;
        email = user.email;
      } else {
        userId = deviceInfo.device_id ? deviceInfo.device_id : defaultId;
        name = `Visitante ${userId}`;
        email = `${userId}@visitante.com.br`;
      }
    }

    if (ditoId !== userId) {
      ditoId = userId;
      checkUserExists(ditoId).then((response: any) => {
        if (response?.data?.error) {
          registerUser({
            id: ditoId,
            network: 'portal',
            data: {
              name,
              email,
            },
          });
        }
      });
    }
    return userId;
  }

  async function logEventDito(event: LogEventParam) {
    /*
    Para DITO é obrighatório ter um ID de usuário
    */
    const logged = event.userId !== '0' ? 'Logged' : 'Not Logged';
    const { userId } = event;
    const screenName = event.description ? event.description : event.name;
    const appEvent = event.type.replace('log', 'app');

    if (userId === defaultId) {
      return;
    }

    if (logged !== 'Logged') {
      return;
    }

    const payloadData = event.payloadData ? event.payloadData : null;

    switch (event.type) {
      case 'log-app-open':
        trackUser({
          id: userId,
          data: {
            event: 'app_open',
          },
          extraData: {
            event_environment: __DEV__ ? 'sandbox' : 'production',
            event_type: event.type,
            event_flow: event.flow,
            event_group: event.group,
            event_context: event.context,
            event_section: event.section,
            event_name: event.name,
            event_description: screenName,
            event_platform: Platform.OS,
            event_device: device,
            event_logged: logged,
          },
        });
        break;
      case 'log-purchase':
        if (payloadData) {
          const revenue = payloadData?.revenue || 0;
          trackUser({
            id: userId,
            data: {
              event: 'revenue',
            },
            extraEvent: {
              revenue,
            },
            extraData: {
              ...payloadData,
              event_environment: __DEV__ ? 'sandbox' : 'production',
              event_type: event.type,
              event_flow: event.flow,
              event_group: event.group,
              event_context: event.context,
              event_section: event.section,
              event_name: event.name,
              event_description: screenName,
              event_platform: Platform.OS,
              event_device: device,
              event_logged: logged,
            },
          });
        }
        break;
      case 'log-login':
        const method = event.method ? event.method : 'primepass';
        trackUser({
          id: userId,
          data: {
            event: appEvent,
            method,
          },
          extraData: {
            ...payloadData,
            event_environment: __DEV__ ? 'sandbox' : 'production',
            event_type: event.type,
            event_flow: event.flow,
            event_group: event.group,
            event_context: event.context,
            event_section: event.section,
            event_name: event.name,
            event_description: screenName,
            event_platform: Platform.OS,
            event_device: device,
            event_logged: logged,
          },
        });
        break;
      case 'log-screen': // just the current one, other case use log-event
        const screenClass = event.name ? event.name : appEvent;
        trackUser({
          id: userId,
          data: {
            event: screenClass,
          },
          extraData: {
            ...payloadData,
            event_environment: __DEV__ ? 'sandbox' : 'production',
            event_type: event.type,
            event_flow: event.flow,
            event_group: event.group,
            event_context: event.context,
            event_section: event.section,
            event_name: event.name,
            event_description: screenName,
            event_platform: Platform.OS,
            event_device: device,
            event_logged: logged,
          },
        });
        break;
      case 'log-event':
      case 'log-event-custom':
      default:
        const eventType = event.name ? event.name : appEvent;

        if (payloadData) {
          trackUser({
            id: userId,
            data: {
              event: eventType,
            },
            extraData: {
              ...payloadData,
              event_environment: __DEV__ ? 'sandbox' : 'production',
              event_type: event.type,
              event_flow: event.flow,
              event_group: event.group,
              event_context: event.context,
              event_section: event.section,
              event_name: event.name,
              event_description: screenName,
              event_platform: Platform.OS,
              event_device: device,
              event_logged: logged,
            },
          });
        } else {
          trackUser({
            id: userId,
            data: {
              event: eventType,
            },
            extraData: {
              event_environment: __DEV__ ? 'sandbox' : 'production',
              event_type: event.type,
              event_flow: event.flow,
              event_group: event.group,
              event_context: event.context,
              event_section: event.section,
              event_name: event.name,
              event_description: screenName,
              event_platform: Platform.OS,
              event_device: device,
              event_logged: logged,
            },
          });
        }
    }
  }

  async function logEventAnalytics(event: LogEventParam) {
    const logged = event.userId !== '0' ? 'Logged' : 'Not Logged';

    const screenName = event.description ? event.description : event.name;

    const standardPayloadData = {
      environment: __DEV__ ? 'sandbox' : 'production',
      type: event.type,
      flow: event.flow,
      group: event.group,
      context: event.context,
      section: event.section,
      name: event.name,
      description: screenName,
      platform: Platform.OS,
      device,
      logged,
    };
    const payloadData = event.payloadData
      ? { ...event.payloadData, ...standardPayloadData }
      : standardPayloadData;

    switch (event.type) {
      case 'log-app-open':
        await analytics().logAppOpen();
        break;
      case 'log-purchase':
        if (payloadData) {
          const revenue = parseFloat(payloadData?.revenue) || 0;
          await analytics().logPurchase({
            affiliation: payloadData.affiliation,
            currency: payloadData.currency,
            coupon: payloadData.discountCoupon,
            value: revenue,
            transaction_id: payloadData.transactionId,
          });
        }
        break;
      case 'log-login':
        const method = event.method ? event.method : 'primepass';
        analytics().logLogin({ method });
        break;
      case 'log-screen': // just the current one, other case use log-event
        const screenName = event.description ? event.description : event.name;
        const screenClass = event.name;
        const eventName = event.name ? event.name : 'none';

        await analytics().logScreenView({
          screen_name: screenName,
          screen_class: screenClass,
        });

        if (eventName !== 'none') {
          await analytics().logEvent(eventName, {
            ...payloadData,
            name: screenName,
            class: screenClass,
          });
        }
        break;
      case 'log-event':
      case 'log-event-custom':
      default:
        const eventNameCustom = event.name ? event.name : 'none';
        if (eventNameCustom) {
          if (payloadData) {
            await analytics().logEvent(eventNameCustom, payloadData);
          } else {
            await analytics().logEvent(eventNameCustom);
          }
        }
    }
  }

  async function logUserRegister(data: LogUserRegisterParam) {
    const id = data.id ? data.id : defaultId;
    // Manda apenas para a Dito
    registerUser({
      id,
      network: 'portal',
      data,
    });
  }

  const logDeviceInfo = useCallback(
    async (eventFlow: string, userId: string) => {
      const info = logLoadDeviceInfo();

      await logEvent({
        type: 'log-event-custom',
        flow: eventFlow,
        group: 'info',
        name: 'device',
        context: 'device',
        section: 'info',
        payloadData: info,
        userId,
      });
    },
    [],
  );

  const logUserLogin = useCallback((method, userId) => {
    ditoId = userId;
    analytics().logLogin({ method });
    trackUser({
      id: userId,
      data: {
        event: 'login',
      },
      extraData: {
        event_type: 'log-login',
        event_name: 'log-login',
        event_description: 'User Logged',
        method,
      },
    });
  }, []);

  const logUserLogout = useCallback((method, userId) => {
    analytics().logEvent('logout', { method });
    trackUser({
      // id: ditoId,
      id: userId,
      data: {
        event: 'logout',
      },
      extraData: {
        event_type: 'log-logout',
        event_name: 'log-logout',
        event_description: 'User Logout',
        method,
      },
    });
  }, []);

  const logUserData = useCallback((eventPayloadData: Object) => {
    Object.entries(eventPayloadData).map((key, value) => {
      if (key[0].toLowerCase() === 'id') {
        analytics().setUserId(key[1]);
      } else {
        analytics().setUserProperty(key[0], key[1]);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        logEvent,
        logDeviceInfo,
        logConvertArrayToString,
        logAdjustStrings,
        logClearSpaces,
        logUserData,
        logUserLogin,
        logUserLogout,
        logUserRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAction(): ActionContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAction shoud be used with an ActionsProvider');
  }

  return context;
}

export { useAction, ActionsProvider };
