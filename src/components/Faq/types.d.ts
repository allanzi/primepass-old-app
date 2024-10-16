export interface TypeArticle {
  id: number;
  section_id: number;
  name: string;
  body: string;
  edited_at: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Props {
  categoryLimit: number;
}

export const enum Steps {
  CATEGORIES = 'categories',
  ARTICLES = 'articles',
  ARTICLE = 'article',
}
