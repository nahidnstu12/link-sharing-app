// fetchApi.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface FetchOptions extends RequestInit {
  token?: string;
  params?: Record<string, string>;
}

const errorHandler = (error: any) => {
   throw new Error(error.message || "Unknown error occurred");
};

const fetchApi = async <T = any>(
  url: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { token, params, ...restOptions } = options;

  // Set base URL
  const fullUrl = new URL(`${API_BASE_URL}${url}`);

  // Handle query parameters (if any)
  if (params) {
    Object.keys(params).forEach((key) =>
      fullUrl.searchParams.append(key, params[key])
    );
  }

  // Set headers
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(fullUrl.toString(), {
      headers,
      ...restOptions, // method, body, etc.
    });

    // If response is not OK, throw an error
    if (!response.ok) {
      const errorData = await response.json();
      // throw new Error(`Error: ${response.status} - ${errorData.message}`);
      throw new Error(`${errorData.message}`);
    }

    // If response is OK, parse and return the JSON data
    return (await response.json()) as T;
  } catch (error) {
    // Throw an error explicitly
    return errorHandler(error);
  }
};

export default fetchApi;
