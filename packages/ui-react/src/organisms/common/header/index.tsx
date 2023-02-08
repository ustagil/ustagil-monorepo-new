import { useTheme } from "next-themes";
import Image from "next/image";
import { FC } from "react";
import { BsFillGearFill, BsMoon, BsMoonFill } from "react-icons/bs";
import { NextLink } from "../../../atoms/next-link";
import { Button } from "../../../molecules/common/button";

export interface CommonHeaderProps {}

export const CommonHeader: FC<CommonHeaderProps> = () => {
  const { setTheme } = useTheme();

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-50 hidden w-full h-24 bg-gray-400 border-b border-gray-500 shadow-sm md:block dark:bg-background lg:block">
        <div className="container flex items-center justify-between h-full px-6 mx-auto">
          <div className="rounded focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-opacity-75">
            <NextLink href="/" className="focus:outline-none">
              <Image
                src="https://via.placeholder.com/200x50.webp?text=Logo+Email+To"
                width={200}
                height={50}
                alt="asdads"
              />
            </NextLink>
          </div>
          <div className="grid grid-flow-col grid-rows-1 gap-3">
            <Button
              variant="contained-icon"
              icon={<BsMoon />}
              onClick={() => setTheme("dark")}
            />
            <Button
              variant="contained-icon"
              icon={<BsMoonFill />}
              onClick={() => setTheme("light")}
            />
            <Button
              variant="contained-icon"
              icon={<BsFillGearFill />}
              onClick={() => {
                setTheme("system");
              }}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default CommonHeader;
