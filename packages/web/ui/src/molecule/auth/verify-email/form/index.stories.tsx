import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AuthVerifyEmailForm } from "./";

export default {
  title: "Example/AuthVerifyEmailForm",
  component: AuthVerifyEmailForm,
  argTypes: {},
} as ComponentMeta<typeof AuthVerifyEmailForm>;

const Template: ComponentStory<typeof AuthVerifyEmailForm> = (args) => (
  <AuthVerifyEmailForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
