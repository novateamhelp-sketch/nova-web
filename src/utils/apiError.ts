import axios from "axios";

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Request failed"
) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { error?: string; message?: string }
      | undefined;
    return data?.error || data?.message || error.message || fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
};
