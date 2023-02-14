import { FC } from "react";

export interface TableProps {
  children: React.ReactNode;
}

export const Table: FC<TableProps> = ({ children }) => (
  <table className="rounded_corners shadow">{children}</table>
);

export default Table;
