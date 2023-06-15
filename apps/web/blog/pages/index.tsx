import { Inter } from "@next/font/google";
import { Button } from "@ustagil/web-ui";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <span>HOME PAGE</span>
      <Button variant="contained" title="BASIC" />
    </div>
  );
}
