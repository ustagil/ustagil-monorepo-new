import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { DocumentationCard } from "./";

export default {
  title: "Example/DocumentationCard",
  component: DocumentationCard,
  argTypes: {},
} as ComponentMeta<typeof DocumentationCard>;

const Template: ComponentStory<typeof DocumentationCard> = (args) => (
  <DocumentationCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
