interface ArticleType {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: ProfileType;
}

interface FormInputArticleType {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
interface FavoritePayloadProps {
  slug: string;
  favorited: boolean;
}
interface CommentType {
  id: string;
  body: string;
  createdAt: string;
  author: ProfileType;
}
