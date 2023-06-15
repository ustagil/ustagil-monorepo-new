import React, { FC } from "react";

export interface TableHeadProps {
  children: React.ReactNode;
}

export const TableHead: FC<TableHeadProps> = ({ children }) => (
  <thead className="border-b border-gray-600 shadow dark:bg-primary-800 bg-primary-300">
    {children}
  </thead>
);

export default TableHead;
