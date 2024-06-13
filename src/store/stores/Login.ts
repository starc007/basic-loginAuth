import type { StateCreator } from "zustand";

import type { AppState } from "../mainStore";

// Simulating a user cred
const USER_CRED = {
  email: "saurabh",
  password: "saurabh",
};

export interface ILoginState {
  user: {
    email?: string;
    walletAddress?: string;
    loggedInVia?: "email" | "wallet";
  } | null;
  isLoggedIn: boolean;
  loginWithWallet: (walletAddress: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<boolean>;
  checkSession: () => Promise<void>;
  logout: () => void;
}

export const initialLoginState = {
  user: null,
  isLoggedIn: false,
};

export const createLoginSlice: StateCreator<AppState, [], [], ILoginState> = (
  set
) => ({
  ...initialLoginState,
  loginWithEmail: async (email, password) => {
    if (email === USER_CRED.email && password === USER_CRED.password) {
      // Simulating a delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      set({
        user: {
          email,
          loggedInVia: "email",
        },
        isLoggedIn: true,
      });
      localStorage.setItem("user:isLoggedIn", "true");
      localStorage.setItem("user:email", email);
      return true;
    }
    return false;
  },
  loginWithWallet: async (walletAddress) => {
    // Simulating a delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    set({
      user: {
        walletAddress,
        loggedInVia: "wallet",
      },
      isLoggedIn: true,
    });
    localStorage.setItem("user:isLoggedIn", "true");
    localStorage.setItem("user:walletAddress", walletAddress);
  },
  checkSession: async () => {
    const isLoggedIn = localStorage.getItem("user:isLoggedIn");
    if (isLoggedIn === "true") {
      // Simulating a delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      set({ isLoggedIn: true });
    }
  },
  logout: () => {
    set({ user: null, isLoggedIn: false });
    localStorage.removeItem("user:isLoggedIn");
    localStorage.removeItem("user:email");
    localStorage.removeItem("user:walletAddress");
  },
});
