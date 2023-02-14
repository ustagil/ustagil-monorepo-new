import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

export interface SectionProps {
  children: React.ReactNode;
  bg?: "light" | "dark";
  id: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>["id"];
  className?: string;
}

export const Section: FC<SectionProps> = ({
  children,
  bg = "light",
  id,
  className = "",
}) => (
  <section
    id={id}
    key={id}
    className={`px-6 py-6 flex-1 ${
      bg === "dark" ? "bg-gray-50" : ""
    } ${className} `}
  >
    <div className="container mx-auto">{children}</div>
  </section>
);

export default Section;
