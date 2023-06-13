import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { IntegrationByIdEditSection } from "./";

export default {
  title: "Example/IntegrationByIdEditSection",
  component: IntegrationByIdEditSection,
  argTypes: {},
} as ComponentMeta<typeof IntegrationByIdEditSection>;

const Template: ComponentStory<typeof IntegrationByIdEditSection> = (args) => (
  <IntegrationByIdEditSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
