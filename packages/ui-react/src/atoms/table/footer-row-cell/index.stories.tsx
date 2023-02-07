import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TableFooterRowCell } from "./";

export default {
  title: "Example/TableFooterRowCell",
  component: TableFooterRowCell,
  argTypes: {},
} as ComponentMeta<typeof TableFooterRowCell>;

const Template: ComponentStory<typeof TableFooterRowCell> = (args) => (
  <TableFooterRowCell {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
