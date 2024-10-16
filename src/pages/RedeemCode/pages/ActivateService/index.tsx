/* eslint-disable @typescript-eslint/no-shadow, no-nested-ternary, array-callback-return */

import React, {
  useState, useCallback, useEffect, useRef,
} from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import moment from 'moment';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import api from '../../../../services/api';
import Button from '../../../../components/Button';
import Dialog from '../../../../components/Dialog';
import Header from '../../../../components/Header';
import Modal from '../../../../components/Modal';
import ServiceTicket from '../../../../components/ServiceTicket';
import ShareDataCheckbox from '../../../../components/ShareDataCheckbox';
import { Params } from './types';
import { useAction } from '../../../../hooks/actions';
import { useAuth } from '../../../../hooks/auth';
import * as S from './styles';

const ActivateService: React.FC = () => {
  const route = useRoute();
  const params = route.params as Params;
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const [steps, setStep] = useState('' as string);
  const [modalVisible, setModalVisible] = useState(false as boolean);
  const [dialogVisible, setDialogVisible] = useState(false as boolean);
  const [toggleAcceptedShareData, setToggleAcceptedShareData] = useState(false as boolean);
  const [loadingActive, setLoadingActive] = useState(false as boolean);

  const { logEvent } = useAction();
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      let newSteps = '';

      params.description.steps.map((item: string) => {
        newSteps += `${item}\n`;
      });

      setStep(newSteps);

      setToggleAcceptedShareData(false);
    }, [params]),
  );

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'activate-redeem',
      section: 'activate-service',
      description: 'Activate Service screen',
      userId: user ? user.id : '0',
    });
  }, [params, user]);

  const handleSubmit = async () => {
    try {
      setLoadingActive(true);

      await api.post(`/signatures/${params.signatureId}/redeem/${params.id}`, {
        share_data: toggleAcceptedShareData,
      });

      logEvent({
        type: 'log-event',
        flow: 'app',
        group: 'prss',
        context: 'activate-service',
        section: 'activate',
        description: 'activate service confirm',
        payloadData: {
          service: params.name.toLowerCase(),
          title: params.description.description,
        },
        userId: user ? user.id : '0',
      });

      return navigation.navigate('Promotions', {
        screen: 'RedeemDetails',
        params: {
          ...params,
        },
      });
    } catch (error) {
      setDialogVisible(true);
      return false;
    } finally {
      setLoadingActive(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { description: { share_data }, acceptedShareData } = params;

      if (!share_data || (share_data && acceptedShareData)) {
        setLoadingActive(true);
        handleSubmit();
      }
    }, [params]),
  );

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
    if (!modalVisible) {
      logEvent({
        type: 'log-event',
        flow: 'app',
        group: 'link',
        context: 'activate-service',
        section: 'how-to-use',
        description: params.type.title,
        payloadData: {
          service: params.description.label_link,
          title: params.description.description,
        },
        userId: user ? user.id : '0',
      });
    }
  };

  const handleGoBack = useCallback(() => {
    if (params.from === 'home') {
      navigation.navigate('Home');
      return;
    }
    navigation.navigate('PlansServices', { from: params.from });
  }, [params]);

  return (
    <AndroidBackHandler
      onBackPress={() => {
        handleGoBack();
        return true;
      }}
    >
      <S.Fragment>
        <Modal
          visible={modalVisible}
          title="Como utilizar"
          onChange={setModalVisible}
          screenName="CodeRedemption"
          message={steps}
          isHtml
        />
        <Dialog
          title="Ops, algo deu errado"
          message="Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
          error
          visible={dialogVisible}
          handleClose={() => {
            setDialogVisible(false);
            handleGoBack();
          }}
          footer={null}
        />
        <Header
          title="Ativação de serviço"
          handleGoBack={() => handleGoBack()}
        />
        {loadingActive ? (
          <S.ContainerLoader>
            <ActivityIndicator size={40} color="#fff" />
          </S.ContainerLoader>
        ) : (
          <ScrollView>
            <S.Container>
              <ServiceTicket
                image={{ uri: params.images.rescue_image }}
                name={params.name}
                dateFinish={moment(params.dateFinish).format('DD/MM/YYYY')}
                serviceDescription={params.description.description}
                serviceLabel={params.type.title || ''}
                serviceName={`Canal ${params.type.title}`}
                serviceColor={params.type.color}
              />

              <S.ActionContainer>
                <ShareDataCheckbox
                  serviceShareData={[params]}
                  acceptedShareData={toggleAcceptedShareData}
                  setToggleAcceptedShareData={setToggleAcceptedShareData}
                />
              </S.ActionContainer>

              <S.ActionContainer>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <Button
                    disable={!toggleAcceptedShareData}
                    onPress={handleSubmit}
                    isLoading={loadingActive}
                  >
                    Liberar meu acesso
                  </Button>
                  <Button
                    onPress={handleModalVisible}
                    style={{ marginTop: 10 }}
                    outline
                    disable={false}
                  >
                    Como utilizar
                  </Button>
                </Form>
              </S.ActionContainer>

            </S.Container>
          </ScrollView>
        )}
      </S.Fragment>
    </AndroidBackHandler>
  );
};

export default ActivateService;
