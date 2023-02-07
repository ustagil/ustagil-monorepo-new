import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SidebarContainer } from "./";

export default {
  title: "Example/SidebarContainer",
  component: SidebarContainer,
  argTypes: {},
} as ComponentMeta<typeof SidebarContainer>;

const Template: ComponentStory<typeof SidebarContainer> = (args) => (
  <SidebarContainer {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
