import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { TableHead } from "./";

export default {
  title: "Example/TableHead",
  component: TableHead,
  argTypes: {},
} as ComponentMeta<typeof TableHead>;

const Template: ComponentStory<typeof TableHead> = (args) => (
  <TableHead {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
