import { Card } from "@ustagil/ui-atom";
import Image from "next/image";
import { FC } from "react";

export interface IntegrationAddSelectCardProps {
  appId: string;
  appName: string;
  appIcon: string;
  appIconAlt: string;
  onClick: (appId: string) => void;
}

export const IntegrationAddSelectCard: FC<IntegrationAddSelectCardProps> = ({
  appIcon,
  appIconAlt,
  appId,
  appName,
  onClick,
}) => (
  <Card onClick={() => onClick(appId)}>
    <div className="flex text-left">
      <div className="not-prose">
        <Image src={appIcon} width={24} height={24} alt={appIconAlt} />
      </div>
      <div>
        <span className="flex-1 ml-2">{appName}</span>
      </div>
    </div>
  </Card>
);

export default IntegrationAddSelectCard;
