/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useCallback, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useRoute, useNavigation, CommonActions } from '@react-navigation/native';

import Toast from './components/Toast';
import Header from '../../components/Header';
import HistoryTicket from './components/HistoryTicket';
import TutorialTicket from './components/TutorialTicket';
import copyIcon from '../../assets/img/copyIcon.png';
import Clipboard from '../../utils/clipboard';
import { useSessionHistDetailsLazyQuery } from '../../hooks/graphql/hooks';
import { useAuth } from '../../hooks/auth';
import { RouteProps } from './types';
import * as S from './styles';

const HistoryTheater: React.FC = () => {
  const route = useRoute();
  const { params } = route.params as RouteProps;
  const paramStatusCancelled = () => (params?.status === 'canceled');
  const [isCanceled, setIsCanceled] = useState(paramStatusCancelled());
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    e.preventDefault();
    navigation.navigate('HistoryResume', {
      from: 'Cinema',
      title: 'Cinemas',
    });
  }), [navigation]);

  const [
    otherOptions,
    { data, loading, error },
  ] = useSessionHistDetailsLazyQuery();

  const ticketAmount = data?.sessions_history?.transaction?.[0]?.transactionItems?.[0]?.quantity;

  useEffect(() => {
    if (params?.idTransaction) {
      otherOptions({
        variables: {
          userId: user.id,
          transactionId: `${params?.idTransaction}`,
        },
      });
    }
  }, []);

  const navigateToHome = useCallback(() => {
    navigation.navigate('Home');
  }, []);

  const goBackHistory = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <S.ContainerLoader>
        <ActivityIndicator size={40} color="#fff" />
      </S.ContainerLoader>
    );
  }

  return (
    <>
      {isCanceled ? (
        <S.Container>
          <Header
            status={params?.status}
            translucent={false}
            title="Ingresso cancelado"
            handleGoBack={navigateToHome}
          />
          <Toast canceled={isCanceled} />

          <HistoryTicket
            ticketData={
              data?.sessions_history?.transaction?.[0]?.transactionItems
            }
            isActive
            UserTicketAmount={6}
            inHist
            status={params?.status}
          />

          <S.Message>
            <S.MessageTitle>
              <S.MessageTitleText>Ingresso cancelado</S.MessageTitleText>
            </S.MessageTitle>

            <S.NextSteps>
              <S.NextStepsText>
                Este ingresso não pode ser utilizado, porque está cancelado!
              </S.NextStepsText>
            </S.NextSteps>
          </S.Message>

          <S.ActionsContainer>
            <S.Button outline={false} onPress={navigateToHome}>
              <S.ButtonText>Voltar para página inicial</S.ButtonText>
            </S.Button>
          </S.ActionsContainer>
        </S.Container>
      ) : (
        <S.Container>
          <Toast />

          <Header
            status={params?.status}
            translucent={false}
            title="Ingresso liberado"
            handleGoBack={goBackHistory}
          />

          <S.Scroll showsVerticalScrollIndicator={false}>
            {data?.sessions_history && (
              <HistoryTicket
                ticketData={
                  data?.sessions_history?.transaction?.[0]?.transactionItems
                }
                inHist
                status={params?.status}
              />
            )}
            <S.Content>
              {params?.status === 'paid' && (
                <S.Section>
                  {Number(ticketAmount) === 1 ? (
                    <S.Label>
                      Código do seu
                      {' '}
                      <S.TotalTicketsLabel>
                        {ticketAmount}
                        {' '}
                        ingresso
                      </S.TotalTicketsLabel>
                    </S.Label>
                  ) : (
                    <S.Label>
                      Código do seus
                      {' '}
                      <S.TotalTicketsLabel>
                        {ticketAmount}
                        {' '}
                        ingressos
                      </S.TotalTicketsLabel>
                    </S.Label>
                  )}

                  <S.TicketsCodeContainer>
                    {data?.sessions_history?.transaction?.[0]?.listCode
                      ?.length === 0 && (
                      <S.TicketCode lastItem copy={false}>
                        <S.TotalTicketsLabel>
                          Não foi possível listar os ingressos
                        </S.TotalTicketsLabel>
                      </S.TicketCode>
                    )}
                    {data?.sessions_history?.transaction?.[0]?.listCode?.map(
                      (item, index, array) => (
                        <S.TicketCode
                          lastItem={array?.length === index + 1}
                          key={item}
                          copy
                        >
                          <S.TicketCodeText copy>{item}</S.TicketCodeText>
                          <S.CopyContainer onPress={() => Clipboard(item)}>
                            <S.IconCopy source={copyIcon} />
                          </S.CopyContainer>
                        </S.TicketCode>
                      ),
                    )}
                  </S.TicketsCodeContainer>
                </S.Section>
              )}
              <S.Section>
                <TutorialTicket />
              </S.Section>
              <S.ActionsContainer>
                <S.Button outline={false} onPress={navigateToHome}>
                  <S.ButtonText>Voltar para página inicial</S.ButtonText>
                </S.Button>
              </S.ActionsContainer>
            </S.Content>
          </S.Scroll>
        </S.Container>
      )}
    </>
  );
};

export default HistoryTheater;
