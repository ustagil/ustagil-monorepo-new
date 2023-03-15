import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AuthLoginRedirect } from "./";

export default {
  title: "Example/AuthLoginRedirect",
  component: AuthLoginRedirect,
  argTypes: {},
} as ComponentMeta<typeof AuthLoginRedirect>;

const Template: ComponentStory<typeof AuthLoginRedirect> = (args) => (
  <AuthLoginRedirect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
