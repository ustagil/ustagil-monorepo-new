import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { TableHeadRowCell } from "./";

export default {
  title: "Example/TableHeadRowCell",
  component: TableHeadRowCell,
  argTypes: {},
} as ComponentMeta<typeof TableHeadRowCell>;

const Template: ComponentStory<typeof TableHeadRowCell> = (args) => (
  <TableHeadRowCell {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
