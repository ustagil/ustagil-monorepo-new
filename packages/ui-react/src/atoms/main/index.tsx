import { FC } from "react";

export interface MainProps {
  children: React.ReactNode;
  className?: string;
}

export const Main: FC<MainProps> = ({ children, className }) => (
  <main
    className={`transition duration-300 prose dark:prose-invert max-w-none prose-a:no-underline md:pt-[96px] min-h-screen bg-gray-100 dark:bg-gray-800 flex ${
      className ?? ""
    }`}
  >
    {children}
  </main>
);

export default Main;
