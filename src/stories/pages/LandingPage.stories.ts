import { userEvent, waitFor, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { createQueryClientDecorator } from '../assets/StorybookDecorators';
import { QueryClient } from 'react-query';
import LandingPage from '../../pages/landingPage';

const meta = {
  title: 'Pages/Landing Page',
  component: LandingPage,
  parameters: {
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof LandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  decorators: [createQueryClientDecorator(new QueryClient())]
};

export const BasicTest: Story = {
  decorators: [createQueryClientDecorator(new QueryClient())],
  play: async () => {
    await waitFor(() => {
      expect(screen.getByTestId("MapUIOverlay-Container")).toBeInTheDocument();
      expect(screen.getByTestId("SideDrawer-Drawer")).toBeInTheDocument();
      expect(screen.getByTestId("Map-Container")).toBeInTheDocument();
    })
  }
};