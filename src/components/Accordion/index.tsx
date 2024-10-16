import React, { useState } from 'react';
import type { GestureResponderEvent } from 'react-native';

import type { AccordionProps, AccordionActionProps, AccordionInformationProps } from './types';
import ArrowRight from '../../assets/img/ArrowRight.png';
import ArrowDown from '../../assets/img/ArrowDown.png';
import * as S from './style';
import Info from '../../assets/img/info.svg';

export const AccordionAction: React.FC<AccordionActionProps> = (props) => {
  const {
    icon, label, onPress, loading,
  } = props;

  const handleOnPress = (event: GestureResponderEvent) => {
    if (!loading) {
      onPress(event);
    }
  };

  return (
    <S.AccordionAction onPress={handleOnPress}>
      <S.AccordionActionIcon
        style={{ display: loading ? 'none' : 'flex' }}
        source={icon}
      />
      <S.Loading
        style={{ display: loading ? 'flex' : 'none' }}
        size="small"
        color="#fff"
      />
      <S.AccordionActionLabel>
        {loading ? 'Processando...' : label}
      </S.AccordionActionLabel>
    </S.AccordionAction>
  );
};

export const AccordionInformation: React.FC<AccordionInformationProps> = (props) => {
  const {
    children, title,
  } = props;
  const [showBody, setShowBody] = useState<boolean>(false);

  const handleShowBody = () => {
    setShowBody(!showBody);
  };

  return (
    <S.AccordionInformation>
      <S.AccordionHeader onPressOut={() => handleShowBody()}>
        <S.AccordionHeaderInformation>
          <S.AccordionLabel>{title}</S.AccordionLabel>
          <Info width={14} heigth={14} marginLeft={4} />
        </S.AccordionHeaderInformation>
      </S.AccordionHeader>

      <S.AccordionInformationBody style={{ display: showBody ? 'flex' : 'none' }}>
        {children}
      </S.AccordionInformationBody>
    </S.AccordionInformation>
  );
};

const Accordion: React.FC<AccordionProps> = (props) => {
  const {
    children, icon, title, description,
  } = props;
  const [showBody, setShowBody] = useState<boolean>(false);

  const handleShowBody = () => {
    setShowBody(!showBody);
  };

  return (
    <S.Accordion>
      <S.AccordionHeader onPressOut={() => handleShowBody()}>
        <S.AccordionHeaderLeft>
          <S.AccordionIcon source={icon} />
        </S.AccordionHeaderLeft>
        <S.AccordionHeaderCenter>
          <S.AccordionLabel>{title}</S.AccordionLabel>
          <S.AccordionDescription>{description}</S.AccordionDescription>
        </S.AccordionHeaderCenter>
        <S.AccordionHeaderRight>
          <S.Icon source={showBody ? ArrowDown : ArrowRight} />
        </S.AccordionHeaderRight>
      </S.AccordionHeader>
      <S.AccordionBody style={{ display: showBody ? 'flex' : 'none' }}>
        {children}
      </S.AccordionBody>
    </S.Accordion>
  );
};

export default Accordion;
