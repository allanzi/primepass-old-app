import React, { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AndroidBackHandler } from 'react-navigation-backhandler';
import { useAction } from '../../../../hooks/actions';
import { useAuth } from '../../../../hooks/auth';
import Clipboard from '../../../../utils/clipboard';
import CopyIcon from '../../../../assets/img/copy.svg';
import Header from '../../../../components/Header';
import PinIcon from '../../../../assets/img/pinInactive.svg';
import * as S from './styles';

interface RouteProps {
  latitude: number;
  longitude: number;
  theaterName: string;
  shopping: string;
  distance: string;
  address: string;
}

const TheaterMap: React.FC = () => {
  const { user } = useAuth();
  const { logEvent } = useAction();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as RouteProps;
  const {
    longitude, latitude, theaterName, shopping, address, distance,
  } = params;

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'transaction-theater-map',
      section: 'page',
      description: 'transaction theater map',
      userId: user ? user.id : '0',
    });
  }, [user]);

  const handleNavigateTransactionTheaters = useCallback(() => {
    navigation.navigate('Transactions', {
      screen: 'TransactionTheaters',
      params: {
        from: 'theaterMap',
      },
    });
  }, []);

  return (
    <AndroidBackHandler
      onBackPress={() => {
        handleNavigateTransactionTheaters();
        return true;
      }}
    >
      <S.Container>
        <Header
          title="Endereço"
          handleGoBack={() => handleNavigateTransactionTheaters()}
        />
        <S.ContainerHeader>
          <S.Row>
            <PinIcon width={10} height={10} />
            <S.Distance>{distance}</S.Distance>
            <S.TheaterName>{theaterName}</S.TheaterName>
          </S.Row>
          <S.Row>
            <S.ColumnInfo>
              <S.Shopping>
                {shopping}
              </S.Shopping>
              <S.Address>{address}</S.Address>
            </S.ColumnInfo>
            <S.ColumnCopy onPress={() => Clipboard(address)}>
              <CopyIcon width={20} height={20} />
              <S.LegendIcon>Copiar</S.LegendIcon>
            </S.ColumnCopy>
          </S.Row>

        </S.ContainerHeader>
        <S.MapWarpper>
          {Platform.OS === 'ios' ? (
            <S.MapViewWarpper
              zoomControlEnabled
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.0068,
                longitudeDelta: 0.0068,
              }}
            >
              <Marker
                key={1}
                coordinate={{
                  latitude,
                  longitude,
                }}
                title={shopping}
              />
            </S.MapViewWarpper>
          ) : (
            <S.MapViewWarpper
              provider={PROVIDER_GOOGLE}
              zoomControlEnabled
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.0068,
                longitudeDelta: 0.0068,
              }}
            >
              <Marker
                key={1}
                coordinate={{
                  latitude,
                  longitude,
                }}
                title={shopping}
              />
            </S.MapViewWarpper>
          )}
        </S.MapWarpper>
      </S.Container>
    </AndroidBackHandler>
  );
};

export default TheaterMap;
