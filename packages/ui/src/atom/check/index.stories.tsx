import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Check } from "./";

export default {
  title: "Example/Check",
  component: Check,
  argTypes: {},
} as ComponentMeta<typeof Check>;

const Template: ComponentStory<typeof Check> = (args) => <Check {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
