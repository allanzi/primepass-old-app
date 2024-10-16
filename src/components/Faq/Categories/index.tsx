import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { ActivityIndicator } from 'react-native';
import { Props, TypeArticle, Category } from './types';
import { removeAccent } from '../../../utils/removeAccent';
import CloseFilledIcon from '../../../assets/img/CloseFilled.svg';
import Dialog from '../../Dialog';
import SearchIcon from '../../../assets/img/search.svg';
import TextField from '../../TextField';
import * as S from './styles';

const Categories: React.FC<Props> = ({
  categoryLimit,
  handleRedirectArticles,
  handleRedirectSearchArticle,
}) => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [lisCategories, setListCategories] = useState([] as Array<Category>);
  const [focusSearchInput, setFocusSearchInput] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([] as Array<TypeArticle>);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const { data: { categories } } = await axios.get(
        'https://primepass.zendesk.com/api/v2/help_center/pt-br/categories.json',
      );

      if (categories) {
        setListCategories(categories);
      }
    } catch (e) {
      setModalErrorVisible(!modalErrorVisible);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (text: string) => {
    setSearchText(text);

    try {
      if (text.length <= 0) {
        setArticles([]);
        return;
      }

      if (text.length > 2) {
        setSearchLoading(true);

        const {
          data: { results },
        } = await axios.get(`https://primepass.zendesk.com/api/v2/help_center/articles/search?per_page=10&query=${removeAccent(text)}`);

        setArticles(results);
      }
    } catch (_) {
      setModalErrorVisible(!modalErrorVisible);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleRedirectSearch = async (article: TypeArticle) => {
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      data: { section: { category_id } },
    } = await axios.get(`https://primepass.zendesk.com/api/v2/help_center/pt-br/sections/${article.section_id}`);

    const {
      data: { category },
    } = await axios.get(`https://primepass.zendesk.com/api/v2/help_center/pt-br/categories/${category_id}`);

    handleRedirectSearchArticle(article, category);
  };

  const getNameBold = (text: string) => {
    const n = text.toUpperCase();
    const q = searchText.toUpperCase();
    const x = n.indexOf(q);

    if (!q || x === -1) {
      return text;
    }
    const l = q.length;

    return (
      <>
        {text.substr(0, x)}
        <S.Bold>{text.substr(x, l)}</S.Bold>
        {text.substr(x + l)}
      </>
    );
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleNavigateHelp = () => {
    navigation.navigate('HelpDeskMenu');
  };

  return (
    <S.Container>
      <Dialog
        title="Ops, algo deu errado"
        message="Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
        visible={modalErrorVisible}
        error
        handleClose={() => setModalErrorVisible(!modalErrorVisible)}
      />
      <S.Title>Ficou alguma dúvida?</S.Title>
      <S.Subtitle>
        Você pode procurar pela resposta da
        sua dúvida na barra de pesquisa.
        Caso não encontre o que procura você pode acessar a
        {' '}
        <S.Link onPress={handleNavigateHelp}>Central de Ajuda</S.Link>
        .
      </S.Subtitle>

      <TextField
        leftSide={
          <SearchIcon width={16} heigth={16} />
        }
        rightSide={searchText !== '' && (
          <S.ClearButton
            onPress={() => {
              setSearchText('');
              setArticles([]);
            }}
          >
            <CloseFilledIcon width={16} heigth={16} />
          </S.ClearButton>
        )}
        placeholder="Pesquisar"
        value={searchText}
        onChangeText={handleSearch}
        onSubmitEditing={handleSearch}
        onFocus={() => setFocusSearchInput(true)}
        onBlur={() => setFocusSearchInput(false)}
      />

      {(focusSearchInput || articles.length > 0) && (
        <S.SearchContainer>
          {(searchText.length <= 0 && !searchLoading) && (
            <S.SearchContainerText>Digite algo para pesquisar</S.SearchContainerText>
          )}

          {(searchText.length > 2 && !searchLoading && articles.length <= 0) && (
            <S.SearchContainerText>Nenhum resultado encontrado</S.SearchContainerText>
          )}

          {searchLoading ? (
            <S.SearchContainerLoading>
              <ActivityIndicator animating size="small" color="#fff" />
            </S.SearchContainerLoading>
          ) : (
            articles.map((article) => (
              <S.TouchableOpacity onPress={() => handleRedirectSearch(article)}>
                <S.SearchContainerText key={article.id}>
                  {getNameBold(article.name)}
                </S.SearchContainerText>
              </S.TouchableOpacity>
            ))
          )}
        </S.SearchContainer>
      )}

      <S.TitleMedium>Dúvidas frequentes</S.TitleMedium>
      <S.List>
        {loading
          ? (
            <S.ContainerLoading>
              <ActivityIndicator animating size="large" color="#fff" />
            </S.ContainerLoading>
          )
          : lisCategories.slice(0, categoryLimit).map((category) => (
            <S.Session key={category.id} onPress={() => handleRedirectArticles(category)}>
              <S.TextSession>{category.name}</S.TextSession>
            </S.Session>
          ))}
      </S.List>
    </S.Container>

  );
};

export default Categories;
