import type { StateCreator } from "zustand";

import type { AppState } from "../mainStore";

export interface IUserState {
  allUsers: IUser[];
  getAllUsers: (page?: number) => void;
}

export const initialUserState = {
  allUsers: [],
};

export const createUserSlice: StateCreator<AppState, [], [], IUserState> = (
  set,
  get
) => ({
  ...initialUserState,
  getAllUsers: (page) => {},
});
