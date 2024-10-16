/* eslint-disable react/no-array-index-key, react/require-default-props */
import React, { useEffect, useState } from 'react';

import ParentalRating from '../ParentalRating';
import parseMovieDuration from '../MoreDetailsModal/utils/parseMovieDuration';
import * as S from './styles';

interface TicketProps {
  isActive?: boolean;
  UserTicketAmount?: any;
  dataTicket?: any;
}

const Ticket: React.FC<TicketProps> = ({
  UserTicketAmount,
  dataTicket,
}) => {
  const [launchYear, setLaunchYear] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [dateYear, setDateYear] = useState('');
  const [dateMonth, setDateMonth] = useState('');
  const [dateDay, setDateDay] = useState('');
  const [hour, setHour] = useState('');
  const [ticketImage, setTicketImage] = useState('');
  const [roomType, setRoomType] = useState('');
  const [audioType, setAudioType] = useState('');

  useEffect(() => {
    setLaunchYear(dataTicket?.[0]?.date?.split('-')?.[0]);

    setWeekDay(
      `${dataTicket?.[0]?.weekday
        ?.charAt(0)
        ?.toUpperCase()}${dataTicket?.[0]?.weekday?.substring(1)}`,
    );

    setDateYear(`${dataTicket?.[0]?.date?.split('-')?.[0]}` || 'nada');

    setDateMonth(`${dataTicket?.[0]?.date?.split('-')?.[1]}` || 'nada');

    setDateDay(`${dataTicket?.[0]?.date?.split('-')?.[2]}` || 'nada');

    setHour(
      `${dataTicket?.[0]?.hour?.split(':')?.[0]}:${
        dataTicket?.[0]?.hour?.split(':')?.[1]
      }`,
    );

    setTicketImage(
      dataTicket?.[0]?.movie?.medias?.filter(
        (item: any) => item?.typeUrl === 'PosterPortrait',
      )?.[0]?.url,
    );

    setRoomType(
      `${dataTicket?.[0]?.roomType?.charAt(
        0,
      )}${dataTicket?.[0]?.roomType?.substring(1)?.toLowerCase()}`,
    );

    setAudioType(
      `${dataTicket?.[0]?.audioType?.charAt(
        0,
      )}${dataTicket?.[0]?.audioType?.substring(1)?.slice(0, 2)}`,
    );
  }, [dataTicket]);

  return (
    <S.Wrapper>
      {dataTicket && (
        <S.BackgroundImage
          source={{
            uri: `${ticketImage}`,
          }}
        >
          <S.Container>
            <S.TicketContent>
              <S.Title numberOfLines={1} ellipsizeMode="tail">
                {dataTicket?.[0]?.movie?.name}
              </S.Title>
              <S.Row>
                <S.Span>{launchYear}</S.Span>
                <ParentalRating>
                  {dataTicket?.[0]?.movie?.recommendedAge.length > 3
                    ? ''
                    : dataTicket?.[0]?.movie?.recommendedAge}
                </ParentalRating>
                <S.BorderContainer>
                  <S.BorderedText>
                    {`${parseMovieDuration(
                      dataTicket?.[0]?.movie?.duration,
                    )}`}
                  </S.BorderedText>
                </S.BorderContainer>
                <S.GenreContainer>
                  {dataTicket?.[0]?.movie?.categories?.map(
                    (item, index, array) => (
                      <S.Span key={index}>
                        {item}
                        {array.length - 1 > index && <S.Span> | </S.Span>}
                      </S.Span>
                    ),
                  )}
                </S.GenreContainer>
              </S.Row>
              <S.TheaterInfo>
                <S.TheaterName>
                  {dataTicket?.[0]?.theater?.name || 'Primepass'}
                </S.TheaterName>
                <S.Address>
                  {`${dataTicket?.[0]?.theater?.address?.name}, ${dataTicket?.[0]?.theater?.address?.number} - ${dataTicket?.[0]?.theater?.address?.district}`}
                </S.Address>
              </S.TheaterInfo>

              <S.Row>
                <S.TicketsAmountBadge>
                  <S.BadgeText>
                    {UserTicketAmount}
                    {' '}
                    ingressos
                  </S.BadgeText>
                </S.TicketsAmountBadge>
                {dataTicket?.[0]?.theater?.isActive && (
                  <S.StatusBadge>
                    <S.BadgeText>
                      {dataTicket?.[0]?.theater?.isActive && 'Ativo'}
                    </S.BadgeText>
                  </S.StatusBadge>
                )}
              </S.Row>
              <S.FooterTicket>
                <S.SectionBorderRight>
                  <S.Span>{weekDay}</S.Span>
                  <S.FullDateContainer>
                    <S.FullDate>{`${dateDay}/${dateMonth}/${dateYear}`}</S.FullDate>
                  </S.FullDateContainer>
                </S.SectionBorderRight>
                <S.SectionBorderRight>
                  <S.Hour>{hour}</S.Hour>
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
                </S.LogoContainer>
              </S.FooterTicket>
            </S.TicketContent>
          </S.Container>
        </S.BackgroundImage>
      )}
    </S.Wrapper>
  );
};

export default Ticket;
