import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AuthLoginSection } from "./";

export default {
  title: "Example/AuthLoginSection",
  component: AuthLoginSection,
  argTypes: {},
} as ComponentMeta<typeof AuthLoginSection>;

const Template: ComponentStory<typeof AuthLoginSection> = (args) => (
  <AuthLoginSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
