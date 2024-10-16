import React, {
  useState, useCallback, useRef,
} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { Platform } from 'react-native';
import { MovieCardProps } from './types';
import ParentalRating from '../../ParentalRating';
import RoomIcon from '../../../assets/img/room.svg';
import ScreenIcon from '../../../assets/img/screen.svg';
import * as S from './styles';

const MovieCard: React.FC<MovieCardProps> = ({
  banner,
  name,
  screens,
  rooms,
  classification,
  audios,
}) => {
  const [image, setImage] = useState(banner);
  const deafultImage = useRef('https://primepass-imagens.s3.us-east-1.amazonaws.com/indisponivel-img-app-360x685.jpg');
  const handleImageLoadFalied = useCallback(() => {
    setImage(deafultImage.current);
  }, []);

  return (
    <S.Container>
      <S.ContentImage>
        {Platform.OS === 'ios' ? (
          <S.Image
            source={{ uri: image }}
            onError={handleImageLoadFalied}
          />
        ) : (
          <S.ImageAndroid uri={banner} uriDefault={deafultImage.current} />
        )}

        <LinearGradient
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '100%',
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 4,
          }}
          start={{
            x: 0,
            y: 0.1,
          }}
          end={{
            x: 0,
            y: 0.9,
          }}
          colors={['transparent', 'transparent', '#212121']}
        />
        <S.ContentAudioType>

          {audios.length > 1
            ? (
              <>
                <S.AudioType>
                  <S.AudioTypeText>DUB</S.AudioTypeText>
                </S.AudioType>
                <S.AudioType>
                  <S.AudioTypeText>LEG</S.AudioTypeText>
                </S.AudioType>
              </>
            ) : (
              <S.AudioType>
                <S.AudioTypeText>{audios[0]}</S.AudioTypeText>
              </S.AudioType>
            )}
        </S.ContentAudioType>
      </S.ContentImage>
      <S.Infos>
        <S.TitleMovie>{name}</S.TitleMovie>

        <S.Row>
          <S.ColumnOne>
            <S.RowCenter>
              <ScreenIcon width={14} height={14} />
              <S.Text>{screens.join(', ')}</S.Text>
            </S.RowCenter>
            <S.Row>
              {classification
              && (
                <ParentalRating>
                  {(classification.length > 2)
                    ? 'L'
                    : classification}
                </ParentalRating>
              ) }
            </S.Row>
          </S.ColumnOne>
          <S.ColumnTwo>
            <S.Row>
              <RoomIcon width={10} height={10} />
              <S.Text>{rooms.join(', ')}</S.Text>
            </S.Row>
          </S.ColumnTwo>
        </S.Row>
      </S.Infos>
    </S.Container>
  );
};

export default MovieCard;
