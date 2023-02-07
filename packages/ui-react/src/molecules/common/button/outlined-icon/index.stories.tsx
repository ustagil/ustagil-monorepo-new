import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ButtonOutlinedIcon } from "./";

export default {
  title: "Example/ButtonOutlinedIcon",
  component: ButtonOutlinedIcon,
  argTypes: {},
} as ComponentMeta<typeof ButtonOutlinedIcon>;

const Template: ComponentStory<typeof ButtonOutlinedIcon> = (args) => (
  <ButtonOutlinedIcon {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
