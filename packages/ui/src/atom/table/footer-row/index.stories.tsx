import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { TableFooterRow } from "./";

export default {
  title: "Example/TableFooterRow",
  component: TableFooterRow,
  argTypes: {},
} as ComponentMeta<typeof TableFooterRow>;

const Template: ComponentStory<typeof TableFooterRow> = (args) => (
  <TableFooterRow {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
