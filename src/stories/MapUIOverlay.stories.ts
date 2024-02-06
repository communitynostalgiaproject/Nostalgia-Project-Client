import { userEvent, waitFor, screen, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient } from 'react-query';
import { createQueryClientDecorator } from './assets/StorybookDecorators';
import MapUIOverlay from '../components/MapUIOverlay';

const meta = {
  title: 'Map UI/Map UI Overlay',
  component: MapUIOverlay,
  tags: ['autodocs'],
} satisfies Meta<typeof MapUIOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overlay: Story = {
  decorators: [createQueryClientDecorator(new QueryClient())]
};

export const CreateExperienceButtonTest: Story = {
  decorators: [createQueryClientDecorator(new QueryClient())],
  play: async () => {
    expect(screen.getByTestId("CreateExperienceButton-Button")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("CreateExperienceButton-Button"));
    await waitFor(() => {
      const createExperienceModal = screen.getByTestId("CreateExperienceButton-CreateExperienceModal");
      const modal = within(createExperienceModal);

      expect(createExperienceModal).toBeInTheDocument();
      expect(modal.getByTestId("ExperienceForm-TitleField")).toBeInTheDocument();
      expect(modal.getByTestId("ExperienceForm-DescriptionField")).toBeInTheDocument();
      expect(modal.getByTestId("ExperienceForm-ExperienceDateField")).toBeInTheDocument();
      expect(modal.getByTestId("ExperienceForm-LocationField")).toBeInTheDocument();
      expect(modal.getByTestId("ExperienceForm-ForwardButton")).toBeInTheDocument();

      expect(screen.getByTestId("CardModal-CloseButton")).toBeInTheDocument();
    });
  }
};