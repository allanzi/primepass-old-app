/* eslint-disable react/require-default-props */
import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Badge from '../Badge';
import Title from '../Title';
import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';
import {
  Maybe,
  ContentService,
  Media,
  ServiceResume,
} from '../../@types/graphql/schemas';
import * as S from './styles';

interface SquareCardsProps {
  data: any;
  screenName?: string;
  serviceTypeId: string;
  serviceTypeName: string;
  serviceTypeTitle: string;
  tagFlow?: string;
  tagGroup?: string;
  tagContext?: string;
  tagSection?: string;
  tagName?: string;
}

const SquareCard: React.FC<SquareCardsProps> = ({
  data,
  screenName,
  serviceTypeId,
  serviceTypeName,
  serviceTypeTitle,
  tagFlow,
  tagGroup,
  tagContext,
  tagSection,
  tagName,
}) => {
  if (data === null) {
    return (
      <View
        style={{
          height: 200,
        }}
      />
    );
  }

  const navigation = useNavigation();
  const defaultPlaceHolder = 'https://s3.amazonaws.com/primepass-configuration/wp-website/images/2020/12/11140938/indisponivel-img-mob-360x360.jpg';
  const { user } = useAuth();
  const { logEvent } = useAction();
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleNavigate = useCallback((data) => {
    const services = data.services as ServiceResume[];
    const [service] = services;

    logEvent({
      type: 'log-event',
      flow: tagFlow,
      group: tagGroup,
      context: tagContext,
      section: tagSection,
      name: tagName,
      description: data.title,
      payloadData: {
        service: serviceTypeName || 'Not Defined',
        owner: service?.name,
        title: data?.name,
      },
      userId: user ? user.id : '0',
    });

    navigation.navigate('Services', {
      screen: 'Content',
      params: {
        data,
        screenName,
        serviceTypeId,
        serviceTypeName,
        serviceTypeTitle,
      },
    });
  }, []);

  return (
    <S.Wrapper>
      <Title>{data.title}</Title>
      <FlatList<Maybe<ContentService>>
        data={data?.catalog}
        keyExtractor={(_, idx) => String(idx)}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          // TODO: Use ListEmptyComponent props
          if (item && item.id === null) {
            return <View />;
          }
          const services = item.services as ServiceResume[];
          const [service] = services;
          const medias = item.medias as Media[];
          const [image] = medias?.filter(
            (media) => media?.typeUrl === 'square',
          );

          return (
            <S.Container onPress={() => handleNavigate(item)}>
              <S.BadgeContainer>
                {service?.type?.title && (
                  <Badge
                    name={service?.type?.title || 'Not Defined'}
                    type={service?.type?.name || 'Default'}
                  />
                )}
              </S.BadgeContainer>
              <S.ImageContainer>
                <S.Image
                  uri={image?.url || defaultPlaceHolder}
                  uriDefault={defaultPlaceHolder}
                />
              </S.ImageContainer>
              <S.LabelContainer>
                <S.Label numberOfLines={1} ellipsizeMode="tail">{item?.name}</S.Label>
                <S.Owner>{service?.name}</S.Owner>
              </S.LabelContainer>
            </S.Container>
          );
        }}
      />
    </S.Wrapper>
  );
};

export default SquareCard;
