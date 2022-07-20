import axiosClient from './axiosClient';

const articlesApi = {
  getAll: (
    offsetParam?: number,
    limitParam?: number,
    tagParam?: string,
    authorNameParam?: string,
    favoritedParam?: string
  ): Promise<ArticleType[]> => {
    const axiosConfig = {
      params: {
        offset: offsetParam,
        limit: limitParam,
        tag: tagParam,
        author: authorNameParam,
        favorited: favoritedParam,
      },
    };
    return axiosClient.get('/articles', axiosConfig);
  },
  getAllByFeed: (
    offsetParam?: number,
    limitParam?: number,
    tagParam?: string,
    authorNameParam?: string
  ): Promise<ArticleType[]> => {
    const axiosConfig = {
      params: {
        offset: offsetParam,
        limit: limitParam,
        tag: tagParam,
        author: authorNameParam,
      },
    };
    return axiosClient.get('/articles/feed', axiosConfig);
  },
  addOne: (data: { article: FormInputArticleType }): Promise<FormInputArticleType> => {
    return axiosClient.post('/articles', data);
  },
  favoriteArticle: (slug: string): Promise<ArticleType> => {
    return axiosClient.post(`/articles/${slug}/favorite`);
  },
  unfavoriteArticle: (slug: string): Promise<ArticleType> => {
    return axiosClient.delete(`/articles/${slug}/favorite`);
  },
};

export default articlesApi;
