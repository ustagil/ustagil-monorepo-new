import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NextLink } from "./";

export default {
  title: "Example/NextLink",
  component: NextLink,
  argTypes: {},
} as ComponentMeta<typeof NextLink>;

const Template: ComponentStory<typeof NextLink> = (args) => (
  <NextLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  href: "asd",
};
