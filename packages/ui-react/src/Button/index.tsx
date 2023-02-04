import { FC, useState } from "react";

type ButtonProps = {
  title: string;
};

export const Button: FC<ButtonProps> = ({ title }) => {
  const [count, setCount] = useState(0);

  return (
    <button
      style={{ fontSize: 50, color: "palegreen" }}
      onClick={() => setCount(count + 1)}
    >
      {count}
    </button>
  );
};
