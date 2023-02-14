import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CommonFooter } from "./";

export default {
  title: "Example/CommonFooter",
  component: CommonFooter,
  argTypes: {},
} as ComponentMeta<typeof CommonFooter>;

const Template: ComponentStory<typeof CommonFooter> = (args) => (
  <CommonFooter {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
