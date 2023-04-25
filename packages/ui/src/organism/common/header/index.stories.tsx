import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CommonHeader } from "./";

export default {
  title: "Example/CommonHeader",
  component: CommonHeader,
  argTypes: {},
} as ComponentMeta<typeof CommonHeader>;

const Template: ComponentStory<typeof CommonHeader> = (args) => (
  <CommonHeader {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
