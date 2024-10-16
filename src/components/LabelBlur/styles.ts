import styled from 'styled-components/native';

export const Radius = styled.View`
  overflow: hidden;
  height: 40px;
  width: 100%;
  /* bottom: 39px; */
  bottom: 3px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const Blur = styled.View`
  height: 40px;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export const Container = styled.View`
  padding-left: 8px;
  height: 40px;
  position: absolute;
  bottom: 0;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  text-align: justify;
`;

export const Title = styled.Text`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 2px;
`;

export const GenreContainer = styled.View`
  flex-direction: row;
  text-align: justify;
`;

export const Genre = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 10px;
`;
