import { userEvent, waitFor, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { createQueryClientDecorator } from './assets/StorybookDecorators';
import { QueryClient } from 'react-query';
import { Experience } from '../types/experience';
import SideDrawer from '../shared/components/side-drawer/SideDrawer';

const mockExperience = {
  "_id": "111111111",
  "title": "Update Me!",
  "place": {
    "address": {
      "label": "Boca Raton, FL, USA",
    },
    "location": {
      "type": "Point",
      "coordinates": [-80.104975, 26.375019]
    }
  },
  "description": "This is an existing experience which you are editing.",
  "experienceDate": "2024-01-24T07:00:00.000Z",
  "recipe": "Ingredients:\n-One part sugar\n-One part love\n\nInstructions:\n1. Add to pot\n2. Stir",
  "foodPhotoUrl": "https://i.imgur.com/2z5znh3.png",
  "createdDate": "2024-01-24T16:11:55.240Z",
  "mood": "Joyous, Grateful",
  "personItRemindsThemOf": "Uncle Chuck",
  "periodOfLifeAssociation": "High School",
  "creatorId": "00000001",
  "placesToGetFood": [],
  "flavourProfile": "Savory, Spicy",
  "foodtype": "Soup",
  "personPhotoUrl": "https://i.imgur.com/TdyB5bK.png"
} as Experience;

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

export const Base: Story = {
  args: {
    experiences: [],
    selectedExperience: null,
    setSelectedExperience: () => {},
    hasNextPage: false,
    fetchNextPage: () => {}
  }
};

export const OpenClosedTest: Story = {
  args: {
    experiences: [mockExperience],
    selectedExperience: null,
    setSelectedExperience: () => {},
    hasNextPage: false,
    fetchNextPage: () => {},
    setEditModalOpen: () => {},
    setDeleteModalOpen: () => {}
  },
  play: async ({ canvasElement }) => {
    // Test initial load behavior
    expect(screen.getByTestId("SideDrawer-ToggleClosedButton")).toBeInTheDocument();
    expect(screen.getByTestId("ExperiencePreviewList-List")).toBeVisible();
    expect(screen.queryByTestId("ExperienceView-Container")).not.toBeInTheDocument();
    expect(screen.queryByTestId("SideDrawer-ToggleOpenButton")).not.toBeVisible();

    // Test toggle closed
    await userEvent.click(screen.getByTestId("SideDrawer-ToggleClosedButton"));
    await waitFor(() => {
      expect(screen.getByTestId("ExperiencePreviewList-List")).not.toBeVisible();
      expect(screen.queryByTestId("SideDrawer-ToggleOpenButton")).toBeVisible();
    });

    // Test toggle open
    await userEvent.click(screen.getByTestId("SideDrawer-ToggleOpenButton"));
    await waitFor(() => {
      expect(screen.getByTestId("SideDrawer-ToggleClosedButton")).toBeInTheDocument();
      expect(screen.getByTestId("ExperiencePreviewList-List")).toBeVisible();
    });
  }
};

export const ExperienceSelectedTest: Story = {
  args: {
    experiences: [mockExperience],
    selectedExperience: mockExperience,
    setSelectedExperience: () => { },
    hasNextPage: false,
    fetchNextPage: () => { },
    setEditModalOpen: () => { },
    setDeleteModalOpen: () => { }
  },
  decorators: [createQueryClientDecorator(new QueryClient())],
  play: async () => {
    expect(screen.getByTestId("SideDrawer-ToggleClosedButton")).toBeInTheDocument();
    expect(screen.queryByTestId("ExperiencePreviewList-List")).not.toBeInTheDocument();
    expect(screen.getByTestId("ExperienceView-Container")).toBeInTheDocument();
    expect(screen.queryByTestId("SideDrawer-ToggleOpenButton")).not.toBeVisible();
  }
};

export const NoNextPageTest: Story = {
  args: {
    experiences: [mockExperience],
    selectedExperience: null,
    setSelectedExperience: () => { },
    hasNextPage: false,
    fetchNextPage: () => { },
    setEditModalOpen: () => { },
    setDeleteModalOpen: () => { }
  },
  decorators: [createQueryClientDecorator(new QueryClient())],
  play: async () => {
    expect(screen.getByTestId("SideDrawer-ToggleClosedButton")).toBeInTheDocument();
    expect(screen.getByTestId("ExperiencePreviewList-List")).toBeVisible();
    expect(screen.queryByTestId("ExperienceView-Container")).not.toBeInTheDocument();
    expect(screen.queryByTestId("SideDrawer-ToggleOpenButton")).not.toBeVisible();

    // Load more button shouldn't appear
    expect(screen.queryByTestId("ExperiencePreviewList-LoadMoreButton")).not.toBeInTheDocument();
  }
};

export const HasNextPageTest: Story = {
  args: {
    experiences: [mockExperience],
    selectedExperience: null,
    setSelectedExperience: () => { },
    hasNextPage: true,
    fetchNextPage: () => { },
    setEditModalOpen: () => { },
    setDeleteModalOpen: () => { }
  },
  decorators: [createQueryClientDecorator(new QueryClient())],
  play: async () => {
    expect(screen.getByTestId("SideDrawer-ToggleClosedButton")).toBeInTheDocument();
    expect(screen.getByTestId("ExperiencePreviewList-List")).toBeVisible();
    expect(screen.queryByTestId("ExperienceView-Container")).not.toBeInTheDocument();
    expect(screen.queryByTestId("SideDrawer-ToggleOpenButton")).not.toBeVisible();

    // Load more button should appear
    expect(screen.getByTestId("ExperiencePreviewList-LoadMoreButton")).toBeInTheDocument();
  }
};