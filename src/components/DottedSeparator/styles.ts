import styled from 'styled-components/native';

export const VerticalSeparator = styled.View`
  height: 87%;
  opacity: 0.3;
  padding: 0 2px;
  align-self: center !important;
  justify-content: space-between;
`;

export const HorizontalSeparator = styled.View`
  width: 100%;
  height: 2px;
  opacity: 0.3;
  align-self: center !important;
  justify-content: space-between;
  flex-direction: row;
`;

export const Dotted = styled.View`
  background-color: #fff;
  width: 2px;
  height: 2px;
`;
