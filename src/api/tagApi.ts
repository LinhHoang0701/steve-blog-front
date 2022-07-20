import axiosClient from './axiosClient';

const tagApi = {
  getAll: (): Promise<string[]> => {
    return axiosClient.get('/tags');
  },
};

export default tagApi;
