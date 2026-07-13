import { create } from "zustand";

interface AuthState {
  user: null | { id: number; email: string };
  token: string | null;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });

      // Later: replace with API call
      // const res = await client.post("/auth/login", { email, password });

      const fakeToken = "demo-token";
      const fakeUser = { id: 1, email };

      set({
        user: fakeUser,
        token: fakeToken,
        loading: false,
      });
    } catch (err: any) {
      set({ error: "Login failed", loading: false });
    }
  },

  register: async (email, password) => {
    try {
      set({ loading: true, error: null });

      // Later: replace with API call
      // await client.post("/auth/register", { email, password });

      set({ loading: false });
    } catch (err: any) {
      set({ error: "Registration failed", loading: false });
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
    });
  },
}));