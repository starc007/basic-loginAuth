import type { StateCreator } from "zustand";

import type { AppState } from "../mainStore";
import { getUsers } from "@/api";

export interface IUserState {
  allUsers: IUser[];
  filteredUsers: IUser[];
  totalUserPages: number;
  getAllUsers: (page?: number, signal?: AbortSignal) => Promise<void>;
  setFilteredUsers: (users: IUser[], pages: number) => void;
}

export const initialUserState = {
  allUsers: [],
  totalUserPages: 0,
  filteredUsers: [],
};

export const createUserSlice: StateCreator<AppState, [], [], IUserState> = (
  set
) => ({
  ...initialUserState,
  getAllUsers: async (page, signal) => {
    try {
      const res = await getUsers({ page }, { signal });
      if (res.data.results.length > 0)
        set({
          allUsers: res.data.results,
          totalUserPages: Math.ceil(res.data.results.length / 10),
          filteredUsers: res.data.results.slice(0, 10),
        });
    } catch (error) {
      console.log("Error from getAllUsers: ", error);
    }
  },
  setFilteredUsers: (users, pages) => {
    set({ filteredUsers: users, totalUserPages: Math.ceil(pages) });
  },
});
