import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import {
  createPostBugReportHandler
} from '../util/mswHandlers';
import BugReportForm from '../../components/forms/BugReportForm';

const meta = {
  title: 'Forms/Bug Report Form',
  component: BugReportForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs']
} satisfies Meta<typeof BugReportForm>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Form: Story = {
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createPostBugReportHandler(201)],
      }
    }
  },
};

export const TestFormSuccess: Story = {
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createPostBugReportHandler(201)],
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByTestId("BugReportForm-TitleText")).toBeInTheDocument();
    expect(canvas.getByTestId("BugReportForm-TextField")).toBeInTheDocument();
    expect(canvas.getByTestId("BugReportForm-SubmitButton")).toBeInTheDocument();
    expect(canvas.queryByTestId("BugReportForm-ErrorMessage")).not.toBeInTheDocument();
    expect(canvas.queryByTestId("BugReportForm-SubmitButtonSpinner")).not.toBeInTheDocument();
    expect(canvas.queryByTestId("ThankYouMessage-Container")).not.toBeInTheDocument();

    expect(canvas.getByTestId("BugReportForm-SubmitButton")).toBeDisabled();

    // Text field updates with user input
    const textInput = within(canvas.getByTestId("BugReportForm-TextField")).getByRole('textbox');
    await userEvent.type(textInput, "This is a test", { delay: 100 });
    expect(within(canvas.getByTestId("BugReportForm-TextField")).queryByText("This is a test")).toBeDefined();

    // Button becomes enabled when the text field is not blank
    expect(canvas.queryByTestId("BugReportForm-SubmitButton")).not.toBeDisabled();

    await userEvent.click(canvas.getByTestId("BugReportForm-SubmitButton"));

    // Form clears and thank you message is displayed on submit success
    await waitFor(() => {
      expect(canvas.queryByTestId("BugReportForm-TitleText")).not.toBeInTheDocument();
      expect(canvas.queryByTestId("BugReportForm-TextField")).not.toBeInTheDocument();
      expect(canvas.queryByTestId("BugReportForm-SubmitButton")).not.toBeInTheDocument();
      expect(canvas.queryByTestId("BugReportForm-ErrorMessage")).not.toBeInTheDocument();
      expect(canvas.queryByTestId("BugReportForm-SubmitButtonSpinner")).not.toBeInTheDocument();
      expect(canvas.getByTestId("ThankYouMessage-Container")).toBeInTheDocument();
    }, {timeout: 5000});
  }
};

export const TestFormError: Story = {
  parameters: {
    msw: {
      handlers: {
        fetchUser: [createPostBugReportHandler(500)],
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByTestId("BugReportForm-TitleText")).toBeInTheDocument();
    expect(canvas.getByTestId("BugReportForm-TextField")).toBeInTheDocument();
    expect(canvas.getByTestId("BugReportForm-SubmitButton")).toBeInTheDocument();
    expect(canvas.queryByTestId("BugReportForm-ErrorMessage")).not.toBeInTheDocument();
    expect(canvas.queryByTestId("BugReportForm-SubmitButtonSpinner")).not.toBeInTheDocument();
    expect(canvas.queryByTestId("ThankYouMessage-Container")).not.toBeInTheDocument();

    expect(canvas.getByTestId("BugReportForm-SubmitButton")).toBeDisabled();

    // Text field updates with user input
    const textInput = within(canvas.getByTestId("BugReportForm-TextField")).getByRole('textbox');
    await userEvent.type(textInput, "This is a test", { delay: 100 });
    expect(within(canvas.getByTestId("BugReportForm-TextField")).queryByText("This is a test")).toBeDefined();

    // Button becomes enabled when the text field is not blank
    expect(canvas.queryByTestId("BugReportForm-SubmitButton")).not.toBeDisabled();

    await userEvent.click(canvas.getByTestId("BugReportForm-SubmitButton"));

    // Check that the form stays the same except for the appearance of the error message
    await waitFor(() => {
      expect(canvas.getByTestId("BugReportForm-TitleText")).toBeInTheDocument();
      expect(canvas.getByTestId("BugReportForm-TextField")).toBeInTheDocument();
      expect(canvas.getByTestId("BugReportForm-SubmitButton")).toBeInTheDocument();
      expect(canvas.queryByTestId("BugReportForm-ErrorMessage")).toBeInTheDocument();
      expect(canvas.queryByTestId("BugReportForm-SubmitButtonSpinner")).not.toBeInTheDocument();
      expect(canvas.queryByTestId("ThankYouMessage-Container")).not.toBeInTheDocument();
    }, { timeout: 5000 });
  }
};