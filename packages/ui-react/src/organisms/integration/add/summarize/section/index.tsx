import { useIntegrationEmailStore } from "@acme/state";
import { FC } from "react";
import { NextLink } from "../../../../../atoms/next-link";
import { Section } from "../../../../../atoms/section";
import { Button } from "../../../../../molecules/common/button";

export interface IntegrationAddSummarizeSectionProps {}

export const IntegrationAddSummarizeSection: FC<
  IntegrationAddSummarizeSectionProps
> = ({}) => {
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
