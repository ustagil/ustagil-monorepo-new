import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ButtonContainedIcon } from "./";

export default {
  title: "Example/ButtonContainedIcon",
  component: ButtonContainedIcon,
  argTypes: {},
} as ComponentMeta<typeof ButtonContainedIcon>;

const Template: ComponentStory<typeof ButtonContainedIcon> = (args) => (
  <ButtonContainedIcon {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
