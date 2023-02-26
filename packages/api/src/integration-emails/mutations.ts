import {
  IntegrationEmailCheckDto,
  IntegrationEmailCheckIntegrationDto,
} from "@ustagil/typing";
import { axiosInstance, sleep } from "@ustagil/util";
import { stringify } from "querystring";

export const integrationEmailsCheck = async ({
  query,
  body,
}: IntegrationEmailCheckDto) => {
  await sleep(500);
  return (
    await axiosInstance.post(`/integration-emails?${stringify(query)}`, body)
  ).status;
};

export const integrationEmailsCheckIntegration = async ({
  query,
  body,
}: IntegrationEmailCheckIntegrationDto) => {
  await sleep(500);
  return (
    await axiosInstance.post(`/integration-emails?${stringify(query)}`, body)
  ).status;
};
