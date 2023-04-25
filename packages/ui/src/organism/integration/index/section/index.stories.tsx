import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IntegrationSection } from "./";

export default {
  title: "Example/IntegrationSection",
  component: IntegrationSection,
  argTypes: {},
} as ComponentMeta<typeof IntegrationSection>;

const Template: ComponentStory<typeof IntegrationSection> = (args) => (
  <IntegrationSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
