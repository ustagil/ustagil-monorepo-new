import React, { FC } from "react";

export interface TableBodyProps {
  children: React.ReactNode;
}

export const TableBody: FC<TableBodyProps> = ({ children }) => (
  <tbody className="">{children}</tbody>
);

export default TableBody;
