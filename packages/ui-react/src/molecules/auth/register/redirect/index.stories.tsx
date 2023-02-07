import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AuthRegisterRedirect } from "./";

export default {
  title: "Example/AuthRegisterRedirect",
  component: AuthRegisterRedirect,
  argTypes: {},
} as ComponentMeta<typeof AuthRegisterRedirect>;

const Template: ComponentStory<typeof AuthRegisterRedirect> = (args) => (
  <AuthRegisterRedirect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
