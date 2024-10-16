/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';

import checkIcon from '../../assets/img/check.png';
import * as S from './styles';

interface TransactionStepsProps {
  steps: Array<string>;
  active: number;
}

const TransactionSteps: React.FC<TransactionStepsProps> = ({ steps, active }) => {
  const status = (index: number) => {
    if (index === active) {
      return 'active';
    }
    if (index < active) {
      return 'complete';
    }

    return 'disabled';
  };

  return (
    <S.Container>
      {steps.map((step, index) => (
        <Fragment key={step}>
          <S.ContainerStep>
            <S.Step status={status(index)}>
              {status(index) !== 'complete' ? (
                <S.Label active={index <= active}>
                  {index + 1}
                </S.Label>
              ) : (
                <S.Icon source={checkIcon} />
              ) }
            </S.Step>
            <S.LabelBottom status={status(index)}>
              {step}
            </S.LabelBottom>
          </S.ContainerStep>

          { steps.length !== index + 1
            && <S.Divisor active={index < active} />}
        </Fragment>
      ))}

    </S.Container>
  );
};

export default TransactionSteps;
