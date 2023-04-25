import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DashboardCard } from "./";

export default {
  title: "Example/DashboardCard",
  component: DashboardCard,
  argTypes: {},
} as ComponentMeta<typeof DashboardCard>;

const Template: ComponentStory<typeof DashboardCard> = (args) => (
  <DashboardCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
