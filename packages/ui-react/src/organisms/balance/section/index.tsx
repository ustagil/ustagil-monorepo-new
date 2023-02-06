import { FC } from "react";
import { Card, Grid, Section } from "../../../atoms";

export interface BalanceSectionProps {}

export const BalanceSection: FC<BalanceSectionProps> = ({}) => (
  <Section id="balance-section">
    <Grid>
      <Card>
        <div className="">
          <span>Lorem</span>
        </div>
        <div className="">
          <span>132135132</span>
        </div>
      </Card>
    </Grid>
  </Section>
);

export default BalanceSection;
