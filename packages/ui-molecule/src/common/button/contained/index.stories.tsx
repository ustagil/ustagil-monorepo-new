import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ButtonContained } from "./";

export default {
  title: "Example/ButtonContained",
  component: ButtonContained,
  argTypes: {},
} as ComponentMeta<typeof ButtonContained>;

const Template: ComponentStory<typeof ButtonContained> = (args) => (
  <ButtonContained {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
