import { Card } from "@ui/atom";
import { FC, ReactNode } from "react";

export interface InvoicesDataCardProps {
  title: string;
  point: string;
  icon: ReactNode;
}

export const InvoicesDataCard: FC<InvoicesDataCardProps> = ({
  icon,
  point,
  title,
}) => (
  <Card>
    <div className="">{icon}</div>
    <div className="mt-3">
      <span className="">{title}</span>
    </div>
    <div className="mt-1">
      <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        {point}
      </span>
    </div>
  </Card>
);

export default InvoicesDataCard;
