import { FC } from "react";

export interface SidebarListProps {
  children: React.ReactNode;
}

export const SidebarList: FC<SidebarListProps> = ({ children }) => (
  <div className="">{children}</div>
);

export default SidebarList;
