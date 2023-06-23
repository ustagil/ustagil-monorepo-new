import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { todos } from "./todos";

export * from "./auth";
export * from "./todos";

export const queries = mergeQueryKeys(todos);
