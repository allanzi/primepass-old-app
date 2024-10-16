/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { getVersion, getBuildNumber } from 'react-native-device-info';

import Header from '../../components/Header';
import Star from '../../assets/img/star.png';
import ArrowRight from '../../assets/img/ArrowRight.png';
import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';
import Review from '../Review';
import * as S from './styles';

const Settings: React.FC = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const { user } = useAuth();
  const { logEvent } = useAction();

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'settings',
      section: 'page',
      description: 'Settings',
      userId: user ? user.id : '0',
    });
  }, [user]);

  const handleOpenReviewModal = () => {
    if (!user) {
      navigation.dispatch(CommonActions.navigate('Home'));
      navigation.navigate('Login', {
        screen: 'Welcome',
        params: {
          next: 'Settings',
        },
      });
      return;
    }

    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'settings',
      section: 'review',
      description: 'Rate the app',
      userId: user ? user.id : '0',
    });

    setModalVisible(true);
  };

  return (
    <S.Container>
      <Header title="Configurações" />
      <Review visible={modalVisible} setVisible={setModalVisible} />
      <S.Item>
        <S.ContainerInfo onPress={handleOpenReviewModal}>
          <S.Icon source={Star} />
          <S.Info>
            <S.Label>Avaliar o aplicativo</S.Label>
            <S.Caption>Sua opinião importa</S.Caption>
          </S.Info>
        </S.ContainerInfo>
        <S.IconBack source={ArrowRight} />
      </S.Item>

      <S.VersionCode>
        Versão:
        {' '}
        {getVersion()}
        {' '}
        - Build:
        {' '}
        {getBuildNumber()}
      </S.VersionCode>
    </S.Container>
  );
};

export default Settings;
