import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HTML from 'react-native-render-html';
import moment from 'moment';
import 'moment/locale/pt-br';

import { Props, TypeArticle } from './types';
import ArrowIcon from '../../../assets/img/arrow-right.svg';
import BackIcon from '../../../assets/img/back.svg';
import Dialog from '../../Dialog';
import Prime from '../../../assets/img/prime.png';
import * as S from './styles';

const Article: React.FC<Props> = ({
  articleSelected,
  category,
  handleRedirectArticle,
  handleRedirectArticles,
  handleRedirectCategories,
}) => {
  const [relatedArticles, setRelatedArticles] = useState([] as Array<TypeArticle>);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  const getRelatedArticles = async () => {
    try {
      const { data: { articles } } = await axios.get(
        `https://primepass.zendesk.com/api/v2/help_center/pt-br/categories/${category.id}/articles`,
      );

      if (articles) {
        setRelatedArticles(articles.filter((item: TypeArticle) => item.id !== articleSelected.id));
      }
    } catch (e) {
      setModalErrorVisible(!modalErrorVisible);
    }
  };

  useEffect(() => {
    getRelatedArticles();
  }, [articleSelected]);

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
        <S.Pressable onPress={() => handleRedirectArticles(category)}>
          <S.TextHeader>
            <S.BoldText>
              {category.name}
            </S.BoldText>
          </S.TextHeader>
        </S.Pressable>
        <ArrowIcon width="14" height="14" marginRight={4} marginLeft={4} />
        <S.TextHeader>
          <S.BoldText>
            {articleSelected.name}
          </S.BoldText>
        </S.TextHeader>
      </S.HeaderContainer>

      <S.Divider />

      <S.ContentTitle>
        <S.Row>
          <S.Pressable onPress={() => handleRedirectArticles(category)}>
            <BackIcon />
            <S.Title>{articleSelected.name}</S.Title>
          </S.Pressable>
        </S.Row>
        <S.Row marginTop={24}>
          <S.ContentIcon>
            <S.PartnerLogo
              source={Prime}
            />
          </S.ContentIcon>
          <S.ContentInfoArticle>
            <S.TextHeader>
              <S.BoldText>
                Equipe Primepass
              </S.BoldText>
            </S.TextHeader>
            <S.Text>
              {moment.utc(articleSelected.edited_at).fromNow() }
              {' '}
              - Atualizado
            </S.Text>
          </S.ContentInfoArticle>
        </S.Row>
      </S.ContentTitle>

      <S.Divider />
      <S.ContentHTML>
        <HTML
          source={{ html: articleSelected.body }}
          baseFontStyle={{
            lineHeight: 22,
            fontSize: 12,
            color: '#FFFFFF',
          }}
        />

      </S.ContentHTML>

      <S.Divider />

      <S.ContentArticles>
        <S.TextHeader>Artigos relacionados</S.TextHeader>
        <S.List>
          {relatedArticles.map((article) => (
            <>
              <S.Article onPress={() => handleRedirectArticle(article)}>
                <S.TitleArticle>{article.name}</S.TitleArticle>
              </S.Article>
            </>
          ))}

        </S.List>
      </S.ContentArticles>

    </S.Container>
  );
};

export default Article;
