/* eslint-disable array-callback-return, consistent-return, indent */
import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Platform } from 'react-native';

import { useAuth } from '../../../hooks/auth';
import { useAction } from '../../../hooks/actions';
import { initialsName } from '../../../utils/stringTransform';
import { useSetupQuery } from '../../../hooks/graphql/hooks';
import ArrowRight from '../../../assets/img/ArrowRight.png';
import DashboardIcon from '../../../assets/img/Dashboard.png';
import HelpIcon from '../../../assets/img/HelpIcon.png';
import homeIcon from '../../../assets/img/homIcon.png';
import PromotionIcon from '../../../assets/img/PromotionIcon.png';
import * as S from './styles';

interface DrawerProps {
  navigation: any;
}

const DrawerContent: React.FC<DrawerProps> = ({ navigation }) => {
  const [letters, setLetters] = useState<string>();
  const { user } = useAuth();
  const { logEvent } = useAction();

  const [showRedeemButton, setShowRedeemButton] = useState(false);

  const { data: dataSetup } = useSetupQuery({
    variables: {
      setup_page: 'menu',
    },
  });

  useEffect(() => {
    const setupRedeemButton = dataSetup?.setup_list?.setups?.filter((setup) => setup?.category?.name === 'resgate-de-voucher');
    if (setupRedeemButton && setupRedeemButton?.length >= 1) {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        setShowRedeemButton(Boolean(setupRedeemButton[0]?.tag?.device[Platform.OS]));
      }
    }
  }, [dataSetup]);

  function initials(name: string) {
    setLetters(initialsName(name));
  }

  const menuNavigate = (
    routeName: string,
    routeDescription?: string,
    routeParams?: Record<string, unknown>,
  ) => {
    const description = routeDescription || routeName;

    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'menu',
      section: 'menu-drawer',
      description: routeName,
      payloadData: {
        menu: routeName,
        title: description,
      },
      userId: user ? user.id : '0',
    });

    if (routeParams) {
      navigation.navigate(routeName, routeParams);
      return;
    }
    navigation.navigate(routeName);
  };

  useEffect(() => {
    if (user) {
      initials(user.name);
    }
  }, [user]);

  return (
    <S.Container>
      <DrawerContentScrollView>
        <S.Container>
          <S.UserSection
            onPress={() => menuNavigate('Profile', 'Perfil', { screen: 'Profile' })}
          >
            <S.Row>
              <S.Avatar>
                <S.Letter>{letters || '?'}</S.Letter>
              </S.Avatar>
              <S.ContentUser>
                <S.Title>{user ? user.name : ''}</S.Title>
                <S.Caption>Acessar meu perfil</S.Caption>
              </S.ContentUser>
            </S.Row>
            <S.Icon source={ArrowRight} />
          </S.UserSection>
        </S.Container>

        <S.MenuItem onPress={() => menuNavigate('Home', 'Página Principal')}>
          <S.ContentInfo>
            <S.IconMenu source={homeIcon} />
            <S.Info>
              <S.Label>Home</S.Label>
              <S.Caption>Voltar para o início</S.Caption>
            </S.Info>
          </S.ContentInfo>
          <S.Icon source={ArrowRight} />
        </S.MenuItem>

        {showRedeemButton && (
          <S.MenuItem
            onPress={() => menuNavigate('Promotions', 'Resgate de Código', {
              screen: 'RedeemCode',
            })}
          >
            <S.ContentInfo>
              <S.IconMenu source={PromotionIcon} />
              <S.Info>
                <S.Label>Resgatar voucher</S.Label>
                <S.Caption>Utilize e resgate serviços</S.Caption>
              </S.Info>
            </S.ContentInfo>
            <S.Icon source={ArrowRight} />
          </S.MenuItem>
        )}

        <S.MenuItem onPress={() => menuNavigate('PlansServices', 'Plans and Services')}>
          <S.ContentInfo>
            <S.IconMenu
              source={DashboardIcon}
            />
            <S.Info>
              <S.Label>Planos & Serviços</S.Label>
              <S.Caption>Assinaturas e resgates</S.Caption>
            </S.Info>
          </S.ContentInfo>
          <S.Icon source={ArrowRight} />
        </S.MenuItem>

        <S.MenuItem onPress={() => menuNavigate('MyTickets', 'Meus ingressos')}>
          <S.ContentInfo>
            <S.IconMenu
              source={{
                uri:
                  'https://primepass-imagens.s3.us-east-1.amazonaws.com/gray_icone-ticket-32px.png',
              }}
            />
            <S.Info>
              <S.Label>Meus ingressos</S.Label>
              <S.Caption>Consulte seus saldos disponíveis</S.Caption>
            </S.Info>
          </S.ContentInfo>
          <S.Icon source={ArrowRight} />
        </S.MenuItem>

        <S.MenuItem
          onPress={() => menuNavigate('HelpDeskMenu', 'Central de ajuda', {
            screen: 'HelpDeskMenu',
          })}
        >
          <S.ContentInfo>
            <S.IconMenu source={HelpIcon} />
            <S.Info>
              <S.Label>Central de ajuda</S.Label>
              <S.Caption>Fale conosco</S.Caption>
            </S.Info>
          </S.ContentInfo>
          <S.Icon source={ArrowRight} />
        </S.MenuItem>
        {/* <S.MenuItem onPress={() => menuNavigate('Settings', 'Configurações')}>
          <S.ContentInfo>
            <S.IconMenu source={ConfigIcon} />
            <S.Info>
              <S.Label>Configurações</S.Label>
              <S.Caption>Preferências e ajustes</S.Caption>
            </S.Info>
          </S.ContentInfo>
          <S.Icon source={ArrowRight} />
        </S.MenuItem> */}
      </DrawerContentScrollView>
    </S.Container>
  );
};

export default DrawerContent;
