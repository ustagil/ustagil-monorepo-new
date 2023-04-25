import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ContainerWithSidebar } from ".";

export default {
  title: "Example/ContainerWithSidebar",
  component: ContainerWithSidebar,
  argTypes: {},
} as ComponentMeta<typeof ContainerWithSidebar>;

const Template: ComponentStory<typeof ContainerWithSidebar> = (args) => (
  <ContainerWithSidebar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
