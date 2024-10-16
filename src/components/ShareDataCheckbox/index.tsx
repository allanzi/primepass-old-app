import React, { Dispatch, SetStateAction, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { ServiceResume } from '../../@types/graphql/schemas';
import * as S from './styles';

interface Props {
  serviceShareData: ServiceResume[];
  acceptedShareData: boolean;
  setToggleAcceptedShareData: Dispatch<SetStateAction<boolean>>
}

const ShareDataCheckbox: React.FC<Props> = ({
  serviceShareData,
  acceptedShareData,
  setToggleAcceptedShareData,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <S.InfoShareData>
        Para ativar
        {' '}
        {serviceShareData.length > 1 ? 'os seus serviços' : 'o seu serviço'}
        {' '}
        {serviceShareData.map((service) => `${service.name}, `)}
        a Primepass precisa repassar
        o seu nome e e-mail para que a liberação do serviço seja efetuado com sucesso.
        Tendo em vista a preservação de sua privacidade, a Primepass não compartilhará
        seus dados pessoais com nenhum terceiro não autorizado.
      </S.InfoShareData>
      <S.ShareDataContainer>
        <S.InputCheckBox
          disabled={false}
          value={acceptedShareData}
          onValueChange={(newValue: boolean) => setToggleAcceptedShareData(newValue)}
          tintColors={{ true: theme.colors.primaryBlue }}
          onCheckColor={theme.colors.primaryBlue}
        />
        <S.label>
          Aceito liberar meus dados para continuar com a
          ativação dos meus serviços.
        </S.label>
      </S.ShareDataContainer>
    </>
  );
};

export default ShareDataCheckbox;
