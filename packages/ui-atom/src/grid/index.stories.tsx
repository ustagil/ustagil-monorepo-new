import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Grid } from "./";

export default {
  title: "Example/Grid",
  component: Grid,
  argTypes: {},
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => <Grid {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
