import { FC } from "react";
import { Grid, Section } from "../../../atoms";
import { DashboardCard } from "../../../molecules";

export interface DashboardSectionProps {}

export const DashboardSection: FC<DashboardSectionProps> = ({}) => (
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
