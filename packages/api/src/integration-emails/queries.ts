import { APIResponse, IntegrationEmailGetNewDto } from "@acme/typings";
import { axiosInstance } from "@acme/utils";

export const integrationEmailsAddGet = async ({}: IntegrationEmailGetNewDto) =>
  (await axiosInstance.get<APIResponse<string>>(`/integration-emails`)).data;
