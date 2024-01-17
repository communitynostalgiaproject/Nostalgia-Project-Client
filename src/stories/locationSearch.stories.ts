import type { Meta, StoryObj } from '@storybook/react';
import LocationSearch from '../components/form-elements/locationSearch';

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
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   focus: {
  //     lat: {
  //       control: {
  //         type: "number"
  //       },
  //       description: "Focus point latitude"
  //     },
  //     long: {
  //       control: {
  //         type: "number"
  //       },
  //       description: "Focus point longitude"
  //     }
  //   }
  // },
} satisfies Meta<typeof LocationSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    setLocation: (location: any) => {
      console.log(`location geometry: ${JSON.stringify(location.geometry)}`)
    },
    currentLocation: undefined,
    focus: undefined
  }
};