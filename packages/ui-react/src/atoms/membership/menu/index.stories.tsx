import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Menu } from "./";

export default {
  title: "Example/Menu",
  component: Menu,
  argTypes: {},
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
