import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InvoiceTable } from "./";

export default {
  title: "Example/InvoiceTable",
  component: InvoiceTable,
  argTypes: {},
} as ComponentMeta<typeof InvoiceTable>;

const Template: ComponentStory<typeof InvoiceTable> = (args) => (
  <InvoiceTable {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: [],
};
