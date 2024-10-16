import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Platform } from 'react-native';

import Api from '../../../../services/api';
import { BannerType } from '../../../../components/Carousel/components/Banner/types';
import { useSetupQuery } from '../../../../hooks/graphql/hooks';
import Badge from '../../../../components/Badge';
import Carousel from '../../../../components/Carousel';
import { useCreditResume } from '../../../../hooks/creditResume';
import { useAuth } from '../../../../hooks/auth';
import { useUserDetails } from '../../../../hooks/userDetails';
import * as S from './styles';

const Header: React.FC = React.memo(() => {
  const navigation = useNavigation();
  const [banners, setBanners] = useState([]);
  const { plansB2C, getHasPlan, hasPlan } = useUserDetails();

  useFocusEffect(
    useCallback(() => {
      const fetchBanners = async () => {
        try {
          const { data: { data } } = await Api.get('banners');
          setBanners(data.filter((banner: BannerType) => banner.type === 'APP'));
        } catch (_) {
          navigation.navigate('ServerError');
        }
      };

      fetchBanners();

      return () => {
        setBanners([]);
      };
    }, []),
  );

  const { data: dataSetup } = useSetupQuery({
    variables: {
      setup_page: 'home-app',
    },
  });

  const [showRedeemButton, setShowRedeemButton] = useState(false);

  useEffect(() => {
    const setupRedeemButton = dataSetup?.setup_list?.setups?.filter(
      (setup) => setup?.category?.name === 'resgate-de-voucher',
    );
    if (setupRedeemButton && setupRedeemButton?.length >= 1) {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        setShowRedeemButton(Boolean(setupRedeemButton[0]?.tag?.device[Platform.OS]));
      }
    }
  }, [dataSetup]);

  const {
    creditPlansAmount, creditVoucherAmount,
  } = useCreditResume();

  const { user } = useAuth();

  useEffect(() => {
    getHasPlan(creditPlansAmount);
  }, [plansB2C]);

  const handleNavigateRedeem = useCallback(() => {
    navigation.navigate('Promotions', {
      screen: 'RedeemCode',
    });
  }, []);

  const handleNavigateTransactionTheaters = useCallback(() => {
    navigation.navigate('Transactions', {
      screen: 'TransactionTheaters',
      params: {
        from: 'home',
      },
    });
  }, []);

  return (
    <>
      {banners.length > 0 && (
        <Carousel data={banners} />
      )}

      <S.Fragment>
        {banners.length === 0
          && (
            <S.ImageContainer>
              <S.Image
                source={require('../../../../assets/img/home-background.png')}
              />
              <S.GradientBottom
                start={{ x: 0, y: 0.01 }}
                end={{ x: 0, y: 0.9 }}
                colors={['rgba(0, 0, 0, 0.7)', 'transparent', '#212121']}
              />
            </S.ImageContainer>
          )}

        <S.Container noPadding={banners.length >= 0}>
          <Badge
            name="Boas vindas a Primepass"
            type="outline"
            style={{ paddingLeft: 5, paddingRight: 5, width: 120 }}
          />
          <S.Title>
            Olá,
            {' '}
            {user ? user.name.split(' ')[0] : ''}
            .
          </S.Title>
          <S.Subtitle>
            Veja aqui seus planos e pacotes assinados,
            {'\n'}
            ingressos de cinema e serviços de stream.
          </S.Subtitle>

          {showRedeemButton && (
            <S.Button onPress={handleNavigateRedeem} disable={false}>
              <S.ButtonText>Resgatar voucher</S.ButtonText>
            </S.Button>
          )}
          {(hasPlan || creditVoucherAmount > 0)
            && (
              <S.Button
                onPress={handleNavigateTransactionTheaters}
                outline
                disable={creditPlansAmount + creditVoucherAmount <= 0}
              >
                <S.ButtonText disable={creditPlansAmount + creditVoucherAmount <= 0}>
                  Resgatar ingresso de cinema
                </S.ButtonText>
              </S.Button>
            )}
        </S.Container>
      </S.Fragment>
    </>
  );
});

export default Header;
