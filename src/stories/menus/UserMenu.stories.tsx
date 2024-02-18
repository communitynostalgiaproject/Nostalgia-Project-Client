import { userEvent, waitFor, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { createUserDeleteHandler, createUserFetchHandler } from '../util/mswHandlers';
import axios from 'axios';
import UserMenu from '../../components/menus/UserMenu';
import { fn } from '@storybook/test';

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

const UserMenuWrapper: React.FC<{handleLogin?: () => void}> = ({
  handleLogin
}) => {
  const { data: user } = useQuery("currentUser", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fetchData`, { withCredentials: true });
    return res.data;
  });

  // Render UserForm with the fetched user data
  return (
    <>
      <UserMenu user={user} handleLogin={handleLogin} />
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
  render: ({ handleLogin }) => (
    <QueryContextWrapper>
      <UserMenuWrapper 
        handleLogin={handleLogin}
      />
    </QueryContextWrapper>
  )
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotLoggedIn: Story = {
  args: {
    handleLogin: fn()
  },
};

export const LoggedIn: Story = {
  args: {
    handleLogin: fn()
  },
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
  args: {
    handleLogin: fn()
  },
  play: async ({ args }) => {
    expect(screen.getByTestId("UserMenu-ButtonContainer")).toBeInTheDocument();
    expect(screen.getByTestId("LoginButton-Button")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("MenuButton-MenuToggleButton")).not.toBeInTheDocument();
    });
    await userEvent.click(screen.getByTestId("LoginButton-Button"));
    expect(args.handleLogin).toHaveBeenCalled();
  }
};

export const LoggedInTest: Story = {
  args: {
    handleLogin: fn()
  },
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
  args: {
    handleLogin: fn()
  },
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

    await userEvent.click(screen.getByTestId("MenuButton-MenuToggleButton"));
    await waitFor(() => {
      expect(screen.queryByTestId("MenuButton-MenuPopover")).not.toBeInTheDocument();
      expect(screen.queryByTestId("MenuButton-AccountSettingsButton")).not.toBeInTheDocument();
    });
  }
};

export const AccountSettingsModalTest: Story = {
  args: {
    handleLogin: fn()
  },
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