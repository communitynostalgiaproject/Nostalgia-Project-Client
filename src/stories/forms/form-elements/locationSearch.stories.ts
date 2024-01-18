import React from 'react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { mswLoader } from 'msw-storybook-addon';
import LocationSearch from '../../../components/form-elements/locationSearch';

const autocompleteHandler = rest.get('https://api.geocode.earth/v1/autocomplete', (_req, res, ctx) => {
    console.log("In autocompleteWorker");
    return res(ctx.json({ features: [{ properties: { label: 'New York' } }] }));
});

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Location Search',
  component: LocationSearch,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof LocationSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blank: Story = {
  args: {
    setLocation: (location: any) => {
      console.log(`location geometry: ${JSON.stringify(location.geometry)}`)
    },
    currentLocation: undefined,
    focus: undefined
  }
};

export const InputTest: Story = {
  loaders: [mswLoader],
  parameters: {
    msw: {
      handlers: {
        autocomplete: [autocompleteHandler]
      }
    }
  },
  play: async ({ canvasElement }) => {
    // Should display a list of suggested locations when a user types in the box
    const canvas = within(canvasElement);
    const inputContainer = canvas.getByTestId('LocationSearch-InputField');

    expect(inputContainer).toBeDefined();

    const inputElement = within(inputContainer).getByRole('textbox');

    await userEvent.type(inputElement, 'Ne', { delay: 100 });

    await canvas.findByTestId('LocationSearch-SuggestionListContainer');
    const suggestions = await canvas.findAllByTestId('LocationSearch-SuggestionListItem');
    await expect(suggestions.length).toBeGreaterThan(0);
    await expect(suggestions[0].textContent).toBe('New York');
  }
};

export const BlurTest: Story = {
  loaders: [mswLoader],
  parameters: {
    msw: {
      handlers: {
        autocomplete: [autocompleteHandler]
      }
    }
  },
  play: async ({ canvasElement }) => {
    // Suggestion list should disappear when the search box loses focus
    const canvas = within(canvasElement);
    const inputContainer = canvas.getByTestId('LocationSearch-InputField');

    expect(inputContainer).toBeInTheDocument();

    const inputElement = within(inputContainer).getByRole('textbox');

    await userEvent.type(inputElement, 'Ne', { delay: 100 });

    const suggestionList = await canvas.findByTestId('LocationSearch-SuggestionListContainer');
    const suggestions = await canvas.findAllByTestId('LocationSearch-SuggestionListItem');
    await expect(suggestions.length).toBeGreaterThan(0);
    await expect(suggestions[0].textContent).toBe('New York');

    await userEvent.tab();
    expect(suggestionList).not.toBeInTheDocument(); 
  }
};