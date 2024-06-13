import type { StateCreator } from "zustand";

import type { AppState } from "../mainStore";

export interface ILoginState {
  user: {
    email?: string;
    walletAddress?: string;
    loggedInVia?: "email" | "wallet";
  } | null;
  isLoggedIn: boolean;
  loginWithWallet: (walletAddress: string) => void;
  loginWithEmail: (email: string, password: string) => void;
}

export const initialLoginState = {
  user: null,
  isLoggedIn: false,
};

export const createLoginSlice: StateCreator<AppState, [], [], ILoginState> = (
  set,
  get
) => ({
  ...initialLoginState,
  loginWithEmail: (email, password) => {},
  loginWithWallet(walletAddress) {},
});
