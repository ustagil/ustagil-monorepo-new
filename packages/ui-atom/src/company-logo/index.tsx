import { FC } from "react";
import { NextLink } from "../next-link";

export interface CompanyLogoProps {}

export const CompanyLogo: FC<CompanyLogoProps> = () => (
  <div className="rounded focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-opacity-75">
    <NextLink href="/" className="focus:outline-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="223"
        height="58.412"
        viewBox="0 0 323 58.412"
      >
        <g id="header-logo" transform="translate(0.079 -5.222)">
          <text
            id="krediliev.com"
            transform="translate(95.921 46.222)"
            fill="#262626"
            fontSize="33"
            fontFamily="Poppins-SemiBold, Poppins"
            fontWeight="600"
          >
            <tspan x="0" y="0">
              krediliev.
            </tspan>
            <tspan y="0" fontFamily="Poppins-Regular, Poppins" fontWeight="400">
              com
            </tspan>
          </text>
          <g id="_01" data-name="01" transform="translate(-0.079 5.222)">
            <path
              id="Path_18910"
              data-name="Path 18910"
              d="M271.193,198.267l-26.9,26.9-11.115-11.115-9.552,9.552,20.668,20.667,36.453-36.45Z"
              transform="translate(-196.724 -185.858)"
              fill="#6c46b9"
            />
            <path
              id="Path_18911"
              data-name="Path 18911"
              d="M206.532,173.568l-16.462,16.46v-5.152H181.05v14.173l-10.971,10.97,9.554,9.553,26.9-26.9,11.114,11.114,9.552-9.552Z"
              transform="translate(-170.079 -173.568)"
              fill="#262626"
            />
          </g>
        </g>
      </svg>
    </NextLink>
  </div>
);

export default CompanyLogo;
