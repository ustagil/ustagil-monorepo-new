import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MySwitch } from ".";

export default {
  title: "Example/MySwitch",
  component: MySwitch,
  argTypes: {},
} as ComponentMeta<typeof MySwitch>;

const Template: ComponentStory<typeof MySwitch> = (args) => (
  <MySwitch {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
