import React, { useCallback, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { isNetworkConnectionError } from '../../../../utils/graphqlErrors';
import { useAuth } from '../../../../hooks/auth';
import { useUserDetails } from '../../../../hooks/userDetails';
import PrimePass from '../../../../assets/img/prime.png';
import SkeletonPlansHome from '../../../../components/Skeletons/SkeletonPlansHome';
import * as S from './styles';

const Plans: React.FC = React.memo(() => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const {
    plans, loading, loadUserDetails, error, hasFetched,
  } = useUserDetails();

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
    if (error !== undefined) {
      if (isNetworkConnectionError(error)) {
        return navigation.navigate('ConnectionError');
      }

      return navigation.navigate('ServerError');
    }
  }, [error]);

  const handleNavigatePlansServices = useCallback(() => {
    navigation.navigate('PlansServices');
  }, []);

  if (loading && !hasFetched) {
    return (
      <SkeletonPlansHome />
    );
  }

  return (
    <>
      {plans.length > 0
          && (
            <S.Container>
              <S.Title>Planos e pacotes</S.Title>

              {plans && plans.slice(0, 3).map((plan) => (
                <S.Plan aditional={!plan.isCore} color={plan.color} key={plan.id}>
                  <S.Icon source={PrimePass} />
                  <S.NamePlan>{plan.name}</S.NamePlan>
                </S.Plan>
              ))}

              <S.ContentActions>
                <S.Button outline onPress={() => handleNavigatePlansServices()} disable={false}>
                  <S.ButtonText>Ver meus planos e serviços</S.ButtonText>
                </S.Button>
              </S.ContentActions>
            </S.Container>
          )}
    </>
  );
});

export default Plans;
