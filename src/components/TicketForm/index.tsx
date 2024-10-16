import React, { useCallback, useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import { ActionSheetIOS, Platform } from 'react-native';
import { TicketFormProps } from './types';
import CloseIcon from '../../assets/img/close.svg';
import Dialog from '../Dialog';
import InfoIcon from '../../assets/img/info.svg';
import LessIcon from '../../assets/img/less.svg';
import LessDisableIcon from '../../assets/img/lessDisable.svg';
import MoreIcon from '../../assets/img/more.svg';
import MoreDisableIcon from '../../assets/img/moreDisable.svg';
import QuestionIcon from '../../assets/img/question.svg';
import ArrowMenu from '../../assets/img/arrow-menu.svg';
import * as S from './styles';

const TicketForm: React.FC<TicketFormProps> = (
  {
    creditsAvailable,
    creditQuantity,
    onChangeQuantity,
    creditScreenType,
    creditRoomType,
    onChangeScreenType,
    onChangeRoomType,
    screens,
    rooms,
  },
) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', message: '' });

  const handleDialogChoice = () => {
    setDialogContent({
      title: 'Escolha seus ingressos',
      message:
      'Confira o saldo dos seus ingressos, selecione a'
      + ' quantidade que deseja e defina o tipo de tela e sala.'
      + ' Saiba que você poderá escolher qualquer filme em'
      + ' cartaz nesse cinema escolhido.',
    });
    setDialogVisible(true);
  };

  const handleDialogTickets = useCallback(() => {
    setDialogContent({
      title: 'Ingressos de cinema Primepass',
      message: '',
    });
    setDialogVisible(true);
  }, []);

  const openActionSheetIOS = (
    title: string,
    message: string,
    options: string[],
    onSelectedOption: Function,
  ) => ActionSheetIOS.showActionSheetWithOptions(
    {
      title,
      message,
      options: [
        'Cancelar',
        ...options,
      ],
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark',
    },
    (buttonIndex) => {
      if (buttonIndex >= 1) {
        onSelectedOption(options[buttonIndex - 1]);
      }
    },
  );

  return (
    <S.Container>
      <Dialog
        title={dialogContent.title}
        message={dialogContent.message}
        visible={dialogVisible}
        handleClose={() => setDialogVisible(false)}
      >
        {dialogContent.title === 'Ingressos de cinema Primepass'
        && (
          <S.ContentTextDialog>
            <S.Text>
              <S.TextGreen>
                Saldos disponíveis para resgate existente em sua
                conta estão habilitados para usar no dia de hoje.
                {'\n'}
              </S.TextGreen>
              Você poderá efetuar resgate, porém verifique em
              <S.TextBold>
                {' '}
                “Meus ingressos”
                {' '}
              </S.TextBold>
              os
              <S.TextBold>
                {' '}
                “dias habilitados para uso”.
              </S.TextBold>
            </S.Text>
          </S.ContentTextDialog>
        )}
      </Dialog>

      <S.ContainerTitle>
        <S.Title>Escolha seus ingressos</S.Title>
        <QuestionIcon onPress={handleDialogChoice} />
      </S.ContainerTitle>

      <S.ContainerBalance>
        <S.TextSubtitle>Saldo na Primepass para resgate</S.TextSubtitle>
        <S.Balance
          disable={creditsAvailable - creditQuantity <= 0}
        >
          <S.TextBalance disable={creditsAvailable - creditQuantity <= 0}>
            { creditQuantity >= creditsAvailable ? 0 : creditsAvailable - creditQuantity }
          </S.TextBalance>
        </S.Balance>

        <QuestionIcon onPress={handleDialogTickets} />
      </S.ContainerBalance>

      <S.ContainerCredits>
        <S.TitleCredit>Quantos ingressos você vai querer?</S.TitleCredit>
        <S.Row>
          <S.ButtonCredits
            disable={creditQuantity === 0}
            onPress={() => onChangeQuantity(creditQuantity - 1)}
          >
            {creditQuantity > 0
              ? <LessIcon />
              : <LessDisableIcon />}
          </S.ButtonCredits>

          <S.CreditBox disable={creditQuantity === 0}>
            <S.CreditText disable={creditQuantity === 0}>{creditQuantity}</S.CreditText>
          </S.CreditBox>

          <S.ButtonCredits
            disable={creditQuantity >= 6}
            onPress={() => onChangeQuantity(creditQuantity + 1)}
          >
            {creditQuantity < 6
              ? <MoreIcon />
              : <MoreDisableIcon />}
          </S.ButtonCredits>
        </S.Row>
        {creditQuantity > creditsAvailable
          && (
            <S.ContainerWarning>
              <InfoIcon width={10} height={10} />
              <S.Warning>
                Você excedeu o número de ingressos disponível na Primepass.
                {/* {'\n'}
                <S.TextGreen>
                  Ingressos adicionais serão cobrados com 10% de desconto.
                </S.TextGreen> */}
              </S.Warning>

            </S.ContainerWarning>
          ) }
      </S.ContainerCredits>

      <S.ContentDropdowns>
        {Platform.OS === 'android' ? (
          <>
            <S.DropdownBoxAndroid
              disable={creditQuantity <= 0}
            >
              <S.Dropdown
                selectedValue={creditScreenType}
                onValueChange={(itemValue: string) => {
                  if (itemValue !== 'Tela') {
                    onChangeScreenType(itemValue);
                  }
                }}
                dropdownIconColor={creditQuantity > 0 ? '#A2A2A2' : '#515151'}
                mode="dropdown"
                enabled={creditQuantity > 0}
                disable={creditQuantity <= 0}
              >
                {['Tela', ...screens].map((item) => (
                  <Picker.Item
                    label={item}
                    value={item}
                  />
                ))}
              </S.Dropdown>
            </S.DropdownBoxAndroid>

            <S.DropdownBoxAndroid disable={creditQuantity <= 0}>
              <S.Dropdown
                selectedValue={creditRoomType}
                onValueChange={(itemValue: string) => {
                  if (itemValue !== 'Sala') {
                    onChangeRoomType(itemValue);
                  }
                }}
                dropdownIconColor={creditQuantity > 0 ? '#A2A2A2' : '#515151'}
                mode="dropdown"
                enabled={creditQuantity > 0}
                disable={creditQuantity <= 0}
              >
                {['Sala', ...rooms].map((item) => (
                  <Picker.Item
                    label={item}
                    value={item}
                  />
                ))}
              </S.Dropdown>
            </S.DropdownBoxAndroid>
          </>
        ) : (
          <>
            <S.DropdownBox
              disable={creditQuantity <= 0}
              onPress={() => {
                if (creditQuantity > 0) {
                  openActionSheetIOS('Tela', 'Escolha o tipo de tela', screens, onChangeScreenType);
                }
              }}
            >
              <S.DropdownIOS
                selectedValue={creditScreenType}
                onValueChange={onChangeScreenType}
                dropdownIconColor={creditQuantity > 0 ? '#A2A2A2' : '#515151'}
                mode="dropdown"
                enabled={creditQuantity > 0}
                disable={creditQuantity <= 0}
              >
                <S.DropdownText disable={creditQuantity <= 0}>
                  {creditScreenType.length > 0 ? creditScreenType : 'Tela'}
                </S.DropdownText>
                <ArrowMenu fill="#A2A2A2" />
              </S.DropdownIOS>
            </S.DropdownBox>

            <S.DropdownBox
              disable={creditQuantity <= 0}
              onPress={() => {
                if (creditQuantity > 0) {
                  openActionSheetIOS('Sala', 'Escolha o tipo de sala', rooms, onChangeRoomType);
                }
              }}
            >
              <S.DropdownIOS
                selectedValue={creditRoomType}
                onValueChange={onChangeRoomType}
                dropdownIconColor={creditQuantity > 0 ? '#A2A2A2' : '#515151'}
                mode="dropdown"
                enabled={creditQuantity > 0}
                disable={creditQuantity <= 0}
              >
                <S.DropdownText disable={creditQuantity <= 0}>
                  {creditRoomType.length > 0 ? creditRoomType : 'Sala'}
                </S.DropdownText>
                <ArrowMenu fill="#A2A2A2" />
              </S.DropdownIOS>
            </S.DropdownBox>
          </>
        )}
      </S.ContentDropdowns>

      <S.SelectTypes>
        {creditScreenType.length > 0
        && (
          <S.ContentValue onPress={() => onChangeScreenType('')}>
            <S.Value>
              {creditScreenType}
            </S.Value>
            <S.Divisor />
            <CloseIcon width={16} height={16} />
          </S.ContentValue>
        )}

        {creditRoomType.length > 0
        && (
          <S.ContentValue onPress={() => onChangeRoomType('')}>
            <S.Value>
              {creditRoomType}
            </S.Value>
            <S.DeleteContainer>
              <S.Divisor />
              <CloseIcon width={16} height={16} />
            </S.DeleteContainer>
          </S.ContentValue>
        )}

      </S.SelectTypes>
    </S.Container>

  );
};

export default TicketForm;
