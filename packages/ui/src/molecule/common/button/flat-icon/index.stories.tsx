import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ButtonFlatIcon } from "./";

export default {
  title: "Example/ButtonFlatIcon",
  component: ButtonFlatIcon,
  argTypes: {},
} as ComponentMeta<typeof ButtonFlatIcon>;

const Template: ComponentStory<typeof ButtonFlatIcon> = (args) => (
  <ButtonFlatIcon {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
