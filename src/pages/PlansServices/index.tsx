import React, { useState, useEffect, useCallback } from 'react';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { Platform, View } from 'react-native';
import {
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import 'moment/locale/pt-br';

import { CinemaService } from './types';
import { useSetupQuery } from '../../hooks/graphql/hooks';
import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';
import { useUserDetails } from '../../hooks/userDetails';
import EmptyPlan from '../../components/EmptyPlan';
import Header from '../../components/Header';
import PlanCore from '../../components/PlanCore';
import PlanAdditional from '../../components/PlanAdditional';
import SkeletonPlans from '../../components/Skeletons/SkeletonPlans';
import Services from '../Home/components/Services';
import * as S from './styles';

const PlansServices: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { logEvent } = useAction();

  const [showRedeemButton, setShowRedeemButton] = useState(false);

  const {
    plans, loading, loadUserDetails, hasFetched,
  } = useUserDetails();

  const { data: dataSetup } = useSetupQuery({
    variables: {
      setup_page: 'planos-e-servicos',
    },
  });

  useFocusEffect(
    useCallback(() => {
      if (user) {
        loadUserDetails(
          {
            user_id: user.id,
            page: 0,
            per_page: 50,
            signature_type: 'ALL',
            active_page: 'planServices',
          },
        );
      }
    }, [user]),
  );

  useEffect(() => {
    const setupRedeemButton = dataSetup?.setup_list?.setups?.filter((setup) => setup?.category?.name === 'resgate-de-voucher');
    if (setupRedeemButton && setupRedeemButton?.length >= 1) {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        setShowRedeemButton(Boolean(setupRedeemButton[0]?.tag?.device[Platform.OS]));
      }
    }
  }, [dataSetup]);

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'plans-services',
      section: 'page',
      description: 'plans services',
      userId: user ? user.id : '0',
    });
  }, [user]);

  const handleNavigateRedeem = () => {
    navigation.navigate('Promotions', {
      screen: 'RedeemCode',
    });
  };

  const getAvailability = (cinemaService: CinemaService) => {
    let availability = '';

    const firstDay = cinemaService.rules.day[0];
    const lastDay = cinemaService.rules.day[cinemaService.rules.day.length - 1];
    availability = `de ${moment().day(firstDay).format('dddd')} a ${moment().day(lastDay).format('dddd')}`;

    if (cinemaService.rules.day.length === 7) {
      availability = 'qualquer dia da semana';
    }

    return availability;
  };

  return (
    <AndroidBackHandler
      onBackPress={() => {
        navigation.navigate('TabNavigation');
        return true;
      }}
    >
      <S.Fragment>
        <ScrollView
          style={{ margin: 16, marginTop: 0, marginBottom: 0 }}
        >
          <Header title="Planos & Serviços" handleGoBack={() => navigation.navigate('TabNavigation')} />

          {(loading && !hasFetched)
            ? <SkeletonPlans /> : (
              <S.PlansContainer>
                <S.Title>Planos e pacotes</S.Title>
                {plans.length === 0 ? (
                  <View style={{ marginBottom: 15 }}>
                    <EmptyPlan title="Nenhum plano ou pacote adicionado" />
                  </View>
                ) : plans.map((item) => {
                  if (item.isCore) {
                    let cinemaService = item.services.filter((service: any) => service.type.name.toLowerCase() === 'cinema');
                    cinemaService = cinemaService.length > 0 ? cinemaService[0] : [];

                    let screen = '';
                    let room = '';
                    let availability = '';
                    if (cinemaService.rules) {
                      // eslint-disable-next-line prefer-destructuring
                      screen = cinemaService.rules.screen[0];
                      // eslint-disable-next-line prefer-destructuring
                      room = cinemaService.rules.room[0];
                      availability = getAvailability(cinemaService);
                    }

                    return (
                      <S.PlansDivisor key={item.keyId}>
                        <PlanCore
                          name={item.name}
                          color={item.color}
                          expirationDate={` ${item.expirationDate}`}
                          services={item.services}
                          ticketsQuantity={item.creditQuantity}
                          logo=""
                          ticketRenew={` ${item.ticketRenew}`}
                          screen={screen}
                          room={room}
                          availability={availability}
                          period={item.period}
                          parentSignature={item.parentSignature}
                          isB2C={item.isB2C}
                        />
                      </S.PlansDivisor>
                    );
                  }
                  return (
                    <S.PlansDivisor key={item.keyId}>
                      <PlanAdditional
                        services={item.services}
                        name={`Pacote ${item.name}`}
                        description={item.description}
                        modalContent={item.modalContent}
                      />
                    </S.PlansDivisor>
                  );
                })}

                {showRedeemButton && (
                  <S.ButtonStyled outline onPress={() => handleNavigateRedeem()}>
                    <S.ButtonText>Resgatar voucher</S.ButtonText>
                  </S.ButtonStyled>
                )}
              </S.PlansContainer>
            )}

          <S.Title>Meus Serviços</S.Title>
          <Services />
        </ScrollView>
      </S.Fragment>
    </AndroidBackHandler>
  );
};

export default PlansServices;
