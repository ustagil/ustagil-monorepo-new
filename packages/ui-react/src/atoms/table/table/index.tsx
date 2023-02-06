import { FC } from "react";
import styles from "./index.module.css";

export interface TableProps {
  children: React.ReactNode;
}

export const Table: FC<TableProps> = ({ children }) => (
  <table className={[styles.rounded_corners, "shadow"].join(" ")}>
    {children}
  </table>
);

export default Table;
