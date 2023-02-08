import { useStoreSidebar } from "@acme/state";
import { FC } from "react";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { TbReportMoney } from "react-icons/tb";
import {
  VscCreditCard,
  VscDashboard,
  VscGear,
  VscJson,
  VscNote,
} from "react-icons/vsc";
import {
  SidebarContainer,
  SidebarItem,
  SidebarList,
} from "../../../atoms/sidebar";

type SelectedPageName =
  | "dashboard"
  | "integrations"
  | "documentations"
  | "invoices"
  | "calculate-price"
  | "balance"
  | "user-settings";

export interface SidebarCommonProps {
  selectedPage: SelectedPageName;
}

export const SidebarCommon: FC<SidebarCommonProps> = ({ selectedPage }) => {
  const { collapsed, toggleCollape } = useStoreSidebar();

  return (
    <SidebarContainer>
      <button
        className={`inline-block w-full p-2 pl-3  hover:text-background hover:bg-primary-500`}
        onClick={() => toggleCollape()}
        title="Collapse Sidebar"
        type="button"
      >
        {collapsed ? (
          <IoArrowForwardCircleOutline size={24} />
        ) : (
          <IoArrowBackCircleOutline size={24} />
        )}
      </button>

      <SidebarList>
        <SidebarItem
          href="/dashboard"
          title="Dashboard"
          collapsed={collapsed}
          selected={selectedPage == "dashboard"}
          Icon={<RxDashboard />}
        />
        <SidebarItem
          href="/integrations"
          title="Integrations"
          collapsed={collapsed}
          selected={selectedPage == "integrations"}
          Icon={<VscJson />}
        />
        <SidebarItem
          href="/documentations"
          title="Documentations"
          collapsed={collapsed}
          selected={selectedPage == "documentations"}
          Icon={<VscNote />}
        />
        <SidebarItem
          href="/invoices"
          title="Invoices"
          collapsed={collapsed}
          selected={selectedPage == "invoices"}
          Icon={<TbReportMoney />}
        />
        <SidebarItem
          href="/calculate-price"
          title="Calculate Price"
          collapsed={collapsed}
          selected={selectedPage == "calculate-price"}
          Icon={<VscDashboard />}
        />
        <SidebarItem
          href="/balance"
          title="Balance"
          collapsed={collapsed}
          selected={selectedPage == "balance"}
          Icon={<VscCreditCard />}
        />
        <SidebarItem
          href="/user-settings"
          title="User Settings"
          collapsed={collapsed}
          selected={selectedPage == "user-settings"}
          Icon={<VscGear />}
        />
      </SidebarList>
    </SidebarContainer>
  );
};

export default SidebarCommon;
