/* eslint-disable max-len, react/no-array-index-key, @typescript-eslint/no-unused-vars, react/no-unused-prop-types, react/require-default-props */
import React, { useEffect, useState } from 'react';

import ParentalRating from '../../../../components/ParentalRating';
import parseMovieDuration from '../../../../components/MoreDetailsModal/utils/parseMovieDuration';
import * as S from './styles';

interface DataProps {
  title: string;
  image: string;
  movie_year: string | number;
  duration: string;
  parentalRating: string;
  genres: Array<string>;
  theater: string;
  address: string;
  status: string;
  weekDay: string;
  date: string;
  hour: string;
  audio: string;
  type: string;
  serviceRoomLogo: string;
}

interface TicketProps {
  isActive?: boolean;
  UserTicketAmount?: any;
  ticketData?: any;
  inHist?: boolean;
  status?: string;
}

const HistoryTicket: React.FC<TicketProps> = ({
  ticketData,
  inHist,
  status,
}) => {
  const roomType = `${ticketData?.[0]?.session?.roomType?.charAt(
    0,
  )}${ticketData?.[0]?.session?.roomType?.substring(1)?.toLowerCase()}`;

  const district = ticketData?.[0]?.session?.theater?.address?.district;

  const audioType = `${ticketData?.[0]?.session?.audioType?.charAt(
    0,
  )}${ticketData?.[0]?.session?.audioType?.substring(1)?.slice(0, 2)}`;

  const [ticketStatus, setTicketStatus] = useState('');

  useEffect(() => {
    setTicketStatus(status);
  }, []);

  return (
    <S.Wrapper>
      {ticketData && (
        <S.BackgroundImage
          source={{
            uri: ticketData?.[0]?.session?.movie?.medias?.filter(
              (item: { typeUrl: string }) => item?.typeUrl === 'PosterPortrait',
            )?.[0]?.url,
          }}
        >
          <S.Container>
            <S.TicketContent>
              <S.Title numberOfLines={1} ellipsizeMode="tail">
                {ticketData?.[0]?.session?.movie?.name}
              </S.Title>
              <S.Row>
                <S.Span>
                  {ticketData?.[0]?.session?.movie?.launchDate?.split('-')[0]}
                </S.Span>
                <ParentalRating>
                  {ticketData?.[0]?.session?.movie?.recommendedAge}
                </ParentalRating>
                <S.BorderContainer>
                  <S.BorderedText>
                    {parseMovieDuration(
                      ticketData?.[0]?.session?.movie?.duration,
                    )}
                  </S.BorderedText>
                </S.BorderContainer>
                <S.GenreContainer>
                  {ticketData?.[0]?.session?.movie?.categories?.map(
                    (item: string, index: number) => (
                      <S.Span key={index}>
                        {item}
                        {ticketData?.[0]?.session?.movie?.categories?.length
                          - 1
                          > index && <S.Span> | </S.Span>}
                      </S.Span>
                    ),
                  )}
                </S.GenreContainer>
              </S.Row>
              <S.TheaterInfo>
                <S.TheaterName>
                  {ticketData?.[0]?.session?.theater?.name}
                </S.TheaterName>
                <S.Address>
                  {`${ticketData?.[0]?.session?.theater?.name} - ${ticketData?.[0]?.session?.theater?.address?.name},  ${ticketData?.[0]?.session?.theater?.address?.number} - ${district}`}
                </S.Address>
              </S.TheaterInfo>

              <S.Row>
                {inHist && (
                  <S.StatusBadgeInTheatherHist>
                    <S.BadgeText>Cinema</S.BadgeText>
                  </S.StatusBadgeInTheatherHist>
                )}
                <S.TicketsAmountBadge>
                  <S.BadgeText>
                    {ticketData?.[0]?.quantity === 1
                      ? `${ticketData?.[0]?.quantity} ingresso`
                      : `${ticketData?.[0]?.quantity} ingressos`}
                    {' '}
                  </S.BadgeText>
                </S.TicketsAmountBadge>
                <S.StatusBadge status={ticketStatus}>
                  <S.BadgeText>
                    {' '}
                    {ticketStatus === 'canceled' ? 'Cancelado' : 'Ativo'}
                    {' '}
                  </S.BadgeText>
                </S.StatusBadge>
              </S.Row>

              <S.FooterTicket>
                <S.SectionBorderRight>
                  <S.Span>
                    {`${ticketData?.[0]?.session?.weekday
                      ?.slice(0, 1)
                      .toUpperCase()}${ticketData?.[0]?.session?.weekday?.slice(
                      1,
                      ticketData?.[0]?.session?.weekday?.length,
                    )} `}
                  </S.Span>
                  <S.FullDateContainer>
                    <S.FullDate>
                      {` ${ticketData?.[0]?.session?.date?.split('-')?.[2]}/ ${
                        ticketData?.[0]?.session?.date?.split('-')?.[1]
                      }/ ${ticketData?.[0]?.session?.date?.split('-')?.[0]}`}
                    </S.FullDate>
                  </S.FullDateContainer>
                </S.SectionBorderRight>
                <S.SectionBorderRight>
                  <S.Hour>
                    {`${ticketData?.[0]?.session?.hour?.slice(0, 5)}`}
                  </S.Hour>
                </S.SectionBorderRight>
                <S.SectionBorderRight>
                  <S.TextType>{roomType}</S.TextType>
                  <S.BorderContainer>
                    <S.BorderedText>{audioType}</S.BorderedText>
                  </S.BorderContainer>
                </S.SectionBorderRight>
                <S.LogoContainer>
                  {/* //get from backend the logo when available */}
                  {/* <S.ServiceRoomLogo source={{ uri: path }} /> */}
                  {/* nao retorna as imagens condizentes, deixei como padrao */}
                </S.LogoContainer>
              </S.FooterTicket>
            </S.TicketContent>
          </S.Container>
        </S.BackgroundImage>
      )}
    </S.Wrapper>
  );
};

export default HistoryTicket;
