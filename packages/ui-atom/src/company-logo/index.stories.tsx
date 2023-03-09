import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { CompanyLogo } from "./";

export default {
  title: "Example/CompanyLogo",
  component: CompanyLogo,
  argTypes: {},
} as ComponentMeta<typeof CompanyLogo>;

const Template: ComponentStory<typeof CompanyLogo> = (args) => (
  <CompanyLogo {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
