import api from "./api";
import type { ApiResponse, ContactPayload } from "../types/api.types";

export const submitContact = async (payload: ContactPayload) => {
  const { data } = await api.post<
    ApiResponse<{ message: string; leadId?: string }>
  >("/public/contact", payload);
  return data.data;
};
