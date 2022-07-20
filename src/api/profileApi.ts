import axiosClient from './axiosClient';

export const profileApi = {
  getProfileByUsername: (username: string): Promise<ProfileType> => {
    return axiosClient.get(`/profiles/${username}`);
  },
};
