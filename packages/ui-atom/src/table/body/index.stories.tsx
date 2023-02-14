import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TableBody } from "./";

export default {
  title: "Example/TableBody",
  component: TableBody,
  argTypes: {},
} as ComponentMeta<typeof TableBody>;

const Template: ComponentStory<typeof TableBody> = (args) => (
  <TableBody {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
