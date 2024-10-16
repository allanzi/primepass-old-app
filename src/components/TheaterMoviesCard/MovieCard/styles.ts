import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import ImageCustom from '../../Image';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.colorLabel};
  height: 104px;
  width: 274px;
  border-radius: 4px;
  margin-right: 8px;
  padding: 4px;
  flex-direction: row;
`;

export const ContentImage = styled.View`
  position: relative;
  align-items: center;
`;

export const Image = styled(FastImage)`
  resize-mode: cover;
  width: 60px;
  height: 86px;
`;

export const ImageAndroid = styled(ImageCustom)`
  resize-mode: cover;
  width: 60px;
  height: 86px;
`;

export const ContentAudioType = styled.View`
  position: absolute;
  bottom: 4px;
  flex-direction: row;
`;

export const AudioType = styled.View`
  padding: 0px 6px;
  border: 0.5px solid #949494;
  border-radius: 100px;
  margin: 0 1px;
`;

export const AudioTypeText = styled.Text`
  font-size: 7px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Infos = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin: 8px;
  width: 70%;
`;

export const TitleMovie = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.white};
`;

export const ColumnOne = styled.View`
  flex-direction: column;
  width: 30%;
  margin-right: 8px;
`;

export const ColumnTwo = styled.View`
  flex-direction: column;
  width: 70%;
`;

export const RowCenter = styled.View`
  flex-direction: row;
  margin-top: 8px;
  margin-right: 8px;
  align-items: center;
`;

export const Row = styled.View`
  flex-direction: row;
  margin-top: 8px;
  margin-right: 8px;
  align-items: flex-start;
`;

export const Text = styled.Text`
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.white};
  margin-left: 4px;
`;
