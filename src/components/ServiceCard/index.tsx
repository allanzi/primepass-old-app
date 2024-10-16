/* eslint-disable @typescript-eslint/no-use-before-define */

import React from 'react';
import { View, Text } from 'react-native';

import Badge from '../Badge';
import PrimePass from '../../assets/img/prime.png';
import * as S from './styles';

export interface ServiceCardProps {
  name: string;
  logo: string;
  background: string;
  serviceType: string;
  handleNavigateService: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  logo,
  background,
  serviceType,
  handleNavigateService,
  ...props
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <S.Container {...props}>
    <S.ServiceCard
      uri={background}
      uriDefault="https://s3.amazonaws.com/primepass-configuration/wp-website/images/2020/12/11140938/indisponivel-img-mob-360x360.jpg"
    >
      <S.ServiceCardOverlay>
        <S.Gradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          useAngle
          angle={180}
          colors={['#000000', 'transparent', 'transparent']}
        >
          <S.HeaderCardContainer>
            <S.BadgeContainer>
              <Badge name={serviceType} type={serviceType} />
            </S.BadgeContainer>
          </S.HeaderCardContainer>

        </S.Gradient>
        {logo ? (
          <S.OverlayIcon
            source={{ uri: logo || 'https://primepass-imagens.s3.us-east-1.amazonaws.com/primepass-w-176-64.png' }}
          />
        ) : (
          <S.OverlayIconUnavailable
            source={PrimePass}
          />
        )}

      </S.ServiceCardOverlay>

    </S.ServiceCard>
    <S.ServiceTitle numberOfLines={1}>{name}</S.ServiceTitle>

    <View style={{ maxWidth: 160, width: '100%' }}>
      <S.ButtonStyled
        disable={false}
        outline
        onPress={() => handleNavigateService()}
      >
        <Text>Saiba mais</Text>
      </S.ButtonStyled>
    </View>

  </S.Container>

);

export default ServiceCard;
