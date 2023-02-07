import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Section } from "./";

export default {
  title: "Example/Section",
  component: Section,
  argTypes: {},
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = (args) => (
  <Section {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
