/* eslint-disable array-callback-return, consistent-return, @typescript-eslint/no-shadow */

import React, { useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from 'react-native';
import { parseISO, format } from 'date-fns';
import {
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import Dialog from '../../components/Dialog';
import ArrowRight from '../../assets/img/ArrowRight.png';
import PrimePass from '../../assets/img/prime.png';
import Empty from '../../assets/img/empty.webp';
import Header from '../../components/Header';
import Button from '../../components/Button';
import api from '../../services/api';
import {
  useSessionHistListLazyQuery,
  useServicesHistoryLazyQuery,
} from '../../hooks/graphql/hooks';
import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';
import Footer from '../../components/Footer';
import { ParamsProps, ModalMessageProps } from './types';
import * as S from './styles';

const HistoryResume: React.FC<ParamsProps> = () => {
  const [params] = useState({ from: 'Cinema' });

  const isCinema = params.from === 'Cinema';

  const navigation = useNavigation();
  const [currentScreenTitle, setCurrentScreenTitle] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transformedData, setTransformedData] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false as boolean);
  const [loadingActive, setLoadingActive] = useState({});
  const [dialogContent, setDialogContent] = useState({
    title: '',
    message: '',
    error: true,
    footer: null,
  } as ModalMessageProps);
  const { user } = useAuth();
  const { logEvent } = useAction();

  const [historyList, { data, refetch }] = isCinema
    ? useSessionHistListLazyQuery({
      onCompleted: () => setLoading(false),
    })
    : useServicesHistoryLazyQuery({
      onCompleted: () => setLoading(false),
    });

  useFocusEffect(
    useCallback(() => {
      if (user) {
        if (isCinema) {
          historyList({
            variables: {
              userId: user.id,
            },
          });
        } else {
          historyList({
            variables: {
              user_id: user.id,
              page: 0,
              service_type_name: params.from,
              signature_type: 'B2B',
            },
          });
        }
      }
    }, [historyList, isCinema, params.from, user]),
  );

  useEffect(() => {
    const transformedData = isCinema
      ? data?.sessions_history?.transaction
      : data?.services_history?.signatures;

    if (!isCinema && transformedData) {
      const services = [] as any[];

      transformedData.map((signature: any) => {
        signature.services.map((service: any) => {
          services.push({
            ...service,
            dateStart: signature.dateStart,
            dateFinish: signature.dateFinish,
            isActive: signature.isActive,
            signatureId: signature.id,
          });

          setLoadingActive({
            ...loadingActive,
            [signature.id]: false,
          });
        });
      });

      setTransformedData(services);
      return;
    }

    setTransformedData(transformedData);
  }, [data]);

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'history-resume',
      section: 'page',
      description: `${params.from} history`,
      userId: user ? user.id : '0',
    });
  }, [user]);

  useEffect(() => {
    switch (params.title) {
      case 'Stream TV':
        setCurrentScreenTitle('Seus canais de streaming');
        break;
      case 'Cinema':
        setCurrentScreenTitle('Seus ingressos');
        break;
      case 'Música':
        setCurrentScreenTitle('Seus players de música');
        break;
      default:
        setCurrentScreenTitle('');
    }
  }, [params]);

  const handleNavigateToHistoryTheater = (
    transactionId: string,
    status: string,
    quantity: number,
  ) => {
    if (status === 'canceled') {
      navigation.navigate(
        'HistoryTheater', {
          params: {
            idTransaction: transactionId,
            status,
            from: 'HistoryResume',
          },
        },
      );
      return;
    }

    if (status === 'paid') {
      navigation.navigate('SuccessfullyReleased', {
        selectedTickets: quantity,
        transactionId,
        screenName: 'History',
      });
    }
  };

  const handleNavigateService = async (service: any) => {
    if (service.redeem.redeemed) {
      return navigation.navigate('Promotions', {
        screen: 'RedeemDetails',
        params: {
          ...service,
          from: params.from,
        },
      });
    }

    try {
      setLoadingActive({
        ...loadingActive,
        [`${service.signatureId}:${service.id}`]: true,
      });

      await api.post(`/signatures/${service.signatureId}/redeem/${service.id}`);

      logEvent({
        type: 'log-event',
        flow: 'app',
        group: 'prss',
        context: 'history-resume',
        section: 'activate',
        description: 'Activate service',
        payloadData: {
          service: service.name.toLowerCase(),
          title: service.description.description,
        },
        userId: user ? user.id : '0',
      });

      if (refetch) {
        const newData = (await refetch()).data;
        let newService = {};

        newData?.services_history?.signatures.map((mapSignature: any) => {
          mapSignature.services.map((mapService: any) => {
            if (
              service.id === mapService.id
              && service.signatureId === mapSignature.id
            ) {
              newService = {
                ...mapService,
                dateStart: mapSignature.dateStart,
                dateFinish: mapSignature.dateFinish,
                isActive: mapSignature.isActive,
                signatureId: mapSignature.id,
              };
            }
          });
        });

        setLoadingActive({
          ...loadingActive,
          [`${service.signatureId}:${service.id}`]: false,
        });

        return navigation.navigate('Promotions', {
          screen: 'RedeemDetails',
          params: {
            ...newService,
            from: params.from,
          },
        });
      }
    } catch (error) {
      setDialogContent({
        title: 'Ops, algo deu errado',
        message: 'Tente novamente mais tarde.',
        error: true,
        footer: null,
      });
      setDialogVisible(true);
    } finally {
      setLoadingActive({
        ...loadingActive,
        [`${service.signatureId}:${service.id}`]: false,
      });
    }
  };

  if (loading) {
    return (
      <S.ContainerLoader>
        <ActivityIndicator size={40} color="#fff" />
      </S.ContainerLoader>
    );
  }

  const transformHistoryTheaterStatus = (item: any) => {
    let statusText = '';
    let statusDetail = '';

    // eslint-disable-next-line default-case
    switch (item?.status) {
      case 'authorized':
        statusText = `liberado em ${format(
          parseISO(item?.transactionItems?.[0]?.session?.date),
          'dd/MM/yyyy',
        )}`;
        statusDetail = 'Check-in pendente';
        break;
      case 'paid':
        statusText = `utilizado em ${format(
          parseISO(item?.transactionItems?.[0]?.session?.date),
          'dd/MM/yyyy',
        )}`;
        statusDetail = 'Check-in realizado';
        break;
      case 'canceled':
        statusText = `cancelado em ${format(
          parseISO(item?.transactionItems?.[0]?.session?.date),
          'dd/MM/yyyy',
        )}`;
        statusDetail = 'Cancelado';
        break;
    }

    return {
      text: statusText,
      detail: statusDetail,
    };
  };

  const renderTheaterHistoryItem = (item: any) => {
    const status = transformHistoryTheaterStatus(item);

    return (
      <S.MenuItem
        onPress={() => handleNavigateToHistoryTheater(
          item?.id,
          item?.status,
          item?.transactionItems[0].quantity,
        )}
      >
        <S.ContentInfo>
          <S.Info>
            <S.Row>
              <S.Label>
                {item?.transactionItems?.[0]?.session?.movie?.name}
              </S.Label>
            </S.Row>
            <S.Row>
              <S.Status>
                <S.TextLight>Status: </S.TextLight>
                <S.StatusText status={item?.status}>
                  {status.detail}
                </S.StatusText>
              </S.Status>
              <S.StatusDate>
                <S.TextLight>{status.text}</S.TextLight>
              </S.StatusDate>
            </S.Row>
          </S.Info>
        </S.ContentInfo>
        <S.Icon source={ArrowRight} />
      </S.MenuItem>
    );
  };

  const renderServiceHistoryItem = (service: any) => {
    const dateFinish = format(parseISO(service.dateFinish), 'dd/MM/yyyy');
    return (
      <S.ServiceContainer>
        <S.ServiceCard
          resizeMode={FastImage.resizeMode.cover}
          source={{ uri: service.images.card_web }}
        >
          <S.ServiceCardOverlay>
            {service.images.logo ? (
              <S.OverlayIcon
                source={{ uri: service.images.logo }}
              />
            ) : (
              <S.OverlayIconUnavailable
                source={PrimePass}
              />
            )}
          </S.ServiceCardOverlay>
        </S.ServiceCard>
        <S.ServiceTitle>{service.name}</S.ServiceTitle>
        <S.ServiceSubtitle>
          {service.isActive
            ? `Válido até ${dateFinish} - Status: Ativo \n`
            : `Expirado em ${dateFinish} - Status: Expirado`}
        </S.ServiceSubtitle>

        <View style={{ paddingRight: 8, paddingLeft: 8 }}>
          <Button
            isLoading={loadingActive[`${service.signatureId}:${service.id}`]}
            disable={!service.isActive}
            outline={service.redeem.redeemed}
            style={{
              height: 47,
              marginTop: 8,
            }}
            onPress={() => handleNavigateService(service)}
          >
            {service.redeem.redeemed ? 'Ver acesso' : 'Ativar'}
          </Button>
        </View>
      </S.ServiceContainer>
    );
  };

  const renderItem = ({ item }: any) => {
    if (!isCinema) {
      return renderServiceHistoryItem(item);
    }

    return renderTheaterHistoryItem(item);
  };

  return (
    <S.Fragment>
      <Header title="Histórico de Cinemas" handleGoBack={() => navigation.navigate('MyTickets')} />
      <Dialog
        title={dialogContent.title}
        message={dialogContent.message}
        error={dialogContent.error}
        visible={dialogVisible}
        handleClose={() => setDialogVisible(false)}
        footer={dialogContent.footer}
      />
      <S.Container isCinema={isCinema}>
        {transformedData && transformedData.length > 0 && (
          <>
            <S.Text>{currentScreenTitle}</S.Text>
            <S.Separator>
              <S.LineSeparator />
            </S.Separator>
          </>
        )}
        <FlatList
          numColumns={isCinema ? 1 : 2}
          ListFooterComponent={() => <Footer />}
          refreshControl={(
            <RefreshControl
              tintColor="#fff"
              refreshing={refreshing}
              onRefresh={async () => {
                if (refetch) {
                  setRefreshing(true);
                  await refetch();
                  setRefreshing(false);
                }
              }}
            />
          )}
          ListEmptyComponent={() => (
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
                <S.Button onPress={() => navigation.goBack()} outline>
                  <S.ButtonText>Voltar</S.ButtonText>
                </S.Button>
              </S.ActionsContainer>
            </>
          )}
          data={transformedData}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id + Math.random()}
          style={{ margin: isCinema ? 0 : 16 }}
        />
      </S.Container>
    </S.Fragment>
  );
};

export default HistoryResume;
