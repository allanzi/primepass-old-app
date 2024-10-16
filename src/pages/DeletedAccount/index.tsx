import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import deletedAccount from '../../assets/img/deletedAccount.webp';
import { useThemeContext } from '../../hooks/theme';
import * as S from './styles';

const DeletedAccount: React.FC = () => {
  const { theme } = useThemeContext();
  const color = theme === 'dark' ? '#212121' : '#f2f2f2';
  const navigation = useNavigation();

  return (
    <S.Container>
      <S.ImageContainer>
        <S.Image
          resizeMode={FastImage.resizeMode.contain}
          source={deletedAccount}
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
          <S.Title>Conta excluída!</S.Title>
          <S.Text>
            Sua conta foi excluída!
            {'\n\n'}
            Vamos te enviar um e-mail
            {'\n'}
            com a confirmação da
            {'\n'}
            exclusão de conta!
            {'\n\n'}
            Esperamos revê-lo em breve!
            {'\n'}
            Conte sempre com a gente :)
          </S.Text>
        </S.Label>
      </S.ImageContainer>

      <S.ButtonContainer>
        <S.Button
          disable={false}
          outline
          onPress={() => navigation.navigate('Login', {
            screen: 'Welcome',
          })}
        >
          Voltar para página inicial
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

export default DeletedAccount;
