/* eslint-disable import/no-extraneous-dependencies */

import React, { useCallback, useContext, useState } from 'react';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/core';
import { ThemeContext } from 'styled-components';
import { ActivityIndicator } from 'react-native';

import {
  PRIMEPASS_TOKEN_USERNAME,
  PRIMEPASS_TOKEN_PASSWORD,
} from '@env';
import Api from '../../services/api';
import Dialog from '../../components/Dialog';
import { useAuth } from '../../hooks/auth';
import { useCompanyQuery } from '../../hooks/graphql/CompanyQuery';
import * as S from './styles';

interface Params {
  params: {
    subscriberId: string | undefined;
    companyId: string | undefined;
  };
}

interface Service {
  id: string;
  description: {
    text_button: string;
    link: string;
    label_link: string;
    steps: Array<string>;
  };
  type: {
    name: string;
    title: string;
  };
}

interface Voucher {
  combo: boolean;
  user_choices: {
    needChoice: boolean;
    choiceCount: number;
  };
  services: Array<Service>;
}

interface ResponseVoucherCodes {
  voucher: Voucher;
}

const CallbackPartner: React.FC = () => {
  const { user } = useAuth();
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const route = useRoute();

  const { socialLogin } = useAuth();
  const [visibleModalError, setVisibleModalError] = useState(false);
  const [hasRedeemed, setHasRedeemed] = useState(false);

  const {
    params: { companyId },
  } = route as Params;

  const { data: companyData, loading } = useCompanyQuery({
    variables: {
      companyId: companyId || '',
    },
    fetchPolicy: 'network-only',
  });

  useFocusEffect(
    useCallback(() => {
      setHasRedeemed(false);
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const redeemVoucher = async (bundles: Array<string>) => {
        try {
          const {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            data: { access_token },
          } = await Api.post(
            '/token',
            {
              grant_type: 'client_credentials',
            },
            {
              auth: {
                username: PRIMEPASS_TOKEN_USERNAME,
                password: PRIMEPASS_TOKEN_PASSWORD,
              },
            },
          );

          let productTransform = '';
          if (bundles.length) {
            // eslint-disable-next-line prefer-destructuring
            productTransform = bundles[0];
          }

          const {
            data: {
              data: { vouchers },
            },
          } = await Api.post(
            `/oauth/company/${productTransform}/voucher`,
            {
              totalVouchers: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            },
          );

          const { data } = await Api.get(`/voucher-codes/${vouchers[0]}`);
          const response = data as ResponseVoucherCodes;

          if (data?.voucher?.user_choiches?.needChoice === true) {
            navigation.navigate('Promotions', {
              screen: 'RedeemSelectService',
              params: {
                ...data,
                partner_subscription: true,
              },
            });

            return;
          }

          if (response.voucher.services.length > 0) {
            await Api.post(`/voucher-codes/${vouchers[0]}`, {
              partner_subscription: true,
            });
            navigation.navigate('Promotions', {
              screen: 'SuccessfullyRedeemed',
              params: {
                data,
              },
            });
          }
        } catch (error) {
          setVisibleModalError(true);
        }
      };

      const checkUserExists = async (partnerType: string) => {
        try {
          const {
            params: { subscriberId },
          } = route as Params;
          const {
            data: {
              data: { signature, active, bundles },
            },
          } = await Api.post('/users/partner-verify',
            {
              partnerId: subscriberId,
              partnerType,
            });

          if (!active) {
            throw new Error('User doenst have access');
          }

          await socialLogin({
            partner_type: partnerType,
            partner_token: partnerType,
            partner_id: subscriberId || '',
          });

          if (!signature) {
            await redeemVoucher(bundles);
            return;
          }

          navigation.navigate('Home');
        } catch (error:any) {
          if (error.message === 'Request failed with status code 401') {
            const {
              response: {
                status,
                data: { data: dataError },
              },
            } = error;

            if (status === 401 && !dataError.user) {
              // eslint-disable-next-line consistent-return
              try {
                const {
                  params: { subscriberId },
                } = route as Params;
                navigation.navigate('SignUp', {
                  flow: 'signup',
                  next: 'CallbackPartner',
                  socialSignUp: {
                    partner_type: partnerType,
                    partner_token: partnerType,
                    partner_id: subscriberId,
                  },
                });
                return;
              } catch (_error) {
                setVisibleModalError(true);
              }
            }
          }

          setVisibleModalError(true);
        }
      };

      if (hasRedeemed) {
        return;
      }

      if (!loading && user?.id) {
        setHasRedeemed(true);
        checkUserExists(user?.partner_type);

        return;
      }

      if (!loading && companyData && !user) {
        if (companyData?.company_list && companyData?.company_list.companies.length <= 0) {
          setVisibleModalError(true);
        }

        setHasRedeemed(true);
        checkUserExists(companyData?.company_list?.companies[0]?.partnerLogin?.partner_type);
      }
    }, [companyData, loading, user, hasRedeemed]),
  );

  return (
    <S.Container>
      <Dialog
        title="Oops algo deu errado"
        message="Não foi possível continuar, tente novamente mais tarde!"
        visible={visibleModalError}
        handleClose={() => setVisibleModalError(false)}
        footer={[
          {
            text: 'Ok',
            action: () => {
              navigation.navigate('Welcome');
              setVisibleModalError(false);
            },
          },
        ]}
        error
      />

      <ActivityIndicator size="large" color={theme.colors.colorTextButton} />
    </S.Container>
  );
};

export default CallbackPartner;
