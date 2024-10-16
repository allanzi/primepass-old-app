import React, { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';

import { SITE } from '@env';
import { TypeArticle, Category, Props } from './types';
import Article from './Article';
import Articles from './Articles';
import Categories from './Categories';
import * as S from './styles';
import { useSetupQuery } from '../../hooks/graphql/hooks';

enum Steps {
  CATEGORIES = 'categories',
  ARTICLES = 'articles',
  ARTICLE = 'article',
}

const Faq: React.FC<Props> = ({ categoryLimit }) => {
  const [step, setStep] = useState(Steps.CATEGORIES);
  const [categorySelected, setCategorySelected] = useState({} as Category);
  const [articleSelected, setArticleSelected] = useState({} as TypeArticle);

  const [showQuestions, setShowQuestions] = useState(false);
  const { data: dataSetup } = useSetupQuery({
    variables: {
      setup_page: 'checkin',
    },
  });

  useEffect(() => {
    const setupQuestions = dataSetup?.setup_list?.setups?.filter((setup) => setup?.category?.name === 'faq');
    if (setupQuestions && setupQuestions?.length >= 1) {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        setShowQuestions(Boolean(setupQuestions[0]?.tag?.device[Platform.OS]));
      }
    }
  }, [dataSetup]);

  const handleRedirectCategories = () => {
    setStep(Steps.CATEGORIES);
  };

  const handleRedirectArticles = (category: Category) => {
    setCategorySelected(category);
    setStep(Steps.ARTICLES);
  };

  const handleRedirectArticle = (article: TypeArticle) => {
    setArticleSelected(article);
    setStep(Steps.ARTICLE);
  };

  const handleRedirectSearchArticle = (article: TypeArticle, category: Category) => {
    setArticleSelected(article);
    setCategorySelected(category);
    setStep(Steps.ARTICLE);
  };

  return (
    <>
      {showQuestions && (
        <>
          {step === Steps.CATEGORIES && (
            <Categories
              categoryLimit={categoryLimit}
              handleRedirectArticles={handleRedirectArticles}
              handleRedirectSearchArticle={handleRedirectSearchArticle}
            />
          )}
          {step === Steps.ARTICLES && (
            <Articles
              category={categorySelected}
              handleRedirectArticle={handleRedirectArticle}
              handleRedirectCategories={handleRedirectCategories}
            />
          )}
          {step === Steps.ARTICLE && (
            <Article
              articleSelected={articleSelected}
              category={categorySelected}
              handleRedirectArticle={handleRedirectArticle}
              handleRedirectArticles={handleRedirectArticles}
              handleRedirectCategories={handleRedirectCategories}
            />
          )}
        </>
      )}

      <S.ContainerChat>
        <S.Subtitle>
          Não encontrou a resposta para sua dúvida?
          {'\n'}
          Fale com nosso assistente virtual.
        </S.Subtitle>

        <S.Button
          disable={false}
          onPress={() => Linking.openURL(`${SITE}/?openChat=true`)}
          outline={false}
        >
          <S.ButtonText>
            Iniciar conversa
          </S.ButtonText>
        </S.Button>
      </S.ContainerChat>
    </>
  );
};

export default Faq;
