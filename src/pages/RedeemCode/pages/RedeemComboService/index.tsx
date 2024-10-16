/* eslint-disable import/no-extraneous-dependencies, array-callback-return */
import React, { useState, useCallback } from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/core';

import api from '../../../../services/api';
import Button from '../../../../components/Button';
import Dialog from '../../../../components/Dialog';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import type {
  ModalMessageProps,
  Params,
  ServerError,
  ServiceResume,
} from './types';
import ShareDataCheckbox from '../../../../components/ShareDataCheckbox';
import { useAction } from '../../../../hooks/actions';
import { useAuth } from '../../../../hooks/auth';
import * as S from './styles';

const RedeemComboService: React.FC = () => {
  const route = useRoute();
  const params = route.params as Params;
  const navigation = useNavigation();
  const { user } = useAuth();
  const { logEvent, logConvertArrayToString } = useAction();

  const [loading, setLoading] = useState(false as boolean);
  const [acceptedShareData, setToggleAcceptedShareData] = useState(false);
  const [shareData, setShareData] = useState(false);
  const [serviceShareData, setServiceShareData] = useState([] as ServiceResume[]);
  const [dialogVisible, setDialogVisible] = useState(false as boolean);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    message: '',
    error: true,
    footer: null,
  } as ModalMessageProps);

  useFocusEffect(
    useCallback(() => {
      logEvent({
        type: 'log-screen',
        flow: 'app',
        group: 'scrn',
        context: 'voucher-redeem',
        section: 'voucher-services',
        description: 'Voucher services',
        userId: user ? user.id : '0',
      });

      const services: ServiceResume[] = [];
      params.voucher.services.map((service: any) => {
        if (service?.description?.share_data) {
          services.push(service);
          setShareData(true);
        }
      });
      setServiceShareData(services);
    }, [params]),
  );

  const handleRedeem = async () => {
    try {
      setLoading(true);
      const servicesName = [] as string[];

      params.voucher.services.map((service) => {
        servicesName.push(service.name);
      });

      await api.post(`/voucher-codes/${params.code}`, {
        share_data: acceptedShareData,
      });

      logEvent({
        type: 'log-event',
        flow: 'app',
        group: 'prss',
        context: 'voucher-redeem',
        section: 'voucher-services',
        description: 'Voucher services',
        payloadData: {
          title: 'Voucher rescued',
          voucher: params.code,
          service: logConvertArrayToString(servicesName),
        },
        userId: user ? user.id : '0',
      });
      navigation.navigate('Promotions', {
        screen: 'SuccessfullyRedeemed',
        params: {
          code: params.code,
          servicesName,
          isComboSelect: false,
        },
      });
    } catch (error: any) {
      if (error && error.response) {
        const apiError = error as ServerError;
        const {
          response: {
            data: {
              data: { message },
            },
          },
        } = apiError;
        setDialogContent({
          title: 'Ops, algo deu errado',
          message,
          error: true,
          footer: null,
        });
        setDialogVisible(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContinueButton = () => {
    setDialogContent({
      title: 'Estes serviços serão disponibilizados em seu plano. \nDeseja continuar?',
      message: null,
      error: false,
      footer: [
        {
          text: 'Sim, quero continuar',
          action: () => {
            setDialogVisible(false);
            handleRedeem();
          },
          props: {
            style: {
              color: '#72B1D2',
            },
          },
        },
        {
          text: 'Mudei de ideia',
          action: () => setDialogVisible(false),
        },
      ],
    });
    setDialogVisible(true);
  };

  return (
    <S.Fragment>

      <Dialog
        title={dialogContent.title}
        message={dialogContent.message}
        error={dialogContent.error}
        visible={dialogVisible}
        handleClose={() => setDialogVisible(false)}
        footer={dialogContent.footer}
      />
      <S.Scroll>
        <Header title="Resgate de voucher" />

        <S.Container>
          <S.Title>Os serviços abaixo serão disponibilizados em seu plano</S.Title>
          <S.ServiceCardContainer>
            {
              params.voucher.services.map((item, index) => (
                <S.ServiceCard
                  key={item.id}
                  imageStyle={{ borderRadius: 8 }}
                  source={{
                    uri: item.image.selected_image,
                  }}
                  style={{ marginLeft: index % 2 === 1 ? 8 : 0 }}
                />
              ))
            }
          </S.ServiceCardContainer>

          {shareData && (
            <ShareDataCheckbox
              serviceShareData={serviceShareData}
              acceptedShareData={acceptedShareData}
              setToggleAcceptedShareData={setToggleAcceptedShareData}
            />
          )}

          <Button disable={false} onPress={handleContinueButton} isLoading={loading}>
            Continuar
          </Button>

          <Footer />
        </S.Container>
      </S.Scroll>

    </S.Fragment>
  );
};

export default RedeemComboService;
