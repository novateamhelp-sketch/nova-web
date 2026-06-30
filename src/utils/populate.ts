import type { RefDoc } from "../types/api.types";

export const isRefDoc = (value: string | RefDoc): value is RefDoc =>
  typeof value === "object" && value !== null && "_id" in value;

export const getRefSlug = (value: string | RefDoc) =>
  isRefDoc(value) ? value.slug : "";

export const getRefName = (value: string | RefDoc) =>
  isRefDoc(value) ? value.name : "";
