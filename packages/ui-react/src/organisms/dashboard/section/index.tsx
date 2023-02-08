import { FC } from "react";
import { Grid } from "../../../atoms/grid";
import { Section } from "../../../atoms/section";
import { DashboardCard } from "../../../molecules/dashboard/card";

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
