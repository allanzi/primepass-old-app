/* eslint-disable max-len, react/prop-types, import/no-extraneous-dependencies, react/require-default-props */

import { useNavigation } from '@react-navigation/core';
import React from 'react';
import Carousel from 'react-native-snap-carousel';

import { useAuth } from '../../hooks/auth';
import { useServicesQuery } from '../../hooks/graphql/hooks';
import * as S from './styles';

export interface Service {
  id: string;
  name: string;
  logo: string;
  url: string;
  highlightImage: string;
  color: string;
  userSigned: boolean;
  serviceTypeId?: string;
  serviceTypeName?: string | null;
  serviceTypeTitle?: string | null;
}

export interface ServicesCarouselProps {
  screenName: string;
  serviceTypeId: string;
  serviceTypeName?: string | null;
  serviceTypeTitle?: string | null;
}

const ServicesCarousel: React.FC<ServicesCarouselProps> = ({
  screenName,
  serviceTypeId,
  serviceTypeName,
  serviceTypeTitle,
}) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { data, loading } = useServicesQuery({
    variables: {
      serviceTypeId,
      userId: user ? user.id : null,
    },
  });

  const handleNavigation = (service: Service) => navigation.navigate('Services', {
    screen: 'ServiceProvider',
    params: {
      service,
      screenName,
    },
  });

  if (loading || data?.service_list?.services?.length === 0) {
    return <></>;
  }

  return (
    <S.Container>
      <Carousel
        data={data?.service_list?.services}
        sliderWidth={146}
        itemWidth={146}
        inactiveSlideOpacity={1}
        // eslint-disable-next-line react/no-unused-prop-types
        renderItem={({ item }: { item: Service }) => (
          <S.Card
            style={{ borderColor: item.userSigned ? '#147EB5' : '#51515151' }}
            onPress={() => {
              handleNavigation({
                ...item,
                serviceTypeId,
                serviceTypeName,
                serviceTypeTitle,
              });
            }}
          >
            <S.Image source={{ uri: item.logo }} />
          </S.Card>
        )}
      />
    </S.Container>
  );
};

export default ServicesCarousel;
