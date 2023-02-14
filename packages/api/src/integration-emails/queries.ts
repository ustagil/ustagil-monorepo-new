import { APIResponse, IntegrationEmailGetNewDto } from "@ustagil/typing";
import { axiosInstance } from "@ustagil/utils";

export const integrationEmailsAddGet = async ({}: IntegrationEmailGetNewDto) =>
  (await axiosInstance.get<APIResponse<string>>(`/integration-emails`)).data;
