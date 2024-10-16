/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';

import closeIcon from '../../../../assets/img/close.png';
import { useAuth } from '../../../../hooks/auth';
import { useAction } from '../../../../hooks/actions';
import * as S from './styles';

interface ModalReviewCommentProps {
  step: string;
  setStep: (step: string) => void;
  setVisible: (visible: boolean) => void;
}

const ModalReviewComment: React.FC<ModalReviewCommentProps> = ({
  setStep,
  setVisible,
}) => {
  const { user } = useAuth();
  const { logEvent } = useAction();
  const name = user ? user.name.split(' ')[0] : 'Visitante';
  const reviewAvatar = 'https://primepass-imagens.s3.amazonaws.com/avatar-110x.png';
  const [comment, setComment] = useState('' as string);

  const handleClose = () => {
    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'review',
      section: 'no-comments',
      description: 'Left without posting a comment.',
      userId: user ? user.id : '0',
    });
    setStep('ModalReviewEnjoyAsk');
    setVisible(false);
  };

  const handleComment = async () => {
    try {
      if (comment.length <= 9) {
        Alert.alert('Comentário deve ter pelos menos 10 caracteres');
        return;
      }

      await axios.post(
        'https://primepass.zendesk.com/api/v2/requests.json',
        {
          request: {
            custom_fields: [
              { id: 360034914592, value: 'feedbaks_e_sugestões' },
            ],
            subject: 'Comentário feito no review do app.',
            comment: {
              body: comment,
            },
            requester: {
              name: user.name,
            },
          },
        },
        {
          auth: {
            username: `${user.email}/token`,
            password: '38MmUB9Yg9DfyxW9gSgntmWWFzhBNWXk75KSE9xe',
          },
        },
      );

      setStep('ModalReviewThanks');
    } catch (e) {
      Alert.alert(
        'Não foi possível enviar seu comentário, tente novamente mais tarde.',
      );
    }
  };

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'review',
      section: 'comments',
      description: 'Review comment',
      userId: user ? user.id : '0',
    });
  }, [user]);

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <S.InsideModalContainer>
        <S.ModalCloseButtonContainer>
          <S.ModalCloseButton onPress={handleClose}>
            <S.ModalCloseIcon source={closeIcon} />
          </S.ModalCloseButton>
        </S.ModalCloseButtonContainer>
        <S.ModalBody>
          <S.ModalBodyTop>
            <S.ModalTitle>
              <S.ModalTitleText>Central de atendimento</S.ModalTitleText>
            </S.ModalTitle>
            <S.ModalBodyImage source={{ uri: reviewAvatar }} />
            <S.ModalBodyHello>
              Olá,
              {name}
            </S.ModalBodyHello>
            <S.ModalBodyText>
              Nós adoraríamos receber seu comentário
              {' '}
              {'\n'}
              sobre como poderíamos melhorar.
            </S.ModalBodyText>
          </S.ModalBodyTop>
          <S.CommentContainer>
            <S.CommentTextContainer>
              <S.CommentText
                multiline
                placeholderTextColor="#6B6B6B"
                placeholder="Por favor deixe seu comentário aqui ..."
                onChangeText={setComment}
              />
            </S.CommentTextContainer>
          </S.CommentContainer>
          <S.ModalButtons>
            <S.Separator>
              <S.LineSeparator />
            </S.Separator>
            <S.ButtonContainer>
              <S.Button onPress={handleComment}>
                <S.ButtonText>Enviar comentário</S.ButtonText>
              </S.Button>
            </S.ButtonContainer>
          </S.ModalButtons>
        </S.ModalBody>
      </S.InsideModalContainer>
    </TouchableWithoutFeedback>
  );
};

export default ModalReviewComment;
