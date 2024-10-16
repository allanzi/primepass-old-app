import React from 'react';
import { Modal } from 'react-native';

import * as S from './styles';

const Dialog: React.FC<Props> = (props) => {
  const { onClose, open, children } = props;
  return (
    <Modal
      animationType="slide"
      transparent
      visible={open}
      onRequestClose={() => onClose()}
    >
      <S.Container>{children}</S.Container>
    </Modal>
  );
};

export default Dialog;
