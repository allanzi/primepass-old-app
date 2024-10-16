/* eslint-disable react/require-default-props */
import React from 'react';
import FastImage from 'react-native-fast-image';

import * as S from './styles';

interface CardProps {
  cover: string;
  avatar: string;
  background?: string;
  letter?: string;
}

const Avatar: React.FC<CardProps> = ({
  cover,
  avatar,
  background = '#000',
  letter = '',
  children,
}) => (
  <S.Container background={background}>
    <S.Cover
      resizeMode={FastImage.resizeMode.contain}
      source={{
        uri: cover,
      }}
    />
    <S.HeaderContainer>
      {children}
    </S.HeaderContainer>
    <S.AvatarContainer>
      <S.Avatar
        resizeMode={FastImage.resizeMode.contain}
        source={{
          uri: avatar,
        }}
      />
      { letter.length > 0 && (
        <S.LetterContainer>
          <S.Letter>{letter}</S.Letter>
        </S.LetterContainer>
      )}
    </S.AvatarContainer>
  </S.Container>
);

export default Avatar;
