/* eslint-disable default-case */
import React, { useState } from 'react';
import Moment from 'moment';

import Modal from '../../../../components/Modal';
import Dotted from '../../../../components/DottedSeparator';
import Question from '../../../../assets/img/question.svg';
import Dialog from '../../../../components/Dialog';
import { CardTicketResumeProps } from './types';
import * as S from './styles';

const CardTicketResume: React.FC<CardTicketResumeProps> = ({
  totalCredits,
  creditUsed,
  fromPlan,
  finishDate,
  screen,
  room,
  days,
}) => {
  const total = totalCredits || 0;
  const used = creditUsed || 0;
  const availableCredits = total - used;
  const cardDisabled = availableCredits <= 0;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', message: '' });

  const handleDialog = (content: string) => {
    switch (content) {
      case 'quantity':
        setDialogContent({
          title: 'Quantidade',
          message: 'Número de ingressos disponíveis para utilização a partir do plano de assinatura escolhido.',
        });
        setDialogVisible(true);
        break;
      case 'disponibility':
        setDialogContent({
          title: 'Dias habilitados para resgate',
          message: 'Dias da semana permitidos para os resgates dos ingressos conforme o plano de assinatura escolhido.',
        });
        setDialogVisible(true);
        break;
    }
  };

  const handleModal = (type: string) => {
    switch (type) {
      case 'room':
        setModalContent({
          title: 'Tipos de sala',
          message: '<b>4DX</b><br>A tecnologia das Salas 4DX® oferecem ao público uma experiência audiovisual'
          + 'sem precedentes, com efeitos e sensações sincronizadas ao filme. As poltronas têm sistema eletrônico '
          + 'de movimentos, que permite simular quedas, trepidação e vibrações, além de aceleração e frenagem.<br><br> '
          + '<b>IMAX</b><br>Qualidade 4K aplicada com fidelidade à uma tela, com maior quantidade de pixels e o dobro de '
          + 'resolução quando comparado a um projetor tradicional, usando 2 projetores de 6.500 watts cada um. '
          + 'Cada elemento desta sala está projetado com uma geometria dentro dos padrões mais exigentes para criar '
          + ' uma experiência mais intensa, que te permitem um maior realismo.<br><br><b>VIP</b><br>A sala é bem '
          + 'diferente da convencional, com poltronas reclináveis e muito mais confortáveis, para proporcionar o '
          + 'máximo de bem-estar e de aconchego para as sessões. As salas também possuem cardápio diferenciado na '
          + 'bomboniere e atendimento personalizado.<br><br><b>REAL D 3D</b><br>Nas salas 3D da rede Cinemark você '
          + 'vive a experiência tridimensional REAL D 3D com muito mais emoção. Com a tecnologia REAL D 3D a fusão das '
          + 'imagens preserva a noção de profundidade e torna a sensação de mergulhar no universo do filme ainda mais '
          + 'intensa e verdadeira. Esse é o sistema de projeção líder mundial no segmento, e oferece uma experiência única, '
          + 'idêntica ao que nossos olhos veem naturalmente.<br><br>',
        });
        setModalVisible(true);
        break;
      case 'screen':
        setModalContent({
          title: 'Tipos de tela',
          message: '<b>2D</b><br>Sala de cinema padrão. Viva a emoção do cinema em sua essência clássica e fique por'
          + ' dentro dos últimos lançamentos.<br><br> <b>3D</b><br>Conte com o melhor da tecnologia ao assistir a um '
          + 'filme 3D, em salas especialmente equipadas com projetores, telas e óculos.<br><br> ',
        });
        setModalVisible(true);
        break;
      case 'all':
        setModalContent({
          title: 'Tipos de tela e sala disponíveis',
          message: `Tela: ${screen.join(', ')}. Sala: ${room.join(', ')}.`,
        });
        setModalVisible(true);
        break;
    }
  };

  return (
    <>
      <S.CardContainer>
        <Dialog
          title={dialogContent.title}
          message={dialogContent.message}
          visible={dialogVisible}
          handleClose={() => setDialogVisible(false)}
        />
        <Modal
          visible={modalVisible}
          title={modalContent.title}
          onChange={() => setModalVisible(false)}
          screenName="CodeRedemption"
          message={modalContent.message}
          isHtml
        />
        <S.ContentContainer>
          <S.TicketsContainer>
            <S.QuantityContainer>
              <S.TitleContainer>
                <S.Title>
                  Quantidade
                </S.Title>
                <Question onPress={() => handleDialog('quantity')} />
              </S.TitleContainer>

              <S.Ticket disable={cardDisabled}>
                <S.CreditText disable={cardDisabled}>
                  {availableCredits}
                </S.CreditText>
              </S.Ticket>

              {fromPlan && (
                <S.CreditComplementText>
                  Recarga em
                  {' '}
                  {Moment(finishDate).add(1, 'days').format('DD/MM/YYYY')}
                </S.CreditComplementText>
              )}

              <S.CreditComplementText>
                {availableCredits > 0
                  ? `Válido até ${Moment(finishDate).format('DD/MM/YYYY')} `
                  : ''}
              </S.CreditComplementText>

            </S.QuantityContainer>

            <Dotted vertical />

            <S.Plan>
              <S.ContentTypes>
                <S.ContentType>
                  <S.TitleContainer>
                    <S.Title>
                      Tipos de tela
                    </S.Title>
                    <Question onPress={() => handleModal('screen')} />
                  </S.TitleContainer>
                  <S.Types>
                    {screen.slice(0, 4).map((item) => (
                      <S.Box>
                        <S.Type>
                          {item}
                        </S.Type>
                      </S.Box>
                    ))}
                  </S.Types>
                </S.ContentType>

                <S.ContentType>
                  <S.TitleContainer>
                    <S.Title>
                      Tipos de salas
                    </S.Title>
                    <Question onPress={() => handleModal('room')} />
                  </S.TitleContainer>
                  <S.Types>
                    {room.slice(0, 4).map((item) => (
                      <S.Box>
                        <S.Type>
                          {item}
                        </S.Type>
                      </S.Box>
                    ))}
                  </S.Types>
                </S.ContentType>
              </S.ContentTypes>

              {(screen.length > 3 || room.length > 3)
                && (
                  <S.Link onPress={() => handleModal('all')}>
                    Ver todos
                  </S.Link>
                )}
            </S.Plan>
          </S.TicketsContainer>
        </S.ContentContainer>
      </S.CardContainer>

      <S.ContainerRedeem>
        <S.TitleContainer>
          <S.TitleRedeem>
            Dias habilitados para resgate
          </S.TitleRedeem>
          <Question onPress={() => handleDialog('disponibility')} />
        </S.TitleContainer>
        <S.DaysContainer>
          {days.map((item) => (
            <S.Day key={item}>
              <S.DayLabel>
                {item}
              </S.DayLabel>
            </S.Day>
          ))}
        </S.DaysContainer>
      </S.ContainerRedeem>

      {fromPlan ? (
        <S.ContainerBottomText>
          <S.BottomText>
            Consulte seu plano de assinatura para verificar a quantidade de ingressos disponíveis
            mensalmente.
          </S.BottomText>
        </S.ContainerBottomText>
      ) : (
        <S.ContainerBottomText>
          <S.BottomText>
            Ingresso resgatado por voucher possui validade diferente dos ingressos do plano mensal.
            O ingresso pode ser utilizado até a data de validade.
            Após o vencimento, caso não seja utilizado, não será possível resgatá-lo novamente.

          </S.BottomText>
        </S.ContainerBottomText>
      )}
    </>
  );
};

export default CardTicketResume;
