import React, { FC } from "react";

export interface TableFooterRowCellProps {
  children: React.ReactNode;
}

export const TableFooterRowCell: FC<TableFooterRowCellProps> = ({
  children,
}) => <th className="px-3 py-2">{children}</th>;

export default TableFooterRowCell;
