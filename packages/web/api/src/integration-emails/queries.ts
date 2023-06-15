import { APIResponse, IntegrationEmailGetNewDto } from "@ustagil/typing";
import { axiosInstance } from "@ustagil/web-util";

// eslint-disable-next-line no-empty-pattern
export const integrationEmailsAddGet = async ({}: IntegrationEmailGetNewDto) =>
  (await axiosInstance.get<APIResponse<string>>(`/integration-emails`)).data;
