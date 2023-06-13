import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { InputCheck } from "./";

export default {
  title: "Example/InputCheck",
  component: InputCheck,
  argTypes: {},
} as ComponentMeta<typeof InputCheck>;

const Template: ComponentStory<typeof InputCheck> = (args) => (
  <InputCheck {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
