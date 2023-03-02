import React, { FC } from "react";

export interface SidebarContainerProps {
  children: React.ReactNode;
}

export const SidebarContainer: FC<SidebarContainerProps> = ({ children }) => (
  <div className="hidden h-full bg-gray-300 border-r border-gray-600 dark:bg-gray-900 md:block">
    {children}
  </div>
);

export default SidebarContainer;
