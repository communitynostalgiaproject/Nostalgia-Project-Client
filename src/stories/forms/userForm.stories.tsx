import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { createUserFetchHandler } from '../util/mswHandlers';
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
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
};

const UserFormWrapper: React.FC = ({ ...args }) => {
  const { data: user } = useQuery("currentUser", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fetchData`, { withCredentials: true });
    return res.data;
  });

  // Render UserForm with the fetched user data
  return (
    <>
      {user && <UserForm user={user} />}
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
        fetchUser: [createUserFetchHandler(200, mockUser)]
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
        fetchUser: [createUserFetchHandler(200, mockUser)]
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
        fetchUser: [createUserFetchHandler(200, mockUser)]
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