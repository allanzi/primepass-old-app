/* eslint-disable array-callback-return, @typescript-eslint/no-shadow */
import React, { useState, useCallback, Fragment } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { ActivityIndicator } from 'react-native';
import Header from '../../../../components/Header';
import PaymentCard from '../../../../components/PaymentCard';
import api from '../../../../services/api';
import Dialog from '../../../../components/Dialog';
import { useAuth } from '../../../../hooks/auth';
import * as S from './styles';

interface DataProps {
  cardId: string;
  cardNumber: string;
  cardBrand: string;
  selected: boolean;
}

const CreditCardList: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState([] as DataProps[]);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCreditCardsList = async (userId: string) => {
    const { data } = await api.get(`/credit-cards?userId=${userId}`);
    return data;
  };

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        setLoading(true);
        try {
          const { data: myCards } = await getCreditCardsList(user.id);
          const newData = myCards.map((card: any) => ({
            cardId: card.id,
            cardNumber: card.masked,
            cardBrand: card.brand,
            selected: card.isDefault,
          }));
          setData(newData);
        } catch (error) {
          setModalErrorVisible(!modalErrorVisible);
        } finally {
          setLoading(false);
        }
      };
      getData();
    }, [user]),
  );

  const handleCardPress = async (position: number) => {
    const { cardId } = data[position];
    try {
      await api.put('/credit-cards', {
        userId: user?.id,
        creditCardId: cardId,
      });
      const newData = data.map((item, index) => (index === position
        ? { ...item, selected: true }
        : { ...item, selected: false }));
      setData(newData);
    } catch (error) {
      setModalErrorVisible(!modalErrorVisible);
    }
  };

  const handleCardDelete = async (position: number) => {
    const { cardId } = data[position];
    try {
      setLoading(true);
      await api.delete(`/credit-cards/${cardId}`);
      const newData = [] as DataProps[];
      data.map((item, index) => {
        if (index !== position) {
          newData.push({ ...item });
        }
      });
      setData(newData);
    } catch (error) {
      setModalErrorVisible(!modalErrorVisible);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        title="Ops, algo deu errado"
        message="Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
        visible={modalErrorVisible}
        error
        handleClose={() => setModalErrorVisible(!modalErrorVisible)}
      />
      <S.Container>
        <Header title="Meus cartões de crédito" />
        <S.CardContainer>
          <S.CardList>
            {loading
              ? (
                <S.ContainerLoading>
                  <ActivityIndicator animating color="#fff" />
                </S.ContainerLoading>
              ) : (
                <>
                  {data.map((card, index) => (
                    <Fragment key={card.cardId}>
                      <PaymentCard
                        card={card.cardNumber}
                        brand={card.cardBrand}
                        edit={false}
                        selected={card.selected}
                        onPress={() => handleCardPress(index)}
                        onDelete={() => handleCardDelete(index)}
                        style={{ zIndex: 999999 }}
                      />
                      <S.Separator />
                    </Fragment>
                  ))}
                  <PaymentCard card="" brand="" edit={false} />
                </>
              )}

          </S.CardList>
        </S.CardContainer>
      </S.Container>
    </>
  );
};

export default CreditCardList;
