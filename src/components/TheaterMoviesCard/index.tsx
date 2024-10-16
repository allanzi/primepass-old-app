/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback } from 'react';

import GoToIcon from '../../assets/img/goTo.svg';
import MovieCard from './MovieCard';
import OpenExternalLink from '../../utils/openExternalLink';
import PinIcon from '../../assets/img/pin.svg';
import PinNeedleInactiveIcon from '../../assets/img/pinNeedleInactive.svg';
import PinNeedleActiveIcon from '../../assets/img/pinNeedleActive.svg';
import { TheaterMoviesCardProps, Classification } from './types';
import * as S from './styles';
import { Media, Movie as MovieType } from '../../@types/graphql/schemas';

const TheaterMoviesCard: React.FC<TheaterMoviesCardProps> = ({
  id,
  name,
  shopping,
  cinema,
  distance,
  theaterUrl,
  favorite,
  address,
  movies,
  classifications,
  handleNavigateTheaterMap,
  handleNavigateTransactionTickets,
  user,
  logEvent,
}) => {
  const formattedAddress = (address.name || '')
    + (address.name && address.number ? ', ' : '')
    + (address.number || '')
    + (address.number && address.district ? ' - ' : '')
    + (address.district)
    + (address.district && address.city?.name ? ', ' : '')
    + (address.city?.name || '')
    + (address.city?.name && address.city?.state ? '/' : '')
    + (address.city?.state || '');
  const formattedDistance = distance?.toString().replace('.', ',');

  const handleChoiceTheater = useCallback(() => {
    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'Transaction Theaters',
      section: 'choice-theater',
      description: 'Choice Theater',
      payloadData: {
        name,
      },
      userId: user ? user.id : '0',
    });

    const rooms = [] as Array<string>;
    const screens = [] as Array<string>;

    movies.map((movie) => {
      movie.rooms.map((room: string) => {
        if (!rooms.includes(room)) {
          rooms.push(room);
        }

        return room;
      });

      movie.screens.map((screen: string) => {
        if (!screens.includes(screen)) {
          screens.push(screen);
        }

        return screen;
      });

      return movie;
    });

    handleNavigateTransactionTickets(
      name,
      id,
      rooms,
      screens,
      formattedAddress,
    );
  }, [movies, name, id, address]);

  const getBanner = useCallback((medias: Array<Media>): string => {
    const banner = medias.filter((media: Media) =>
      media.typeUrl === 'PosterPortrait');
    return banner.length > 0 ? banner[0].url : '';
  }, []);

  const getClassification = useCallback((movieId: string) => {
    if (classifications) {
      return classifications.filter((item: Classification) =>
        item.id === movieId)[0]?.classification;
    }
  }, [classifications]);

  const handleExternalLink = useCallback(() => {
    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'Transaction Theaters',
      section: 'external-link',
      description: 'go to ingresso.com',
      userId: user ? user.id : '0',
    });
    OpenExternalLink(theaterUrl || 'https://www.ingresso.com');
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.Column>
          <S.Title numberOfLines={1} ellipsizeMode="tail">{name}</S.Title>
          <S.ContentSubtitle>
            <PinIcon width={10} height={10} />
            {distance && (
              <S.PinText>{`${formattedDistance} km`}</S.PinText>
            )}
            <S.Address numberOfLines={1}>{`Rede ${shopping}`}</S.Address>
          </S.ContentSubtitle>
        </S.Column>

        <S.Row>
          <S.Option onPress={() => handleNavigateTheaterMap(
            address.latitude,
            address.longitude,
            name,
            shopping,
            formattedAddress,
            `${distance ? `${formattedDistance} km` : ''}`,
          )}
          >
            <PinIcon width={18} height={18} />
            <S.TitleOption>Endereço</S.TitleOption>
          </S.Option>
          {/* <S.Option>
            {favorite
              ? <PinNeedleActiveIcon width={18} height={18} />
              : <PinNeedleInactiveIcon width={18} height={18} />}
            <S.TitleOption>Fixar</S.TitleOption>
          </S.Option> */}
        </S.Row>
      </S.Header>

      <S.Subtitle>Filmes em cartaz nesse cinema</S.Subtitle>

      <S.ContentMovieList horizontal showsHorizontalScrollIndicator={false}>
        {movies.map((movie: MovieType) => (
          <MovieCard
            key={movie.id}
            banner={getBanner(movie.medias)}
            name={movie.name}
            screens={movie.screens}
            rooms={movie.rooms}
            classification={getClassification(movie.id)}
            audios={movie.audios}
          />
        ))}

      </S.ContentMovieList>
      <S.ContentLink onPress={handleExternalLink}>
        <S.Link>
          Consulte sessões disponíveis
        </S.Link>
        <GoToIcon marginLeft={4} />
      </S.ContentLink>

      <S.ContentButtons>
        <S.Button disable={false} onPress={handleChoiceTheater}>
          <S.ButtonText>Quero ir nesse cinema</S.ButtonText>
        </S.Button>
      </S.ContentButtons>
    </S.Container>
  );
};

export default TheaterMoviesCard;
