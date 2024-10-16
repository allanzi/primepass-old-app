/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { StatusBar, Modal } from 'react-native';
import Image from '../Image';
import ParentalRating from '../ParentalRating';
import parseMovieDuration from './utils/parseMovieDuration';
import { ContentService } from '../../@types/graphql/schemas';
import * as S from './styles';

interface ModalProps {
  title?: string;
  closeModal(): void;
  visible: boolean;
  dados: ContentService;
}

const MoreDetailsModal: React.FC<ModalProps> = ({
  title = 'Mais Detalhes',
  dados,
  closeModal,
  visible,
}) => {
  const [data] = useState(dados);
  const { duration: totalMinutes } = data;
  const [duration, setDuration] = useState(data?.duration as number | string);
  const image = data?.medias?.filter((item) => item?.typeUrl === 'moreDetail');
  const serviceType = data?.services?.[0]?.type?.name;
  const launchYear = data?.launchDate?.split('-')[0] as string;
  const defaultPlaceholder = 'https://s3.amazonaws.com/primepass-configuration/wp-website/images/2020/12/11140937/indisponivel-img-app-360x685.jpg';

  useEffect(() => {
    setDuration(parseMovieDuration(totalMinutes));
  }, []);

  return (
    <S.Container>
      <Modal
        visible={visible}
        animationType="fade"
        transparent
      >
        <StatusBar backgroundColor="rgba(0,0,0, 0.8)" />
        <S.ContainerContent>
          <S.InsideModalContainer>
            {title && (
              <S.ModalTitle>
                <S.ModalTitleText>{title}</S.ModalTitleText>
              </S.ModalTitle>
            )}

            <S.InfoContainer>
              <S.InfoRow>
                <S.InfoColumn>
                  <S.ImageContainer>
                    <Image
                      uri={image?.[0]?.url || defaultPlaceholder}
                      uriDefault={defaultPlaceholder}
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                    />
                  </S.ImageContainer>
                </S.InfoColumn>
                {data && (
                  <S.InfoColumn>
                    <S.InfoText>{data?.description}</S.InfoText>
                  </S.InfoColumn>
                )}
              </S.InfoRow>
            </S.InfoContainer>
            <S.DataContainer>
              <S.BottomText>
                <S.BoldText>Elenco:</S.BoldText>
                {data?.actors?.map((actor, index, array) => (` ${actor} ${(index >= array.length - 1 ? ' ' : ', ')}`))}
              </S.BottomText>

              <S.BottomText>
                <S.BoldText>Diretor:</S.BoldText>
                {data?.directors?.length === 0
                  ? ' Não informado'
                  : data?.directors?.map(
                    (director, index, array) => director + (index >= array.length - 1 ? ' ' : ', '),
                  )}
              </S.BottomText>
              <S.BottomText>
                <S.BoldText>Distribuidora:</S.BoldText>
                {' '}
                {data?.producer?.name}
              </S.BottomText>
              <S.ExtraInfoContainer>
                {data && launchYear && (
                  <S.ExtraInfoContainerText>
                    {launchYear}
                  </S.ExtraInfoContainerText>
                )}
                {serviceType !== 'music' && (
                  <ParentalRating>
                    {!data?.recommendedAge
                      ? 'Não informado'
                      : data.recommendedAge}
                  </ParentalRating>
                )}
                {data && (
                  <S.Length>
                    <S.LengthText>
                      {duration === '' ? 'Não informado' : duration}
                    </S.LengthText>
                  </S.Length>
                )}
                <S.CategoryInfoContainerText>
                  {data?.categories?.length === 0
                    ? ' Não informado'
                    : data?.categories?.map(
                      (category, index, array) => (`${category} ${(index >= array.length - 1 ? ' ' : '  |  ')}`),
                    )}
                </S.CategoryInfoContainerText>
              </S.ExtraInfoContainer>
            </S.DataContainer>
            <S.CloseButton onPress={closeModal}>
              <S.CloseButtonText>Fechar</S.CloseButtonText>
            </S.CloseButton>
          </S.InsideModalContainer>
        </S.ContainerContent>
      </Modal>
    </S.Container>
  );
};

export default MoreDetailsModal;
