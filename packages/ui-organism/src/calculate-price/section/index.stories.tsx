import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CalculatePriceSection } from "./";

export default {
  title: "Example/CalculatePriceSection",
  component: CalculatePriceSection,
  argTypes: {},
} as ComponentMeta<typeof CalculatePriceSection>;

const Template: ComponentStory<typeof CalculatePriceSection> = (args) => (
  <CalculatePriceSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
