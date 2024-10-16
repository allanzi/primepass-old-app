/* eslint-disable @typescript-eslint/no-shadow, @typescript-eslint/naming-convention, import/no-extraneous-dependencies, max-len */
import React, { useCallback, useContext, useState } from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import { ThemeContext } from 'styled-components';
import { ActivityIndicator } from 'react-native';

import {
  PRIMEPASS_TOKEN_USERNAME,
  PRIMEPASS_TOKEN_PASSWORD,
} from '@env';
import Api, { apiIntegration } from '../../services/api';
import Dialog from '../../components/Dialog';
import { useAuth } from '../../hooks/auth';
import { useCompanyQuery } from '../../hooks/graphql/CompanyQuery';
import * as S from './styles';
import { Company } from '../../@types/graphql/schemas';

interface Params {
  params: {
    code: string | undefined;
    product: string | undefined;
    companyId: string | undefined;
  };
}

export interface Data {
  access_token?: string;
  country_code?: string;
  subscriber_id?: string;
  sucess?: boolean;
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

const Callback: React.FC = () => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [hasRedeemed, setHasRedeemed] = useState(false);
  const theme = useContext(ThemeContext);
  const route = useRoute();
  const navigation = useNavigation();
  const { socialLogin } = useAuth();
  const {
    params: { code, product, companyId },
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

          // eslint-disable-next-line prefer-destructuring
          let productTransform = product;
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
          setVisible(true);
        }
      };

      const checkUserExists = async (data: Data, partner_type: string) => {
        try {
          const {
            data: {
              data: { signature, active, bundles },
            },
          } = await Api.post('/users/partner-verify',
            {
              partnerId: data.subscriber_id,
              partnerType: partner_type,
            });

          if (!active) {
            throw new Error('User doenst have access');
          }

          await socialLogin({
            partner_type,
            partner_token: data.access_token || '',
            partner_id: data.subscriber_id || '',
          });

          if (!signature) {
            await redeemVoucher(bundles);
            return;
          }

          navigation.navigate('Home');
        } catch (error: any) {
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
                navigation.navigate('SignUp', {
                  flow: 'signup',
                  next: 'Callback',
                  socialSignUp: {
                    partner_type,
                    partner_token: data.access_token,
                    partner_id: data.subscriber_id,
                  },
                });
                return;
              } catch (_error) {
                setVisible(true);
              }
            }
          }

          setVisible(true);
        }
      };

      const getUserInfo = async (
        company: Company,
      ) => {
        try {
          const {
            partnerLogin: {
              partner_type,
            },
          } = company;

          const { data } = await apiIntegration.post(`partner/${companyId}/userinfo`, {
            code,
            redirect_uri: 'https://pd-callback.primepass.com.br',
          });

          checkUserExists(
            {
              ...data,
            }, partner_type,
          );
        } catch (error) {
          setVisible(true);
        }
      };

      if (!code) {
        setVisible(true);
        return;
      }

      if (hasRedeemed) {
        return;
      }

      if (!loading && user?.id) {
        const data = {
          subscriber_id: user?.partner_id,
          access_token: user?.partner_token,
        };

        setHasRedeemed(true);
        checkUserExists(data, user?.partner_type);

        return;
      }

      if (!loading && companyData && !user) {
        if (companyData?.company_list && companyData?.company_list.companies.length <= 0) {
          setVisible(true);
        }

        setHasRedeemed(true);
        getUserInfo(companyData?.company_list.companies[0]);
      }
    }, [code, product, companyData, loading, user, hasRedeemed]),
  );

  return (
    <S.Container>
      <Dialog
        title="Oops algo deu errado"
        message="Não foi possível continuar, tente novamente mais tarde!"
        visible={visible}
        handleClose={() => setVisible(false)}
        footer={[
          {
            text: 'Ok',
            action: () => {
              navigation.navigate('Welcome');
              setVisible(false);
            },
          },
        ]}
        error
      />

      <ActivityIndicator size="large" color={theme.colors.colorTextButton} />
    </S.Container>
  );
};

export default Callback;
