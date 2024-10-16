/* eslint-disable max-len, react/require-default-props, @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { useThemeContext } from '../../hooks/theme';
import { ContentService } from '../../@types/graphql/schemas';
import Badge from '../Badge';
import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';
import * as S from './styles';

interface ContentHighligh {
  id: string;
  name: string;
  logo: string;
  highlightImage: string;
  url: string;
  color: string;
  userSigned: boolean;
  serviceTypeId: string;
  serviceTypeName: string;
  serviceTypeTitle: string;
}

interface ServiceProviderHighlightProps {
  data: ContentHighligh;
  screenName?: string;
  tagFlow?: string;
  tagGroup?: string;
  tagContext?: string;
  tagSection?: string;
  tagName?: string;
}

const ServiceProviderHighlights: React.FC<ServiceProviderHighlightProps> = ({
  data,
  screenName,
  tagFlow,
  tagGroup,
  tagContext,
  tagSection,
  tagName,
}) => {
  const { theme } = useThemeContext();
  const navigation = useNavigation();

  const color = theme === 'dark' ? '#212121' : '#f2f2f2';
  const {
    name,
    serviceTypeName,
    serviceTypeTitle,
    highlightImage,
    logo,
  } = data;
  const defaultPlaceholder = 'https://s3.amazonaws.com/primepass-configuration/wp-website/images/2020/12/11140926/indisponivel-img-mob-360x584.jpg';
  const { user } = useAuth();
  const { logEvent } = useAction();

  useEffect(() => {
    logEvent({
      type: 'log-event',
      flow: tagFlow,
      group: tagGroup,
      context: tagContext,
      section: tagSection,
      name: tagName,
      description: name || serviceTypeTitle,
      payloadData: {
        service: serviceTypeName,
        provider: name,
      },
      userId: user ? user.id : '0',
    });
  }, [
    logEvent,
    name,
    serviceTypeName,
    serviceTypeTitle,
    tagContext,
    tagFlow,
    tagGroup,
    tagName,
    tagSection,
    user,
  ]);

  if (!data) {
    return <View />;
  }

  return (
    <S.Container>
      <S.ButtonWrapper>
        <S.Image
          uri={highlightImage || defaultPlaceholder}
          uriDefault={defaultPlaceholder}
        />
        <LinearGradient
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '100%',
          }}
          start={{
            x: 0,
            y: 0.1,
          }}
          end={{
            x: 0,
            y: 0.9,
          }}
          colors={['transparent', 'transparent', color]}
        />

        <S.Label>
          <S.Title>{name}</S.Title>
          <S.HighlightInfo>
            <S.InfoContainer>
              <Badge
                name={serviceTypeTitle || 'Default'}
                type={serviceTypeName || 'Default'}
              />
              <S.ContainerLogo>
                {logo && (
                  <S.ServiceLogo
                    source={{
                      uri: logo,
                    }}
                  />
                )}
              </S.ContainerLogo>
              <S.ContainerText>
                <S.Text />
              </S.ContainerText>
            </S.InfoContainer>
            <S.LikeContainer />
          </S.HighlightInfo>
        </S.Label>

        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default ServiceProviderHighlights;
