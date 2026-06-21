import axiosInstance from "../api/api";
import type { AuthResponse } from "../types/auth";


export const AuthService = {
  register: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>('/auth/register', { username, email, password });
    return data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>('/auth/login', { email, password });
    return data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
  },

  checkAuth: async (): Promise<AuthResponse> => {
    const { data } = await axiosInstance.get<AuthResponse>('/auth/refresh');
    return data;
  }
};