import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AuthLoginForm } from "./";

export default {
  title: "Example/AuthLoginForm",
  component: AuthLoginForm,
  argTypes: {},
} as ComponentMeta<typeof AuthLoginForm>;

const Template: ComponentStory<typeof AuthLoginForm> = (args) => (
  <AuthLoginForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
