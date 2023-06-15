import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Table } from "./";

export default {
  title: "Example/Table",
  component: Table,
  argTypes: {},
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
