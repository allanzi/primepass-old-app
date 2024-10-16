import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Dimensions } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

import { AccordionInformation } from '../Accordion';
import { Props, ModalMessageProps } from './types';
import { Signature, UserService } from '../../@types/graphql/schemas';
import { useAction } from '../../hooks/actions';
import { useAuth } from '../../hooks/auth';
import { useUserServices } from '../../hooks/userServices';
import Dialog from '../Dialog';
import Status from '../Status';
import * as S from './styles';

const BottomSheetServiceSignatures: React.FC<Props> = ({
  visible,
  toggle,
  openServiceRedeem,
  service,
}) => {
  const { user } = useAuth();
  const { logEvent } = useAction();
  const { activationService } = useUserServices();
  const HEIGHT = Dimensions.get('window').height;
  const modalizeRef = useRef<Modalize>(null);

  const [loadingService, setLoadingService] = useState({} as any);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    message: null,
    error: false,
    footer: null,
  } as ModalMessageProps);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  useEffect(() => {
    if (visible) {
      onOpen();
    }
  }, [visible]);

  useEffect(() => {
    let loadings = {} as any;
    if (service) {
      service?.signatures?.map((signature) => {
        loadings = {
          ...loadings,
          [`${signature.id}`]: false,
        };
        return signature;
      });
      setLoadingService(loadings);
    }
  }, [service]);

  const handleOpenSignature = (signature: Signature, serviceSelect?: UserService) => {
    openServiceRedeem(serviceSelect || service, signature);
  };

  const getStatus = (signature: Signature) => {
    if (signature.date_cancel) {
      return 'Cancelado';
    }
    if (moment().isAfter(moment(signature.date_finish), 'day')) {
      return 'Expirado';
    }

    if (signature.redeemed) {
      return 'Ativo';
    }

    return 'Pendente';
  };

  const showButtonActivate = (signature: Signature) => {
    if (getStatus(signature) === 'Pendente') {
      if (moment().isAfter((moment(signature.date_start).subtract(1, 'days')), 'day')
          && moment().isBefore((moment(signature.date_finish).add(1, 'days')), 'day')) {
        return true;
      }
      return false;
    }
    return false;
  };

  const showButtonSeeAccess = (signature: Signature) => {
    if (getStatus(signature) === 'Ativo' || getStatus(signature) === 'Expirado') {
      return true;
    }
    return false;
  };

  const accordionStatus = () => (
    <AccordionInformation title="Definição dos status">
      <Status status="Ativo" />
      <S.Description>
        Diversão garantida! Seu serviço está ativo e disponível para utilização,
        agora é só aproveitar! Lembre-se sempre de consultar a data de vencimento do seu serviço.
      </S.Description>
      <Status status="Pendente" />
      <S.Description>
        Ei, não perca toda a diversão! Seu serviço está pendente de ativação. Para aproveitar todos
        os conteúdos, é necessário ativá-lo seguindo o passo a passo contido em cada serviço.
      </S.Description>
      <Status status="Expirado" />
      <S.Description>
        Ah não! Seu serviço está expirado pois já passou da data de vencimento.
        Atente-se sempre a data de vencimento de seu serviço para não perder toda diversão.
      </S.Description>
      <Status status="Cancelado" />
      <S.Description>
        Poxa, que pena! Seu serviço foi cancelado, e seu plano não está mais vigente.
        Será necessário adquirir um novo plano.
      </S.Description>
    </AccordionInformation>

  );

  const handleDialogShareData = (signature: Signature) => {
    setDialogContent({
      title: `Para ativar o serviço ${service.name}, a Primepass precisa compartilhar o seu nome e`
      + ' e-mail para que a liberação do serviço seja efetuada com sucesso. Tendo em vista a preservação de'
      + ' sua privacidade, a Primepass não compartilhará seus dados pessoais com nenhum terceiro não autorizado.',
      message: null,
      error: false,
      footer: [
        {
          text: 'Aceito compartilhar meus dados',
          action: () => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            handleActivation(signature, { ...service, acceptedShareData: true });
            setDialogVisible(false);
          },
          props: {
            style: {
              color: '#72B1D2',
            },
          },
        },
        {
          text: 'Cancelar',
          action: () => setDialogVisible(false),
        },
      ],
    });
    setDialogVisible(true);
  };

  const handleDialogError = () => {
    setDialogContent({
      title: 'Ops, algo deu errado',
      message: 'Ocorreu um erro ao tentar ativar o serviço. Tente novamente mais tarde.',
      error: true,
    });

    setDialogVisible(true);
  };

  const verifyService = (signature: Signature, serviceSelected:UserService) => {
    if (!!serviceSelected.description.share_data && !serviceSelected.acceptedShareData) {
      handleDialogShareData(signature);
      return false;
    }
    return true;
  };

  const handleActivation = async (signature: Signature, serviceSelected: UserService) => {
    setLoadingService({
      ...loadingService,
      [`${signature.id}`]: true,
    });

    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'activate-service',
      section: 'activate',
      description: 'activate service confirm',
      payloadData: {
        service: serviceSelected.name.toLowerCase(),
        title: serviceSelected.description.description,
      },
      userId: user ? user.id : '0',
    });

    if (verifyService(signature, serviceSelected)) {
      const updatedService = await activationService(serviceSelected, signature);

      if (updatedService) {
        const signatureSelected = updatedService.signatures.filter((item: Signature) =>
          item.id === signature.id);

        handleOpenSignature(signatureSelected[0], updatedService);
      }

      if (!updatedService) {
        handleDialogError();
      }
    }

    setLoadingService({
      ...loadingService,
      [`${signature.id}`]: false,
    });
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
        onOverlayPress={() => { toggle(); modalizeRef.current?.close(); }}
        onBackButtonPress={() => { toggle(); modalizeRef.current?.close(); return true; }}
        flatListProps={{
          data: service?.signatures,
          keyExtractor: (item) => item.id,
          showsVerticalScrollIndicator: false,
          ListHeaderComponent: (
            <S.ContainerHeader>
              <Dialog
                title={dialogContent.title}
                message={dialogContent.message}
                error={dialogContent.error}
                footer={dialogContent.footer}
                visible={dialogVisible}
                handleClose={() => setDialogVisible(!dialogVisible)}
              />

              <S.Image
                source={{
                  uri: service?.images?.logo,
                }}
              />
              <S.Text>
                Abaixo você pode consultar o status do seu serviço,
                períodos disponíveis e datas de vencimento
              </S.Text>

              {accordionStatus()}
            </S.ContainerHeader>
          ),
          renderItem: ({ item }) => (
            <S.Register>
              <S.Row>
                <S.ColumnDate>
                  <S.Date>
                    {`${moment(item?.date_start).format('DD/MM/YYYY')} a ${moment(item?.date_finish).format('DD/MM/YYYY')}`}
                  </S.Date>
                </S.ColumnDate>
                <S.ColumnStatus>
                  <Status status={getStatus(item)} />
                </S.ColumnStatus>
              </S.Row>
              {getStatus(item) !== 'Cancelado'
                && (
                  <S.Actions>
                    {showButtonActivate(item)
                    && (
                      <S.Button
                        disable={loadingService[`${item.id}`]}
                        isLoading={loadingService[`${item.id}`]}
                        onPress={() => handleActivation(item, service)}
                      >
                        <S.ButtonText>Ativar</S.ButtonText>
                      </S.Button>
                    )}

                    {showButtonSeeAccess(item)
                      && (
                        <S.Button
                          disable={false}
                          onPress={() => handleOpenSignature(item)}
                          outline
                        >
                          {item.code
                            ? (<S.ButtonText>Ver código</S.ButtonText>)
                            : (<S.ButtonText>Ver acesso</S.ButtonText>)}
                        </S.Button>
                      )}
                  </S.Actions>
                ) }
            </S.Register>
          ),
          ListFooterComponent: (
            <S.ContainerFooter>
              <S.Text>
                Não se esqueça de ativar o serviço todo mês aqui na Primepass.
                Isso é necessário para mantermos a qualidade e segurança do serviço.
              </S.Text>
            </S.ContainerFooter>
          ),
        }}
      />
    </Portal>
  );
};

export default BottomSheetServiceSignatures;
