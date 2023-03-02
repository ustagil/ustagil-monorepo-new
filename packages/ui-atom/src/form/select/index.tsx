import { Listbox, Transition } from "@headlessui/react";
import React, { forwardRef, Fragment } from "react";
import { ControllerRenderProps } from "react-hook-form";

export type SelectOption = {
  id: string;
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type SelectProps = {
  options: SelectOption[];
  className?: string;
  label: string;
} & ControllerRenderProps;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, name, onChange, options, value, className }) => (
    <div className={`w-full not-prose ${className}`}>
      <Listbox value={value} onChange={onChange} name={name}>
        <Listbox.Label className="text-sm font-medium text-gray-600 ">
          {label}
        </Listbox.Label>

        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 text-left text-gray-500 border focus:outline-none border-solid border-gray-300 rounded shadow-sm focus:border-[#664fbd] focus:ring-1 ring-[#664fbd] cursor-default pr-7 ">
            <span className="block text-sm text-gray-600 truncate">
              {value.label}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options className="absolute left-0 right-0 z-10 w-full mt-2 overflow-auto text-sm list-none bg-white rounded shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({
                    active,
                    selected,
                  }) => `cursor-default select-none relative py-2 px-3  
                    ${selected ? "" : ""}
                    ${active ? "bg-primary-200" : ""}
                    `}
                  value={option}
                >
                  {({ selected, active }) => (
                    <span
                      className={`block truncate font-normal text-gray-600 text-sm 
                        ${selected ? "" : ""}
                        ${active ? "text-gray-700" : ""}
                        `}
                    >
                      {option.label}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
);

Select.displayName = "Select";

export default Select;
