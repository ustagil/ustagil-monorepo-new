import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AuthRegisterForm } from "./";

export default {
  title: "Example/AuthRegisterForm",
  component: AuthRegisterForm,
  argTypes: {},
} as ComponentMeta<typeof AuthRegisterForm>;

const Template: ComponentStory<typeof AuthRegisterForm> = (args) => (
  <AuthRegisterForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
