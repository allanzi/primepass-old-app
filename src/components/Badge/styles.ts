import styled, { css } from 'styled-components/native';

interface ContainerProps {
  type: string;
}

export const Label = styled.View<ContainerProps>`
  width: 60px;
  height: 16px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;

  ${(props) => {
    switch (props.type) {
      case 'cinema':
        return css`
          background-color: #f63145;
        `;
      case 'streamtv':
        return css`
          background-color: #f67c48;
        `;
      case 'Stream TV':
        return css`
          background-color: #f67c48;
        `;
      case 'music':
        return css`
          background-color: #efb01d;
        `;
      case 'Música':
        return css`
            background-color: #efb01d;
          `;
      case 'games':
        return css`
          background-color: #7bcd64;
        `;
      case 'Games':
        return css`
            background-color: #7bcd64;
          `;
      case 'Leitura':
        return css`
          background-color: #58A3E2;
        `;
      case 'outline':
        return css`
          border: #147EB5;
          background-color: transparent;
          width: 100px;
        `;
      default:
        return css`
          background-color: #7159c1;
        `;
    }
  }}
`;

export const LabelContent = styled.Text`
  color: #fff;
  font-size: 9px;
  /* text-transform: capitalize; */
`;

export const Badge = styled.View<ContainerProps>`
  width: 16px;
  height: 16px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;

  ${() => css`
        background-color: #f63145;
      `}
`;

export const BadgeContent = styled.Text`
  color: #fff;
  font-size: 10px;
  /* text-transform: capitalize; */
`;
