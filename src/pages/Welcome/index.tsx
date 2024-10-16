import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Platform } from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';

import Button from '../../components/Button';
import logoDark from '../../assets/img/logo-dark.png';
import logoLight from '../../assets/img/logo-light.png';
import { useSetupLazyQuery } from '../../hooks/graphql/hooks';
import { useThemeContext } from '../../hooks/theme';
import { useAction } from '../../hooks/actions';
import * as S from './styles';

interface RouteParams {
  next?: string;
}

const Welcome: React.FC = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const params = route?.params as RouteParams;
  const { theme } = useThemeContext();
  const { logEvent } = useAction();

  const isDark = theme === 'dark';
  const next = params ? params?.next : 'Home';

  const [showNewUserButton, setShowNewUserButton] = useState(false);

  const [getSetup, { data }] = useSetupLazyQuery({
    fetchPolicy: 'network-only',
  });

  useFocusEffect(useCallback(() => {
    getSetup({ variables: { setup_page: 'acesso' } });
  }, [getSetup]));

  useEffect(() => {
    const setupNewUserButton = data?.setup_list?.setups?.filter((setup) => setup?.category?.name === 'cadastro-novo-usuario');
    if (setupNewUserButton && setupNewUserButton?.length >= 1) {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        setShowNewUserButton(Boolean(setupNewUserButton[0]?.tag?.device[Platform.OS]));
      }
    }
  }, [data]);

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'welcome',
      section: 'page',
      description: 'Welcome',
      userId: '0',
    });
  }, []);

  const navigateTo = (routePath: string) => {
    logEvent({
      type: 'log-event',
      flow: routePath.toLowerCase(),
      group: 'prss',
      context: 'welcome',
      section: routePath,
      description: routePath,
      userId: '0',
    });
    navigator.navigate(routePath, { flow: routePath.toLowerCase(), next });
  };

  return (
    <AndroidBackHandler onBackPress={() => true}>
      <S.Container>
        <>
          <S.Header>
            <S.LogoContainer>
              <S.Logo source={isDark ? logoDark : logoLight} />
            </S.LogoContainer>
          </S.Header>
          <S.ImageBgContainer>
            <S.ImageBg
              source={{
                uri: 'https://primepass-imagens.s3.amazonaws.com/1_welcome.png',
              }}
            />
          </S.ImageBgContainer>
        </>
        <S.TextContainer>
          <S.Title>Vamos começar a diversão?</S.Title>
          <S.Description>
            Uma só assinatura. Acesso a cinema, filmes, séries, músicas e muito
            mais!
          </S.Description>
        </S.TextContainer>
        <S.Footer>
          {showNewUserButton && (
            <Button disable={false} onPress={() => navigateTo('SignUp')}>
              Sou novo cliente
            </Button>
          )}
          <Button outline disable={false} onPress={() => navigateTo('SignIn')}>
            Já tenho cadastro
          </Button>
        </S.Footer>
      </S.Container>
    </AndroidBackHandler>
  );
};

export default Welcome;
