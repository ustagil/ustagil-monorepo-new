import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TableFooter } from "./";

export default {
  title: "Example/TableFooter",
  component: TableFooter,
  argTypes: {},
} as ComponentMeta<typeof TableFooter>;

const Template: ComponentStory<typeof TableFooter> = (args) => (
  <TableFooter {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
