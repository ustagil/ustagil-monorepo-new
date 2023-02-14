import { FC } from "react";

export interface TableBodyRowProps {
  children: React.ReactNode;
}

export const TableBodyRow: FC<TableBodyRowProps> = ({ children }) => (
  <tr className="dark:hover:bg-gray-700 hover:bg-gray-300">{children}</tr>
);

export default TableBodyRow;
