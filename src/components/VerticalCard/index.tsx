/* eslint-disable react/require-default-props, react/no-unused-prop-types */
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { ContentService } from '../../@types/graphql/schemas';
import Badge from '../Badge';
import LabelBlur from '../LabelBlur';
import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';
import * as S from './styles';

interface VerticalCardProps {
  data: ContentService;
  x: Animated.Value;
  index: number;
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

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    width: 146,
    height: 300,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  linearTop: {
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 40,
    zIndex: 1,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  linearBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 100,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
});

const VerticalCard: React.FC<VerticalCardProps> = ({
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
  const { user } = useAuth();
  const { logEvent, logConvertArrayToString } = useAction();
  const {
    categories,
    name,
    medias,
    artist,
    services,
  } = data;
  const navigation = useNavigation();
  const image = medias?.filter((media) => media?.typeUrl === 'square');
  const defaultImage = 'https://s3.amazonaws.com/primepass-configuration/wp-website/images/2020/12/11140936/indisponivel-img-desk-1920x1080.jpg';

  const handleNavigate = () => {
    logEvent({
      type: 'log-event',
      flow: tagFlow,
      group: tagGroup,
      context: tagContext,
      section: tagSection,
      name: tagName,
      description: `${tagSection}: ${name}`,
      payloadData: {
        service: serviceTypeName,
        genre: logConvertArrayToString(categories),
        title: name,
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
  };

  return (
    <S.PressComponent onPress={handleNavigate}>
      <Animated.View style={[styles.container]}>

        <S.Image
          uri={image?.[0]?.url || defaultImage}
          uriDefault={defaultImage}
        >
          <LinearGradient
            style={styles.linearTop}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            useAngle
            angle={180}
            colors={['#000000', 'transparent', 'transparent']}
          >
            <S.Header>
              <Badge
                name={services?.[0]?.type?.title || ''}
                type={services?.[0]?.type?.name || ''}
              />
            </S.Header>
          </LinearGradient>

          <LinearGradient
            style={styles.linearBottom}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 0 }}
            useAngle
            angle={180}
            colors={['transparent', 'transparent', '#000']}
          />
        </S.Image>
        <S.LabelContainer>
          <LabelBlur genre={categories} autor={artist || ''} title={name} />
        </S.LabelContainer>
      </Animated.View>
    </S.PressComponent>
  );
};

export default VerticalCard;
