import { AxiosRequestConfig } from "axios";
import { getFetch } from "./api-wrapper";
import * as Types from "./api-types";

export const getUsers = (
  params?: {
    page?: number;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<IUser[]>> => {
  return getFetch(`/api?results=${params?.page}`, params, config);
};
