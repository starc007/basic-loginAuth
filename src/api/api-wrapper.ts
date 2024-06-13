/* eslint-disable no-useless-catch */
import axios, { AxiosRequestConfig } from "axios";
import { DEFAULT_API_CONFIG } from "./api-config";
import * as Types from "./api-types";

export const API = axios.create({
  baseURL: DEFAULT_API_CONFIG.url,
  timeout: DEFAULT_API_CONFIG.timeout,
});

export const getFetch = async <T>(
  url: string,
  params?: Types.KeyValuePairs,
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<T>> => {
  // The getFetch function is an async function that takes a URL, params, and config as arguments.
  // It returns a promise of type FetchResponse<T>.
  // The function uses the API.get method to make a GET request to the given URL.
  // It passes the params and config arguments to the API.get method.
  // If the request is successful, the function returns the data property of the response.
  // If the request fails, the function throws an error.
  try {
    const response = await API.get<Types.AppFetchRequestResponse<T>>(url, {
      params,
      ...config,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};

export const postFetch = async <T>(
  url: string,
  params?: Types.KeyValuePairs,
  config?: AxiosRequestConfig
): Promise<Types.FetchResponse<T>> => {
  try {
    const response = await API.post<Types.AppFetchRequestResponse<T>>(
      url,
      params,
      config
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};
