import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Select } from "./";

export default {
  title: "Example/Select",
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: "max-w-sm",
  value: {
    id: "",
    label: "Not Selected",
    value: "",
  },
  label: "Status",
  options: [
    { id: "", label: "Not Selected", value: "" },
    { id: "1", label: "Active", value: 1 },
    { id: "0", label: "Deactive", value: 0 },
    { id: "2", label: "Error", value: 2 },
  ],
};
