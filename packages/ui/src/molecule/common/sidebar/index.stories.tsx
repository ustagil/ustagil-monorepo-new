import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SidebarCommon } from "./";

export default {
  title: "Example/SidebarCommon",
  component: SidebarCommon,
  argTypes: {},
} as ComponentMeta<typeof SidebarCommon>;

const Template: ComponentStory<typeof SidebarCommon> = (args) => (
  <SidebarCommon {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
