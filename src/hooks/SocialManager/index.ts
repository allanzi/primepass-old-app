import { appleAuth } from '@invertase/react-native-apple-authentication';

import api from '../../services/api';
import type {
  PartnerLinkPayload,
  PartnerLinkResponse,
  PartnerUnlinkPayload,
  PartnerUnlinkResponse,
  AppleAuthenticator,
  CallbackError,
  Link,
  Unlink,
} from './types';

const useSocialManager = (userID: string) => {
  const authCredentials: PartnerLinkPayload = {
    user_id: userID,
    partner_id: '',
    partner_token: '',
    partner_type: undefined,
  };

  let callBackError: CallbackError = () => undefined;

  const appleAuthenticator: AppleAuthenticator = async () => {
    try {
      const appleRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const appleCredentialState = await appleAuth.getCredentialStateForUser(
        appleRequestResponse.user,
      );

      if (appleCredentialState !== appleAuth.State.AUTHORIZED) {
        callBackError(new Error('Authentication was not allowed with Apple'));
        return false;
      }

      const { user, identityToken } = appleRequestResponse;
      if (identityToken) {
        authCredentials.partner_id = user;
        authCredentials.partner_type = 'apple';
        authCredentials.partner_token = identityToken;
        return true;
      }

      callBackError(new Error('A unknown error occuered'));
      return false;
    } catch (error) {
      callBackError(error);
      return false;
    }
  };

  const link: Link = async () => {
    try {
      const response = await api.post<PartnerLinkPayload, PartnerLinkResponse>(
        '/users/partner-link',
        authCredentials,
      );

      if (response.status === 200) {
        return true;
      }
      callBackError(new Error('Unable to link your account'));
      return false;
    } catch (error) {
      callBackError(error);
      return false;
    }
  };

  const unlink: Unlink = async (partnerType) => {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { user_id } = authCredentials;
      const response = await api.post<
      PartnerUnlinkPayload,
      PartnerUnlinkResponse
      >('/users/partner-unlink', {
        user_id,
        partner_type: partnerType,
      });

      if (response.status === 200) {
        return true;
      }
      callBackError(new Error('Unable to unlink your account'));
      return false;
    } catch (error) {
      callBackError(error);
      return false;
    }
  };

  const setCallBackError = (callBack: CallbackError) => {
    callBackError = callBack;
  };
  return {
    appleAuthenticator,
    authCredentials,
    setCallBackError,
    unlink,
    link,
  };
};

export default useSocialManager;
