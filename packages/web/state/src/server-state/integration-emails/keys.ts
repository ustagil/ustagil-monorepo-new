import { createQueryKeys } from "@lukemorales/query-key-factory";

export const integrationEmails = createQueryKeys("integration-emails", {
  all: null,
  detail: (userId: string) => [userId],
});
