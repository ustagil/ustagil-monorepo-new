import { FC } from "react";
import { Grid } from "../../../../atoms/grid";
import { Section } from "../../../../atoms/section";
import { DocumentationCard } from "../../../../molecules/documentation/card";

export interface DocumentationsSectionProps {}

export const DocumentationsSection: FC<DocumentationsSectionProps> = ({}) => (
  <Section id="documentation-section">
    <Grid>
      <DocumentationCard
        title="How to integrate email to Slack ?"
        slug="integrate-slack"
        desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus
        iure dignissimos vel repudiandae mollitia excepturi nam? Ipsam, dolorem!
        Eaque dignissimos facere nesciunt, culpa placeat accusantium velit
        quaerat? Porro, explicabo aspernatur!"
      />
      <DocumentationCard
        title="How to integrate email to Discord ?"
        slug="integrate-discord"
        desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus
        iure dignissimos vel repudiandae mollitia excepturi nam? Ipsam, dolorem!
        Eaque dignissimos facere nesciunt, culpa placeat accusantium velit
        quaerat? Porro, explicabo aspernatur!"
      />
      <DocumentationCard
        title="How to integrate email to Lorem ?"
        slug="integrate-lorem"
        desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus
        iure dignissimos vel repudiandae mollitia excepturi nam? Ipsam, dolorem!
        Eaque dignissimos facere nesciunt, culpa placeat accusantium velit
        quaerat? Porro, explicabo aspernatur!"
      />
      <DocumentationCard
        title="How to integrate email to Lorem ?"
        slug="integrate-lorem"
        desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus
        iure dignissimos vel repudiandae mollitia excepturi nam? Ipsam, dolorem!
        Eaque dignissimos facere nesciunt, culpa placeat accusantium velit
        quaerat? Porro, explicabo aspernatur!"
      />
      <DocumentationCard
        title="How to integrate email to Lorem ?"
        slug="integrate-lorem"
        desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus
        iure dignissimos vel repudiandae mollitia excepturi nam? Ipsam, dolorem!
        Eaque dignissimos facere nesciunt, culpa placeat accusantium velit
        quaerat? Porro, explicabo aspernatur!"
      />
    </Grid>
  </Section>
);

export default DocumentationsSection;
