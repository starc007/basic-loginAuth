export type UserFetchResponse = {
  results: IUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
};

// export type AppFetchRequestResponse<T> = AppFetchRequestResponseItem<T>;

export type FetchResponse = {
  data: UserFetchResponse;
};

export type KeyValuePairs<T = string | number | number[] | object[] | unknown> =
  Record<string, T> | FormData;
