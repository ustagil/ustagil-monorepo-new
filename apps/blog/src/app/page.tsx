import { Inter } from "@next/font/google";
import { Btn } from "./Button";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <Btn />
    </main>
  );
}
