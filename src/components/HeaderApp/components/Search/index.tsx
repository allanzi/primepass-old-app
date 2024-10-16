import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Dialog from './Dialog';
import Header from './Header';
import TextField from '../../../TextField';
import CloseFilledIcon from '../../../../assets/img/CloseFilled.svg';
import SearchIcon from '../../../../assets/img/search.svg';
import ListViewThumbnail from './ListViewThumbnail';
import {
  Props as ListViewProps,
  DataPosition,
} from './ListViewThumbnail/types.d';
import { useServiceContentSearchLazyQuery } from '../../../../hooks/graphql/hooks';
import type { ContentService, Props } from './types.d';
import * as S from './styles';

const Search: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const { show, onClose } = props;
  const [searchText, setSearchText] = useState<string>('');
  const [results, setResults] = useState<ListViewProps['data']>([]);
  const setDelaySearchID = useState<unknown>()[1];

  const [fetchSearch, { data, loading }] = useServiceContentSearchLazyQuery();

  useEffect(() => {
    if (searchText.length > 1) {
      const search = () => {
        fetchSearch({
          variables: {
            search: searchText,
          },
        });
      };

      setDelaySearchID((delayID: NodeJS.Timeout) => {
        clearTimeout(delayID);
        return setTimeout(() => {
          search();
        }, 500);
      });
    }
  }, [searchText, fetchSearch]);

  useEffect(() => {
    if (data) {
      const payload = (data.service_content_search
        ?.details as unknown) as ContentService[];

      const tmpResults: ListViewProps['data'] = [];
      payload.forEach((item) => {
        const { services } = item;
        services.forEach((service, serviceIndex) => {
          const index = tmpResults.findIndex(
            ({ title }) => title === service.type.title,
          );

          if (index > -1) {
            tmpResults[index].items.push(item);
            return;
          }

          tmpResults.push({
            title: service.type.title,
            index: serviceIndex,
            items: [item],
          });
        });
      });

      setResults(tmpResults);
    }
  }, [data]);

  const handleNavigate = (position: DataPosition) => {
    const { contentService, serviceIndex } = position;
    const serviceType = contentService.services[serviceIndex].type;

    navigation.navigate('Services', {
      screen: 'Content',
      params: {
        data: contentService,
        screenName: 'search',
        serviceTypeId: serviceType.id,
        serviceTypeName: serviceType.name,
        serviceTypeTitle: serviceType.title,
      },
    });
    onClose();
  };

  return (
    <S.SearchArea
      style={{
        display: show ? 'flex' : 'none',
        position: 'relative',
      }}
    >
      <Dialog open={show} onClose={() => onClose()}>
        <Header title="Buscar" handleGoBack={() => onClose()} />
        <S.TopSide>
          <TextField
            leftSide={<SearchIcon width={16} heigth={16} />}
            rightSide={(
              <S.ClearButton
                onPress={() => {
                  setSearchText('');
                }}
              >
                <CloseFilledIcon width={16} heigth={16} />
              </S.ClearButton>
            )}
            placeholder="Pesquisar"
            autoFocus
            keyboardType="default"
            returnKeyType="search"
            value={searchText}
            onChangeText={setSearchText}
          />
        </S.TopSide>
        <S.BottomSide>
          {loading ? (
            <S.Container>
              <ActivityIndicator animating size="large" color="#fff" />
              <S.Label>Carregando</S.Label>
            </S.Container>
          ) : (
            <ListViewThumbnail data={results} onPress={handleNavigate} />
          )}
        </S.BottomSide>
      </Dialog>
    </S.SearchArea>
  );
};

export default Search;
