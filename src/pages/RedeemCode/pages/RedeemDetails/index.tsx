/* eslint-disable @typescript-eslint/no-shadow, no-nested-ternary, array-callback-return */
import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { ActivityIndicator, Linking, ScrollView } from 'react-native';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import Button from '../../../../components/Button';
import Clipboard from '../../../../utils/clipboard';
import copyIcon from '../../../../assets/img/copyIcon.png';
import Dialog from '../../../../components/Dialog';
import Header from '../../../../components/Header';
import Modal from '../../../../components/Modal';
import RedeemInput from '../../components/Input';
import ServiceTicket from '../../../../components/ServiceTicket';
import { Params, ServiceResume } from './types';
import { useAuth } from '../../../../hooks/auth';
import { useAction } from '../../../../hooks/actions';
import { useServicesHistoryLazyQuery } from '../../../../hooks/graphql/ServicesHistoryQuery';
import * as S from './styles';

const RedeemDetails: React.FC = () => {
  const route = useRoute();
  const params = route.params as Params;
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const { logEvent } = useAction();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLinkError, setModalLinkError] = useState(false);
  const [steps, setStep] = useState('' as string);
  const [service, setService] = useState({} as ServiceResume);

  const [getServiceHistory, { data, error }] = useServicesHistoryLazyQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    const fetchServiceHistory = async () => {
      setLoading(true);

      await getServiceHistory({
        variables: {
          user_id: user ? user.id : '',
          signature_type: 'ALL',
          signature_id: params.signatureId,
          page: 0,
        },
      });
    };

    fetchServiceHistory();
  }, [params]);

  useEffect(() => {
    if (data) {
      const { services_history: serviceHistory } = data as any;
      if (serviceHistory) {
        const { signatures } = serviceHistory;
        const signature = signatures[0];

        const service = signature?.services.find(
          (service: ServiceResume) => service.id === params.id,
        );

        if (!service) {
          setLoading(true);
          return;
        }

        setService({
          ...service,
          dateFinish: signature.dateFinish || '',
        });
        setLoading(false);
      }
    }
  }, [data, params]);

  useEffect(() => {
    if (Object.keys(service).length) {
      let newSteps = '';

      service?.description?.steps.map((item: string) => {
        newSteps += `${item}\n`;
      });

      setStep(newSteps);
    }
  }, [service]);

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'voucher-redeem',
      section: 'code-logiin',
      description: 'Code Login screen',
      userId: user ? user.id : '0',
    });
  }, [user]);

  const openService = async () => {
    const {
      description: { link }, redeem: { link: integrationLink },
    } = service;

    if (!link) {
      setModalLinkError(true);
      return;
    }

    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'link',
      context: 'voucher-redeem',
      section: 'go-to-service',
      description: service.type.title || '',
      payloadData: {
        service: service.description.label_link,
        title: service.description.description,
      },
      userId: user ? user.id : '0',
    });

    await Linking.openURL(integrationLink || link);
  };

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
    if (!modalVisible) {
      logEvent({
        type: 'log-event',
        flow: 'app',
        group: 'link',
        context: 'voucher-redeem',
        section: 'how-to-use',
        description: service.type.title || '',
        payloadData: {
          service: service.description.label_link,
          title: service.description.description,
        },
        userId: user ? user.id : '0',
      });
    }
  };

  const CodeOrLoginInput = () => {
    if (service.redeem.code) {
      return (
        <S.InputContainer>
          <Form ref={formRef} onSubmit={() => Clipboard(service.redeem.code ?? '')}>
            <RedeemInput editable={false} value={service.redeem.code} name="code">
              <S.CopyContainer
                onPress={() => Clipboard(service.redeem.code || '')}
              >
                <S.IconCopy source={copyIcon} />
              </S.CopyContainer>
            </RedeemInput>
          </Form>
        </S.InputContainer>
      );
    }

    let { password } = service.redeem;
    if (service.redeem.password === 'Os 8 últimos digitos do seu celular') {
      password = user.phone.slice(-8);
    }

    return (
      <S.InputContainer>
        <Form ref={formRef} onSubmit={() => {}}>
          <RedeemInput
            editable={false}
            value={service.redeem.userName || ''}
            name="login"
          >
            <S.CopyContainer
              onPress={() => Clipboard(service.redeem.userName || '')}
            >
              <S.IconCopy source={copyIcon} />
            </S.CopyContainer>
          </RedeemInput>
          <RedeemInput
            editable={false}
            value={service.redeem.password || ''}
            name="password"
          >
            <S.CopyContainer
              onPress={() => Clipboard(password || '')}
            >
              <S.IconCopy source={copyIcon} />
            </S.CopyContainer>
          </RedeemInput>
        </Form>
      </S.InputContainer>
    );
  };

  const handleGoBack = useCallback(() => {
    if (params.from === 'home') {
      navigation.navigate('Home');
      return;
    }
    navigation.navigate('PlansServices', { from: params.from });
  }, [params]);

  if (error) {
    return (
      <AndroidBackHandler
        onBackPress={() => {
          handleGoBack();
          return true;
        }}
      >
        <S.Fragment>
          <Header
            title={`Detalhes de ${params.name}`}
            handleGoBack={() => handleGoBack()}
          />
          <Dialog
            title="Ops, algo deu errado"
            message="Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
            error
            visible
            handleClose={() => {
              handleGoBack();
            }}
            footer={null}
          />
        </S.Fragment>
      </AndroidBackHandler>
    );
  }

  if (loading || !Object.keys(service).length) {
    return (
      <AndroidBackHandler
        onBackPress={() => {
          handleGoBack();
          return true;
        }}
      >
        <S.Fragment>
          <Header
            title={`Detalhes de ${params.name}`}
            handleGoBack={() => handleGoBack()}
          />
          <S.ContainerLoader>
            <ActivityIndicator size={40} color="#fff" />
          </S.ContainerLoader>
        </S.Fragment>
      </AndroidBackHandler>
    );
  }

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
        <Modal
          screenName="CodeRedemption"
          visible={modalLinkError}
          onChange={(params: boolean) => setModalLinkError(params)}
          title="Ops, algo deu errado"
          message="Não foi possível abrir o link, tente novamente mais tarde!"
        />

        <Header
          title={`Detalhes de ${service.name}`}
          handleGoBack={() => handleGoBack()}
        />
        <ScrollView>
          <S.Container>
            <ServiceTicket
              image={{ uri: service.images.rescue_image }}
              name={service.name || ''}
              dateFinish={service.dateFinish}
              recommendedAge=""
              serviceDescription={service.description.description}
              serviceLabel={service.type.title}
              serviceName={`Canal ${service.type.title}`}
              serviceColor={service.type.color}
            />
            {service.redeem.primeLogin ? (
              <S.Message>
                Liberação realizada com sucesso. Verifique abaixo como utilizar este serviço.
              </S.Message>
            ) : service.redeem.code ? (
              <S.Message>Seu código:</S.Message>
            ) : (
              <S.Message>
                Utilize os dados abaixo para iniciar sua sessão e começar a usar o
                serviço na plataforma do nosso parceiro.
              </S.Message>
            )}

            {!service.redeem.primeLogin && <CodeOrLoginInput />}

            <Form ref={formRef} onSubmit={openService}>
              <S.ActionContainer>
                <Button
                  disable={false}
                  onPress={() => formRef.current?.submitForm()}
                >
                  Ir para o serviço
                </Button>
                <Button
                  onPress={handleModalVisible}
                  style={{ marginTop: 10 }}
                  outline
                  disable={false}
                >
                  Como utilizar
                </Button>
              </S.ActionContainer>
            </Form>
          </S.Container>
        </ScrollView>
      </S.Fragment>
    </AndroidBackHandler>
  );
};

export default RedeemDetails;
