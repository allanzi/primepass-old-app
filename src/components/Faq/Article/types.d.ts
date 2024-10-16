import { Category, TypeArticle } from '../types';

export { Category, TypeArticle } from '../types';

export interface Props {
  articleSelected: TypeArticle;
  category: Category;
  handleRedirectArticle: Function;
  handleRedirectArticles: Function;
  handleRedirectCategories: Function;
}
