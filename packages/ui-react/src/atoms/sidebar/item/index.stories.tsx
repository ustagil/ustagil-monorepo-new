import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SidebarItem } from "./";

export default {
  title: "Example/SidebarItem",
  component: SidebarItem,
  argTypes: {},
} as ComponentMeta<typeof SidebarItem>;

const Template: ComponentStory<typeof SidebarItem> = (args) => (
  <SidebarItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
