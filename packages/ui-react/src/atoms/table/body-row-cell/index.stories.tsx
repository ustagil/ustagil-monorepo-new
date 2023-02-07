import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TableBodyRowCell } from "./";

export default {
  title: "Example/TableBodyRowCell",
  component: TableBodyRowCell,
  argTypes: {},
} as ComponentMeta<typeof TableBodyRowCell>;

const Template: ComponentStory<typeof TableBodyRowCell> = (args) => (
  <TableBodyRowCell {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
