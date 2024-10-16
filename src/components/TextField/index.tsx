import React from 'react';

import { Props } from './types';
import * as S from './styles';

const TextField: React.FC<Props> = (props: Props) => {
  const {
    value,
    onChangeText,
    placeholder,
    leftSide,
    rightSide,
    autoFocus,
    keyboardType,
    returnKeyType,
    onSubmitEditing,
    editable,
    onFocus,
    onBlur,
    onChange,
  } = props;

  return (
    <S.InputContainer active={editable || true}>
      <S.LeftSide style={{ display: leftSide ? 'flex' : 'none' }}>
        {leftSide}
      </S.LeftSide>
      <S.CenterSide>
        <S.Input
          value={value}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          placeholderTextColor="#6b6b6b"
          placeholder={placeholder}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          editable={editable}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
      </S.CenterSide>
      <S.RightSide style={{ display: rightSide ? 'flex' : 'none' }}>
        {rightSide}
      </S.RightSide>
    </S.InputContainer>
  );
};

export default TextField;
