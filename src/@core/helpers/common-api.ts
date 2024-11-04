// apiClient.ts

import fetchApi, { FetchOptions } from "../lib/fetch";

async function apiGet<T = any>(
  apiPath: string,
  options: FetchOptions = {}
): Promise<T> {
  return fetchApi<T>(apiPath, {
    ...options,
    method: "GET",
  });
}

async function apiPost<R = any, T = any>(
  apiPath: string,
  data?: R,
  options: FetchOptions = {}
): Promise<T> {
  return fetchApi<T>(apiPath, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
}

async function apiPut<R = any, T = any>(
  apiPath: string,
  data?: R,
  options: FetchOptions = {}
): Promise<T> {
  return fetchApi<T>(apiPath, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data),
  });
}

async function apiDelete<T = any>(
  apiPath: string,
  options: FetchOptions = {}
): Promise<T> {
  return fetchApi<T>(apiPath, {
    ...options,
    method: "DELETE",
  });
}

export { apiGet, apiPost, apiPut, apiDelete };
