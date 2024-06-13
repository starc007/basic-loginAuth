import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

import {
  // Login
  ILoginState,
  initialLoginState,
  createLoginSlice,

  // User
  IUserState,
  initialUserState,
  createUserSlice,
} from "./stores";

export type AppState = ILoginState & IUserState;

export const initialState = {
  ...initialLoginState,
  ...initialUserState,
};

/**
 * Create a combined store
 * which includes all the slices
 */
export const useAppStore = createWithEqualityFn<AppState>()(
  (...a) => ({
    ...createLoginSlice(...a),
    ...createUserSlice(...a),
  }),
  shallow
);
