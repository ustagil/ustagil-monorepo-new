import { FC, HTMLAttributes } from "react";

type ButtonProps = {
  label: string;
  onClick: HTMLAttributes<HTMLButtonElement>["onClick"];
};

export const Button: FC<ButtonProps> = ({ label, onClick }) => (
  <button className="text-5xl font-bold underline" onClick={onClick}>
    {label}
  </button>
);
