import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { rest } from 'msw';
import { Experience } from '../../types/experience';
import { createQueryClientDecorator } from "../assets/StorybookDecorators";
import { QueryClient } from 'react-query';
import {
  createUserFetchHandler,
  createExperienceCreateHandler,
  createExperienceUpdateHandler,
  createGeocodeEarthAutocompleteHandler
} from '../util/mswHandlers';
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
  "mood": "Joyous,Grateful",
  "personItRemindsThemOf": "father",
  "periodOfLifeAssociation": "High School",
  "creatorId": "00000001",
  "placesToGetFood": [],
  "flavourProfile": "savory,spicy",
  "foodtype": "breakfast",
  "cuisine": "mexican",
  "personPhotoUrl": "https://i.imgur.com/TdyB5bK.png"
} as Experience;
const mockUser = {
  "_id": mockExperience.creatorId,
  "googleId": "12121212",
  "email": "faker@test.com",
  "displayName": "Test User"
};

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const formatISOToAmericanDate = (isoDate: string) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = new Date(isoDate);
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};

const checkMultiSelectField = (element: HTMLElement, fieldValue: string) => {
  const values = fieldValue.split(",");


  values.forEach((value: string) => {
    const result = within(element).getByText(value);
    expect(result).toBeInTheDocument();
  });
};


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'forms/Experience Form',
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

export const NewExperience: Story = {
  decorators: [createQueryClientDecorator(new QueryClient())],
  args: {
    mode: "create",
    user: {}
  }
};
export const UpdateExperience: Story = {
  args: {
    mode: "edit",
    existingExperience: mockExperience,
    setSelectedExperience: () => {},
    setExperiences: () => {}
  },
  parameters: {
    msw: {
      handlers: {
        submitUpdate: [createExperienceUpdateHandler(200)],
        getUserData: [createUserFetchHandler(200, [mockUser])]
      }
    }
  },
  decorators: [createQueryClientDecorator(new QueryClient())]
};

