import { FC } from "react";

export interface TableFooterRowProps {
  children: React.ReactNode;
}

export const TableFooterRow: FC<TableFooterRowProps> = ({ children }) => (
  <tr className="">{children}</tr>
);

export default TableFooterRow;
