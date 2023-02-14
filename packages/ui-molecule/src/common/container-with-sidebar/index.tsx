import { FC } from "react";
import { SidebarCommon, SidebarCommonProps } from "../sidebar";

export interface ContainerWithSidebarProps {
  children: React.ReactNode;
  selectedPage: SidebarCommonProps["selectedPage"];
}

export const ContainerWithSidebar: FC<ContainerWithSidebarProps> = ({
  children,
  selectedPage,
}) => (
  <div className="flex flex-1">
    <SidebarCommon selectedPage={selectedPage} />
    <div className="flex-1">{children}</div>
  </div>
);

export default ContainerWithSidebar;
