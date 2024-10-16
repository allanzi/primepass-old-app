import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import noConnection from '../../assets/img/noConnection.webp';
import { useThemeContext } from '../../hooks/theme';
import * as S from './styles';

const ConnectionError: React.FC = () => {
  const { theme } = useThemeContext();
  const color = theme === 'dark' ? '#212121' : '#f2f2f2';
  const navigation = useNavigation();

  return (
    <S.Container>
      <S.ImageContainer>
        <S.Image
          resizeMode={FastImage.resizeMode.contain}
          source={noConnection}
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
          <S.Title>Sem conexão</S.Title>
          <S.Text>
            Poxa, parece que você está sem conexão.
            Mas não se preocupe, seus códigos foram todos armazenados para garantir sua diversão!
          </S.Text>
        </S.Label>
      </S.ImageContainer>

      <S.ButtonContainer>
        <S.Button disable={false} onPress={() => navigation.navigate('Transactions', { screen: 'TransactionsHistory' })}>
          Acesse aqui seus ingressos
        </S.Button>
        <S.Button disable={false} outline onPress={() => navigation.navigate('Home')}>
          Voltar para Home
        </S.Button>
      </S.ButtonContainer>

      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </S.Container>
  );
};

export default ConnectionError;
