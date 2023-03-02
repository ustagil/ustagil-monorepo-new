import React, { FC, HTMLProps, ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: HTMLProps<HTMLButtonElement>["onClick"];
}

export const Card: FC<CardProps> = ({ children, className, onClick }) =>
  onClick ? (
    <button
      className={`block p-3 bg-gray-200 border border-gray-500 rounded shadow dark:bg-gray-600 dark:active:bg-gray-800 active:bg-gray-500 focus:border-primary-500 ring-primary-500 focus-visible:ring-1 outline-0 dark:hover:bg-gray-700 hover:bg-gray-300 ${
        className ?? ""
      }`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <div
      className={`block p-3 text-left bg-gray-200 border border-gray-500 rounded shadow dark:bg-gray-600 dark:hover:bg-gray-700 hover:bg-gray-300 ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );

export default Card;
