import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { UserSettingSection } from "./";

export default {
  title: "Example/UserSettingSection",
  component: UserSettingSection,
  argTypes: {},
} as ComponentMeta<typeof UserSettingSection>;

const Template: ComponentStory<typeof UserSettingSection> = (args) => (
  <UserSettingSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
