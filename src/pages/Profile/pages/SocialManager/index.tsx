import React, { useState } from 'react';
import { RefreshControl, ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import type { DialogErrors, GetAutenticator } from './types.d';
import { usePartnerLoginQuery } from '../../../../hooks/graphql/hooks';
import useSocialManager from '../../../../hooks/SocialManager';
import PlusCircle from '../../../../assets/img/PlusCircle.png';
import Trash from '../../../../assets/img/trash.png';
import Header from '../../../../components/Header';
import Accordion, { AccordionAction } from '../../../../components/Accordion';
import { useAuth } from '../../../../hooks/auth';
import Dialog from '../../../../components/Dialog';
import { UnlinkParam } from '../../../../hooks/SocialManager/types';
import * as S from './styles';

const ManagerSocial = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const {
    appleAuthenticator,
    setCallBackError,
    unlink,
    link,
  } = useSocialManager(user.id);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingApi, setLoadingApi] = useState<boolean>(false);

  const [dialogErrors, setDialogErrors] = useState<DialogErrors>({
    title: '',
    message: '',
    visible: false,
  });

  const { data, loading, fetchMore } = usePartnerLoginQuery({
    variables: {
      user_id: user.id,
    },
    nextFetchPolicy: 'network-only',
  });

  const showDialog = (title: string, message?: string): void => {
    setDialogErrors({
      title,
      message,
      visible: true,
    });
  };

  const getAutenticator = (name: string): GetAutenticator => {
    switch (name) {
      case 'apple':
        return appleAuthenticator;
      default:
        return () => {
          showDialog(
            'Ops, algo deu errado',
            'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
          );
          return Promise.resolve(false);
        };
    }
  };

  const handleLink = async (partnerType: string) => {
    try {
      setLoadingApi(true);
      const autenticator = getAutenticator(partnerType);
      const success = await autenticator();

      if (!success) {
        return;
      }

      const isLinked = await link();

      if (isLinked) {
        fetchMore({});
      }
      setLoadingApi(false);
    } catch (error) {
      showDialog(
        'Ops! Algo aconteceu',
        'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      );
    }
  };

  const handleUnlik = async (partnerType: string) => {
    try {
      setLoadingApi(true);
      const isUnlinked = await unlink(partnerType as UnlinkParam);

      if (isUnlinked) {
        fetchMore({});
      }
      setLoadingApi(false);
    } catch (error) {
      showDialog(
        'Ops! Algo aconteceu',
        'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      );
    }
  };

  setCallBackError(() => {
    showDialog(
      'Ops! Algo aconteceu',
      'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
    );
  });

  if (loading) {
    return (
      <S.Container>
        <Header
          title="Contas associadas"
          handleGoBack={() => navigation.navigate('Profile')}
        />

        <ActivityIndicator size={40} color="#fff" style={{ marginTop: 15 }} />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <Header title="Contas associadas" />
      <Dialog
        title={dialogErrors.title}
        message={dialogErrors.message}
        visible={dialogErrors.visible}
        error
        handleClose={() => setDialogErrors((info) => ({ ...info, visible: false }))}
      />
      <S.MenuContainer>
        <S.Separator>
          <S.LineSeparator />
        </S.Separator>
        <ScrollView
          style={{ minHeight: '100%' }}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                if (fetchMore) {
                  setRefreshing(true);
                  await fetchMore({});
                  setRefreshing(false);
                }
              }}
              tintColor="#fff"
            />
          )}
        >
          {data?.partner_login_list
            ?.filter((partner) => partner?.active)
            .map((social) => {
              if (
                Platform.OS === 'android'
                && social?.partnerType === 'apple'
              ) {
                return <React.Fragment key="void-account" />;
              }

              return (
                <Accordion
                  key={`Account-${social?.label}`}
                  title={social?.label as string}
                  description={
                    social?.hasLogin
                      ? 'Connectado'
                      : `Associe sua conta ${social?.label}`
                  }
                  icon={{
                    uri: social?.icon as string,
                  }}
                >
                  <AccordionAction
                    onPress={() => (social?.hasLogin
                      ? handleUnlik(social?.partnerType as string)
                      : handleLink(social?.partnerType as string))}
                    icon={social?.hasLogin ? Trash : PlusCircle}
                    loading={loadingApi}
                    label={
                      social?.hasLogin ? 'Remover conta' : 'Adicionar conta'
                    }
                  />
                </Accordion>
              );
            })}
        </ScrollView>
      </S.MenuContainer>
    </S.Container>
  );
};

export default ManagerSocial;
