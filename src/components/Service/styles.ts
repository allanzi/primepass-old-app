import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

export const ServiceContainer = styled.View`
  width: 94px;
  height: 36px;
  border: 2px solid #515151;
  border-radius: 92px;
  margin-right: 16px;
  margin-bottom: 16px;
  margin-top: 0;
  align-items: center;
  justify-content: center;

`;

export const Service = styled(FastImage)`
  max-width: 100%;
  min-width: 94px;
  max-height: 100%;
  min-height: 34px;
  resize-mode: cover;
  flex: 1;
`;

export const ServiceDefault = styled(FastImage)`
  max-width: 100%;
  min-width: 42px;
  max-height: 100%;
  min-height: 24px;
  resize-mode: cover;
  flex: 1;
`;
