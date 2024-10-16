/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

const api_key = 'MjAxOS0wNC0zMCAxMToyOTo1NSAtMDMwMERhc2hib2FyZCBkZSB0ZXN0ZTcxOQ';
const secret_key = 'oXEznzeyEdbGR5vxnb8HgaGHgVvNq3Ch1tRMDoRU';
const sha1_key = 'fde3a6b8c221b661e72460b74d19f6724877b171';

const ditoBaseData = {
  // sha1_signature: '4a01a2c812e99d6d2799f42c407ff48f67d33edc',
  // producao atual platform_api_key: 'MjAxOS0wNi0yOCAxNjozMDoxNSAtMDMwMFByaW1lIFBhc3M3Mzk',
  platform_api_key: api_key,
  sha1_signature: sha1_key,
  encoding: 'base64',
};

const userEndpoints = axios.create({
  baseURL: 'https://login.plataformasocial.com.br',
});

const eventsEndpoints = axios.create({
  baseURL: 'https://events.plataformasocial.com.br',
});

const notificationEndpoints = axios.create({
  baseURL: 'https://notification.plataformasocial.com.br',
});

interface RegisterUserParams {
  id: string;
  network: string;
  data: RegisterUserDataParams;
}

interface RegisterUserDataParams {
  name?: string;
  email?: string;
  gender?: string;
  location?: string;
  birthday?: string;
  created_at?: string;
}

export const registerUser = (dados: RegisterUserParams): Promise<Object> => {
  const { id, network, data } = dados;
  return userEndpoints({
    url: `/users/${network}/${id}/signup`,
    method: 'POST',
    data: { ...ditoBaseData, user_data: data },
  }).catch((error) => false);
};

interface TrackUserParams {
  id: string;
  extraData?: {};
  extraEvent?: {};
  data: TrackUserDataParams;
}

export const checkUserExists = (id: string): Promise<Object> => userEndpoints({
  url: `/users/${id}`,
  method: 'GET',
  params: {
    ...ditoBaseData,
    id_type: 'id',
    network_name: 'pt',
  },
}).catch((error) => false);

interface TrackUserDataParams {
  event: string;
  event_type?:string,
  event_flow?: string,
  event_group?: string,
  event_context?: string,
  event_section?: string,
  event_name?: string;
  event_description?:string,
  screen_name?: string;
  screen_class?: string;
  method?: string;
}

export const trackUser = (dados: TrackUserParams) => {
  const {
    id, extraData, extraEvent, data,
  } = dados;

  return eventsEndpoints({
    url: `/users/${id}`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      id,
      id_type: 'id',
      ...ditoBaseData,
      network_name: 'pt',
      event: JSON.stringify({
        action: data.event,
        ...extraEvent,
        data: {
          origem: 'aplicativo',
          ...extraData,
        },
      }),
    },
  }).catch((error) => false);
};

interface notifyReceivedPushNotificationParams {
  id: string;
  reference: string;
  data: {};
}

export const notifyReceivedPushNotification = (dados: notifyReceivedPushNotificationParams) => {
  const { id, reference, data } = dados;
  notificationEndpoints({
    url: `/notifications/${id}/open`,
    method: 'POST',
    data: {
      ...ditoBaseData,
      ...data,
      channel_type: 'mobile',
      data: {
        identifier: id,
        reference,
      },
    },
  }).catch((error) => false);
};

interface registerMobileTokenParams {
  id: string;
  data: {};
}

export const registerMobileToken = (dados: registerMobileTokenParams) => {
  const { id, data } = dados;
  notificationEndpoints({
    url: `/users/${id}/mobile-tokens`,
    method: 'POST',
    data: { ...ditoBaseData, ...data },
  }).catch((error) => false);
};

export default { user: userEndpoints, events: eventsEndpoints };
