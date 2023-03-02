import React, {
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type InputFieldProps = HTMLAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLInputElement> &
  Partial<UseFormRegisterReturn> & {
    type?: string;
    label: string;
    error?: string;
  };

export const InputField = forwardRef<
  HTMLInputElement,
  PropsWithChildren<InputFieldProps>
>(({ name, label, className, error, ...rest }, ref) => (
  <div className={className}>
    <label htmlFor={name} className="text-sm font-medium text-gray-600 ">
      {label}
    </label>
    <input
      className="w-full px-3 py-1 mt-1 text-sm text-gray-500 border border-gray-300 border-solid rounded shadow-sm outline-none dark:text-gray-200 focus:border-primary-400 focus:ring-1 ring-primary-400"
      id={name}
      {...{ ...rest, name }}
      ref={ref}
    />
    {error && <span className="block mt-1 text-sm text-red-500">{error}</span>}
  </div>
));

InputField.displayName = "InputField";

export default InputField;
