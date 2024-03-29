import React from 'react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { createQueryClientDecorator } from "../assets/StorybookDecorators";
import { createGeocodeEarthAutocompleteHandler } from '../util/mswHandlers';
import { QueryClient } from 'react-query';
import LocationSearch from '../../components/form-elements/locationSearch';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'form-elements/Location Search',
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
  },
  decorators: [createQueryClientDecorator(new QueryClient())]
};

export const InputTest: Story = {
  args: {
    setLocation: (location: any) => {
      console.log(`location geometry: ${JSON.stringify(location.geometry)}`)
    },
    currentLocation: undefined,
    focus: undefined
  },
  parameters: {
    msw: {
      handlers: {
        autocomplete: [createGeocodeEarthAutocompleteHandler({
          features: [
            {
              type: "Feature",
              properties: { label: 'New York' },
              geometry: {
                type: "Point",
                coordinates: [40.70670836848978, -74.01290748751832]
              }
            }
          ]
        })]
      }
    }
  },
  decorators: [createQueryClientDecorator(new QueryClient())],
  play: async ({ canvasElement }) => {
    // Should display a list of suggested locations when a user types in the box
    const canvas = within(canvasElement);
    const inputContainer = canvas.getByTestId('LocationSearch-InputField');

    expect(inputContainer).toBeDefined();

    const inputElement = within(inputContainer).getByRole('textbox');

    await userEvent.type(inputElement, 'Ne', { delay: 400 });

    await canvas.findByTestId('LocationSearch-SuggestionListContainer');
    const suggestions = await canvas.findAllByTestId('LocationSearch-SuggestionListItem');
    await expect(suggestions.length).toBeGreaterThan(0);
    await expect(suggestions[0].textContent).toBe('New York');
  }
};

export const ClickTest: Story = {
  args: {
    setLocation: (location: any) => {
      console.log(`location geometry: ${JSON.stringify(location.geometry)}`)
    },
    currentLocation: undefined,
    focus: undefined
  },
  parameters: {
    msw: {
      handlers: {
        autocomplete: [createGeocodeEarthAutocompleteHandler({
          features: [
            {
              type: "Feature",
              properties: { label: 'New York' },
              geometry: {
                type: "Point",
                coordinates: [40.70670836848978, -74.01290748751832]
              }
            }
          ]
        })]
      }
    }
  },
  decorators: [createQueryClientDecorator(new QueryClient())],
  play: async ({ canvasElement }) => {
    // Suggestion list should disappear when user selects an item
    const canvas = within(canvasElement);
    const inputContainer = canvas.getByTestId('LocationSearch-InputField');

    expect(inputContainer).toBeInTheDocument();

    const inputElement = within(inputContainer).getByRole('textbox');

    await userEvent.type(inputElement, 'Ne', { delay: 400 });

    const suggestionList = await canvas.findByTestId('LocationSearch-SuggestionListContainer');
    const suggestions = await canvas.findAllByTestId('LocationSearch-SuggestionListItem');
    await expect(suggestions.length).toBeGreaterThan(0);
    await expect(suggestions[0].textContent).toBe('New York');

    await userEvent.click(suggestions[0]);
    await waitFor(() => {
      expect(canvas.queryByTestId('LocationSearch-SuggestionListContainer')).not.toBeInTheDocument();
    });
  }
};

export const BlurTest: Story = {
  args: {
    setLocation: (location: any) => {
      console.log(`location geometry: ${JSON.stringify(location.geometry)}`)
    },
    currentLocation: undefined,
    focus: undefined
  },
  parameters: {
    msw: {
      handlers: {
        autocomplete: [createGeocodeEarthAutocompleteHandler({
          features: [
            {
              type: "Feature",
              properties: { label: 'New York' },
              geometry: {
                type: "Point",
                coordinates: [40.70670836848978, -74.01290748751832]
              }
            }
          ]
        })]
      }
    }
  },
  decorators: [createQueryClientDecorator(new QueryClient())],
  play: async ({ canvasElement }) => {
    // Suggestion list should disappear when the search box loses focus
    const canvas = within(canvasElement);
    const inputContainer = canvas.getByTestId('LocationSearch-InputField');

    expect(inputContainer).toBeInTheDocument();

    const inputElement = within(inputContainer).getByRole('textbox');

    await userEvent.type(inputElement, 'Ne', { delay: 400 });

    const suggestionList = await canvas.findByTestId('LocationSearch-SuggestionListContainer');
    const suggestions = await canvas.findAllByTestId('LocationSearch-SuggestionListItem');
    await expect(suggestions.length).toBeGreaterThan(0);
    await expect(suggestions[0].textContent).toBe('New York');

    await userEvent.tab();
    await waitFor(() => {
      expect(canvas.queryByTestId('LocationSearch-SuggestionListContainer')).not.toBeInTheDocument();
    });
  }
};