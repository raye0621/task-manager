import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginApi } from '../http/api';

interface AuthState {
  token: string | null;
  isLogin: () => boolean;
  // TODO : 知道 return () => void 和 return Promise<void> 的區別
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

export const authStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isLogin: () => {
        return Boolean(get().token);
      },
      handleLogin: async (email: string, password: string) => {
        try {
          // userInfo 之後要存要存在這
          const res = await loginApi(email, password);
          console.log('[authStore] --- 11 res', res);
          const { token } = res;
          console.log('[authStore] --- 22 token', token);
          if (token) {
            set({ token });
          } else {
          }
        } catch (err) {
          console.error('[authStore] --- 99 err', err);
          // set({ error: err.message });
        }
      },
      handleLogout: async () => {
        set({ token: null });
        console.log('[authStore] --- 99 localStorage.removeItem(token)');
      }
    }),
    {
      name: 'UserStore', // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
