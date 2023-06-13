import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BalanceSection } from "./";

export default {
  title: "Example/BalanceSection",
  component: BalanceSection,
  argTypes: {},
} as ComponentMeta<typeof BalanceSection>;

const Template: ComponentStory<typeof BalanceSection> = (args) => (
  <BalanceSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
