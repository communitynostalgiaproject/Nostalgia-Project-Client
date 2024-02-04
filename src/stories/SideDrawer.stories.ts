import { userEvent, waitFor, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { Experience } from '../types/experience';
import { createQueryClientDecorator } from './assets/StorybookDecorators';
import { QueryClient } from 'react-query';
import SideDrawer from '../shared/components/side-drawer/SideDrawer';

const meta = {
  title: 'Map Side Drawer',
  component: SideDrawer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof SideDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const OpenClosedTest: Story = {
  play: async ({ canvasElement }) => {
    // Test initial load behavior
    expect(screen.getByTestId("SideDrawer-ToggleClosedButton")).toBeInTheDocument();
    expect(screen.getByTestId("SideDrawer-FoodPhotoList")).toBeVisible();
    expect(screen.queryByTestId("SideDrawer-ToggleOpenButton")).not.toBeVisible();

    // Test toggle closed
    await userEvent.click(screen.getByTestId("SideDrawer-ToggleClosedButton"));
    await waitFor(() => {
      expect(screen.getByTestId("SideDrawer-FoodPhotoList")).not.toBeVisible();
    });
  }
};