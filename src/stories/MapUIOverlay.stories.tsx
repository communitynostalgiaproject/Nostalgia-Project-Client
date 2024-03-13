import { userEvent, waitFor, screen, within } from '@storybook/testing-library';
import { fn } from '@storybook/test';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient } from 'react-query';
import { redirectToLogin } from '../api/helpers';
import { createQueryClientDecorator } from './assets/StorybookDecorators';
import { createUserFetchHandler } from './util/mswHandlers';
import MapUIOverlay from '../components/MapUIOverlay';

const mockUser = {
  "_id": "11212121",
  "googleId": "yadayada",
  "email": "faker@test.com",
  "displayName": "Test User 1"
};

const meta = {
  title: 'Map UI/Map UI Overlay',
  component: MapUIOverlay,
  tags: ['autodocs'],
} satisfies Meta<typeof MapUIOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    redirectToLogin: fn()
  },
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(200, [mockUser])]
      }
    }
  },
  decorators: [createQueryClientDecorator(new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 3 * 1000
      }
    }
  }))]
};

export const LoggedOut: Story = {
  args: {
    redirectToLogin: fn()
  },
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(500)]
      }
    }
  },
  decorators: [createQueryClientDecorator(new QueryClient())]
};

export const CreateExperienceButtonLoggedInTest: Story = {
  args: {
    redirectToLogin: fn()
  },
  decorators: [createQueryClientDecorator(new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      }
    }
  }))],
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(200, [mockUser])]
      }
    }
  },
  play: async () => {
    await waitFor(() => {
      expect(screen.getByTestId("MapUIOverlay-CreateExperienceButton-LoggedIn")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("MapUIOverlay-CreateExperienceButton-LoggedIn"));
    await waitFor(() => {
      const createExperienceModal = screen.getByTestId("MapUIOverlay-CreateExperienceModal");
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

export const CreateExperienceButtonLoggedOutTest: Story = {
  args: {
    redirectToLogin: fn()
  },
  decorators: [createQueryClientDecorator(new QueryClient())],
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(500)]
      }
    }
  },
  play: async ({ args }) => {
    expect(screen.getByTestId("MapUIOverlay-CreateExperienceButton-LoggedOut")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("MapUIOverlay-CreateExperienceButton-LoggedOut"));
    await waitFor(() => {
      expect(args.redirectToLogin).toHaveBeenCalled();
    });
  }
};