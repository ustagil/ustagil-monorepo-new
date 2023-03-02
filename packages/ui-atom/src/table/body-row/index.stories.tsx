import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { TableBodyRow } from "./";

export default {
  title: "Example/TableBodyRow",
  component: TableBodyRow,
  argTypes: {},
} as ComponentMeta<typeof TableBodyRow>;

const Template: ComponentStory<typeof TableBodyRow> = (args) => (
  <TableBodyRow {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
