import React from 'react';

import { Props } from './types';
import * as S from './styles';

const Card: React.FC<Props> = (props) => {
  const {
    onPress, thumbnail, title, subtitle, tag,
  } = props;

  return (
    <S.Card onPress={onPress}>
      <S.Container>
        <S.Tag
          style={{
            backgroundColor: tag.color,
          }}
        >
          {tag.label}
        </S.Tag>
        <S.Thumbnail source={thumbnail} />
        <S.Title numberOfLines={1}>{title}</S.Title>
        <S.Subtitle>{subtitle}</S.Subtitle>
      </S.Container>
    </S.Card>
  );
};

export default Card;
