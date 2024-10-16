/* eslint-disable @typescript-eslint/no-shadow, @typescript-eslint/no-unused-vars, */

import React, {
  useCallback, useEffect, useState, useContext,
} from 'react';
import { ActivityIndicator } from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { getVersion, getBuildNumber } from 'react-native-device-info';
import {
  useNavigation,
  useRoute,
  CommonActions,
  useFocusEffect,
} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
import HTML from 'react-native-render-html';
import moment from 'moment';

import { ThemeContext } from 'styled-components';
import Button from '../../components/Button';
import Clipboard from '../../utils/clipboard';
import copyIcon from '../../assets/img/copyIcon.png';
import Header from '../../components/Header';
import OpenExternalLink from '../../utils/openExternalLink';
import Ticket from '../../components/Ticket';
import TicketRules from './components/TicketRules';
import Toast from './components/Toast';
import TutorialTicket from './components/TutorialTicket';
import Review from '../Review';
import SkeletonSuccessfullyReleased from '../../components/Skeletons/SkeletonSuccessfullyReleased';
import { useSessionHistDetailsLazyQuery } from '../../hooks/graphql/hooks';
import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';
import * as S from './styles';

interface RouteProps {
  selectedTickets: number;
  dataTicket: any;
  transactionId: string;
  screenName: string;
}

