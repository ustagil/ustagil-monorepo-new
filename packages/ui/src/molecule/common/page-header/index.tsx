import { Section } from "@@/atom";
import { FC } from "react";

export interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader: FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <Section id="page-header">
      <h1 className="">{title}</h1>
      <p className="">{description}</p>
    </Section>
  );
};

export default PageHeader;
