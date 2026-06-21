import { create } from 'zustand';
import { AuthService } from '../services/auth.service';
import { toast } from 'react-hot-toast';
import type { UserDto } from '../types/auth';

interface AuthState {
  user: UserDto | null;
  isAuth: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  registerUser: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthentication: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  isLoading: true, // Boshida tekshiruv ketayotgan payt uchun

  login: async (email, password) => {
    try {
      const data = await AuthService.login(email, password);
      localStorage.setItem('accessToken', data?.user?.accessToken);
      set({ user: data.user.dto, isAuth: true });
      toast.success("Tizimga muvaffaqiyatli kirdingiz! 🚀");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Login yoki parol xato!";
      toast.error(msg);
      throw error;
    }
  },

  registerUser: async (username, email, password) => {
    try {
      const data = await AuthService.register(username, email, password);
      localStorage.setItem('accessToken', data.user.accessToken);
      set({ user: data.user.dto, isAuth: true });
      toast.success("Ro'yxatdan muvaffaqiyatli o'tdingiz! 🎉");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Xatolik yuz berdi.";
      toast.error(msg);
      throw error;
    }
  },

  logout: async () => {
    try {
      await AuthService.logout();
    } catch (e) {
      console.error("Logout error on server side");
    } finally {
      localStorage.removeItem('accessToken');
      set({ user: null, isAuth: false });
      toast.success("Tizimdan chiqildi.");
    }
  },

  checkAuthentication: async () => {
    try {
      const data = await AuthService.checkAuth();
      localStorage.setItem('accessToken', data.user.accessToken);
      set({ user: data.user.dto, isAuth: true });
    } catch {
      set({ user: null, isAuth: false });
    } finally {
      set({ isLoading: false });
    }
  }
}));