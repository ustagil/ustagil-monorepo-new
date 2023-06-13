import { Grid, Section } from "@ui/atom";
import { DashboardCard } from "@ui/molecule";
import { FC } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DashboardSectionProps {}

export const DashboardSection: FC<DashboardSectionProps> = () => (
  <Section id="dashboard-section">
    <Grid>
      <DashboardCard point={24} title="Some Data" />
      <DashboardCard point={24} title="Some Data" />
      <DashboardCard point={24} title="Some Data" />
      <DashboardCard point={24} title="Some Data" />
      <DashboardCard point={24} title="Some Data" />
      <DashboardCard point={24} title="Some Data" />
      <DashboardCard point={24} title="Some Data" />
      <DashboardCard point={24} title="Some Data" />
      <DashboardCard point={24} title="Some Data" />
      <DashboardCard point={24} title="Some Data" />
    </Grid>
  </Section>
);

export default DashboardSection;
