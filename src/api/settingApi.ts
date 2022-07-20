import axiosClient from './axiosClient';

const settingApi = {
  getCurrentUser: (): Promise<any> => {
    return axiosClient.get(`/user`);
  },
  updateCurrentUser: (data: { user: any }): Promise<any> => {
    return axiosClient.put(`/user`, data);
  },
};

export default settingApi;
