import React, { FC } from "react";

export interface TableProps {
  children: React.ReactNode;
}

export const Table: FC<TableProps> = ({ children }) => (
  <table className="shadow rounded_corners">{children}</table>
);

export default Table;
