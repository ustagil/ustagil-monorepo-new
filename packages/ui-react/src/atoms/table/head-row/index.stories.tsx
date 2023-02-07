import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TableHeadRow } from "./";

export default {
  title: "Example/TableHeadRow",
  component: TableHeadRow,
  argTypes: {},
} as ComponentMeta<typeof TableHeadRow>;

const Template: ComponentStory<typeof TableHeadRow> = (args) => (
  <TableHeadRow {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
