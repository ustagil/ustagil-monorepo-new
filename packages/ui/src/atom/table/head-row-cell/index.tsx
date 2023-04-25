import React, { FC } from "react";

export interface TableHeadRowCellProps {
  children: React.ReactNode;
}

export const TableHeadRowCell: FC<TableHeadRowCellProps> = ({ children }) => (
  <th className="px-3 py-2 ">
    {/* border rounded-md bg-clip-padding bg-primary-500 */}
    {/* border-l border-gray-500  first:rounded-tl last:rounded-tr first:border-l-0 */}
    {children}
  </th>
);

export default TableHeadRowCell;
