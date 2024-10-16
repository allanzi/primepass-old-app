import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import { useThemeContext } from '../../hooks/theme';
import ErrorImage from '../../assets/img/error.webp';
import * as S from './styles';

const ServerError: React.FC = () => {
  const { theme } = useThemeContext();
  const color = theme === 'dark' ? '#212121' : '#f2f2f2';
  const navigation = useNavigation();

  return (
    <S.Container>
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
      <S.ImageContainer>

        <S.Image
          source={ErrorImage}
          resizeMode={FastImage.resizeMode.contain}
        />
        <S.Label>
          <S.Title>Sem comunicação com o servidor</S.Title>

          <S.Text>
            Calma, calma, não precisa ficar bravo e nem preocupado, deixamos seus códigos
            salvos para nesses momentos, sua diversão ser garantida! :D
          </S.Text>
        </S.Label>
      </S.ImageContainer>

      <S.ButtonContainer>
        <S.Button disable={false} onPress={() => navigation.navigate('Transactions', { screen: 'TransactionsHistory' })}>
          Acesse aqui seus ingressos
        </S.Button>
        <S.Button disable={false} outline onPress={() => navigation.navigate('Home')} isLoading={false}>
          Tentar novamente
        </S.Button>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default ServerError;
