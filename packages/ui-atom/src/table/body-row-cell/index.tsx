import React, { FC } from "react";

export interface TableBodyRowCellProps {
  children: React.ReactNode;
}

export const TableBodyRowCell: FC<TableBodyRowCellProps> = ({ children }) => (
  <td className="px-3 py-2">{children}</td>
);

export default TableBodyRowCell;
