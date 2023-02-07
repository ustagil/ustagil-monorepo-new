import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InvoiceByIdEditSection } from "./";

export default {
  title: "Example/InvoiceByIdEditSection",
  component: InvoiceByIdEditSection,
  argTypes: {},
} as ComponentMeta<typeof InvoiceByIdEditSection>;

const Template: ComponentStory<typeof InvoiceByIdEditSection> = (args) => (
  <InvoiceByIdEditSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
