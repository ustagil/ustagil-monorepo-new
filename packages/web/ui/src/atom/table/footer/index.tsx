import React, { FC } from "react";

export interface TableFooterProps {
  children: React.ReactNode;
}

export const TableFooter: FC<TableFooterProps> = ({ children }) => (
  <tfoot className="border-t border-gray-600 bg-primary-500">{children}</tfoot>
);

export default TableFooter;
