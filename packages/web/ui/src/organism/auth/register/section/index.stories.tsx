import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AuthRegisterSection } from "./";

export default {
  title: "Example/AuthRegisterSection",
  component: AuthRegisterSection,
  argTypes: {},
} as ComponentMeta<typeof AuthRegisterSection>;

const Template: ComponentStory<typeof AuthRegisterSection> = (args) => (
  <AuthRegisterSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
