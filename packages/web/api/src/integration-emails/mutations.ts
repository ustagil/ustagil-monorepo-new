import {
  IntegrationEmailCheckDto,
  IntegrationEmailCheckIntegrationDto,
} from "@ustagil/typing";
import { axiosInstance, sleep } from "@ustagil/util";

export const integrationEmailsCheck = async ({
  query,
  body,
}: IntegrationEmailCheckDto) => {
  await sleep(500);
  return (
    await axiosInstance.post(
      `/integration-emails?${new URLSearchParams(query).toString()}`,
      body
    )
  ).status;
};

export const integrationEmailsCheckIntegration = async ({
  query,
  body,
}: IntegrationEmailCheckIntegrationDto) => {
  await sleep(500);
  return (
    await axiosInstance.post(
      `/integration-emails?${new URLSearchParams(query).toString()}`,
      body
    )
  ).status;
};
