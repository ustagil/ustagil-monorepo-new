import { FC, forwardRef, HTMLProps } from "react";
import { ButtonContained, ButtonContainedProps } from "./contained";
import ButtonContainedIcon, {
  ButtonContainedIconProps,
} from "./contained-icon";
import { ButtonFlat, ButtonFlatProps } from "./flat";
import ButtonFlatIcon, { ButtonFlatIconProps } from "./flat-icon";
import { ButtonOutlined, ButtonOutlinedProps } from "./outlined";
import ButtonOutlinedIcon, { ButtonOutlinedIconProps } from "./outlined-icon";

export type ButtonBaseProps = {
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: HTMLProps<HTMLButtonElement>["disabled"];
  onClick?: HTMLProps<HTMLButtonElement>["onClick"];
};

export type ButtonProps =
  | ButtonContainedProps
  | ButtonContainedIconProps
  | ButtonOutlinedProps
  | ButtonOutlinedIconProps
  | ButtonFlatProps
  | ButtonFlatIconProps;

export const Button: FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  switch (props.variant) {
    case "contained":
      return <ButtonContained {...props} buttonRef={ref} />;
    case "contained-icon":
      return <ButtonContainedIcon {...props} buttonRef={ref} />;
    case "flat":
      return <ButtonFlat {...props} />;
    case "flat-icon":
      return <ButtonFlatIcon {...props} />;
    case "outlined":
      return <ButtonOutlined {...props} />;
    case "outlined-icon":
      return <ButtonOutlinedIcon {...props} />;

    default: {
      const ex_: never = props;
      return ex_;
    }
  }
});

Button.displayName = "Button";
