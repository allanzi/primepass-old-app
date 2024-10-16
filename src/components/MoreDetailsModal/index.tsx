/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { Modal, StatusBar } from 'react-native';

import * as S from './styles';
import ParentalRating from '../ParentalRating';
import parseMovieDuration from './utils/parseMovieDuration';
import { ContentService } from '../../@types/graphql/schemas';

interface ModalProps {
  title?: string;
  closeModal(): void;
  visible: boolean;
  data: ContentService;
}

const MoreDetailsModal: React.FC<ModalProps> = ({
  title = 'Mais Detalhes',
  data,
  closeModal,
  visible,
}) => {
  const { duration: totalMinutes } = data;
  const [duration, setDuration] = useState(data?.duration as number | string);
  const image = data?.medias?.filter((item) => item?.typeUrl === 'moreDetail');
  const serviceType = data?.services?.[0]?.type?.name;
  const launchYear = data?.launchDate?.split('-')[0] as string;
  const defaultPlaceholder = 'https://s3.amazonaws.com/primepass-configuration/wp-website/images/2020/12/11140937/indisponivel-img-app-360x685.jpg';
  const actors = `Elenco: ${data?.actors?.join(', ')}`;
  const directors = `Diretor: ${data?.directors?.join(', ')}`;
  const producer = `Distribuidora: ${
    data?.producer?.name ? data?.producer?.name : 'Não há distribuidora'}`;

  useEffect(() => {
    setDuration(parseMovieDuration(totalMinutes));
  }, []);

  return (
    <S.Container>
      <Modal
        visible={visible}
        animationType="fade"
        transparent
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
        }}
      >
        <S.BackgroundFade>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.8)" />
          <S.CenterView>
            <S.Wrapper>
              <S.TitleContainer>
                <S.Title>{title}</S.Title>
              </S.TitleContainer>
              <S.Content>
                <S.Section>
                  <S.ContainerImage>
                    <S.Poster
                      uri={image?.[0]?.url || defaultPlaceholder}
                      uriDefault={defaultPlaceholder}
                    />
                  </S.ContainerImage>
                  <S.ContainerDescriptionScroll>
                    <S.Description>{data?.description}</S.Description>
                  </S.ContainerDescriptionScroll>
                </S.Section>

                <S.Column>
                  <S.TextInfo numberOfLines={1} ellipsizeMode="tail">
                    {actors}
                  </S.TextInfo>
                  <S.TextInfo numberOfLines={1} ellipsizeMode="tail">
                    {directors}
                  </S.TextInfo>
                  <S.TextInfo numberOfLines={1} ellipsizeMode="tail">
                    {producer}
                  </S.TextInfo>
                  <S.Row>
                    <S.YearText>{launchYear}</S.YearText>
                    {serviceType !== 'music' && (
                      <ParentalRating>
                        {data?.recommendedAge?.length > 2
                        || !data?.recommendedAge
                          ? 'L'
                          : data?.recommendedAge}
                      </ParentalRating>
                    )}
                    <S.DurationContainer>
                      <S.DurationText>
                        {duration === '' ? 'Não informado' : duration}
                      </S.DurationText>
                    </S.DurationContainer>

                    <S.GenreContainer>
                      {data?.categories?.map((category, index, array) => (
                        <S.Genre key={`genre-${String(index)}`}>
                          {category}
                          {index >= array.length - 1 ? '' : ' | '}
                        </S.Genre>
                      ))}
                    </S.GenreContainer>
                  </S.Row>
                </S.Column>
              </S.Content>
              <S.FooterContainer onPress={closeModal}>
                <S.FooterText>Fechar</S.FooterText>
              </S.FooterContainer>
            </S.Wrapper>
          </S.CenterView>
        </S.BackgroundFade>
      </Modal>
    </S.Container>
  );
};

export default MoreDetailsModal;
