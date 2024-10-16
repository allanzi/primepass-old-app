import React, { useState } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ModalMessageProps, TransactionCheckInCodesProps } from './types';
import ArrowRight from '../../assets/img/arrow-right-blue.svg';
import Clipboard from '../../utils/clipboard';
import CopyIcon from '../../assets/img/copy.svg';
import Dialog from '../Dialog';
import InfoIcon from '../../assets/img/info.svg';
import QuestionIcon from '../../assets/img/question.svg';
import * as S from './styles';

enum Type {
  DAYS = 'days',
  HOW = 'how',
}

const TransactionCheckInCodes: React.FC<TransactionCheckInCodesProps> = ({
  codes,
  days,
  hasSeat,
  seatUrl,
  steps,
}) => {
  const navigation = useNavigation();

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    type: null,
    message: null,
    footer: null,
  } as ModalMessageProps);

  const handleDialogSteps = () => {
    setDialogContent({
      title: 'Como resgatar',
      message: '',
      type: Type.HOW,
      footer: null,
    });

    setDialogVisible(true);
  };

  const handleDialogDays = () => {
    setDialogContent({
      title: 'Dias habilitados para uso',
      message: '',
      type: Type.DAYS,
      footer: null,
    });

    setDialogVisible(true);
  };

  const parseHtml = (html: string) => {
    const regex = /(<([^>]+)>)/ig;
    return html.replace(regex, '');
  };

  const contentModalSteps = () => (
    <>
      <S.TextSmall>
        <S.Bold>
          Saiba quais são os próximos passos:
          {'\n\n'}
        </S.Bold>

        {steps?.map((step) => (
          <S.TextSmall>
            {parseHtml(step)}
            {'\n\n'}
          </S.TextSmall>
        ))}
      </S.TextSmall>
    </>
  );

  const contentModalDays = () => (
    <>
      <S.TextSmall>
        Os dias que ficam disponíveis para o uso dos ingressos
        {' '}
        <S.Bold>
          dependem do dia em que foi efetuado o resgate
        </S.Bold>
        . Verifique em
        {' '}
        <S.Bold>“Meus ingressos”</S.Bold>
        {' '}
        a disponibilidade do saldo que você têm disponível.
      </S.TextSmall>
    </>
  );

  const dayInText = (day: number) => {
    const daysText = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
    return daysText[day - 1];
  };

  return (
    <S.Container>
      <Dialog
        title={dialogContent.title}
        message={dialogContent.message}
        visible={dialogVisible}
        footer={dialogContent.footer}
        handleClose={() => setDialogVisible(false)}
      >
        {dialogContent.type === Type.HOW && contentModalSteps()}
        {dialogContent.type === Type.DAYS && contentModalDays()}
      </Dialog>
      <S.Row>
        <S.TextSmall>Dias habilitados para uso</S.TextSmall>
        <QuestionIcon onPress={() => handleDialogDays()} />
      </S.Row>

      <S.Row>
        {days?.map((day) => (
          <S.Day>
            <S.TextMinimum>{dayInText(day)}</S.TextMinimum>
          </S.Day>
        ))}
      </S.Row>

      <S.Repel>
        <S.Row>
          <S.Text>
            {codes.length > 1 ? 'Códigos dos seus' : 'Código do seu'}
            {' '}
            <S.Bold>
              {codes.length}
              {' '}
              {codes.length > 1 ? 'ingressos' : 'ingresso'}
            </S.Bold>
          </S.Text>
        </S.Row>

        <S.ContainerPress onPress={() => handleDialogSteps()}>
          <S.Row>
            <S.TextBlue>
              Como resgatar
            </S.TextBlue>
            <ArrowRight />
          </S.Row>
        </S.ContainerPress>
      </S.Repel>

      <S.ContainerTickets>
        {codes?.map((code) => (
          <S.Ticket key={code}>
            <S.TextLarge>
              {code.code}
            </S.TextLarge>
            <S.CopyContainer onPress={() => Clipboard(code.code)}>
              <CopyIcon />
            </S.CopyContainer>
          </S.Ticket>

        ))}
      </S.ContainerTickets>

      <S.Actions>
        {hasSeat
          && (
            <S.Button
              disable={false}
              onPress={() => Linking.openURL(seatUrl || 'https://www.ingresso.com/')}
            >
              <S.ButtonText>
                Ir para o site da ingresso.com
              </S.ButtonText>
            </S.Button>
          )}

        <S.Button
          disable={false}
          outline
          onPress={() => { navigation.navigate('Home'); }}
        >
          <S.ButtonText>
            Voltar para página inicial
          </S.ButtonText>
        </S.Button>
      </S.Actions>

      <S.CardWarning>
        <S.Row>
          <InfoIcon width={10} height={10} marginRight={4} />
          <S.Text>
            <S.Bold>Regras sobre os códigos de ingressos</S.Bold>
          </S.Text>
        </S.Row>
        <S.TextWarning>
          É vedada a comercialização ou exploração econômica dos
          ingressos sobre qualquer forma ou meio. O repasse e a venda
          destes ingressos está sujeito a
          <S.TextRed>
            {' '}
            suspensão do plano
            {' '}
          </S.TextRed>
          de forma
          imediata e permanente.
        </S.TextWarning>
      </S.CardWarning>

    </S.Container>
  );
};

export default TransactionCheckInCodes;
