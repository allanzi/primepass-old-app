/* eslint-disable max-len, import/no-duplicates, react/no-unused-prop-types, react/require-default-props */
import React, { useState, useEffect } from 'react';
import {
  Modal as ModalReactNative, StatusBar, View,
} from 'react-native';

import { useLocation } from '../../hooks/location';
import SearchIcon from '../../assets/img/BuscarIcon.png';
import ClearIcon from '../../assets/img/CloseIcon.png';
import CloseIcon from '../../assets/img/CloseIcon.png';
import InputSearchIcon from '../../assets/img/InputSearchIcon.png';

import * as S from './styles';

interface ModalProps {
  title?: string;
  onChange?(param: boolean): void;
  visible: boolean;
  screenName?: string;
}

const HandleLocationModal: React.FC<ModalProps> = ({ onChange, visible }) => {
  const [iconVisible, setIconVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const {
    searchLocation,
    searchResults,
    getLocation,
    handleLocation,
    latitude,
    longitude,
    handledLocation,
  } = useLocation();
  const [searchKeywords, setSearchKeywords] = useState('' as any);
  const PLACE_ID_SP = 'ChIJ0WGkg4FEzpQRrlsz_whLqZs';
  const PLACE_ID_CAMPINAS = 'ChIJJWNL5x3GyJQRKsJ4IWo65Rc';
  const PLACE_ID_RJ = 'ChIJW6AIkVXemwARTtIvZ2xC3FA';
  const PLACE_ID_BH = 'ChIJMyzPysqQpgARlznSOl55NVs';

  useEffect(() => {
    setSearchKeywords('');
    searchLocation('');
  }, []);

  useEffect(() => {
    setSearchKeywords('');
    setIconVisible(false);
    if (onChange) {
      getLocation({ latitude, longitude, handledLocation });
      onChange(false);
    }
  }, [modalVisible]);

  return (
    <S.ModalWrapper>
      <ModalReactNative
        visible={visible}
        animationType="fade"
        transparent
      >
        <StatusBar backgroundColor="rgba(0,0,0, 0.8)" />
        <S.ContainerContent>
          <S.CloseModal onPress={() => setModalVisible(!modalVisible)}>
            <S.CloseIcon>
              <S.Icon source={CloseIcon} />
            </S.CloseIcon>
          </S.CloseModal>
          <S.SearchContainer>
            <S.InputContainer>
              <S.InputIcon source={InputSearchIcon} />

              <S.TextInput
                onChangeText={(text: string) => {
                  setIconVisible(true);
                  setSearchKeywords(text);
                  searchLocation(text);
                }}
                value={searchKeywords}
              />
              {iconVisible && (
                <S.ClearInput onPress={() => setSearchKeywords('')}>
                  <S.InputIcon source={ClearIcon} />
                </S.ClearInput>
              )}
            </S.InputContainer>
            {searchKeywords !== '' && (
              <>
                <S.MostAccessedCity>
                  <S.ResultsLabel>Resultado da busca</S.ResultsLabel>
                  <S.Separator>
                    <S.LineSeparator />
                  </S.Separator>
                </S.MostAccessedCity>

                <S.SearchResultsContainer
                  data={searchResults}
                  renderItem={({ item, index }) => (
                    <View key={String(index)}>
                      <S.ResultItem
                        onPress={async () => {
                          if (item) {
                            await handleLocation(item.place_id);
                            setSearchKeywords(item.description);
                            setModalVisible(!modalVisible);
                          }
                        }}
                      >
                        <S.ResultItemContainer>
                          <S.Icon source={SearchIcon} />
                          <S.SearchResultsItem>
                            {item.description}
                          </S.SearchResultsItem>
                        </S.ResultItemContainer>
                      </S.ResultItem>
                      <S.SeparatorItem>
                        <S.LineSeparator />
                      </S.SeparatorItem>
                    </View>
                  )}
                  keyExtractor={(_, index) => String(index)}
                />
              </>
            )}
            <S.MostAccessedCity>
              <S.ResultsLabel>Cidades mais acessadas</S.ResultsLabel>
              <S.Separator>
                <S.LineSeparator />
              </S.Separator>
              <S.ResultItem
                onPress={async () => {
                  await handleLocation(PLACE_ID_SP);
                  setSearchKeywords('São Paulo - SP');
                  setModalVisible(!modalVisible);
                }}
              >
                <S.ResultItemContainer>
                  <S.Icon source={SearchIcon} />
                  <S.SearchResultsItem>São Paulo - SP</S.SearchResultsItem>
                </S.ResultItemContainer>
              </S.ResultItem>
              <S.SeparatorItem>
                <S.LineSeparator />
              </S.SeparatorItem>
              <S.ResultItem
                onPress={async () => {
                  await handleLocation(PLACE_ID_CAMPINAS);
                  setSearchKeywords('Campinas - SP');
                  setModalVisible(!modalVisible);
                }}
              >
                <S.ResultItemContainer>
                  <S.Icon source={SearchIcon} />
                  <S.SearchResultsItem>Campinas - SP</S.SearchResultsItem>
                </S.ResultItemContainer>
              </S.ResultItem>
              <S.SeparatorItem>
                <S.LineSeparator />
              </S.SeparatorItem>
              <S.ResultItem
                onPress={async () => {
                  await handleLocation(PLACE_ID_RJ);
                  setSearchKeywords('Rio de Janeiro - RJ');
                  setModalVisible(!modalVisible);
                }}
              >
                <S.ResultItemContainer>
                  <S.Icon source={SearchIcon} />
                  <S.SearchResultsItem>Rio de Janeiro - RJ</S.SearchResultsItem>
                </S.ResultItemContainer>
              </S.ResultItem>
              <S.SeparatorItem>
                <S.LineSeparator />
              </S.SeparatorItem>
              <S.ResultItem
                onPress={async () => {
                  await handleLocation(PLACE_ID_BH);
                  setSearchKeywords('Belo Horizonte - MG');
                  setModalVisible(!modalVisible);
                }}
              >
                <S.ResultItemContainer>
                  <S.Icon source={SearchIcon} />
                  <S.SearchResultsItem>Belo Horizonte - MG</S.SearchResultsItem>
                </S.ResultItemContainer>
              </S.ResultItem>
              <S.SeparatorItem>
                <S.LineSeparator />
              </S.SeparatorItem>
            </S.MostAccessedCity>
          </S.SearchContainer>
        </S.ContainerContent>
      </ModalReactNative>
    </S.ModalWrapper>
  );
};

export default HandleLocationModal;
