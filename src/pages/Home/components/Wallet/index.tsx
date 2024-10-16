import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { formatNumber } from 'react-native-currency-input';
import { useFocusEffect } from '@react-navigation/native';

import { useWallet } from '../../../../hooks/wallet';
import { useAuth } from '../../../../hooks/auth';
import Dialog from '../../../../components/Dialog';
import SkeletonWalletHome from '../../../../components/Skeletons/SkeletonWalletHome';
import * as S from './styles';

const Wallet: React.FC = () => {
  const { user } = useAuth();

  const {
    balance, lastRecharge, loading, fetchWallet, error, hasFetched,
  } = useWallet();

  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchWallet(user.id);
      }
    }, [user]),
  );

  const [dialogVisible, setDialogVisible] = useState(error);

  useEffect(() => {
    if (error) {
      setDialogVisible(true);
    }
  }, [error]);

  return (
    <>
      {(loading && !hasFetched)
        ? (
          <SkeletonWalletHome />
        ) : (
          <S.Container>
            <Dialog
              title="Ops, algo deu errado"
              message="Não foi possível buscar seu saldo. Por favor, tente novamente mais tarde."
              error
              visible={dialogVisible}
              handleClose={() => setDialogVisible(false)}
              footer={null}
            />
            <S.Title>Saldo Primepass atual</S.Title>

            <S.ContentWallet>
              {error ? (
                <S.Balance>
                  R$
                  {' '}
                  --

                </S.Balance>
              ) : (
                <S.Balance>
                  R$
                  {' '}
                  {formatNumber(balance / 100, {
                    separator: ',',
                    precision: 2,
                    delimiter: '.',
                    ignoreNegative: true,
                  })}

                </S.Balance>
              )}

              {lastRecharge !== '' && !error && (
                <S.LastRecharge>
                  Última recarga em
                  {' '}
                  {moment(lastRecharge).format('DD/MM/yyyy')}
                </S.LastRecharge>
              )}

            </S.ContentWallet>

            {/* <S.ContentActions>
      <S.Button disable={false}>
        <S.ButtonText>Adicionar saldo</S.ButtonText>
      </S.Button>
      <S.Button outline disable={false}>
        <S.ButtonText>Ver minha carteira</S.ButtonText>
      </S.Button>
    </S.ContentActions> */}

          </S.Container>
        )}

    </>
  );
};

export default Wallet;
