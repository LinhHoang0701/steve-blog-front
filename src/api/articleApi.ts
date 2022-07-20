import axiosClient from './axiosClient';

const articleApi = {
  getOne: (slug: string): Promise<ArticleType> => {
    return axiosClient.get(`/articles/${slug}`);
  },
  deleteOne: (slug: string): Promise<ArticleType> => {
    return axiosClient.delete(`/articles/${slug}`);
  },
  updateOne: (slug: string, data: FormInputArticleType): Promise<ArticleType> => {
    return axiosClient.put(`/articles/${slug}`, data);
  },
  getCommentApi: (slug: string): Promise<CommentType> => {
    return axiosClient.get(`/articles/${slug}/comments`);
  },
  createCommentApi: (slug: string, data: string): Promise<CommentType> => {
    return axiosClient.post(`/articles/${slug}/comments`, { comment: { body: data } });
  },
  deleteCommentApi: (slug: string, id: string) => {
    return axiosClient.delete(`/articles/${slug}/comments/${id}`);
  },
};

export default articleApi;
