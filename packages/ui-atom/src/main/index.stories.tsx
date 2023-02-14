import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Main } from "./";

export default {
  title: "Example/Main",
  component: Main,
  argTypes: {},
} as ComponentMeta<typeof Main>;

const Template: ComponentStory<typeof Main> = (args) => <Main {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
