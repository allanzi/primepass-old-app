/* eslint-disable default-case, import/prefer-default-export, consistent-return */
import styled, { css } from 'styled-components/native';

enum Status {
  EXPIRADO = 'Expirado',
  ATIVO = 'Ativo',
  PENDENTE = 'Pendente',
  DISPONIVEL = 'Disponível',
  CANCELADO = 'Cancelado',
}

interface ContainerProps {
  type: Status;
}

export const Signal = styled.View<ContainerProps>`
  width: 10px;
  height: 10px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;

  ${(props) => {
    switch (props.type) {
      case Status.ATIVO:
        return css`
          background-color: #66CF97;
        `;
      case Status.PENDENTE:
        return css`
            background-color: #515151;
          `;
      case Status.DISPONIVEL:
        return css`
          background-color: #72b1d2;
        `;
      case Status.CANCELADO:
        return css`
          background-color: #FF6666;
        `;
      case Status.EXPIRADO:
        return css`
          background-color: #F67C48;
        `;
    }
  }}
`;

export const Label = styled.Text`
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  margin-left: 4px;
  /* text-transform: capitalize; */
`;

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 16px;
`;
