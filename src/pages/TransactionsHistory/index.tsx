import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';

import FastImage from 'react-native-fast-image';
import { useAction } from '../../hooks/actions';
import { useAuth } from '../../hooks/auth';
import { Transaction } from '../../@types/graphql/schemas';
import ArrowRight from '../../assets/img/ArrowRight.png';
import Empty from '../../assets/img/empty.webp';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SkeletonTransactionsHistory from '../../components/Skeletons/SkeletonTransactionsHistory';
import TicketIcon from '../../assets/img/ticket.svg';
import * as S from './styles';
import { useTransactionsHistory } from '../../hooks/transactionsHistory';

const TransactionsHistory: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { logEvent } = useAction();

  const [refreshing, setRefreshing] = useState(false);
  const {
    data, loading, loadTransactionsHistory, hasFetched,
  } = useTransactionsHistory();

  useFocusEffect(
    useCallback(() => {
      loadTransactionsHistory({
        userId: user.id,
        id: undefined,
        status: undefined,

      });

      logEvent({
        type: 'log-screen',
        flow: 'app',
        group: 'scrn',
        context: 'history',
        section: 'page',
        description: 'History',
        userId: user ? user.id : '0',
      });
    }, [user]),
  );

  const getQuantity = (transaction: Transaction) => {
    if (transaction) {
      const transactionFiltered = transaction.transactionItems
        .filter((transactionItem) => transactionItem.itemType === 'theater');
      return transactionFiltered.length > 0 ? transactionFiltered[0].quantity : 0;
    }
    return 0;
  };

  const getStatus = (transaction: Transaction) => {
    if (transaction) {
      switch (transaction.status) {
        case 'canceled':
          return 'Cancelado';
        case 'authorized':
          if (transaction.ttl === 0) {
            return 'Expirado';
          }
          return 'Aguardando Check-in';
        case 'paid':
          if ((moment(transaction.expireAt).diff(moment(), 'days') < 0)) {
            return 'Expirado';
          }
          return 'Ativo';
        default:
          return '--';
      }
    }
    return '--';
  };

  const getStatusDetails = (transaction: Transaction) => {
    if (transaction) {
      switch (transaction.status) {
        case 'canceled':
          return `Cancelado em ${moment(transaction.updatedAt).format('DD/MM/YYYY')}`;
        case 'authorized':
          if (transaction.ttl === 0) {
            return `Expirado em ${moment(transaction.expireAt).format('DD/MM/YYYY')}`;
          }
          return `Check-in até ${moment().add(transaction.ttl, 'seconds').format('DD/MM/YYYY')}`;
        case 'paid':
          if ((moment(transaction.expireAt).diff(moment(), 'days') < 0)) {
            return `Expirado em ${moment(transaction.expireAt).format('DD/MM/YYYY')}`;
          }
          return `Válido até ${moment(transaction.expireAt).format('DD/MM/YYYY')}`;
        default:
          return '--';
      }
    }
    return '--';
  };

  const handleRedirect = (transaction: Transaction) => {
    const status = getStatus(transaction);
    if (status === 'Ativo' || status === 'Aguardando Check-in') {
      const address = `${transaction?.solicitation?.theater?.address.name}, `
      + `${transaction?.solicitation?.theater?.address.number} - `
      + `${transaction?.solicitation?.theater?.address.district}, `
      + `${transaction?.solicitation?.theater?.address.city?.name || ''}/`
      + `${transaction?.solicitation?.theater?.address.city?.state || ''}`;

      navigation.navigate('Transactions', {
        screen: 'TransactionCheckIn',
        params: {
          theaterName: transaction?.solicitation?.theater?.name || '',
          ticketQuantity: getQuantity(transaction),
          screenType: transaction.solicitation.screens[0],
          roomType: transaction.solicitation.rooms[0],
          transactionId: transaction.id,
          address,
          ttl: transaction.ttl,
          status: transaction.status,
          from: 'TransactionHistory',
          transaction,
        },
      });
    }
  };

  return (
    <S.Fragment>
      <S.Container>
        <FlatList
          refreshControl={(
            <RefreshControl
              tintColor="#fff"
              titleColor="#fff"
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await loadTransactionsHistory({
                  userId: user.id,
                  id: undefined,
                  status: undefined,
                });
                setRefreshing(false);
              }}
            />
          )}
          ListHeaderComponent={() => {
            if (loading && !hasFetched) {
              return (
                <>
                  <Header
                    title="Histórico de ingressos"
                    handleGoBack={() => navigation.navigate('MyTickets')}
                  />
                  <SkeletonTransactionsHistory />

                </>
              );
            }
            if (data?.length > 0) {
              return (
                <>
                  <Header
                    title="Histórico de ingressos"
                    handleGoBack={() => navigation.navigate('MyTickets')}
                  />
                  <S.Separator>
                    <S.LineSeparator />
                  </S.Separator>
                </>
              );
            }
            return (
              <>
                <Header
                  title="Histórico de ingressos"
                  handleGoBack={() => navigation.navigate('MyTickets')}
                />
              </>
            );
          }}
          data={data}
          keyExtractor={(item: Transaction) => item.id}
          renderItem={({ item }) => (
            <>
              <S.ItemContainer>
                <S.Item onPress={() => handleRedirect(item)}>
                  <S.ContentInfo>
                    <TicketIcon fill="#A2A2A2" />
                    <S.MenuInfo>
                      <S.Title>
                        {getQuantity(item)}
                        {' '}
                        {getQuantity(item) > 1 ? 'ingressos' : 'ingresso'}
                        {' | '}
                        {item?.solicitation?.theater?.name}
                      </S.Title>
                      <S.Subtitle>
                        <S.Text>
                          Status:
                          {' '}
                          <S.TextColor status={getStatus(item)}>
                            {getStatus(item)}
                          </S.TextColor>
                        </S.Text>
                        <S.Text>{getStatusDetails(item)}</S.Text>
                      </S.Subtitle>
                    </S.MenuInfo>
                  </S.ContentInfo>
                  <S.Icon source={ArrowRight} />
                </S.Item>
              </S.ItemContainer>
            </>
          )}
          ListEmptyComponent={() => (
            <>
              {!loading && (
                <>
                  <S.CardContainer
                    source={Empty}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <S.EmptyText>Não há nenhum registro</S.EmptyText>
                  <S.EmptySubtitle>
                    Você ainda não possui nenhum registro de ingressos de cinema resgatados.
                  </S.EmptySubtitle>

                  <S.ActionsContainer>
                    <S.Button
                      disable={false}
                      outline
                      onPress={() => { navigation.goBack(); }}
                    >
                      <S.ButtonText>
                        Voltar
                      </S.ButtonText>
                    </S.Button>
                  </S.ActionsContainer>
                </>
              )}
            </>
          )}
          ListFooterComponent={(
            <Footer />
          )}
        />
      </S.Container>
    </S.Fragment>
  );
};

export default TransactionsHistory;
