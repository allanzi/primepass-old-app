/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import FastImage from 'react-native-fast-image';
import { Modal as ModalReactNative, StatusBar } from 'react-native';
import { formatNumber } from 'react-native-currency-input';

import promotionalIcon from '../../../../assets/img/ticket.png';
import * as S from './styles';

interface SummaryProps {
  credit_quantity: number;
  upgrade: any[];
  upgrade_total_amount: number;
  additional_quantity: number;
  additional_amount: number;
  total_amount: number;
}
interface ModalSummaryBuyProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  summary: SummaryProps;
  available: number;
}

const ModalSummaryBuy: React.FC<ModalSummaryBuyProps> = ({
  visible,
  setVisible,
  summary,
  available,
}) => (
  <S.ModalWrapper>
    <ModalReactNative visible={visible} animationType="fade" transparent>
      <StatusBar backgroundColor="rgba(0,0,0, 0.8)" />
      <S.ContainerContent>
        <S.InsideModalContainer>
          <S.ModalTitle>
            <S.ModalTitleText>Resumo de compra</S.ModalTitleText>
          </S.ModalTitle>
          <S.ModalBody>
            <S.ContainerPromotionalImage>
              <S.PromotionalImage
                resizeMode={FastImage.resizeMode.contain}
                source={promotionalIcon}
              />
            </S.ContainerPromotionalImage>
            <S.ModalBodyText>
              Você têm
              {' '}
              {available}
              {' '}
              {available === 1
                ? 'ingresso disponível'
                : 'ingressos disponíveis'}
              {'\n'}
              Esta compra será de:
              {'\n'}
              {summary?.credit_quantity}
              {' '}
              {summary?.credit_quantity > 1 ? 'ingressos' : 'ingresso'}
              {' '}
              por R$
              0,00
              {'\n'}
              {summary?.additional_quantity > 0 && (
                <>
                  {summary?.additional_quantity}
                  {summary?.additional_quantity === 1
                    ? ' Acompanhante '
                    : ' Acompanhantes '}
                  por R$
                  {' '}
                  {formatNumber(summary?.additional_amount / 100, {
                    separator: ',',
                    precision: 2,
                    delimiter: '.',
                    ignoreNegative: true,
                  })}
                  {'\n'}
                </>
              )}
              {summary?.upgrade
                  && summary?.upgrade.length > 0
                  && summary?.upgrade.map((item: string, index: number) => {
                    const aux = item?.quantity > 1 ? 'adicionais' : 'adicional';
                    return (
                      <Fragment key={`${item?.type}${index}`}>
                        <>
                          {item?.quantity}
                          {' '}
                          {aux}
                          {' '}
                          (
                          {item?.type}
                          )
                        </>
                        {' '}
                        por R$
                        {' '}
                        {formatNumber(item?.price / 100, {
                          separator: ',',
                          precision: 2,
                          delimiter: '.',
                          ignoreNegative: true,
                        })}
                        {index < summary?.upgrade.length - 1 && <>{'\n'}</>}
                      </Fragment>
                    );
                  })}
              {summary?.upgrade && summary?.upgrade.length > 0 && <>{'\n'}</>}
              Total de
              {' '}
              {summary?.credit_quantity + summary?.additional_quantity}
              {' '}
              {summary?.credit_quantity + summary?.additional_quantity === 1
                ? ' ingresso'
                : ' ingressos'}
              {' '}
              por R$
              {' '}
              {formatNumber(summary?.total_amount / 100, {
                separator: ',',
                precision: 2,
                delimiter: '.',
                ignoreNegative: true,
              })}
            </S.ModalBodyText>
          </S.ModalBody>
          <S.ModalButtons>
            <S.Separator>
              <S.LineSeparator />
            </S.Separator>
            <S.ButtonContainer>
              <S.Button onPress={() => setVisible(false)}>
                <S.ButtonText>Ok</S.ButtonText>
              </S.Button>
            </S.ButtonContainer>
          </S.ModalButtons>
        </S.InsideModalContainer>
      </S.ContainerContent>
    </ModalReactNative>
  </S.ModalWrapper>
);

export default ModalSummaryBuy;
