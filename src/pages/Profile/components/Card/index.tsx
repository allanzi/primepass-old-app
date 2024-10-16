/* eslint-disable react/no-unused-prop-types, react/require-default-props */
import React from 'react';

import Dotted from '../../../../components/DottedSeparator';
import PrimePass from '../../../../assets/img/prime.png';
import Vivo from '../../../../assets/img/vivo-logo-white.png';
import * as S from './styles';

interface CardProps {
  simpleCard: boolean;
  title: string;
  validate: string;
  tickets_type?: string;
  tickets_validate?: string;
  tickets?: string;
  color?: string;
  partner?: string;
}

const Card: React.FC<CardProps> = ({
  simpleCard,
  title,
  validate = '00/00/0000',
  tickets_validate = '00/00/000',
  tickets = '0',
  color,
  partner = 'primepass',
}) => {
  const getImage = () => {
    switch (partner.toLowerCase()) {
      case 'vivo':
        return Vivo;
      case 'primepass':
      default:
        return PrimePass;
    }
  };

  return (
    <>
      {simpleCard ? (
        <S.Card simple color={color}>
          <S.PlanContainer>
            <S.PartnerLogo
              simple
              source={getImage()}
            />
            <S.SignatureContainer>
              <S.SignatureText>{title}</S.SignatureText>
              <S.ExpirationDate>
                Validade:
                {validate}
              </S.ExpirationDate>
            </S.SignatureContainer>
          </S.PlanContainer>
        </S.Card>
      ) : (
        <S.Card simple={false} color={color}>
          <S.PlanContainer>
            <S.PartnerLogo
              simple={false}
              source={getImage()}
            />
            <S.SignatureContainer>
              <S.SignatureText>{title}</S.SignatureText>
              <S.ExpirationDate>
                Validade:
                {validate}
              </S.ExpirationDate>
            </S.SignatureContainer>
          </S.PlanContainer>

          <Dotted vertical />

          <S.TicketContainer>
            <S.TicketImage
              source={require('../../../../assets/img/ticket.png')}
            />
            <S.SignatureContainer>
              <S.SignatureText>
                {tickets}
                {' '}
                {parseInt(tickets, 10) > 1 ? 'ingressos' : 'ingresso'}
              </S.SignatureText>
              <S.ExpirationDate>
                Recarregam em:
                {tickets_validate}
              </S.ExpirationDate>
            </S.SignatureContainer>
          </S.TicketContainer>
        </S.Card>
      )}
    </>
  );
};

export default Card;
