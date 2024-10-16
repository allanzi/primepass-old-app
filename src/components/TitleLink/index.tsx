/* eslint-disable @typescript-eslint/no-shadow, react/require-default-props */
import React, { useCallback, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { ThemeContext } from 'styled-components';

import * as S from './styles';

interface TitleLinkProps {
  children: string;
  keyword: string;
  link: string;
  serviceTypeId?: string;
}

const TitleLink: React.FC<TitleLinkProps> = ({
  children,
  keyword,
  link,
  serviceTypeId,
}) => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  const handleNavigate = useCallback((link) => {
    switch (link) {
      case 'TheatersService':
        navigation.navigate('Theaters', {
          screen: link,
        });
        break;
      case link:
        navigation.navigate('Services', {
          screen: 'Service',
          params: {
            screenName: link,
            serviceType: {
              id: serviceTypeId,
              name: link,
              title: keyword,
            },
          },
        });
        break;
      default:
    }
  }, []);

  return (
    <S.Container onPress={() => handleNavigate(link)}>
      <S.Title>
        {children}
        {' '}
      </S.Title>
      <S.KeyWord>{keyword}</S.KeyWord>
      <Icon
        color={theme.colors.colorTextNotRecivedCode}
        size={25}
        name="chevron-right"
      />
    </S.Container>
  );
};

export default TitleLink;
