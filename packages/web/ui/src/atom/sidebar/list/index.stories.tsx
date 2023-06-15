import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { SidebarList } from "./";

export default {
  title: "Example/SidebarList",
  component: SidebarList,
  argTypes: {},
} as ComponentMeta<typeof SidebarList>;

const Template: ComponentStory<typeof SidebarList> = (args) => (
  <SidebarList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
