import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Props } from './types';
import ArrowIcon from '../../../assets/img/arrow-right.svg';
import BackIcon from '../../../assets/img/back.svg';
import Dialog from '../../Dialog';
import * as S from './styles';

const Articles: React.FC<Props> = (
  {
    category,
    handleRedirectArticle,
    handleRedirectCategories,
  },
) => {
  const [listArticles, setListArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  const getArticles = async () => {
    try {
      setLoading(true);
      const { data: { articles } } = await axios.get(
        `https://primepass.zendesk.com/api/v2/help_center/pt-br/categories/${category.id}/articles`,
      );

      if (articles) {
        setListArticles(articles);
      }
    } catch (e) {
      setModalErrorVisible(!modalErrorVisible);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <S.Container>
      <Dialog
        title="Ops, algo deu errado"
        message="Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
        visible={modalErrorVisible}
        error
        handleClose={() => setModalErrorVisible(!modalErrorVisible)}
      />
      <S.HeaderContainer>
        <S.Pressable onPress={handleRedirectCategories}>
          <S.TextHeader>Perguntas frequentes</S.TextHeader>
        </S.Pressable>
        <ArrowIcon width="14" height="14" marginRight={4} marginLeft={4} />
        <S.TextHeader>
          <S.BoldText>
            {category.name}
          </S.BoldText>
        </S.TextHeader>
      </S.HeaderContainer>

      <S.Divider />

      <S.ContentTitle>
        <S.Row>
          <S.Pressable onPress={handleRedirectCategories}>
            <BackIcon />
            <S.Title>{category.name}</S.Title>
          </S.Pressable>
        </S.Row>
        <S.Subtitle>
          Artigos nessa seção
        </S.Subtitle>
      </S.ContentTitle>

      <S.Divider />

      {loading
        ? (
          <S.ContainerLoading>
            <ActivityIndicator animating size="large" color="#fff" />
          </S.ContainerLoading>
        )
        : (
          <FlatList
            data={listArticles}
            keyExtractor={(article) => article.id}
            renderItem={({ item }) => (
              <>
                <S.Article onPress={() => handleRedirectArticle(item)}>
                  <S.TitleArticle>{item.name}</S.TitleArticle>
                  <ArrowIcon width="14" height="14" />
                </S.Article>
                <S.Divider />
              </>
            )}
          />
        )}
    </S.Container>
  );
};

export default Articles;
