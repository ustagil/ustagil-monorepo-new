import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ButtonFlat } from "./";

export default {
  title: "Example/ButtonFlat",
  component: ButtonFlat,
  argTypes: {},
} as ComponentMeta<typeof ButtonFlat>;

const Template: ComponentStory<typeof ButtonFlat> = (args) => (
  <ButtonFlat {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
