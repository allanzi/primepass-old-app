/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import HTML from 'react-native-render-html';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { Dimensions, Linking } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

import Badge from '../Badge';
import Clipboard from '../../utils/clipboard';
import copyIcon from '../../assets/img/copyIcon.png';
import RedeemInput from '../../pages/RedeemCode/components/Input';
import ServiceTicket from '../ServiceTicket';
import { Props } from './types';
import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';
import * as S from './styles';

const BottomSheetServiceRedeem: React.FC<Props> = ({
  visible,
  toggle,
  service,
  signature,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const { logEvent } = useAction();
  const HEIGHT = Dimensions.get('window').height;
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  useEffect(() => {
    if (visible) {
      onOpen();
    }
  }, [visible]);

  const openService = async () => {
    const {
      description: { link }, link: integrationLink,
    } = service;

    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'link',
      context: 'Service redeem',
      section: 'go-to-service',
      description: service?.type || '',
      payloadData: {
        service: service?.description?.label_link,
        title: service?.description?.description,
      },
      userId: user ? user.id : '0',
    });

    await Linking.openURL(integrationLink || link);
  };

  const CodeOrLoginInput = () => {
    let password = service?.user?.password;
    if (service?.user?.password === 'Os 8 últimos digitos do seu celular') {
      password = user.phone.slice(-8);
    }

    return (
      <S.InputContainer>
        <Form ref={formRef} onSubmit={() => Clipboard(signature?.code ?? '')}>
          {signature.code && (
            <>
              <S.Label>Código de resgate</S.Label>
              <RedeemInput editable={false} value={signature.code} name="code">
                <S.CopyContainer
                  onPress={() => Clipboard(signature.code || '')}
                >
                  <S.IconCopy source={copyIcon} />
                </S.CopyContainer>
              </RedeemInput>
            </>
          )}

          {service?.user?.userName && (
            <>
              <S.Label>Login</S.Label>
              <RedeemInput
                editable={false}
                value={service?.user?.userName || ''}
                name="login"
              >
                <S.CopyContainer
                  onPress={() => Clipboard(service?.user?.userName || '')}
                >
                  <S.IconCopy source={copyIcon} />
                </S.CopyContainer>
              </RedeemInput>
            </>
          )}

          {service?.user?.password && (
            <>
              <S.Label>Senha</S.Label>
              <RedeemInput
                editable={false}
                value={service?.user?.password || ''}
                name="password"
              >
                <S.CopyContainer
                  onPress={() => Clipboard(password || '')}
                >
                  <S.IconCopy source={copyIcon} />
                </S.CopyContainer>
              </RedeemInput>
            </>
          )}

          {signature?.activationAccountNumber && (
            <>
              <S.Label>Código de segurança</S.Label>
              <RedeemInput editable={false} value={signature.activationAccountNumber} name="activationAccountNumber">
                <S.CopyContainer
                  onPress={() => Clipboard(signature?.activationAccountNumber || '')}
                >
                  <S.IconCopy source={copyIcon} />
                </S.CopyContainer>
              </RedeemInput>
            </>
          )}

        </Form>
      </S.InputContainer>
    );
  };

  const handleClose = () => {
    toggle();
    onClose();
    return true;
  };

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        modalHeight={HEIGHT - 100}
        handlePosition="inside"
        handleStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', width: '20%' }}
        modalStyle={{
          backgroundColor: '#515151',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        onClose={toggle}
        onBackButtonPress={handleClose}
        onOverlayPress={handleClose}
      >
        <S.Container>
          <S.Header>
            <S.Title>
              {service.name}
            </S.Title>
            <Badge
              name="Ativo"
              style={{ backgroundColor: '#00af51', color: '#FFFFFF' }}
            />
          </S.Header>

          <ServiceTicket
            image={{ uri: service?.images?.rescue_image }}
            logo={{ uri: service?.images?.logo }}
            dateStart={service.user && service?.date_start ? moment(service?.date_start).format('DD/MM/YYYY') : null}
            dateFinish={service.user && service?.date_finish ? moment(service?.date_finish).format('DD/MM/YYYY') : null}
            validThru={signature.code && signature?.valid_thru ? moment(signature?.valid_thru).format('DD/MM/YYYY') : null}
            serviceLabel={service?.type || ''}
          />

          <S.ContentInfo>
            <S.Title>Instruções</S.Title>
            <S.Subtitle>
              {signature?.code
                ? 'Liberação realizada com sucesso. Verifique abaixo como utilizar este serviço.'
                : 'Utilize os dados abaixo para iniciar sua sessão e começar a usar o serviço na plataforma do nosso parceiro.'}
            </S.Subtitle>

            {service?.description?.steps?.map((step) => (
              <HTML
                source={{ html: step }}
                baseFontStyle={{
                  lineHeight: 22,
                  fontSize: 14,
                  color: '#CCCCCC',
                }}
              />
            ))}

            <S.ContentLogin>
              {CodeOrLoginInput()}
            </S.ContentLogin>

            <S.Button
              disable={false}
              onPress={openService}
            >
              Ir para o serviço
            </S.Button>
            <S.Button
              disable={false}
              outline
              onPress={handleClose}
            >
              Voltar
            </S.Button>

            <S.Text>
              Não se esqueça de ativar o serviço todo mês aqui na Primepass.
              Isso é necessário para mantermos a qualidade e segurança do serviço.
            </S.Text>

          </S.ContentInfo>
        </S.Container>
      </Modalize>
    </Portal>
  );
};

export default BottomSheetServiceRedeem;
