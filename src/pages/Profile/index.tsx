/* eslint-disable react/jsx-no-bind, max-len, eqeqeq, @typescript-eslint/no-unused-vars */

import React, {
  useRef, useState, useCallback, useEffect,
} from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import api from '../../services/api';
import ArrowRight from '../../assets/img/ArrowRight.png';
import Avatar from './components/Avatar';
import DashboardIcon from '../../assets/img/Dashboard.png';
import DeleteIcon from '../../assets/img/user-delete.svg';
import Dialog from '../../components/Dialog';
import HelpIcon from '../../assets/img/HelpIcon.png';
import Input from '../../components/Input';
import Header from '../../components/Header';
import LogoutIcon from '../../assets/img/logout.png';
import Modal from '../../components/Modal';
import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';
import { useUserDetailsLazyQuery } from '../../hooks/graphql/hooks';
import { firstLetter } from '../../utils/stringTransform';
import { ModalMessageProps, FormData } from './types';
import * as S from './styles';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const { logEvent, logUserLogout } = useAction();
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const formRefModal = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    subtitle: null,
    disable: null,
    message: null,
    error: false,
    footer: null,
  } as ModalMessageProps);
  const [isPartner, setIsPartner] = useState(false);
  const [cover, setCover] = useState(
    'https://primepass-imagens.s3.us-east-1.amazonaws.com/CAPA-DEFAULT.jpg',
  );
  const [avatar, setAvatar] = useState(
    'https://primepass-imagens.s3.us-east-1.amazonaws.com/AVATAR-DEFAULT.jpg',
  );
  const [partnerType, setPartnerType] = useState('primepass');

  const onToggleModal = useCallback(
    (param: boolean) => {
      setModalVisible(param);
    },
    [modalVisible],
  );

  const [
    getUser,
  ] = useUserDetailsLazyQuery();

  function handleModalLogOut(): void {
    const userId = user ? user.id : '0';
    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'profile',
      section: 'logout',
      description: 'User logout',
      payloadData: {
        action: 'logout',
        method: user.partner_type,
      },
      userId,
    });
    logUserLogout(user.partner_type, userId);
    setModalVisible(!modalVisible);
  }

  const handleDelete = async (data: FormData) => {
    try {
      if (data?.input?.toLowerCase() === 'sim, quero excluir minha conta') {
        setLoading(true);
        await api.delete(`/users/${user.id}`);
        await signOut();
        navigation.navigate('DeletedAccount');
        setDialogVisible(false);
      }
      formRefModal.current?.setErrors({
        input: 'Confirmação necessária',
      });
    } catch (error) {
      setDialogContent({
        title: 'Ops, algo deu errado',
        message: 'Tente novamente mais tarde.',
        error: true,
        footer: null,
      });
      setDialogVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleModalDeleteAccount = () => {
    const userId = user ? user.id : '0';

    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'profile',
      section: 'delete',
      description: 'User delete',
      payloadData: {
        action: 'delete',
        method: user.partner_type,
      },
      userId,
    });

    setDialogContent({
      title: 'Tem certeza de que deseja excluir sua conta?',
      subtitle: 'Pense bem, você perderá toda a diversão!',
      message: 'A partir do momento da exclusão de sua conta, todos os seus dados como, métodos de pagamento, '
      + 'histórico de compras e saldo na carteira serão perdidos! \n ',
      error: false,
      footer: [
        {
          text: 'Sim, quero excluir minha conta e perder a diversão',
          action: () => {
            formRefModal.current?.submitForm();
          },
          props: {
            style: {
              color: '#FF6666',
              fontSize: 12,
            },
          },
        },
        {
          text: 'Não, quero continuar a diversão com a Primepass',
          action: () => {
            setDialogVisible(false);
          },
          props: {
            style: {
              fontSize: 12,
            },
          },
        },
      ],
    });
    setDialogVisible(true);
  };

  useFocusEffect(
    useCallback(() => {
      if (user && 'partner_type') {
        switch (user.partner_type) {
          case 'vivo':
            setCover(
              'https://primepass-imagens.s3.us-east-1.amazonaws.com/CAPA-VIVO.png',
            );
            setAvatar(
              'https://primepass-imagens.s3.us-east-1.amazonaws.com/AVATAR-VIVO.png',
            );
            break;
          case 'vip':
            setCover(
              'https://primepass-imagens.s3.us-east-1.amazonaws.com/cover-vip.png',
            );
            setAvatar(
              'https://primepass-imagens.s3.us-east-1.amazonaws.com/avatar-vip.png',
            );
            break;
          default:
            setCover(
              'https://primepass-imagens.s3.us-east-1.amazonaws.com/CAPA-DEFAULT.jpg',
            );
            setAvatar(
              'https://primepass-imagens.s3.us-east-1.amazonaws.com/AVATAR-DEFAULT.jpg',
            );
            break;
        }
      }

      setIsPartner(
        !!(
          user
          && 'partner_type' in user
          && (user.partner_type === 'vivo' || user.partner_type === 'vip')
        ),
      );
      setPartnerType(
        user && 'partner_type' in user ? user.partner_type : 'primepass',
      );
      if (user?.id) {
        getUser({
          variables: {
            user_id: user.id,
          },
        });
      }
    }, [user]),
  );

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'profile',
      section: 'page',
      description: 'User profile',
      userId: user ? user.id : '0',
    });
  }, []);

  if (loading) {
    return (
      <S.ContainerLoader>
        <ActivityIndicator animating size="large" color="#fff" />
      </S.ContainerLoader>
    );
  }

  return (
    <S.Container>
      <ScrollView>
        <Header translucent title="Perfil do usuário" color="#fff" />
        <Avatar
          cover={cover}
          avatar={avatar}
          letter={isPartner ? '' : firstLetter(user ? user.name : '')}
          background="transparent"
        />
        <Modal
          visible={modalVisible}
          onChange={onToggleModal}
          title="Tem certeza que deseja sair dessa conta?"
        />
        <Dialog
          title={dialogContent.title}
          subtitle={dialogContent.subtitle}
          message={dialogContent.message}
          visible={dialogVisible}
          footer={dialogContent.footer}
          error={dialogContent.error}
          handleClose={() => setDialogVisible(false)}
        >
          {dialogContent.error === false
            && (
              <>
                <S.Text>
                  Para concluir seu cancelamento, escreva abaixo
                  {'\n'}
                  “Sim, quero excluir minha conta”
                </S.Text>
                <Form ref={formRefModal} onSubmit={handleDelete}>
                  <Input
                    name="input"
                    icon="times-circle"
                    placeholder="Sim, quero excluir minha conta"
                    autoCapitalize="none"
                  />
                </Form>
              </>
            )}
        </Dialog>
        {user && (
          <>
            <S.DataContainer>
              <Form ref={formRef} onSubmit={() => {}}>
                <Input
                  name="input"
                  icon="times-circle"
                  placeholder="Número do celular"
                  value={user.name}
                  enableButton={() => {}}
                  label="Nome"
                  editable={false}
                />

                <Input
                  name="input"
                  icon="times-circle"
                  placeholder="E-mail"
                  value={user.email}
                  enableButton={() => {}}
                  label="E-mail"
                  editable={false}
                />

                <Input
                  name="phone"
                  label="Telefone"
                  value={user.phone}
                  icon="times-circle"
                  placeholder="Número do celular"
                  enableButton={() => {}}
                  editable={false}
                />
              </Form>
            </S.DataContainer>

            <S.MenuContainer>
              <S.Separator>
                <S.LineSeparator />
              </S.Separator>
              <S.MenuItem onPress={() => navigation.navigate('HelpDeskMenu')}>
                <S.ContentInfo>
                  <S.MenuIcon source={HelpIcon} />
                  <S.MenuInfo>
                    <S.MenuLabel>Central de ajuda</S.MenuLabel>
                    <S.MenuLabelComment>
                      Fale conosco
                    </S.MenuLabelComment>
                  </S.MenuInfo>
                </S.ContentInfo>
                <S.Icon source={ArrowRight} />
              </S.MenuItem>
              <S.MenuItem onPress={() => navigation.navigate('PlansServices')}>
                <S.ContentInfo>
                  <S.MenuIcon source={DashboardIcon} />
                  <S.MenuInfo>
                    <S.MenuLabel>Planos & Serviços</S.MenuLabel>
                    <S.MenuLabelComment>
                      Assinaturas e resgates
                    </S.MenuLabelComment>
                  </S.MenuInfo>
                </S.ContentInfo>
                <S.Icon source={ArrowRight} />
              </S.MenuItem>
              {/* <S.MenuItem onPress={() => handleManagerSocial()}>
                <S.ContentInfo>
                  <S.MenuIcon source={ShareIcon} />
                  <S.MenuInfo>
                    <S.MenuLabel>Contas associadas</S.MenuLabel>
                    <S.MenuLabelComment>
                      Associe contas de redes sociais e parcerias
                    </S.MenuLabelComment>
                  </S.MenuInfo>
                </S.ContentInfo>
                <S.Icon source={ArrowRight} />
              </S.MenuItem> */}

              <S.MenuItem onPress={() => handleModalDeleteAccount()}>
                <S.ContentInfo>
                  <DeleteIcon />
                  <S.MenuInfo>
                    <S.MenuLabel>Excluir conta</S.MenuLabel>
                    <S.MenuLabelComment>Excluir minha conta Primepass</S.MenuLabelComment>
                  </S.MenuInfo>
                </S.ContentInfo>
                <S.Icon source={ArrowRight} />
              </S.MenuItem>

              <S.MenuItem onPress={() => handleModalLogOut()}>
                <S.ContentInfo>
                  <S.MenuIcon source={LogoutIcon} />
                  <S.MenuInfo>
                    <S.MenuLabel>Sair da conta</S.MenuLabel>
                    <S.MenuLabelComment>Fazer logoff</S.MenuLabelComment>
                  </S.MenuInfo>
                </S.ContentInfo>
                <S.Icon source={ArrowRight} />
              </S.MenuItem>
            </S.MenuContainer>
          </>
        )}
      </ScrollView>
    </S.Container>
  );
};

export default Profile;
