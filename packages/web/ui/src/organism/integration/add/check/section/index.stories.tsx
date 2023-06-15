import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IntegrationAddCheckSection } from "./";

export default {
  title: "Example/IntegrationAddCheckSection",
  component: IntegrationAddCheckSection,
  argTypes: {},
} as ComponentMeta<typeof IntegrationAddCheckSection>;

const Template: ComponentStory<typeof IntegrationAddCheckSection> = (args) => (
  <IntegrationAddCheckSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
