import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputField } from "./";

export default {
  title: "Example/InputField",
  component: InputField,
  argTypes: {},
} as ComponentMeta<typeof InputField>;

const Template: ComponentStory<typeof InputField> = (args) => (
  <InputField {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
