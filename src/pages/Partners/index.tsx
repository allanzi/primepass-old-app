import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { ActivityIndicator, Linking } from 'react-native';

import { SITE } from '@env';
import ArrowIcon from '../../assets/img/arrow-right.svg';
import CloseFilledIcon from '../../assets/img/CloseFilled.svg';
import Header from '../../components/Header';
import SearchIcon from '../../assets/img/search.svg';
import TextField from '../../components/TextField';
import { Company } from '../../@types/graphql/schemas';
import { getDeepLink } from '../../utils/deepLink';
import { useAction } from '../../hooks/actions';
import { useCompanyQuery } from '../../hooks/graphql/CompanyQuery';
import * as S from './styles';

interface RouteParams {
  next?: string;
  flow?: string;
}

const Partners: React.FC = () => {
  const route = useRoute();
  const { logEvent } = useAction();
  const params = route.params as RouteParams;
  const flow = params.flow ? params.flow : 'app';

  const [listCompanies, setListCompanies] = useState([] as Company[]);
  const [searchText, setSearchText] = useState('');

  const { data, loading } = useCompanyQuery({
    fetchPolicy: 'network-only',
  });

  const orderByLabel = (companies) => companies.sort((first, second) => (
    first?.partnerLogin?.label > second?.partnerLogin?.label ? 1 : -1));

  const setInitialCompaniesList = () => {
    if (data) {
      const companiesList = data?.company_list.companies.filter(
        (company) => company?.partnerLogin?.active,
      );

      setListCompanies(orderByLabel(companiesList));
    }
  };

  useEffect(() => {
    setInitialCompaniesList();
  }, [data]);

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow,
      group: 'scrn',
      context: 'partners',
      section: 'page',
      description: 'Partners',
      userId: '0',
    });
  }, []);

  const serialize = (obj: any) => {
    const str = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const p in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(p)) {
        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
      }
    }
    return str.join('&');
  };

  const handleButtonPartner = async (
    company: Company,
  ) => {
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      partnerLogin: { routes: { authorization }, client_id, partner_type },
      id,
    } = company;
    logEvent({
      type: 'log-event',
      flow,
      group: 'prss',
      context: 'partners',
      section: 'button',
      description: 'Chosen partner',
      userId: '0',
      payloadData: {
        partner: partner_type,
      },
    });

    const queries = serialize({
      authorization, client_id, from: 'mobile', company: id,
    });
    const url = `${SITE}/oauth2?${queries}`;
    const deepLink = getDeepLink('oauth2/callback');

    try {
      if (await InAppBrowser.isAvailable()) {
        const inAppBrowserOptions = {
          ephemeralWebSession: false,
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        };
        InAppBrowser.openAuth(url, deepLink, inAppBrowserOptions).then(
          (response) => {
            if (response.type === 'success' && response.url) {
              Linking.openURL(response.url);
            }
          },
        );

        return;
      }

      throw new Error('InAppBrowser not avaiable');
    } catch (error) {
      Linking.openURL(url);
    }
  };

  const handleSearch = async (text: string) => {
    setSearchText(text);

    if (text.length <= 0) {
      setInitialCompaniesList();
      return;
    }

    const filtered = data?.company_list.companies.filter((company) =>
      company?.partnerLogin?.active
      && company?.partnerLogin?.label?.toLowerCase().includes(searchText.toLowerCase()));

    setListCompanies(orderByLabel(filtered));
  };

  return (
    <S.Container>
      <Header title="Entrar com parceiros" />
      <S.Content>
        <S.PageSubTitle>
          Escolha com qual dos parceiros da Primepass você deseja entrar:
        </S.PageSubTitle>

        <TextField
          leftSide={
            <SearchIcon width={16} heigth={16} />
          }
          rightSide={searchText !== '' && (
            <S.ClearButton
              onPress={() => {
                setSearchText('');
                setInitialCompaniesList();
              }}
            >
              <CloseFilledIcon width={16} heigth={16} />
            </S.ClearButton>
          )}
          placeholder="Buscar"
          value={searchText}
          editable={!loading}
          onChangeText={handleSearch}
          onSubmitEditing={handleSearch}
        />

        {loading ? (
          <ActivityIndicator size={40} color="#fff" style={{ marginTop: 15 }} />
        ) : (
          <S.PartnersContainer>
            {listCompanies.length > 0 && <S.Separator />}

            {listCompanies
              .map((company) => {
                const { partnerLogin } = company;

                return (
                  <S.ContainerCompany key={company.id}>
                    <S.Company onPress={() => handleButtonPartner(company)}>
                      <S.Left>
                        <S.Image source={{ uri: partnerLogin?.icon }} />
                        <S.Label>{partnerLogin?.label}</S.Label>
                      </S.Left>
                      <ArrowIcon width="14" height="14" marginRight={4} marginLeft={4} />
                    </S.Company>
                  </S.ContainerCompany>
                );
              })}

          </S.PartnersContainer>
        )}
      </S.Content>
    </S.Container>
  );
};

export default Partners;
