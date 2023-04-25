import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Card } from "./";

export default {
  title: "Example/Card",
  component: Card,
  argTypes: {
    label: { control: "text" },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
