import type { Preview } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from '@emotion/react';
import theme from "../src/theme";
import React from "react";

const queryClient = new QueryClient();

const AppDecorator = (storyFn) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {storyFn()}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [AppDecorator]
};

export default preview;
