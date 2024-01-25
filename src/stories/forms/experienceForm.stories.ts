import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { rest } from 'msw';
import { Experience } from '../../types/experience';
import fs from 'fs';
import path from 'path';
import ExperienceForm from '../../components/forms/ExperienceForm';

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
const mockUser = {
  "_id": mockExperience.creatorId,
  "googleId": "12121212",
  "email": "faker@test.com",
  "displayName": "Test User"
};

const submitCreateHandler = rest.post(`${process.env.REACT_APP_API_URL}/experiences`, (_req, res, ctx) => {
  return res(ctx.status(201));
});

const submitUpdateHandler = rest.patch(`${process.env.REACT_APP_API_URL}/experiences/${mockExperience._id}`, (_req, res, ctx) => {
  return res(ctx.status(200));
});

const getUserDataHandler = rest.get(
  `${process.env.REACT_APP_API_URL}/users/fetchData`,
  (_req, res, ctx) => {
    return res(ctx.json(mockUser));
  }
);

const autocompleteHandler = rest.get('https://api.geocode.earth/v1/autocomplete', (_req, res, ctx) => {
    console.log("In autocompleteWorker");
    return res(ctx.json({ features: [{ properties: { label: 'New York' } }] }));
});


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Experience Form',
  component: ExperienceForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} satisfies Meta<typeof ExperienceForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NewExperience: Story = {};
export const UpdateExperience: Story = {
  args: {
    existingExperience: mockExperience
  },
  parameters: {
    msw: {
      handlers: {
        submitUpdate: [submitUpdateHandler],
        getUserData: [getUserDataHandler]
      }
    }
  },
};

export const CreateExperienceTest: Story = {
  parameters: {
    msw: {
      handlers: {
        submitCreate: [submitCreateHandler],
        getUserData: [getUserDataHandler],
        autocomplete: [autocompleteHandler]
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Page 1
    const titleField = canvas.getByTestId("ExperienceForm-TitleField");
    const descriptionField = canvas.getByTestId("ExperienceForm-DescriptionField");
    const experienceDateField = canvas.getByTestId("ExperienceForm-ExperienceDateField");
    const locationField = canvas.getByTestId("ExperienceForm-LocationField");
    const forwardButton = canvas.getByTestId("ExperienceForm-ForwardButton");

    expect(titleField).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();
    expect(experienceDateField).toBeInTheDocument();
    expect(locationField).toBeInTheDocument();
    expect(forwardButton).toBeInTheDocument();

    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    const errorMessage = await canvas.findByTestId("ExperienceForm-ErrorMessage");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.textContent).toBe("Please enter a title for your experience");

    const titleInput = within(titleField).getByRole('textbox');
    await userEvent.type(titleInput, "Test Experience", {delay: 100});
    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    expect(errorMessage.textContent).toBe("Please enter an experience description");

    const descriptionInput = within(descriptionField).getByRole('textbox');
    await userEvent.type(descriptionInput, "This is a test", {delay: 100});
    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    expect(errorMessage.textContent).toBe("Please enter a date for the experience");

    const dateInput = within(experienceDateField).getByRole('textbox');
    await userEvent.type(dateInput, "01012024", {delay: 100});
    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    expect(errorMessage.textContent).toBe("Please select a location for the experience");

    const locationInput = within(locationField).getByRole('textbox');
    await userEvent.type(locationInput, "New", {delay: 100});
    const suggestions = await canvas.findAllByTestId('LocationSearch-SuggestionListItem');
    expect(suggestions.length).toBeGreaterThan(0);
    await userEvent.click(suggestions[0]);

    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    await expect(errorMessage).not.toBeInTheDocument();
    expect(titleField).not.toBeInTheDocument();
    expect(descriptionField).not.toBeInTheDocument();
    expect(experienceDateField).not.toBeInTheDocument();
    expect(locationField).not.toBeInTheDocument();

    // Page 2
    const recipeField = canvas.getByTestId("ExperienceForm-RecipeField");
    expect(recipeField).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-BackButton")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-ForwardButton")).toBeInTheDocument();

    const recipeInput = within(recipeField).getByRole('textbox');
    await userEvent.type(recipeInput, "- Boil water\n- Dunk tea bag", {delay: 100});
    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    expect(recipeField).not.toBeInTheDocument();

    // Page 3
    const personItRemindsThemOfField = canvas.getByTestId("ExperienceForm-PersonItRemindsThemOfField");
    const periodOfLifeField = canvas.getByTestId("ExperienceForm-PeriodOfLifeField");
    const moodField = canvas.getByTestId("ExperienceForm-MoodField");
    const foodTypeField = canvas.getByTestId("ExperienceForm-FoodTypeField");
    const flavourProfileField = canvas.getByTestId("ExperienceForm-FlavourProfileField");

    expect(personItRemindsThemOfField).toBeInTheDocument();
    expect(periodOfLifeField).toBeInTheDocument();
    expect(moodField).toBeInTheDocument();
    expect(foodTypeField).toBeInTheDocument();
    expect(flavourProfileField).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-BackButton")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-ForwardButton")).toBeInTheDocument();

    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    expect(personItRemindsThemOfField).not.toBeInTheDocument();
    expect(periodOfLifeField).not.toBeInTheDocument();
    expect(moodField).not.toBeInTheDocument();
    expect(foodTypeField).not.toBeInTheDocument();
    expect(flavourProfileField).not.toBeInTheDocument();

    // Page 4
    const uploadFoodPhotoButton = canvas.getByTestId("ExperienceForm-UploadFoodPhotoButton");
    const uploadPersonPhotoButton = canvas.getByTestId("ExperienceForm-UploadPersonPhotoButton");
    const backButton = canvas.getByTestId("ExperienceForm-BackButton");
    const submitButton = canvas.getByTestId("ExperienceForm-SubmitButton");
    expect(uploadFoodPhotoButton).toBeInTheDocument();
    expect(uploadPersonPhotoButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await userEvent.click(canvas.getByTestId("ExperienceForm-SubmitButton"));
    const newErrorMessage = await canvas.findByTestId("ExperienceForm-ErrorMessage");
    expect(newErrorMessage).toBeInTheDocument();
    expect(newErrorMessage.textContent).toBe("Please select a food photo");

    const mockImageFile = new File(['mock'], 'mock.png', { type: 'image/png' });
    const uploadFoodPhotoInput = canvas.getByTestId("ExperienceForm-UploadFoodPhotoInput");
    await userEvent.upload(uploadFoodPhotoInput, mockImageFile);
    await userEvent.click(canvas.getByTestId("ExperienceForm-SubmitButton"));

    expect(uploadFoodPhotoButton).not.toBeInTheDocument();
    expect(uploadPersonPhotoButton).not.toBeInTheDocument();
    expect(backButton).not.toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();

    // Thank You Message
    const thankYouMessageContainer = canvas.getByTestId("ExperienceForm-ThankYouMessage");
    const thankYouMessageText = within(thankYouMessageContainer).getByText("Thank you for submitting your experience");
    expect(thankYouMessageContainer).toBeInTheDocument();
    expect(thankYouMessageText).toBeInTheDocument();
  }
};