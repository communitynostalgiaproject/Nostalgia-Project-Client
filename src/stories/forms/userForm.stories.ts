import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import UserForm from '../../components/forms/UserForm';

const mockUser = {
  "_id": "111111111",
  "googleId": "12121212",
  "email": "faker@test.com",
  "displayName": "Test User"
};

const meta = {
  title: 'User Form',
  component: UserForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NewExperience: Story = {};
export const UpdateExperience: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: {

      }
    }
  },
};

// export const CreateExperienceTest: Story = {
//   parameters: {
//     msw: {
//       handlers: {
//         submitCreate: [submitCreateHandler],
//         getUserData: [getUserDataHandler],
//         autocomplete: [autocompleteHandler]
//       }
//     }
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//   }
// };