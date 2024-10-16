/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  useCallback, useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import {
  ActivityIndicator,
  FlatList,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputSubmitEditingEventData,
} from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

import { isNetworkConnectionError } from '../../../../utils/graphqlErrors';
import { Cinema, TheaterMovies } from '../../../../@types/graphql/schemas';
import { useAction } from '../../../../hooks/actions';
import { useAuth } from '../../../../hooks/auth';
import { useCinemaListLazyQuery } from '../../../../hooks/graphql/hooks';
import { useElasticTheaterMoviesSearchLazyQuery } from '../../../../hooks/graphql/ElasticTheaterMoviesSearch';
import { useLocation } from '../../../../hooks/location';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import OpenExternalLink from '../../../../utils/openExternalLink';
import TheaterMoviesCard from '../../../../components/TheaterMoviesCard';
import TransactionSteps from '../../../../components/TransactionSteps';
import TransactionTheatersFilter from '../../../../components/TransactionTheatersFilter';
import * as S from './styles';

const TransactionTheaters: React.FC = React.memo(() => {
  const route = useRoute();
  const { user } = useAuth();
  const {
    gpsOn, geoLocation, latitude, longitude,
  } = useLocation();
  const { logEvent } = useAction();
  const navigation = useNavigation();
  const { from } = route.params;

  const [theatersMovies, setTheatersMovies] = useState({ totalPages: 0, page: 0, theaters: [] });
  const [loading, setLoading] = useState(true);
  const [infiniteLoader, setInfiniteLoader] = useState(false);
  const [cinemasSelected, setCinemasSelected] = useState([] as Array<string>);
  const [cinemas, setCinemas] = useState([] as Array<Cinema>);
  const [hasFecthed, setHasFecthed] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [hasSearch, setHasSearch] = useState(false);

  const [
    getElasticTheaterMoviesSearch,
    { fetchMore, error },
  ] = useElasticTheaterMoviesSearchLazyQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  });

  const [
    getCinemaList,
    { loading: cinemaLoading },
  ] = useCinemaListLazyQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    onCompleted: (cinemaData) => {
      setHasFecthed(true);

      if (cinemaData?.cinema_list) {
        setCinemas(cinemaData?.cinema_list?.cinemas);
      }
    },
  });

  const timerRef = useRef(null);

  useEffect(() => {
    if (searchText.length > 3) {
      timerRef.current = setTimeout(() => {
        setDebouncedText(searchText);
      }, 500);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [searchText]);

  useEffect(() => {
    if (searchText.length > 0 || cinemasSelected.length > 0) {
      setHasSearch(true);
      return;
    }
    setHasSearch(false);
  }, [searchText, cinemasSelected]);

  useLayoutEffect(() => {
    fetchTheaterMovies(
      cinemasSelected.length > 0 ? cinemasSelected : null,
      debouncedText.length > 0 ? debouncedText : null,
    );
  }, [cinemasSelected, debouncedText]);

  useFocusEffect(
    useCallback(() => {
      if (from === 'home') {
        getCinemaList();
        fetchTheaterMovies();
        setSearchText('');
        setCinemasSelected([]);
      }

      logEvent({
        type: 'log-screen',
        flow: 'app',
        group: 'scrn',
        context: 'transaction-theaters',
        section: 'page',
        description: 'transaction theaters',
        userId: user ? user.id : '0',
      });
    }, [user, gpsOn, from]),
  );

  useEffect(() => {
    if (error !== undefined) {
      if (isNetworkConnectionError(error)) {
        return navigation.navigate('ConnectionError');
      }

      return navigation.navigate('ServerError');
    }
  }, [error]);

  const handleHelp = () => {
    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'Transaction Theaters',
      section: 'go-to-help',
      description: 'Go to Attendance',
      userId: user.id || '',
    });
    OpenExternalLink(
      'https://primepass.zendesk.com/hc/pt-br/articles/360021194772-Quais-s%C3%A3o-os-canais-de-atendimento-Primepass-',
    );
  };

  const handleNavigateTheaterMap = (
    latitudeAdress: string,
    longitudeAdress: string,
    theaterName: string,
    shopping: string,
    address: string,
    distance: string,
  ) => {
    navigation.navigate('Transactions', {
      screen: 'TheaterMap',
      params: {
        latitude: latitudeAdress,
        longitude: longitudeAdress,
        theaterName,
        shopping,
        address,
        distance,
      },
    });
  };

  const handleNavigateTransactionTickets = (
    theaterName: string,
    theaterId: string,
    rooms: Array<string>,
    screens: Array<string>,
    address: string,
  ) => {
    navigation.navigate('Transactions', {
      screen: 'TransactionTicketConfirm',
      params: {
        theaterName,
        theaterId,
        rooms,
        screens,
        address,
      },
    });
  };

  const fetchTheaterMovies = async (
    cinemaIds?: Array<string> | null,
    theaterName?: string | null,
  ) => {
    setLoading(true);

    await geoLocation({ ok: true });

    if (latitude && longitude) {
      const { data } = await getElasticTheaterMoviesSearch({
        variables: {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          page: 0,
          cinemaIds,
          theaterName,
        },
      });

      if (data?.elastic_theater_movies_search?.theaters?.length > 0) {
        setTheatersMovies({
          theaters: data?.elastic_theater_movies_search?.theaters,
          page: data?.elastic_theater_movies_search?.page,
          totalPages: data?.elastic_theater_movies_search?.total_pages,
        });
      }

      setLoading(false);
    }
  };

  const handleFetchMore = async () => {
    if (hasSearch) {
      return;
    }

    if (theatersMovies.page !== theatersMovies.totalPages && !loading) {
      geoLocation({ ok: true });

      if (
        latitude
          && longitude
          && fetchMore
      ) {
        setInfiniteLoader(true);

        const { data } = await fetchMore({
          variables: {
            latitude,
            longitude,
            page: theatersMovies.page + 1,
          },
        });

        if (data?.elastic_theater_movies_search?.theaters?.length > 0) {
          setTheatersMovies({
            theaters: [
              ...theatersMovies.theaters,
              ...data?.elastic_theater_movies_search?.theaters,
            ],
            page: data?.elastic_theater_movies_search?.page,
            totalPages: data?.elastic_theater_movies_search?.total_pages,
          });
        }

        setInfiniteLoader(false);
      }
    }
  };

  const handleSearch = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
    | NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    const { text } = event.nativeEvent;

    setSearchText(text);
  };

  const handleChangeText = (text: string) => {
    setSearchText(text);
  };

  const handleClear = () => {
    fetchTheaterMovies();
  };

  return (
    <AndroidBackHandler
      onBackPress={() => {
        navigation.navigate('Home');
        return true;
      }}
    >
      <S.Container vertical>
        <FlatList
          keyboardShouldPersistTaps="never"
          keyboardDismissMode="on-drag"
          onEndReached={handleFetchMore}
          onEndReachedThreshold={0.25}
          data={theatersMovies.theaters}
          keyExtractor={(item: TheaterMovies) => item.id}
          ListHeaderComponent={(
            <>
              <Header
                title="Ingressos de cinema"
                handleGoBack={() => navigation.navigate('Home')}
              />
              <TransactionSteps steps={['Cinemas', 'Ingressos', 'Check-in']} active={0} />

              <TransactionTheatersFilter
                cinemas={cinemas}
                cinemasSelected={cinemasSelected}
                setCinemasSelected={setCinemasSelected}
                searchText={searchText}
                setSearchText={handleSearch}
                loading={(cinemaLoading && !hasFecthed)}
                handleChangeText={handleChangeText}
                disableFilter={loading}
                handleClear={handleClear}
              />

              {gpsOn && (
                <S.ContentTheatersAvailableTitle>
                  <S.TitleTheatersAvailable>
                    Cinemas disponíveis
                  </S.TitleTheatersAvailable>
                </S.ContentTheatersAvailableTitle>
              )}
            </>
          )}
          renderItem={({ item, index }) => {
            if (!gpsOn) {
              return <></>;
            }

            if (loading && index === 0 && gpsOn) {
              return (
                <S.ContainerLoader>
                  <ActivityIndicator color="#fff" />
                </S.ContainerLoader>
              );
            }

            if (loading && gpsOn) {
              return <></>;
            }

            return (
              <S.ContentTheatersAvailable>
                <TheaterMoviesCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  cinema={item.cinema}
                  shopping={item.cinema.name}
                  distance={item.distance}
                  favorite={false}
                  address={item.address}
                  theaterUrl={item.theaterUrl}
                  movies={item.movies}
                  handleNavigateTheaterMap={
                    handleNavigateTheaterMap
                  }
                  handleNavigateTransactionTickets={
                    handleNavigateTransactionTickets
                  }
                  user={user}
                  logEvent={logEvent}
                />
              </S.ContentTheatersAvailable>
            );
          }}
          ListEmptyComponent={() => {
            if (!gpsOn) {
              return <></>;
            }

            return (
              <>
                {loading && (
                  <ActivityIndicator
                    style={{ marginTop: 30, marginBottom: 20 }}
                    color="#fff"
                  />
                )}
                {searchText.length > 0 && (
                  <S.ContainerEmpty>
                    <S.Text>
                      Nenhum resultado encontrado para
                      {'\n'}
                      &quot;
                      {searchText}
                      &quot;
                    </S.Text>
                    <S.Image
                      source={{
                        uri: 'https://primepass-imagens.s3.amazonaws.com/7_historico-vazio.png',
                      }}
                    />

                    <S.Button disable={false} outline onPress={handleHelp}>
                      <S.ButtonText>Falar com atendimento</S.ButtonText>
                    </S.Button>
                  </S.ContainerEmpty>
                )}
              </>
            );
          }}
          ListFooterComponent={(
            <>
              {(infiniteLoader && !loading
              && searchText.length === 0 && cinemasSelected.length === 0) && (
                <ActivityIndicator
                  style={{ marginTop: 30, marginBottom: 20 }}
                  color="#fff"
                />
              )}
              <Footer />
            </>
          )}
        />
      </S.Container>
    </AndroidBackHandler>
  );
});

export default TransactionTheaters;
