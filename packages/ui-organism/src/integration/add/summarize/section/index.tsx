import { useIntegrationEmailStore } from "@ustagil/state";
import { NextLink, Section } from "@ustagil/ui-atom";
import { Button } from "@ustagil/ui-molecule";
import { FC } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IntegrationAddSummarizeSectionProps {}

export const IntegrationAddSummarizeSection: FC<
  IntegrationAddSummarizeSectionProps
> = () => {
  const { integrationEmail, selectedApp } = useIntegrationEmailStore(
    (state) => ({
      integrationEmail: state.integrationEmail,
      selectedApp: state.selectedApp,
    })
  );

  return (
    <Section id="integration-add-summarize-section">
      <div>
        <span>Integration Email: {integrationEmail}</span>
      </div>
      <div>
        <span>Integration App: {selectedApp}</span>
      </div>
      <div className="">
        <NextLink href="/integrations" legacyBehavior>
          <Button variant="outlined" title="Done" />
        </NextLink>
      </div>
    </Section>
  );
};

export default IntegrationAddSummarizeSection;
