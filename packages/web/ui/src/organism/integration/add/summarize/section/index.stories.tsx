import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IntegrationAddSummarizeSection } from "./";

export default {
  title: "Example/IntegrationAddSummarizeSection",
  component: IntegrationAddSummarizeSection,
  argTypes: {},
} as ComponentMeta<typeof IntegrationAddSummarizeSection>;

const Template: ComponentStory<typeof IntegrationAddSummarizeSection> = (
  args
) => <IntegrationAddSummarizeSection {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
