/* eslint-disable react/require-default-props */
import React from 'react';
import { ImageSourcePropType } from 'react-native';

import Badge from '../Badge';
import * as S from './styles';

interface TicketProps {
  image: ImageSourcePropType;
  logo: ImageSourcePropType;
  serviceName?: string;
  serviceLabel: string;
  dateStart?: string | null;
  dateFinish?: string | null;
  validThru?: string | null;
}

const ServiceTicket: React.FC<TicketProps> = ({
  image,
  logo,
  serviceName,
  serviceLabel,
  dateStart,
  dateFinish,
  validThru,
}) => (
  <S.Wrapper>
    <S.BackgroundImage source={image}>
      <S.Container>
        <Badge
          name={serviceLabel}
          type={serviceName}
        />
        <S.Image source={logo} />
        <S.FooterTicket>
          {(dateStart && dateFinish) && (
            <S.FullDate>{`${dateStart} até ${dateFinish}`}</S.FullDate>
          )}
          {validThru && (
            <S.FullDate>{`Disponível até ${validThru}`}</S.FullDate>
          )}
        </S.FooterTicket>

      </S.Container>
    </S.BackgroundImage>
  </S.Wrapper>
);

export default ServiceTicket;
