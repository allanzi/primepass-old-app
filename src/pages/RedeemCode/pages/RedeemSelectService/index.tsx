/* eslint-disable import/no-extraneous-dependencies, array-callback-return */
import React, { useState, useCallback } from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/core';

import Dialog from '../../../../components/Dialog';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';
import { useAction } from '../../../../hooks/actions';
import * as S from './styles';
import {
  ModalMessageProps, Params, ServerError, Service,
} from './types';

const RedeemSelectService: React.FC = () => {
  const route = useRoute();
  const params = route.params as Params;
  const navigation = useNavigation();
  const { user } = useAuth();
  const { logEvent, logConvertArrayToString } = useAction();

  const [loading, setLoading] = useState(false as boolean);
  const [selectableItems, setSelectableItems] = useState(4 as number);
  const [selectedItems, setSelectedItems] = useState([] as Service[]);
  const [items, setItems] = useState([] as Service[]);
  const [dialogVisible, setDialogVisible] = useState(false as boolean);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    message: '',
    error: true,
    footer: null,
  } as ModalMessageProps);

  useFocusEffect(
    useCallback(() => {
      setSelectableItems(params.voucher.select_up);
      setItems(params.voucher.services);
    }, []),
  );

  const toggleSelectedHandle = (item: Service) => {
    if (item.category !== 'default_service') {
      if (selectedItems.includes(item)) {
        setSelectableItems(selectableItems + 1);

        const newSelectedItems = selectedItems.filter(
          (selectedItem) => item !== selectedItem,
        );
        setSelectedItems(newSelectedItems);

        return;
      }

      if (selectableItems === 0) {
        setDialogContent({
          title: 'Ops, algo deu errado',
          message: 'Não é possível selecionar mais itens.',
          error: true,
          footer: null,
        });
        setDialogVisible(true);
        return;
      }

      setSelectableItems(selectableItems - 1);
      setSelectedItems([...selectedItems, item]);
    }
  };

  const redeemRedirectHandle = async () => {
    try {
      setLoading(true);

      const services = [] as string[];
      const servicesName = [] as string[];

      selectedItems.map((service) => {
        services.push(service.id);
        servicesName.push(service.name);
      });

      await api.post(`/voucher-codes/${params.code}`, {
        services,
        partner_subscription: params.partner_subscription,
        share_data: false,
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
          isComboSelect: true,
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

  const redeemChangeIdeaHandle = () => {
    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'voucher-redeem',
      section: 'voucher-change-idea',
      description: 'Voucher change idea button',
      userId: user ? user.id : '0',
    });
    setDialogVisible(false);
  };

  const redeemHandle = () => {
    if (selectableItems > 0) {
      setDialogContent({
        title: 'Ops, algo deu errado',
        message: `Por favor, selecione mais ${selectableItems} ${
          selectableItems > 1 ? 'itens' : 'item'
        } para continuar`,
        error: true,
        footer: null,
      });
      setDialogVisible(true);
      return;
    }

    setDialogContent({
      title: 'Não será possível trocar o produto. \nDeseja continuar?',
      message: null,
      error: false,
      footer: [
        {
          text: 'Sim, quero continuar',
          action: () => {
            setDialogVisible(false);
            redeemRedirectHandle();
          },
          props: {
            style: {
              color: '#72B1D2',
            },
          },
        },
        {
          text: 'Mudei de ideia',
          action: () => redeemChangeIdeaHandle(),
        },
      ],
    });
    setDialogVisible(true);
  };

  const transformNameSelctedItems = () => {
    let text = 'Você escolheu ';

    selectedItems.map((selectedItem, index) => {
      text
        += selectedItems.length - 1 === index
          ? `${selectedItem.name}.`
          : `${selectedItem.name}, `;
    });

    return text;
  };

  const defaultServices = () => items.filter((item) => item.category === 'default_service');

  const defaultServicesNames = () => {
    const names = defaultServices().map((item) => item.name);
    return names.join(', ');
  };

  const warningText = () => {
    let text = `* ${defaultServicesNames()} `;

    if (defaultServices().length === 1) {
      text += 'já esta incluso automaticamente em seu resgate e não é possível removê-lo.';
    }
    if (defaultServices().length > 1) {
      text += 'já estão inclusos automaticamente em seu resgate e não é possível removê-los.';
    }
    return text;
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
          <S.Title>
            Escolha seu conteúdo favorito
            {defaultServices().length > 0 ? ' *' : ''}
          </S.Title>

          <S.Subtitle>
            Você possui
            {' '}
            {selectableItems}
            {' '}
            {selectableItems === 0 || selectableItems > 1
              ? 'itens restantes'
              : 'item restante'}
          </S.Subtitle>

          <S.ServiceCardContainer>
            {items.map((item, index) => (
              <S.TouchableOpacity
                onPress={() => toggleSelectedHandle(item)}
                key={item.id}
              >
                <S.ServiceCard
                  imageStyle={{ borderRadius: 8 }}
                  source={{
                    uri: item.image.selected_image,
                  }}
                  style={{ marginLeft: index % 2 === 1 ? 8 : 0 }}
                >
                  {(selectedItems.includes(item) || item.category === 'default_service') && (
                    <S.ServiceCardOverlay>
                      <S.OverlayIcon
                        source={require('../../../../assets/img/white-check.png')}
                      />
                    </S.ServiceCardOverlay>
                  )}
                </S.ServiceCard>
              </S.TouchableOpacity>
            ))}
          </S.ServiceCardContainer>
          <S.BottomText>
            <S.ItemsSelectedText>
              {selectedItems.length > 0 && transformNameSelctedItems()}
            </S.ItemsSelectedText>
            {defaultServices().length > 0
          && (
            <S.WarningText>
              {warningText()}
            </S.WarningText>
          ) }
          </S.BottomText>
          <Button disable={false} onPress={redeemHandle} isLoading={loading}>
            Continuar
          </Button>

          <Footer />
        </S.Container>
      </S.Scroll>
    </S.Fragment>
  );
};

export default RedeemSelectService;
