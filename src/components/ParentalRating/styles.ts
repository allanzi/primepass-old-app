import styled, { css } from 'styled-components/native';

interface ParentalRatingProps {
  type: string;
}

export const ParentalRatingText = styled.Text`
  color: #fff;
  font-size: 10px;
  font-weight: bold;
`;

export const ParentalRating = styled.View<ParentalRatingProps>`
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  margin: 0 7px;
  width: 16px;
  height: 16px;

  ${({ type, theme }) => {
    switch (type) {
      case 'L': {
        return css`
          background: ${theme.colors.primaryGreen};
        `;
      }
      case '10': {
        return css`
          background: ${theme.colors.parentalRatingColors.dez};
        `;
      }
      case '12': {
        return css`
        background: ${theme.colors.parentalRatingColors.doze};
        `;
      }
      case '14': {
        return css`
        background: ${theme.colors.parentalRatingColors.quatorze};
        `;
      }
      case '16': {
        return css`
          background: ${theme.colors.parentalRatingColors.dezasseis};
        `;
      }
      case '18': {
        return css`
        background: ${theme.colors.parentalRatingColors.dezoito};
        `;
      }
      default:
        return css`
        background: ${theme.colors.primaryGreen};
      `;
    }
  }}
`;
