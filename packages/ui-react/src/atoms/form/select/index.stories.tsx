import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Select } from "./";

export default {
  title: "Example/Select",
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
