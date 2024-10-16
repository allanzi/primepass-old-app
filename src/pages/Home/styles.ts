import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Blur = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 99;
  background: rgba(0,0,0, 0.6);
`;

export const ContentServices = styled.View`
  border: 1px solid #515151;
  border-radius: 8px;
  align-items: center;
  margin: 0 16px 16px 16px;
`;

export const TitleServices = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.colorText};
  margin: 8px 16px 16px 16px;
`;