const SuccessfullyReleased: React.FC = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useContext(ThemeContext);

  const { user } = useAuth();
  const { logEvent } = useAction();

  const route = useRoute();
  const params = route?.params as RouteProps;

  const [
    codeSession,
    { data: dataSession, loading },
  ] = useSessionHistDetailsLazyQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (params?.transactionId) {
      codeSession({
        variables: {
          userId: user?.id,
          transactionId: params?.transactionId,
        },
      });
    }
  }, [codeSession, params, user]);

  // useFocusEffect(
  //   useCallback(() => {
  //     AsyncStorage.getItem('review-version').then((value) => {
  //       if (!value || value !== `${getVersion()}-${getBuildNumber()}`) {
  //         setTimeout(() => setModalVisible(true), 3000);
  //       }
  //     });
  //   }, []),
  // );

  const isCinemark = () => (
    dataSession?.sessions_history?.transaction?.[0]?.transactionItems?.[0]
      ?.session?.theater?.cinema?.id
      === 'deee6bab-1754-41ef-b118-78df2d92c70b'
  );

  const hasSeat = () => dataSession?.sessions_history?.transaction?.[0]?.transactionItems?.[0]
    ?.session?.theater?.seat;

  const getTicketRedemption = () => {
    let text = '';

    dataSession?.sessions_history?.transaction?.[0]?.transactionItems?.[0]
      // eslint-disable-next-line no-return-assign
      ?.session?.theater?.cinema?.ticketRedemption?.steps?.map((step) => text += `<div style='margin: 18px 0;'>${step}</div>`);

    return text;
  };

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'successfully-release',
      section: 'page',
      description: 'Theater ticket confirmed successfully',
      userId: user ? user.id : '0',
    });
  }, [user]);

  const handleNavigateToTheater = useCallback(() => {
    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'successfully-release',
      section: 'back-home',
      description: 'CheckIn back to home page',
      userId: user ? user.id : '0',
    });
    navigation.dispatch(CommonActions.navigate('Theaters'));
    navigation.navigate('Home');
  }, []);

  const handleExternalLink = useCallback((link: string) => {
    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'successfully-release',
      section: 'external-link',
      description: 'CheckIn go to page',
      userId: user ? user.id : '0',
    });
    OpenExternalLink(link);
  }, []);

  const onBackButtonPressAndroid = () => {
    navigation.navigate('HistoryResume', {
      from: 'Cinema',
      title: 'Cinemas',
    });
    return true;
  };

  const getIngressoCartLink = () => {
    try {
      return dataSession?.sessions_history?.transaction?.[0]
        ?.transactionItems?.[0]?.session?.attributes.filter((attribute) => attribute.attributeType.name === 'seat_reservation_url')[0].value;
    } catch (_error) {
      return 'https://www.ingresso.com';
    }
  };

  return (
    <AndroidBackHandler onBackPress={onBackButtonPressAndroid}>
      <S.Container>
        <Toast />
        <Header
          translucent
          title="Liberado com sucesso"
          handleGoBack={onBackButtonPressAndroid}
        />
        <Review visible={modalVisible} setVisible={setModalVisible} />

        <S.Scroll showsVerticalScrollIndicator={false}>
          {loading ? (
            <S.ContainerLoader>
              <SkeletonSuccessfullyReleased />
            </S.ContainerLoader>
          ) : (
            <>
              <Ticket
                isActive
                UserTicketAmount={params?.selectedTickets}
                dataTicket={[
                  dataSession?.sessions_history?.transaction?.[0]
                    ?.transactionItems?.[0]?.session,
                ]}
              />

              <S.Content>
                <S.Section>
                  <S.Label>
                    Código do seu(s)
                    {' '}
                    <S.TotalTicketsLabel>
                      {params?.selectedTickets}
                      {' '}
                      ingresso(s)
                    </S.TotalTicketsLabel>
                  </S.Label>

                  <S.TicketsCodeContainer>
                    {dataSession?.sessions_history?.transaction?.[0]?.status === 'paid' ? (
                      <>
                        {dataSession?.sessions_history?.transaction?.[0]?.listCode
                          ?.length === 0 && (
                          <S.TicketCode lastItem copy={false}>
                            <S.TotalTicketsLabel>
                              Não foi possível listar os ingressos
                            </S.TotalTicketsLabel>
                          </S.TicketCode>
                        )}
                        {dataSession?.sessions_history?.transaction?.[0]?.listCode?.map(
                          (item, index, array) => (
                            <S.TicketCode
                              key={`${String(index)}-${item}}`}
                              lastItem={array?.length === index + 1}
                              copy
                            >
                              <S.TicketCodeText copy>{item}</S.TicketCodeText>
                              <S.CopyContainer onPress={() => Clipboard(item)}>
                                <S.IconCopy source={copyIcon} />
                              </S.CopyContainer>
                            </S.TicketCode>
                          ),
                        )}
                      </>
                    ) : (
                      <S.ContainerLoader>
                        <ActivityIndicator size={22} color="#fff" />
                      </S.ContainerLoader>
                    )}
                  </S.TicketsCodeContainer>
                </S.Section>

                <S.Section>
                  {hasSeat() && (
                    <>
                      {dataSession?.sessions_history?.transaction[0]
                        ?.transactionItems[0]?.session?.date === moment().format('YYYY-MM-DD') && (
                        <>
                          <S.ContainerButton>
                            <Button
                              disable={false}
                              onPress={() => handleExternalLink(getIngressoCartLink())}
                            >
                              Ir para Ingresso.com
                            </Button>
                          </S.ContainerButton>
                          <S.ContainerButton>
                            <Button
                              style={{ marginTop: -20 }}
                              disable={false}
                              outline
                              onPress={handleNavigateToTheater}
                            >
                              Voltar para página inicial
                            </Button>
                          </S.ContainerButton>
                        </>
                      )}
                    </>
                  )}

                  <S.ContainerSteps>
                    <S.Title>
                      Como utilizar meu ingresso
                    </S.Title>

                    {getTicketRedemption().length <= 0 ? (
                      <TutorialTicket />
                    ) : (
                      <HTML
                        source={{
                          html: getTicketRedemption(),
                        }}
                        baseFontStyle={{
                          lineHeight: 30,
                          fontSize: 14,
                          color: theme.colors.colorText,
                        }}
                      />
                    )}
                  </S.ContainerSteps>
                </S.Section>

                <>
                  <S.Section>
                    <S.PartnerContainer>
                      <S.Text>Em parceria com:</S.Text>
                      <S.LogoPartner
                        source={{
                          uri:
                        dataSession?.sessions_history?.transaction[0]
                          ?.transactionItems[0]?.session?.theater?.cinema?.logo,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </S.PartnerContainer>
                  </S.Section>
                  <S.Section>
                    <TicketRules />
                  </S.Section>
                </>
              </S.Content>
            </>
          )}

        </S.Scroll>
      </S.Container>
    </AndroidBackHandler>
  );
};

export default SuccessfullyReleased;
