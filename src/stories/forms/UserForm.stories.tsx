import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import {
  createUserFetchHandler,
  createUserUpdateHandler,
  createUserDeleteHandler
} from '../util/mswHandlers';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { StoryFn } from '@storybook/react';
import UserForm from '../../components/forms/UserForm';
import axios from 'axios';
import React from 'react';

const mockUser = {
  "_id": "111111111",
  "googleId": "12121212",
  "email": "faker@test.com",
  "displayName": "Test User"
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

const UserFormWrapper: React.FC = () => {
  const { data: user } = useQuery("currentUser", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fetchData`, { withCredentials: true });
    return res.data;
  });

  // Render UserForm with the fetched user data
  return (
    <>
      {user ? <UserForm user={user} /> : <div></div>}
    </>
  );
};

const meta = {
  title: 'Forms/User Form',
  component: UserForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => <QueryContextWrapper><UserFormWrapper /></QueryContextWrapper>
} satisfies Meta<typeof UserForm>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Form: Story = {
  args: {
    user: {_id: "9032390", displayName: "Something went wrong..."},
  },
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(200, [mockUser])],
        deleteUser: [createUserDeleteHandler(200)]
      }
    }
  },
};

export const CancelEditTest: Story = {
  args: {
    user: {_id: "9032390", displayName: "Something went wrong..."},
  },
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(200, [mockUser])]
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByTestId("UserForm-DisplayNameText")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DisplayNameText").textContent).toBe(mockUser.displayName);
      expect(canvas.getByTestId("UserForm-EditDisplayNameButton")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DeleteAccountButton")).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByTestId("UserForm-EditDisplayNameButton"));
    await waitFor(() => {
      expect(canvas.queryByTestId("UserForm-DisplayNameText")).not.toBeInTheDocument();
      expect(canvas.queryByTestId("UserForm-EditDisplayNameButton")).not.toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-UpdateDisplayNameField")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DeleteAccountButton")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-CancelEditButton")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-SaveEditsButton")).toBeInTheDocument();
    });

    await userEvent.type(canvas.getByTestId("UserForm-UpdateDisplayNameField"), "Updated Name");
    await userEvent.click(canvas.getByTestId("UserForm-CancelEditButton"));
    await waitFor(() => {
      expect(canvas.queryByTestId("UserForm-UpdateDisplayNameField")).not.toBeInTheDocument();
      expect(canvas.queryByTestId("UserForm-CancelEditButton")).not.toBeInTheDocument();
      expect(canvas.queryByTestId("UserForm-SaveEditsButton")).not.toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DisplayNameText")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-EditDisplayNameButton")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DeleteAccountButton")).toBeInTheDocument();
    });
  }
};

export const SaveEditsTest: Story = {
  args: {
    user: {_id: "9032390", displayName: "Something went wrong..."},
  },
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(200, [mockUser, {
          ...mockUser,
          displayName: "Updated Name"
        }])],
        updateUser: [createUserUpdateHandler(200)]
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByTestId("UserForm-DisplayNameText")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DisplayNameText").textContent).toBe(mockUser.displayName);
      expect(canvas.getByTestId("UserForm-EditDisplayNameButton")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DeleteAccountButton")).toBeInTheDocument();
    }, { timeout: 2000 });

    await userEvent.click(canvas.getByTestId("UserForm-EditDisplayNameButton"));
    await waitFor(() => {
      expect(canvas.queryByTestId("UserForm-DisplayNameText")).not.toBeInTheDocument();
      expect(canvas.queryByTestId("UserForm-EditDisplayNameButton")).not.toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-UpdateDisplayNameField")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DeleteAccountButton")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-CancelEditButton")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-SaveEditsButton")).toBeInTheDocument();
    });

    await userEvent.type(canvas.getByTestId("UserForm-UpdateDisplayNameField"), "Updated Name");
    await userEvent.click(canvas.getByTestId("UserForm-SaveEditsButton"));
    await waitFor(() => {
      expect(canvas.queryByTestId("UserForm-UpdateDisplayNameField")).not.toBeInTheDocument();
      expect(canvas.queryByTestId("UserForm-CancelEditButton")).not.toBeInTheDocument();
      expect(canvas.queryByTestId("UserForm-SaveEditsButton")).not.toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DisplayNameText")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-EditDisplayNameButton")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DeleteAccountButton")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DisplayNameText").textContent).toBe("Updated Name");
    }, { timeout: 5000 });
  }
};

export const CancelDeleteAccountTest: Story = {
  args: {
    user: {_id: "9032390", displayName: "Something went wrong..."},
  },
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(200, [mockUser])],
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByTestId("UserForm-DisplayNameText")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DisplayNameText").textContent).toBe(mockUser.displayName);
      expect(canvas.getByTestId("UserForm-EditDisplayNameButton")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DeleteAccountButton")).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByTestId("UserForm-DeleteAccountButton"));
    await waitFor(() => {
      expect(screen.getByTestId("DeleteAccountModal-Modal")).toBeInTheDocument();
      expect(screen.getByTestId("DeleteAccountModal-ConfirmText")).toBeInTheDocument();
      expect(screen.getByTestId("DeleteAccountModal-CancelButton")).toBeInTheDocument();
      expect(screen.getByTestId("DeleteAccountModal-ConfirmButton")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("DeleteAccountModal-ConfirmButton"));
    await waitFor(() => {
      expect(screen.queryByTestId("DeleteAccountModal-ConfirmText")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-ConfirmButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-Modal")).toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-CancelButton")).toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-ChooseDeletePostsText")).toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-DeleteUserAndPostsButton")).toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-DeleteJustUserButton")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("DeleteAccountModal-CancelButton"));
    await waitFor(() => {
      expect(screen.queryByTestId("DeleteAccountModal-ConfirmText")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-ConfirmButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("UserForm-ConfirmDeleteAccountModal")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-CancelButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-ChooseDeletePostsText")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-DeleteUserAndPostsButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-DeleteJustUserButton")).not.toBeInTheDocument();

      expect(canvas.getByTestId("UserForm-DisplayNameText")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DisplayNameText").textContent).toBe(mockUser.displayName);
      expect(canvas.getByTestId("UserForm-EditDisplayNameButton")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DeleteAccountButton")).toBeInTheDocument();
    });
  }
};

export const DeleteJustUserTest: Story = {
  args: {
    user: {_id: "9032390", displayName: "Something went wrong..."},
  },
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(200, [mockUser])],
        deleteUser: [createUserDeleteHandler(200)]
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByTestId("UserForm-DisplayNameText")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DisplayNameText").textContent).toBe(mockUser.displayName);
      expect(canvas.getByTestId("UserForm-EditDisplayNameButton")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DeleteAccountButton")).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByTestId("UserForm-DeleteAccountButton"));
    await waitFor(() => {
      expect(screen.getByTestId("DeleteAccountModal-Modal")).toBeInTheDocument();
      expect(screen.getByTestId("DeleteAccountModal-ConfirmText")).toBeInTheDocument();
      expect(screen.getByTestId("DeleteAccountModal-CancelButton")).toBeInTheDocument();
      expect(screen.getByTestId("DeleteAccountModal-ConfirmButton")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("DeleteAccountModal-ConfirmButton"));
    await waitFor(() => {
      expect(screen.queryByTestId("DeleteAccountModal-ConfirmText")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-ConfirmButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-Modal")).toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-CancelButton")).toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-ChooseDeletePostsText")).toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-DeleteUserAndPostsButton")).toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-DeleteJustUserButton")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("DeleteAccountModal-DeleteJustUserButton"));
    await waitFor(() => {
      expect(screen.queryByTestId("DeleteAccountModal-ConfirmText")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-ConfirmButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("UserForm-ConfirmDeleteAccountModal")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-CancelButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-ChooseDeletePostsText")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-DeleteUserAndPostsButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-DeleteJustUserButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("UserForm-FormContainer")).not.toBeInTheDocument();
    });
  }
};

export const DeletUserAndPostsTest: Story = {
  args: {
    user: {_id: "9032390", displayName: "Something went wrong..."},
  },
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createUserFetchHandler(200, [mockUser])],
        deleteUser: [createUserDeleteHandler(200)]
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByTestId("UserForm-DisplayNameText")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DisplayNameText").textContent).toBe(mockUser.displayName);
      expect(canvas.getByTestId("UserForm-EditDisplayNameButton")).toBeInTheDocument();
      expect(canvas.getByTestId("UserForm-DeleteAccountButton")).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByTestId("UserForm-DeleteAccountButton"));
    await waitFor(() => {
      expect(screen.getByTestId("DeleteAccountModal-Modal")).toBeInTheDocument();
      expect(screen.getByTestId("DeleteAccountModal-ConfirmText")).toBeInTheDocument();
      expect(screen.getByTestId("DeleteAccountModal-CancelButton")).toBeInTheDocument();
      expect(screen.getByTestId("DeleteAccountModal-ConfirmButton")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("DeleteAccountModal-ConfirmButton"));
    await waitFor(() => {
      expect(screen.queryByTestId("DeleteAccountModal-ConfirmText")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-ConfirmButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-Modal")).toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-CancelButton")).toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-ChooseDeletePostsText")).toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-DeleteUserAndPostsButton")).toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-DeleteJustUserButton")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("DeleteAccountModal-DeleteUserAndPostsButton"));
    await waitFor(() => {
      expect(screen.queryByTestId("DeleteAccountModal-ConfirmText")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-ConfirmButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("UserForm-ConfirmDeleteAccountModal")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-CancelButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-ChooseDeletePostsText")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-DeleteUserAndPostsButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteAccountModal-DeleteJustUserButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("UserForm-FormContainer")).not.toBeInTheDocument();
    });
  }
};