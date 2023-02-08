import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IntegrationTable } from "./";

export default {
  title: "Example/IntegrationTable",
  component: IntegrationTable,
  argTypes: {},
} as ComponentMeta<typeof IntegrationTable>;

const Template: ComponentStory<typeof IntegrationTable> = (args) => (
  <IntegrationTable {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: [],
};
