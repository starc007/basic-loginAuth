import type { StateCreator } from "zustand";

import type { AppState } from "../mainStore";
import { getUsers } from "@/api";

export interface IUserState {
  allUsers: IUser[];
  getAllUsers: (page?: number, signal?: AbortSignal) => Promise<void>;
}

export const initialUserState = {
  allUsers: [],
};

export const createUserSlice: StateCreator<AppState, [], [], IUserState> = (
  set,
  get
) => ({
  ...initialUserState,
  getAllUsers: async (page, signal) => {
    try {
      const res = await getUsers({ page }, { signal });
      console.log("Response from getAllUsers: ", res);
    } catch (error) {
      console.log("Error from getAllUsers: ", error);
    }
  },
});
