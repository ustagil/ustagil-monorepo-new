import { Card, NextLink } from "@@/atom";
import { FC } from "react";

export interface DocumentationCardProps {
  title: string;
  desc: string;
  slug: string;
}

export const DocumentationCard: FC<DocumentationCardProps> = ({
  title,
  desc,
  slug,
}) => (
  <NextLink href={`/documentations/${slug}`}>
    <Card>
      <div className="border-b border-gray-500">
        <span className="text-lg font-semibold text-primary-400 dark:text-primary-100">
          {title}
        </span>
      </div>
      <div className="">
        <p>{desc}</p>
      </div>
    </Card>
  </NextLink>
);

export default DocumentationCard;