export const CreateExperienceTest: Story = {
  args: {
    mode: "create",
    user: {}
  },
  parameters: {
    msw: {
      handlers: {
        submitCreate: [createExperienceCreateHandler(201)],
        getUserData: [createUserFetchHandler(200, [mockUser])],
        autocomplete: [createGeocodeEarthAutocompleteHandler({
          features: [
            {
              type: "Feature",
              properties: { label: 'New York' },
              geometry: {
                type: "Point",
                coordinates: [40.70670836848978, -74.01290748751832]
              }
            }
          ]
        })]
      }
    }
  },
  decorators: [createQueryClientDecorator(new QueryClient())],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Page 1
    const titleField = canvas.getByTestId("ExperienceForm-TitleField");
    const descriptionField = canvas.getByTestId("ExperienceForm-DescriptionField");
    const experienceDateField = canvas.getByTestId("ExperienceForm-ExperienceDateField");
    const locationField = canvas.getByTestId("ExperienceForm-LocationField");
    const personItRemindsThemOfField = canvas.getByTestId("ExperienceForm-PersonItRemindsThemOfField");
    const periodOfLifeField = canvas.getByTestId("ExperienceForm-PeriodOfLifeField");
    const moodField = canvas.getByTestId("ExperienceForm-EmotionsField");
    const forwardButton = canvas.getByTestId("ExperienceForm-ForwardButton");

    expect(titleField).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();
    expect(experienceDateField).toBeInTheDocument();
    expect(locationField).toBeInTheDocument();
    expect(personItRemindsThemOfField).toBeInTheDocument();
    expect(periodOfLifeField).toBeInTheDocument();
    expect(moodField).toBeInTheDocument();
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
    await userEvent.type(dateInput, "Ja1999", {delay: 100});
    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    expect(errorMessage.textContent).toBe("Please select a location for the experience");

    const locationInput = within(locationField).getByRole('textbox');
    await userEvent.type(locationInput, "New", {delay: 100});
    const suggestions = await canvas.findAllByTestId('LocationSearch-SuggestionListItem');
    expect(suggestions.length).toBeGreaterThan(0);
    await userEvent.click(suggestions[0]);

    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    await waitFor(() => {
      expect(errorMessage).not.toBeInTheDocument();
      expect(titleField).not.toBeInTheDocument();
      expect(descriptionField).not.toBeInTheDocument();
      expect(experienceDateField).not.toBeInTheDocument();
      expect(locationField).not.toBeInTheDocument();
      expect(personItRemindsThemOfField).not.toBeInTheDocument();
      expect(periodOfLifeField).not.toBeInTheDocument();
      expect(moodField).not.toBeInTheDocument();
    });

    // Page 2
    const recipeField = canvas.getByTestId("ExperienceForm-RecipeField");
    const foodTypeField = canvas.getByTestId("ExperienceForm-MealTypeField");
    const cuisineField = canvas.getByTestId("ExperienceForm-CuisineField");
    const flavourProfileField = canvas.getByTestId("ExperienceForm-FlavourProfileField");

    expect(recipeField).toBeInTheDocument();
    expect(foodTypeField).toBeInTheDocument();
    expect(cuisineField).toBeInTheDocument();
    expect(flavourProfileField).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-BackButton")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-ForwardButton")).toBeInTheDocument();

    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    await waitFor(() => {
      expect(recipeField).not.toBeInTheDocument();
      expect(foodTypeField).not.toBeInTheDocument();
      expect(cuisineField).not.toBeInTheDocument();
      expect(flavourProfileField).not.toBeInTheDocument();
    });


    // Page 3
    const uploadFoodPhotoButton = canvas.getByTestId("ExperienceForm-UploadFoodPhotoButton");
    const uploadPersonPhotoButton = canvas.getByTestId("ExperienceForm-UploadPersonPhotoButton");
    const backButton = canvas.getByTestId("ExperienceForm-BackButton");
    const submitButton = canvas.getByTestId("ExperienceForm-SubmitButton");
    expect(uploadFoodPhotoButton).toBeInTheDocument();
    expect(uploadPersonPhotoButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await userEvent.click(canvas.getByTestId("ExperienceForm-SubmitButton"));
    await waitFor(async () => {
      const newErrorMessage = canvas.getByTestId("ExperienceForm-ErrorMessage");
      expect(newErrorMessage.textContent).toBe("Please select a food photo");
    }, { timeout: 5000 });

    const mockImageFile = new File(['mock'], 'mock.png', { type: 'image/png' });
    const uploadFoodPhotoInput = canvas.getByTestId("ExperienceForm-UploadFoodPhotoInput");
    await userEvent.upload(uploadFoodPhotoInput, mockImageFile);
    await sleep(1000);
    await userEvent.click(canvas.getByTestId("ExperienceForm-SubmitButton"));
    await waitFor(() => {
      expect(uploadFoodPhotoButton).not.toBeInTheDocument();
      expect(uploadPersonPhotoButton).not.toBeInTheDocument();
      expect(backButton).not.toBeInTheDocument();
      expect(submitButton).not.toBeInTheDocument();
    }, { timeout: 10000 });

    // Thank You Message
    const thankYouMessageContainer = canvas.getByTestId("ExperienceForm-ThankYouMessage");
    const thankYouMessageText = within(thankYouMessageContainer).getByText("Thank you for submitting your experience");
    expect(thankYouMessageContainer).toBeInTheDocument();
    expect(thankYouMessageText).toBeInTheDocument();
  }
};

