import { APIResponse, IntegrationEmailGetNewDto } from "@ustagil/typings";
import { axiosInstance } from "@ustagil/utils";

export const integrationEmailsAddGet = async ({}: IntegrationEmailGetNewDto) =>
  (await axiosInstance.get<APIResponse<string>>(`/integration-emails`)).data;
