import { Menu as HUMenu, Transition } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import React, { FC, Fragment } from "react";
import { NextLink } from "../../next-link";

export type MenuProps = { firstname: string; lastname: string };

export const Menu: FC<MenuProps> = ({ firstname, lastname }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <HUMenu as="div" className="relative">
      <HUMenu.Button className="inline-flex items-center justify-between w-full px-3 py-2 text-gray-600 border border-gray-300 border-solid rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
        <span className="block pr-2 text-sm truncate">
          {firstname} {lastname}
        </span>
        <span className="flex items-center pointer-events-none">
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
      </HUMenu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HUMenu.Items className="absolute right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-gray-400 focus:outline-none">
          <div className="">
            <HUMenu.Item>
              {({ active }) => (
                <NextLink
                  href="/membership/ads"
                  className={`${
                    active ? "bg-primary-500 text-white" : "text-gray-900"
                  } rounded-t flex items-center w-full pl-4 pr-2 py-2 text-sm`}
                >
                  İlanlar
                </NextLink>
              )}
            </HUMenu.Item>
          </div>
          <div className="">
            <HUMenu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-primary-500 text-white" : "text-gray-900"
                  } rounded-b flex items-center w-full pl-4 pr-2 py-2 text-sm`}
                  onClick={() => {
                    destroyCookie(null, "accessToken", {
                      path: "/",
                    });
                    queryClient.removeQueries();
                    router.replace("/");
                  }}
                >
                  Çıkış Yap
                </button>
              )}
            </HUMenu.Item>
          </div>
        </HUMenu.Items>
      </Transition>
    </HUMenu>
  );
};

export default Menu;
