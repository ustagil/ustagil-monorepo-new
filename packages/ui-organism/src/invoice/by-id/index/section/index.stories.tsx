import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InvoiceByIdSection } from "./";

export default {
  title: "Example/InvoiceByIdSection",
  component: InvoiceByIdSection,
  argTypes: {},
} as ComponentMeta<typeof InvoiceByIdSection>;

const Template: ComponentStory<typeof InvoiceByIdSection> = (args) => (
  <InvoiceByIdSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