export const UpdateExperienceTest: Story = {
  args: {
    mode: "edit",
    existingExperience: mockExperience,
    setSelectedExperience: () => { },
    setExperiences: () => { }
  },
  parameters: {
    msw: {
      handlers: {
        submitUpdate: [createExperienceUpdateHandler(200)],
        getUserData: [createUserFetchHandler(200, [mockUser])],
        autocomplete: [createGeocodeEarthAutocompleteHandler({
          features: [
            {
              type: "Feature",
              properties: { label: 'New York' },
              geometry: {
                type: "Point",
                coordinates: [40.70670836848978, -74.01290748751832]
              }
            }
          ]
        })]
      }
    }
  },
  decorators: [createQueryClientDecorator(new QueryClient())],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify page 1 fields are present and already contain info from provided experience.
    const titleField = canvas.getByTestId("ExperienceForm-TitleField");
    const descriptionField = canvas.getByTestId("ExperienceForm-DescriptionField");
    const experienceDateField = canvas.getByTestId("ExperienceForm-ExperienceDateField");
    const locationField = canvas.getByTestId("ExperienceForm-LocationField");
    const personItRemindsThemOfField = canvas.getByTestId("ExperienceForm-PersonItRemindsThemOfField");
    const periodOfLifeField = canvas.getByTestId("ExperienceForm-PeriodOfLifeField");
    const moodField = canvas.getByTestId("ExperienceForm-EmotionsField");
    const forwardButton = canvas.getByTestId("ExperienceForm-ForwardButton");

    expect(titleField).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();
    expect(experienceDateField).toBeInTheDocument();
    expect(locationField).toBeInTheDocument();
    expect(personItRemindsThemOfField).toBeInTheDocument();
    expect(periodOfLifeField).toBeInTheDocument();
    expect(moodField).toBeInTheDocument();
    expect(forwardButton).toBeInTheDocument();

    const titleInput = within(titleField).getByRole('textbox');
    const descriptionInput = within(descriptionField).getByRole('textbox');
    const experienceDateInput = within(experienceDateField).getByRole('textbox');
    const locationInput = within(locationField).getByRole('textbox');
    expect(titleInput).toHaveValue(mockExperience.title);
    expect(descriptionInput).toHaveValue(mockExperience.description);
    expect(experienceDateInput).toHaveValue(formatISOToAmericanDate(mockExperience.experienceDate));
    expect(locationInput).toHaveValue(mockExperience.place.address.label);
    checkMultiSelectField(personItRemindsThemOfField, mockExperience.personItRemindsThemOf as string);
    checkMultiSelectField(periodOfLifeField, mockExperience.periodOfLifeAssociation as string);
    checkMultiSelectField(moodField, mockExperience.mood as string);

    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    await waitFor(() => {
      expect(titleField).not.toBeInTheDocument();
      expect(descriptionField).not.toBeInTheDocument();
      expect(experienceDateField).not.toBeInTheDocument();
      expect(locationField).not.toBeInTheDocument();
      expect(personItRemindsThemOfField).not.toBeInTheDocument();
      expect(periodOfLifeField).not.toBeInTheDocument();
      expect(moodField).not.toBeInTheDocument();
    });

    // Verify page 2 fields and values
    const recipeField = canvas.getByTestId("ExperienceForm-RecipeField");
    const foodTypeField = canvas.getByTestId("ExperienceForm-MealTypeField");
    const flavourProfileField = canvas.getByTestId("ExperienceForm-FlavourProfileField");
    const cuisineField = canvas.getByTestId("ExperienceForm-CuisineField");

    expect(recipeField).toBeInTheDocument();
    expect(foodTypeField).toBeInTheDocument();
    expect(flavourProfileField).toBeInTheDocument();
    expect(cuisineField).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-BackButton")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-ForwardButton")).toBeInTheDocument();

    expect(within(recipeField).getByRole('textbox')).toHaveValue(mockExperience.recipe);
    checkMultiSelectField(foodTypeField, mockExperience.foodtype as string);
    checkMultiSelectField(flavourProfileField, mockExperience.flavourProfile as string);
    checkMultiSelectField(cuisineField, mockExperience.cuisine as string);

    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    await waitFor(() => {
      expect(recipeField).not.toBeInTheDocument();
      expect(foodTypeField).not.toBeInTheDocument();
      expect(flavourProfileField).not.toBeInTheDocument();
      expect(cuisineField).not.toBeInTheDocument();
    });

    // Verify page 3 fields
    const foodPhotoPreview = canvas.getByTestId("ExperienceForm-FoodPhotoPreview");
    const personPhotoPreview = canvas.getByTestId("ExperienceForm-PersonPhotoPreview");
    const uploadFoodPhotoButton = canvas.getByTestId("ExperienceForm-UploadFoodPhotoButton");
    const uploadPersonPhotoButton = canvas.getByTestId("ExperienceForm-UploadPersonPhotoButton");
    const backButton = canvas.getByTestId("ExperienceForm-BackButton");
    const submitButton = canvas.getByTestId("ExperienceForm-SubmitButton");
    expect(foodPhotoPreview).toBeInTheDocument();
    expect(personPhotoPreview).toBeInTheDocument();
    expect(uploadFoodPhotoButton).toBeInTheDocument();
    expect(uploadPersonPhotoButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(foodPhotoPreview).toHaveAttribute('src', mockExperience.foodPhotoUrl);
    expect(personPhotoPreview).toHaveAttribute('src', mockExperience.personPhotoUrl);
    
    await userEvent.click(canvas.getByTestId("ExperienceForm-SubmitButton"));
    await waitFor(() => {
      expect(uploadFoodPhotoButton).not.toBeInTheDocument();
      expect(uploadPersonPhotoButton).not.toBeInTheDocument();
      expect(backButton).not.toBeInTheDocument();
      expect(submitButton).not.toBeInTheDocument();
    }, {timeout: 5000});

    // Verify Thank You page appears with the correct message
    const thankYouMessageContainer = canvas.getByTestId("ExperienceForm-ThankYouMessage");
    const thankYouMessageText = within(thankYouMessageContainer).getByText("Your experience has been updated");
    expect(thankYouMessageContainer).toBeInTheDocument();
    expect(thankYouMessageText).toBeInTheDocument();
  }
};