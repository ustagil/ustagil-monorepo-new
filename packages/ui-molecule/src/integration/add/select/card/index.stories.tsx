import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IntegrationAddSelectCard } from "./";

export default {
  title: "Example/IntegrationAddSelectCard",
  component: IntegrationAddSelectCard,
  argTypes: {},
} as ComponentMeta<typeof IntegrationAddSelectCard>;

const Template: ComponentStory<typeof IntegrationAddSelectCard> = (args) => (
  <IntegrationAddSelectCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
