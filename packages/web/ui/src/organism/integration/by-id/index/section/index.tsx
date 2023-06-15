import { NextLink, Section } from "@ui/atom";
import { Button } from "@ui/molecule";
import { useIntegrationsDelete, useIntegrationsGet } from "@ustagil/web-state";
import { useRouter } from "next/router";
import { FC } from "react";

export interface IntegrationByIdSectionProps {
  id: string;
}

export const IntegrationByIdSection: FC<IntegrationByIdSectionProps> = ({
  id,
}) => {
  const router = useRouter();
  const { data, isSuccess } = useIntegrationsGet({
    variables: { params: { id }, query: {} },
  });

  const integrationDeleteMutation = useIntegrationsDelete({
    onSuccess: () => router.push("/integrations"),
    onError: () => router.push("/integrations"),
  });

  return (
    <Section id="integration-by-id-section">
      {isSuccess && (
        <div className="">
          <div className="flex justify-end gap-4">
            <NextLink href={`/integrations/${id}/edit`} legacyBehavior>
              <Button title="Edit" variant="outlined" />
            </NextLink>
            <Button
              title="Delete"
              variant="outlined"
              onClick={() =>
                integrationDeleteMutation.mutate({ params: { id } })
              }
            />
          </div>

          <div className="">
            <span>App: </span>
            <span>{data.datas.app}</span>
          </div>
          <div className="">
            <span>Email: </span>
            <span>{data.datas.email}</span>
          </div>
          <div className="">
            <span>Error Message: </span>
            <span>{data.datas.errorMessage}</span>
          </div>
          <div className="">
            <span>Id: </span>
            <span>{data.datas.id}</span>
          </div>
          <div className="">
            <span>Last Sent Message: </span>
            <span>{data.datas.lastSentMessage}</span>
          </div>
          <div className="">
            <span>Name: </span>
            <span>{data.datas.name}</span>
          </div>
          <div className="">
            <span>Status: </span>
            <span>{data.datas.status}</span>
          </div>
        </div>
      )}
    </Section>
  );
};

export default IntegrationByIdSection;
