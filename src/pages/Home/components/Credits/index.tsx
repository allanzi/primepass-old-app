import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useCreditResume } from '../../../../hooks/creditResume';
import SkeletonCreditsHome from '../../../../components/Skeletons/SkeletonCreditsHome';
import { isNetworkConnectionError } from '../../../../utils/graphqlErrors';
import { useUserDetails } from '../../../../hooks/userDetails';
import * as S from './styles';

const Credits: React.FC = () => {
  const {
    creditPlansAmount,
    creditVoucherAmount,
    loading,
    error,
    hasFetched,
  } = useCreditResume();
  const { plansB2C, getHasPlan, hasPlan } = useUserDetails();

  useEffect(() => {
    getHasPlan(creditPlansAmount);
  }, [plansB2C, creditPlansAmount]);

  const showCreditComponent = useCallback(() => {
    if (hasPlan || creditVoucherAmount > 0 || creditPlansAmount > 0) {
      return true;
    }

    return false;
  }, [creditVoucherAmount, hasPlan]);

  const navigation = useNavigation();

  useEffect(() => {
    if (error !== undefined) {
      if (isNetworkConnectionError(error)) {
        return navigation.navigate('ConnectionError');
      }

      return navigation.navigate('ServerError');
    }
  }, [error]);

  const handleNavigateMyTickets = useCallback(() => {
    navigation.navigate('MyTickets');
  }, []);

  const handleNavigateTransactionTheaters = useCallback(() => {
    navigation.navigate('Transactions', {
      screen: 'TransactionTheaters',
      params: {
        from: 'home',
      },
    });
  }, []);

  if (loading && !hasFetched) {
    return <SkeletonCreditsHome />;
  }

  return (
    <>
      {showCreditComponent() && (
        <S.Container>
          {hasPlan && (
            <S.Fragment>
              <S.Title>
                Saldo de ingressos
                {' '}
                <S.Span>do Plano</S.Span>
              </S.Title>
              <S.Ticket disabled={creditPlansAmount === 0}>
                <S.TicketQuantity disabled={creditPlansAmount === 0}>
                  {creditPlansAmount}
                </S.TicketQuantity>
              </S.Ticket>
            </S.Fragment>
          )}

          {creditVoucherAmount > 0 && (
            <S.Fragment>
              <S.Title>
                Saldo de ingressos
                {' '}
                <S.Span>Cortesia</S.Span>
              </S.Title>
              <S.Ticket>
                <S.TicketQuantity>{creditVoucherAmount}</S.TicketQuantity>
              </S.Ticket>
            </S.Fragment>
          )}

          <S.ContentActions>
            <S.Button
              disable={creditPlansAmount + creditVoucherAmount === 0}
              onPress={() => handleNavigateTransactionTheaters()}
            >
              <S.ButtonText
                disabled={creditPlansAmount + creditVoucherAmount === 0}
              >
                Resgatar ingressos
              </S.ButtonText>
            </S.Button>
            <S.Button
              disable={false}
              outline
              onPress={() => handleNavigateMyTickets()}
            >
              <S.ButtonText>Ir para Meus ingressos</S.ButtonText>
            </S.Button>
          </S.ContentActions>
        </S.Container>
      )}
    </>
  );
};

export default Credits;
