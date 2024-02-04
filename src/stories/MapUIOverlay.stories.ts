import { userEvent, waitFor, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient } from 'react-query';
import { createQueryClientDecorator } from './assets/StorybookDecorators';
import MapUIOverlay from '../components/MapUIOverlay';

const meta = {
  title: 'Map UI Overlay',
  component: MapUIOverlay,
  tags: ['autodocs'],
} satisfies Meta<typeof MapUIOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  decorators: [createQueryClientDecorator(new QueryClient())]
};