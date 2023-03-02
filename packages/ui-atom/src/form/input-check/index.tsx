import {
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type InputCheckProps = HTMLAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLInputElement> &
  Partial<UseFormRegisterReturn> & {
    label: string;
  };

export const InputCheck = forwardRef<
  HTMLInputElement,
  PropsWithChildren<InputCheckProps>
>(({ name, label, className, ...rest }, ref) => (
  <div className={className}>
    <label className="inline-flex items-center ">
      <input
        id={name}
        {...{ ...rest, name }}
        ref={ref}
        type="checkbox"
        className="text-primary-600 rounded"
      />
      <span className="ml-2 text-sm text-gray-600 select-none hover:underline">
        {label}
      </span>
    </label>
  </div>
));

InputCheck.displayName = "InputCheck";

export default InputCheck;
