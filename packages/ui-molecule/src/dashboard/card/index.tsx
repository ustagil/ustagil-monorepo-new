import { Card } from "@ustagil/ui-atom";
import { FC } from "react";

export interface DashboardCardProps {
  title: string;
  point: number;
}

export const DashboardCard: FC<DashboardCardProps> = ({ point, title }) => (
  <Card>
    <div>
      <span>{title}</span>
    </div>
    <div>
      <span>{point}</span>
    </div>
  </Card>
);

export default DashboardCard;
