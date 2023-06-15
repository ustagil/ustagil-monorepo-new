import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PageHeader } from "./";

export default {
  title: "Example/PageHeader",
  component: PageHeader,
  argTypes: {},
} as ComponentMeta<typeof PageHeader>;

const Template: ComponentStory<typeof PageHeader> = (args) => (
  <PageHeader {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
