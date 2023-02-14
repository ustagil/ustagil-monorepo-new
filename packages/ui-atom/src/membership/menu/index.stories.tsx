import { ComponentMeta, ComponentStory } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Menu } from "./";

export default {
  title: "Example/Menu",
  component: Menu,
  argTypes: {},
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
