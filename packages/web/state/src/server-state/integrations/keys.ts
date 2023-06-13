import { createQueryKeys } from "@lukemorales/query-key-factory";

export const integrations = createQueryKeys("integrations", {
  all: null,
  detail: (userId: string) => [userId],
});
