/* eslint-disable max-len, react/jsx-props-no-spreading, @typescript-eslint/no-use-before-define, react/require-default-props, @typescript-eslint/ban-types */
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Dialog, { Footer as FooterInterface } from '../Dialog';
import VisaIcon from '../../assets/img/visa.svg';
import MasterIcon from '../../assets/img/mastercard.svg';
import AmexIcon from '../../assets/img/americanexpress.svg';
import DinnerIcon from '../../assets/img/dinnersclub.svg';
import plusIcon from '../../assets/img/plus.png';
import pencilWhiteIcon from '../../assets/img/pencil-white.png';
import trashWhiteIcon from '../../assets/img/trash-white.png';
import options1WhiteIcon from '../../assets/img/options1-white.png';
import options2WhiteIcon from '../../assets/img/options2-white.png';
import * as S from './styles';

interface PaymentCardProps {
  card?: string;
  brand?: string;
  type?: string;
  edit?: boolean;
  selected?: boolean;
  onPress?: () => {} | void;
  onDelete?: () => {} | void;
  loading?: boolean;
}
export interface ModalMessageProps {
  title: string;
  message?: string | null;
  error?: boolean;
  children?: any;
  footer?: FooterInterface[] | null;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  card = '',
  brand = 'master',
  type = 'credito',
  edit = false,
  selected = false,
  onPress,
  onDelete,
  loading = false,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(selected);
  const [title, setTitle] = useState('');
  const [action, setAction] = useState('');
  const [actionIcon, setActionIcon] = useState('');
  const [brandTitle, setBrandTitle] = useState('');
  const [cardNumber, setCardNumber] = useState(card);
  const [cardNumberPartial, setCardNumberPartial] = useState('');
  const [background, setBackground] = useState('');
  const [color, setColor] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    message: '',
    error: true,
    footer: null,
  } as ModalMessageProps);
  const navigation = useNavigation();

  useEffect(() => {
    setTitle('Cartão de Crédito');
    setAction(!cardNumber ? 'add' : 'show');
    setActionIcon(!cardNumber ? plusIcon : options1WhiteIcon);
    setCardNumberPartial(
      !cardNumber
        ? ''
        : `**** ${cardNumber.substring(
          cardNumber.length - 4,
          cardNumber.length,
        )}`,
    );
  }, [type, cardNumber]);

  useEffect(() => {
    const brandCheck = !cardNumber ? 'UNKNOWN' : brand;
    switch (brandCheck.toUpperCase()) {
      case 'MASTER':
        setBrandTitle('MASTERCARD');
        break;
      case 'AMEX':
        setBrandTitle('AMERICAN EXPRESS');
        break;
      case 'DINERS':
        setBrandTitle('DINERS CLUB');
        break;
      case 'VISA':
        setBrandTitle('VISA');
        break;
      default:
        setBrandTitle('Nenhum cartão selecionado');
    }
  }, [brand, cardNumber]);

  useEffect(() => {
    setEnabled(selected);
  }, [selected]);

  useEffect(() => {
    setCardNumber(card);
  }, [card]);

  useEffect(() => {
    if (!enabled) {
      setBackground(theme.colors.backgroundModal);
      setColor('rgba(0, 0, 0, 0.80');
      return;
    }
    setBackground(theme.colors.primaryBlue);
    setColor(theme.colors.white);
  }, [enabled, cardNumber]);

  useEffect(() => {
    setDialogContent({
      title: 'Deseja remover esse cartão de crédito?',
      message: null,
      error: false,
      footer: [
        {
          text: 'Sim, remover cartão',
          action: () => {
            handleDelete();
            setDialogVisible(false);
          },
          props: {
            style: {
              color: '#FF6666',
            },
          },
        },
        {
          text: 'Cancelar',
          action: () => setDialogVisible(false),
        },
      ],
    });
  }, []);

  const actionsToggle = () => {
    if (action !== 'add') {
      if (action === 'show') {
        setAction('change');
        setActionIcon(options2WhiteIcon);
        return;
      }
      setAction('show');
      setActionIcon(options1WhiteIcon);
      return;
    }
    handleAdd();
  };

  const handleEdit = () => {
    navigation.navigate('CreditCards', {
      screen: 'List',
      params: {
        screenName: 'List',
      },
    });
  };

  const handleDelete = () => {
    setEnabled(false);
    setCardNumber('');
    setCardNumberPartial('');
    setAction('add');
    setBrandTitle('');
    if (onDelete) {
      onDelete();
    }
  };

  const handleAdd = () => {
    navigation.navigate('CreditCards', {
      screen: 'Create',
      params: {
        screenName: 'Create',
      },
    });
  };

  const getIcon = () => {
    switch (brand.toUpperCase()) {
      case 'MASTER':
        return <MasterIcon width={42} />;
      case 'AMEX':
        return <AmexIcon width={42} />;
      case 'DINERS':
        return <DinnerIcon width={42} />;
      case 'VISA':
        return <VisaIcon width={42} />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <Dialog
        title={dialogContent.title}
        message={dialogContent.message}
        visible={dialogVisible}
        error={dialogContent.error}
        handleClose={() => setDialogVisible(false)}
        footer={dialogContent.footer}
      />

      <S.Container color={color} background={background} {...props}>
        {loading ? (
          <S.ChangeIndicator size={20} color="#fff" />
        ) : (
          <>
            <S.CardContainer>
              {action === 'change' && (
                <S.CardLeftContainer>
                  {edit && (
                    <S.Button onPress={handleEdit}>
                      <S.Edit
                        resizeMode={FastImage.resizeMode.contain}
                        source={pencilWhiteIcon}
                      />
                    </S.Button>
                  )}

                  {!selected && (
                    <S.Button onPress={() => setDialogVisible(true)}>
                      <S.Delete
                        resizeMode={FastImage.resizeMode.contain}
                        source={trashWhiteIcon}
                      />
                    </S.Button>
                  )}
                </S.CardLeftContainer>
              )}
              <S.CardRightContainer>
                <S.SelectButton onPress={onPress}>
                  <S.TypeTitle>{title}</S.TypeTitle>
                  <S.Card>
                    <S.BrandTitle>{brandTitle}</S.BrandTitle>
                    <S.CardNumber>{cardNumberPartial}</S.CardNumber>
                  </S.Card>
                </S.SelectButton>
              </S.CardRightContainer>
            </S.CardContainer>

            <S.BrandContainer>
              {getIcon()}
              <TouchableOpacity onPress={actionsToggle}>
                <S.Actions
                  resizeMode={FastImage.resizeMode.contain}
                  source={actionIcon}
                />
              </TouchableOpacity>
            </S.BrandContainer>
          </>
        )}
      </S.Container>
    </>
  );
};

export default PaymentCard;
