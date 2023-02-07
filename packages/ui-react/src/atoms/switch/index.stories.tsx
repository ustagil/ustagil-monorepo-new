import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Switch } from "./";

export default {
  title: "Example/Switch",
  component: Switch,
  argTypes: {},
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
