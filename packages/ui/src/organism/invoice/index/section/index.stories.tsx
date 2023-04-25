import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InvoiceSection } from "./";

export default {
  title: "Example/InvoiceSection",
  component: InvoiceSection,
  argTypes: {},
} as ComponentMeta<typeof InvoiceSection>;

const Template: ComponentStory<typeof InvoiceSection> = (args) => (
  <InvoiceSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
