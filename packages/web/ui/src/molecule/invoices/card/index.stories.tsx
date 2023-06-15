import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InvoicesDataCard } from "./";

export default {
  title: "Example/InvoicesDataCard",
  component: InvoicesDataCard,
  argTypes: {},
} as ComponentMeta<typeof InvoicesDataCard>;

const Template: ComponentStory<typeof InvoicesDataCard> = (args) => (
  <InvoicesDataCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
