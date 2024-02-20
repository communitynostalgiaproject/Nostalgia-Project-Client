import { userEvent, waitFor, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { createUserDeleteHandler, createUserFetchHandler } from '../util/mswHandlers';
import axios from 'axios';
import UserMenu from '../../components/menus/UserMenu';

const mockUser = {
  "_id": "11212121",
  "googleId": "yadayada",
  "email": "faker@test.com",
  "displayName": "Test User 1"
};

const QueryContextWrapper: StoryFn= ({ children }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        retry: false
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
};

const UserMenuWrapper: React.FC = () => {
  const { data: user } = useQuery("currentUser", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fetchData`, { withCredentials: true });
    return res.data;
  });

  // Render UserForm with the fetched user data
  return (
    <>
      <UserMenu user={user} /> : <div></div>
    </>
  );
};


const meta = {
  title: 'Menus/User Menu',
  component: UserMenu,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  render: () => <QueryContextWrapper><UserMenuWrapper /></QueryContextWrapper>
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotLoggedIn: Story = {
};

export const LoggedIn: Story = {
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(200, [mockUser])],
        deleteUser: [createUserDeleteHandler(200)]
      }
    }
  }
};

export const NotLoggedInTest: Story = {
  play: async () => {
    expect(screen.getByTestId("UserMenu-ButtonContainer")).toBeInTheDocument();
    expect(screen.getByTestId("LoginButton-Button")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("MenuButton-MenuToggleButton")).not.toBeInTheDocument();
    });
  }
};

export const LoggedInTest: Story = {
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(200, [mockUser])],
        deleteUser: [createUserDeleteHandler(200)]
      }
    }
  },
  play: async () => {
    expect(screen.getByTestId("UserMenu-ButtonContainer")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("LoginButton-Button")).not.toBeInTheDocument();
      expect(screen.getByTestId("MenuButton-MenuToggleButton")).toBeInTheDocument();
    });
  }
};

export const MenuTest: Story = {
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(200, [mockUser])],
        deleteUser: [createUserDeleteHandler(200)]
      }
    }
  },
  play: async () => {
    expect(screen.getByTestId("UserMenu-ButtonContainer")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("LoginButton-Button")).not.toBeInTheDocument();
      expect(screen.getByTestId("MenuButton-MenuToggleButton")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("MenuButton-MenuToggleButton"));
    await waitFor(() => {
      expect(screen.getByTestId("MenuButton-MenuPopover")).toBeInTheDocument();
      expect(screen.getByTestId("MenuButton-AccountSettingsButton")).toBeInTheDocument();
      expect(screen.queryByTestId("MenuButton-LogoutButton")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("MenuButton-MenuToggleButton"));
    await waitFor(() => {
      expect(screen.queryByTestId("MenuButton-MenuPopover")).not.toBeInTheDocument();
      expect(screen.queryByTestId("MenuButton-AccountSettingsButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("MenuButton-LogoutButton")).not.toBeInTheDocument();
    });
  }
};

export const AccountSettingsModalTest: Story = {
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(200, [mockUser])],
        deleteUser: [createUserDeleteHandler(200)]
      }
    }
  },
  play: async () => {
    expect(screen.getByTestId("UserMenu-ButtonContainer")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("LoginButton-Button")).not.toBeInTheDocument();
      expect(screen.getByTestId("MenuButton-MenuToggleButton")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("MenuButton-MenuToggleButton"));
    await waitFor(() => {
      expect(screen.getByTestId("MenuButton-MenuPopover")).toBeInTheDocument();
      expect(screen.getByTestId("MenuButton-AccountSettingsButton")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("MenuButton-AccountSettingsButton"));
    await waitFor(() => {
      expect(screen.getByTestId("MenuButton-AccountSettingsModal")).toBeInTheDocument();
      expect(screen.getByTestId("UserForm-FormContainer")).toBeInTheDocument();
      expect(screen.getByTestId("UserForm-DisplayNameText")).toBeInTheDocument();
      expect(screen.getByTestId("UserForm-EditDisplayNameButton")).toBeInTheDocument();
    });
  }
};

export const LogoutTest: Story = {
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(200, [mockUser])],
        deleteUser: [createUserDeleteHandler(200)]
      }
    }
  },
  play: async () => {
    expect(screen.getByTestId("UserMenu-ButtonContainer")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("LoginButton-Button")).not.toBeInTheDocument();
      expect(screen.getByTestId("MenuButton-MenuToggleButton")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("MenuButton-MenuToggleButton"));
    await waitFor(() => {
      expect(screen.getByTestId("MenuButton-MenuPopover")).toBeInTheDocument();
      expect(screen.queryByTestId("MenuButton-LogoutButton")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("MenuButton-LogoutButton"));
    await waitFor(() => {
      expect(screen.queryByTestId("MenuButton-MenuPopover")).not.toBeInTheDocument();
      expect(screen.getByTestId("LoginButton-Button")).toBeInTheDocument();
    });
  }
};