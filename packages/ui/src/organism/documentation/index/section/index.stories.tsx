import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DocumentationsSection } from "./";

export default {
  title: "Example/DocumentationsSection",
  component: DocumentationsSection,
  argTypes: {},
} as ComponentMeta<typeof DocumentationsSection>;

const Template: ComponentStory<typeof DocumentationsSection> = (args) => (
  <DocumentationsSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
