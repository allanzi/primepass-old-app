import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputSubmitEditingEventData,
  Linking,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Grayscale, RGBA } from 'react-native-color-matrix-image-filters';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { Cinema } from '../../@types/graphql/schemas';
import { useLocation } from '../../hooks/location';
import Dialog from '../Dialog';
import Input from '../Input';
import QuestionIcon from '../../assets/img/question.svg';
import * as S from './styles';

interface TransactionTheatersFilterProps {
  loading: boolean;
  disableFilter: boolean;
  cinemas: Array<Cinema>;
  cinemasSelected: Array<string>;
  setCinemasSelected: Function;
  searchText: string;
  handleChangeText: (text: string) => void;
  setSearchText: (
    e: NativeSyntheticEvent<TextInputChangeEventData>
    | NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  handleClear: () => void;
}

const TransactionTheatersFilter: React.FC<TransactionTheatersFilterProps> = ({
  loading,
  cinemas,
  cinemasSelected,
  searchText,
  setSearchText,
  setCinemasSelected,
  handleChangeText,
  disableFilter,
  handleClear,
}) => {
  const { gpsOn } = useLocation();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const handleGeoLocation = async () => {
    Linking.openSettings();
    navigation.navigate('Home');
  };

  const clickItem = (item: Cinema) => {
    if (!disableFilter) {
      if (cinemasSelected.includes(item.id)) {
        setCinemasSelected(cinemasSelected.filter((cinemaId: string) => item.id !== cinemaId));
        return;
      }

      const newSelectedCinemas = [...cinemasSelected];
      newSelectedCinemas.push(item.id);
      setCinemasSelected(newSelectedCinemas);
    }
  };

  return (
    <S.Container>
      <Dialog
        title="Escolha o cinema"
        message={'Encontre as diversas redes de cinema parceiras da'
          + ' Primepass próximo a sua região e escolha a que mais'
          + ' te agrada. São diversos tipos de telas e salas, comuns'
          + ' ou especiais, para todos os gostos.'
          + '\n\n'
          + 'Os ingressos resgatados pela Primepass concedem'
          + ' acesso a qualquer filme no complexo de cinema escolhido,'
          + ' a depender da lotação.'}
        visible={modalVisible}
        handleClose={() => setModalVisible(false)}
      />

      <S.ContainerTitle>
        <S.Title>Escolha o cinema</S.Title>
        <QuestionIcon onPress={() => setModalVisible(true)} />
      </S.ContainerTitle>

      <Form ref={formRef} onSubmit={setSearchText}>
        <Input
          name="input"
          icon="times-circle"
          placeholder="Pesquisar"
          autoCapitalize="none"
          onChangeText={handleChangeText}
          onChange={setSearchText}
          onSubmitEditing={setSearchText}
          value={searchText}
          handleClear={handleClear}
        />
      </Form>

      {!gpsOn
        ? (
          <S.ContainerWarnGPS>
            <S.Text>
              {'Para encontrar os cinemas próximos de você,'
              + '\n'
              + 'precisamos ' }
              <S.TextBold>saber sua localização (GPS)</S.TextBold>
              .
            </S.Text>

            <S.Button disable={false} onPress={handleGeoLocation} isLoading={false}>
              <S.ButtonText>Permitir acesso</S.ButtonText>
            </S.Button>

            <S.Image source={require('../../assets/img/gps.png')} />
          </S.ContainerWarnGPS>
        )
        : (
          <>
            <S.Subtitle>Redes de cinema</S.Subtitle>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <FlatList
                data={cinemas}
                keyExtractor={(cinema) => cinema.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: cinema }) => (
                  <S.TouchableOpacity onPress={() => clickItem(cinema)}>
                    <RGBA red={1} green={1} blue={1} alpha={1}>
                      <Grayscale amount={cinemasSelected.includes(cinema.id) ? 0 : 1}>
                        <S.Theater
                          source={{ uri: cinema.logo }}
                          active={cinemasSelected.includes(cinema.id)}
                        />
                      </Grayscale>
                    </RGBA>
                  </S.TouchableOpacity>
                )}
              />
            )}

          </>
        )}

    </S.Container>
  );
};

export default TransactionTheatersFilter;
