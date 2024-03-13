import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from 'msw-storybook-addon';
import { ThemeProvider } from '@emotion/react';
import theme from "../src/theme";
import React from "react";

initialize(); // Initialize MSW

const AppDecorator = (storyFn) => {
  return (
    <ThemeProvider theme={theme}>
      {storyFn()}
    </ThemeProvider>
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
  decorators: [AppDecorator],
  loaders: [mswLoader]
};

export default preview;
