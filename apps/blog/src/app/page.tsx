"use client";

import { Inter } from "@next/font/google";
import { Button } from "ui-react";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <Button
        label="AAADDDSSS"
        onClick={() => {
          alert("asdasdasd");
        }}
      />
    </main>
  );
}
