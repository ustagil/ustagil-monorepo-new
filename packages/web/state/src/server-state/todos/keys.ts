import { createQueryKeys } from "@lukemorales/query-key-factory";

export const todos = createQueryKeys("todos", {
  all: null,
  detail: (userId: string) => [userId],
});
