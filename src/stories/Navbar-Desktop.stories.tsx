import { userEvent, waitFor, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { createQueryClientDecorator } from './assets/StorybookDecorators';
import { QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { createUserFetchHandler } from './util/mswHandlers';
import DesktopNav from '../shared/components/navbar/desktop';

const navItems = [
  "Research",
  "Events",
  "Community Outreach",
  "Our Team",
  "About Us"
];

const mockUser = {
  "_id": "11212121",
  "googleId": "yadayada",
  "email": "faker@test.com",
  "displayName": "Test User 1"
};

const Render: StoryFn = ({...args}) => {
  return (
    <BrowserRouter>
      <DesktopNav navItems={args.navItems} />
    </BrowserRouter>
  )
}

const meta = {
  title: 'NavBar/Desktop',
  component: DesktopNav,
  tags: ['autodocs'],
  args: { navItems },
  render: Render
} satisfies Meta<typeof DesktopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotLoggedIn: Story = {
  decorators: [createQueryClientDecorator(new QueryClient())],
};

export const LoggedIn: Story = {
  decorators: [createQueryClientDecorator(new QueryClient())],
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(200, [mockUser])]
      }
    }
  }
};

export const NotLoggedInTest: Story = {
  decorators: [createQueryClientDecorator(new QueryClient())],
  play: () => {
    expect(screen.getByTestId("DesktopNav-AppBar")).toBeInTheDocument();
    expect(screen.getByTestId("DesktopNav-Logo")).toBeInTheDocument();
    navItems.forEach((item: string) => {
      expect(screen.getByTestId(`DesktopNav-LinkTab-${item}`)).toBeInTheDocument();
    });
    expect(screen.getByTestId("LoginButton-Button")).toBeInTheDocument();
  }
};

export const LoggedInTest: Story = {
  decorators: [createQueryClientDecorator(new QueryClient())],
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(200, [mockUser])]
      }
    }
  },
  play: () => {
    expect(screen.getByTestId("DesktopNav-AppBar")).toBeInTheDocument();
    expect(screen.getByTestId("DesktopNav-Logo")).toBeInTheDocument();
    navItems.forEach((item: string) => {
      expect(screen.getByTestId(`DesktopNav-LinkTab-${item}`)).toBeInTheDocument();
    });
    
    waitFor(() => {
      expect(screen.queryByTestId("LoginButton-Button")).not.toBeInTheDocument();
    });
  }
};