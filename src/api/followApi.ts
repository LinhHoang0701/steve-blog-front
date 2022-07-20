import axiosClient from './axiosClient';

const followApi = {
  followOne: (username: string): Promise<ProfileType> => {
    return axiosClient.post(`/profiles/${username}/follow`);
  },
  unFollowOne: (username: string): Promise<ProfileType> => {
    return axiosClient.delete(`/profiles/${username}/follow`);
  },
};

export default followApi;
