import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { IntegrationAddSelectSection } from "./";

export default {
  title: "Example/IntegrationAddSelectSection",
  component: IntegrationAddSelectSection,
  argTypes: {},
} as ComponentMeta<typeof IntegrationAddSelectSection>;

const Template: ComponentStory<typeof IntegrationAddSelectSection> = (args) => (
  <IntegrationAddSelectSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
