import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DashboardSection } from "./";

export default {
  title: "Example/DashboardSection",
  component: DashboardSection,
  argTypes: {},
} as ComponentMeta<typeof DashboardSection>;

const Template: ComponentStory<typeof DashboardSection> = (args) => (
  <DashboardSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
