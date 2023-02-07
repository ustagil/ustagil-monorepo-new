import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IntegrationByIdSection } from "./";

export default {
  title: "Example/IntegrationByIdSection",
  component: IntegrationByIdSection,
  argTypes: {},
} as ComponentMeta<typeof IntegrationByIdSection>;

const Template: ComponentStory<typeof IntegrationByIdSection> = (args) => (
  <IntegrationByIdSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
