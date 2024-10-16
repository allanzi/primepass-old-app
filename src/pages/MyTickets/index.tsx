import React, {
  useCallback, useEffect, useState,
} from 'react';
import {
  ActivityIndicator, Linking, Platform, RefreshControl, SectionList, View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { SITE } from '@env';
import { useAuth } from '../../hooks/auth';
import { useCreditResume } from '../../hooks/creditResume';
import { useSetupQuery } from '../../hooks/graphql/hooks';
import ArrowRight from '../../assets/img/ArrowRight.png';
import CardTicketResume from './Components/CardTicketResume';
import Header from '../../components/Header';
import * as S from './styles';
import { Section } from './types';

const MyTickets: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [showRedeemButton, setShowRedeemButton] = useState(false);
  const [showSignatureButton, setShowSignatureButton] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sections, setSections] = useState([] as Section[]);

  const {
    creditPlans, creditVoucher, loadCreditResume, loading, hasFetched,
  } = useCreditResume();

  const { data: dataSetup } = useSetupQuery({
    fetchPolicy: 'no-cache',
    variables: {
      setup_page: 'meus-ingressos',
    },
  });

  useFocusEffect(
    useCallback(() => {
      if (user) {
        loadCreditResume({ user_id: user.id });
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
    const setupSignatureButton = dataSetup?.setup_list?.setups?.filter((setup) => setup?.category?.name === 'assinar-agora');
    if (setupSignatureButton && setupSignatureButton?.length >= 1) {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        setShowSignatureButton(Boolean(setupSignatureButton[0]?.tag?.device[Platform.OS]));
      }
    }
  }, [dataSetup]);

  useEffect(() => {
    const newSections = [] as Section[];

    if (creditPlans.length > 0) {
      newSections.push({
        title: 'Ingressos do Meu plano',
        data: creditPlans,
      });
    }

    if (creditVoucher.length > 0) {
      newSections.push({
        title: 'Ingressos Cortesia',
        data: creditVoucher,
      });
    }

    setSections(newSections);
  }, [creditPlans, creditVoucher]);

  const handleRedeem = () => {
    navigation.navigate('Promotions', {
      screen: 'RedeemCode',
    });
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }}>
      <CardTicketResume
        totalCredits={item.totalCredits}
        creditUsed={item.usedCredits}
        fromPlan={item.fromPlan}
        finishDate={item.finishDate || ''}
        screen={item.screen}
        room={item.room}
        days={item.day}
      />
    </View>
  );

  if (loading && !hasFetched) {
    return (
      <S.Fragment>
        <Header title="Meus ingressos" handleGoBack={() => navigation.navigate('TabNavigation')} />
        <S.ContainerLoader>
          <ActivityIndicator size={40} color="#fff" />
        </S.ContainerLoader>
      </S.Fragment>
    );
  }

  return (
    <S.Fragment>
      <SectionList
        refreshControl={(
          <RefreshControl
            tintColor="#fff"
            titleColor="#fff"
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              loadCreditResume({ user_id: user.id });
              setRefreshing(false);
            }}
          />
        )}
        ListHeaderComponent={(
          <>
            <Header title="Meus ingressos" handleGoBack={() => navigation.navigate('TabNavigation')} />
            <S.MenuContainer>
              <S.MenuItem onPress={() => navigation.navigate('Transactions', { screen: 'TransactionsHistory' })}>
                <S.ContentInfo>
                  <S.MenuIcon source={{
                    uri:
                    'https://primepass-imagens.s3.us-east-1.amazonaws.com/gray_icone-ticket-32px.png',
                  }}
                  />
                  <S.MenuInfo>
                    <S.MenuLabel>Histórico de ingressos</S.MenuLabel>
                    <S.MenuLabelComment>
                      Consulte ingressos resgatados
                    </S.MenuLabelComment>
                  </S.MenuInfo>
                </S.ContentInfo>
                <S.Icon source={ArrowRight} />
              </S.MenuItem>
              <S.MenuItem onPress={() => navigation.navigate('HistoryResume')}>
                <S.ContentInfo>
                  <S.MenuIcon source={{
                    uri:
                    'https://primepass-imagens.s3.us-east-1.amazonaws.com/gray_icone-ticket-32px.png',
                  }}
                  />
                  <S.MenuInfo>
                    <S.MenuLabel>Histórico de filmes</S.MenuLabel>
                    <S.MenuLabelComment>
                      Consulte os filmes vistos anteriormente
                    </S.MenuLabelComment>
                  </S.MenuInfo>
                </S.ContentInfo>
                <S.Icon source={ArrowRight} />
              </S.MenuItem>
            </S.MenuContainer>
          </>

        )}
        sections={sections}
        ListEmptyComponent={(
          <S.Container>
            <S.Image
              source={{
                uri: 'https://primepass-imagens.s3.amazonaws.com/6_como-utilizar.png',
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <S.EmptyTitle>Nenhum ingresso disponível</S.EmptyTitle>
            <S.EmptySubtitle>
              Ainda não foi registrada nenhuma atividade
              {'\n'}
              relacionada a resgates ou planos com
              {'\n'}
              ingressos de cinema.
            </S.EmptySubtitle>
            <S.ButtonsSignatureContainer>
              {showSignatureButton && (
                <S.ButtonPrimary onPress={() => Linking.openURL(`${SITE}/assinar-agora`)} outline={false}>
                  <S.ButtonText>Assinar agora</S.ButtonText>
                </S.ButtonPrimary>
              )}

              {showRedeemButton && (
                <S.ButtonPrimary onPress={() => handleRedeem()} outline>
                  <S.ButtonText>Resgate de código</S.ButtonText>
                </S.ButtonPrimary>
              )}

            </S.ButtonsSignatureContainer>
          </S.Container>
        )}
        keyExtractor={(item, key) => `${key}`}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <S.Text style={{ marginLeft: 16, marginBottom: 5 }}>
            {title}
          </S.Text>
        )}
        stickySectionHeadersEnabled={false}
      />
    </S.Fragment>
  );
};

export default MyTickets;
