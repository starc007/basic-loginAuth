import { AxiosRequestConfig } from "axios";
import { getFetch } from "./api-wrapper";
import * as Types from "./api-types";

const DATA_LIMIT = 500; //store in constant file or in env

export const getUsers = (
  params?: {
    page?: number;
  },
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse> => {
  return getFetch(
    `/api?page=${params?.page}&results=${DATA_LIMIT}&exc=login&seed=test`,
    undefined,
    config
  );
};
