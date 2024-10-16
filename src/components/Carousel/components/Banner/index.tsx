/* eslint-disable react/require-default-props */
import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Linking, Alert, Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAction } from '../../../../hooks/actions';
import { useAuth } from '../../../../hooks/auth';

import { BannerType } from './types';
import { useSetupQuery } from '../../../../hooks/graphql/hooks';
import Badge from '../../../Badge';
import * as S from './styles';

interface HomeHighlightProps {
  banner: BannerType;
}

const Banner: React.FC<HomeHighlightProps> = ({
  banner,
}) => {
  const [showArticle, setShowArticle] = useState(false);
  const { data: dataSetup } = useSetupQuery({
    variables: {
      setup_page: 'home-app',
    },
  });

  useEffect(() => {
    const setupArticle = dataSetup?.setup_list?.setups?.filter((setup) => setup?.category?.name === 'artigos');
    if (setupArticle && setupArticle?.length >= 1) {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        setShowArticle(Boolean(setupArticle[0]?.tag?.device[Platform.OS]));
      }
    }
  }, [dataSetup]);

  const { user } = useAuth();
  const { logEvent } = useAction();

  const handleOpenLink = useCallback(async () => {
    const canOpen = await Linking.canOpenURL(banner.link);

    if (!canOpen) {
      Alert.alert('Não foi possível abrir o link, tente novamente mais tarde!');
      return;
    }

    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'home',
      section: 'banners',
      description: 'Opened link from banner',
      payloadData: {
        link: banner.link,
      },
      userId: user ? user.id : '0',
    });

    Linking.openURL(banner.link);
  }, [banner, user]);

  if (!banner) {
    return <View />;
  }

  const defaultPlaceholder = 'https://s3.amazonaws.com/primepass-configuration/wp-website/images/2020/12/11140926/indisponivel-img-mob-360x584.jpg';

  return (
    <S.Container>
      <S.ButtonWrapper>
        <S.Image
          uri={banner.image.mobile}
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
          colors={['rgba(0, 0, 0, 0.4)', 'transparent', '#212121']}
        />

        <S.Label buttonVisible={showArticle}>
          {banner.tags.map((tag: any) => (
            <Badge
              key={tag.label}
              name={tag.label}
              style={{ backgroundColor: tag.labelBackground, color: tag.labelColor }}
            />
          ))}

          <S.Title>{banner.title}</S.Title>
          <S.Subtitle>{banner.subtitle}</S.Subtitle>

          {showArticle && (
            <S.Button onPress={() => handleOpenLink()} outline disable={false}>
              <S.ButtonText>Saiba mais</S.ButtonText>
            </S.Button>
          )}
        </S.Label>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default Banner;
