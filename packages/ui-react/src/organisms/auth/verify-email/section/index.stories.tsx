import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AuthVerifyEmailSection } from "./";

export default {
  title: "Example/AuthVerifyEmailSection",
  component: AuthVerifyEmailSection,
  argTypes: {},
} as ComponentMeta<typeof AuthVerifyEmailSection>;

const Template: ComponentStory<typeof AuthVerifyEmailSection> = (args) => (
  <AuthVerifyEmailSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
