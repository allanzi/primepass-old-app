import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getVersion, getBuildNumber } from 'react-native-device-info';

import Header from '../../components/Header';
import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';
import FaqIcon from '../../assets/img/question.png';
import SendEmailIcon from '../../assets/img/mail.png';
import TermsAndCondictionsIcon from '../../assets/img/termos.png';
import ArrowRight from '../../assets/img/ArrowRight.png';
import OpenExternalLink from '../../utils/openExternalLink';
import * as S from './styles';
import Dialog from '../../components/Dialog';

const HelpDeskMenu: React.FC = () => {
  const [siteDialog, setSiteDialog] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuth();
  const { logEvent } = useAction();

  const handleNavigateTo = (toPlace: string, description: string) => {
    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'help-center',
      section: 'menu-drawer',
      description,
      payloadData: {
        menu: toPlace,
        title: description,
      },
      userId: user ? user.id : '0',
    });

    switch (toPlace) {
      case 'HowToUseMyTicket':
        navigation.navigate('HowToUseMyTicket', { to: toPlace });
        break;
      case 'FAQ':
        OpenExternalLink(
          'https://primepass.zendesk.com/hc/pt-br',
        );
        return;
      case 'TermsAndCondictions':
        OpenExternalLink(
          'https://primepass.zendesk.com/hc/pt-br/articles/360000316626-Termos-de-Uso',
        );
        break;
      case 'PrivacyPolicy':
        OpenExternalLink(
          'https://primepass.zendesk.com/hc/pt-br/articles/360000317603-Pol%C3%ADtica-de-Privacidade',
        );
        return;
      case 'E-mail':
        OpenExternalLink(
          'https://primepass.zendesk.com/hc/pt-br/articles/360021194772-Quais-s%C3%A3o-os-canais-de-atendimento-Primepass-',
        );
        break;
      default:
    }
  };

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'help-center',
      section: 'page',
      description: 'Help center',
      userId: user ? user.id : '0',
    });
  }, [user]);

  return (
    <S.Fragment>
      <Dialog
        title="Estamos quase lá!"
        message="Ainda estamos trabalhando na construção do novo site. Por favor, tente mais tarde!"
        visible={siteDialog}
        handleClose={() => setSiteDialog(false)}
      />
      <Header title="Central de Ajuda" />
      <S.Container>
        <S.Content>
          <S.Separator>
            <S.LineSeparator />
          </S.Separator>

          <S.MenuItem
            onPress={() => handleNavigateTo('FAQ', 'Frequent ask questions')}
          >
            <S.ContentInfo>
              <S.IconMenu source={FaqIcon} />
              <S.Info>
                <S.Label>Perguntas Frequentes</S.Label>
              </S.Info>
            </S.ContentInfo>
            <S.Icon source={ArrowRight} />
          </S.MenuItem>

          {/* <S.MenuItem onPress={() => handleNavigateTo('Chat', 'Chat')}>
          <S.ContentInfo>
            <S.IconMenu source={ChatIcon} />
            <S.Info>
              <S.Label>Chat</S.Label>
            </S.Info>
          </S.ContentInfo>
          <S.Icon source={ArrowRight} />
        </S.MenuItem> */}

          <S.MenuItem onPress={() => handleNavigateTo('E-mail', 'E-mail')}>
            <S.ContentInfo>
              <S.IconMenu source={SendEmailIcon} />
              <S.Info>
                <S.Label>Enviar e-mail</S.Label>
              </S.Info>
            </S.ContentInfo>
            <S.Icon source={ArrowRight} />
          </S.MenuItem>

          <S.MenuItem
            onPress={() => handleNavigateTo('TermsAndCondictions', 'Terms and conditions')}
          >
            <S.ContentInfo>
              <S.IconMenu source={TermsAndCondictionsIcon} />
              <S.Info>
                <S.Label>Termos e condições</S.Label>
              </S.Info>
            </S.ContentInfo>
            <S.Icon source={ArrowRight} />
          </S.MenuItem>

          <S.MenuItem
            onPress={() => handleNavigateTo('PrivacyPolicy', 'Privacy Policy')}
          >
            <S.ContentInfo>
              <S.IconMenu source={TermsAndCondictionsIcon} />
              <S.Info>
                <S.Label>Política de Privacidade</S.Label>
              </S.Info>
            </S.ContentInfo>
            <S.Icon source={ArrowRight} />
          </S.MenuItem>
        </S.Content>

        <S.VersionCode>
          Versão:
          {' '}
          {getVersion()}
          {' '}
          - Build:
          {' '}
          {getBuildNumber()}
        </S.VersionCode>

      </S.Container>
    </S.Fragment>
  );
};

export default HelpDeskMenu;
