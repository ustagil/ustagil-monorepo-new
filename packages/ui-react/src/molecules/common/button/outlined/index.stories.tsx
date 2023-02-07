import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ButtonOutlined } from "./";

export default {
  title: "Example/ButtonOutlined",
  component: ButtonOutlined,
  argTypes: {},
} as ComponentMeta<typeof ButtonOutlined>;

const Template: ComponentStory<typeof ButtonOutlined> = (args) => (
  <ButtonOutlined {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
