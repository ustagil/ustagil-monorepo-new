import React, { FC } from "react";

export interface TableHeadRowProps {
  children: React.ReactNode;
}

export const TableHeadRow: FC<TableHeadRowProps> = ({ children }) => (
  <tr className="">{children}</tr>
);

export default TableHeadRow;
