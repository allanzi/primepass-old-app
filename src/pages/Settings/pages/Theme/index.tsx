import React from 'react';
import { Switch } from 'react-native';

import Header from '../../../../components/Header';
import { useThemeContext } from '../../../../hooks/theme';
import * as S from './styles';

const Theme: React.FC = () => {
  const { theme, changeTheme } = useThemeContext();
  return (
    <S.Container>
      <Header title="Tema" />
      <S.Item>
        <S.Label>{theme}</S.Label>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={theme !== 'dark' ? '#f5dd4b' : '#f4f3f4'}
          value={theme !== 'dark'}
          onValueChange={changeTheme}
        />
      </S.Item>
    </S.Container>
  );
};

export default Theme;
