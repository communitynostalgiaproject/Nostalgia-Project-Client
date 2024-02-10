import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { rest } from 'msw';
import { Experience } from '../../types/experience';
import { createQueryClientDecorator } from "../assets/StorybookDecorators";
import { QueryClient } from 'react-query';
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

const submitCreateHandler = rest.post(/^.+\/experiences/, (_req, res, ctx) => {
  return res(ctx.status(201));
});

const submitUpdateHandler = rest.patch(/^.+\/experiences\/.+$/, (_req, res, ctx) => {
  return res(
    ctx.delay(2500),
    ctx.status(200)
  );
});

const getUserDataHandler = rest.get(
  /^.+\/users\/fetchData/,
  (_req, res, ctx) => {
    return res(ctx.json(mockUser));
  }
);

const autocompleteHandler = rest.get('https://api.geocode.earth/v1/autocomplete', (_req, res, ctx) => {
    console.log("In autocompleteWorker");
    return res(ctx.json({ features: [{ properties: { label: 'New York' } }] }));
});

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const formatISOToAmericanDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();
  const year = date.getFullYear();

  // Pad the month and day with leading zeros if necessary
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');

  return `${formattedMonth}/${formattedDay}/${year}`;
};


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

export const NewExperience: Story = {
  decorators: [createQueryClientDecorator(new QueryClient())]
};
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
  decorators: [createQueryClientDecorator(new QueryClient())]
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
  decorators: [createQueryClientDecorator(new QueryClient())],
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
    await waitFor(() => {
      expect(errorMessage).not.toBeInTheDocument();
      expect(titleField).not.toBeInTheDocument();
      expect(descriptionField).not.toBeInTheDocument();
      expect(experienceDateField).not.toBeInTheDocument();
      expect(locationField).not.toBeInTheDocument();
    });

    // Page 2
    const recipeField = canvas.getByTestId("ExperienceForm-RecipeField");
    expect(recipeField).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-BackButton")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-ForwardButton")).toBeInTheDocument();

    const recipeInput = within(recipeField).getByRole('textbox');
    await userEvent.type(recipeInput, "- Boil water\n- Dunk tea bag", {delay: 100});
    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    await waitFor(() => {
      expect(recipeField).not.toBeInTheDocument();
    });

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
    await waitFor(() => {
      expect(personItRemindsThemOfField).not.toBeInTheDocument();
      expect(periodOfLifeField).not.toBeInTheDocument();
      expect(moodField).not.toBeInTheDocument();
      expect(foodTypeField).not.toBeInTheDocument();
      expect(flavourProfileField).not.toBeInTheDocument();
    });


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
    await waitFor(async () => {
      const newErrorMessage = canvas.getByTestId("ExperienceForm-ErrorMessage");
      expect(newErrorMessage.textContent).toBe("Please select a food photo");
    }, { timeout: 5000 });

    const mockImageFile = new File(['mock'], 'mock.png', { type: 'image/png' });
    const uploadFoodPhotoInput = canvas.getByTestId("ExperienceForm-UploadFoodPhotoInput");
    await userEvent.upload(uploadFoodPhotoInput, mockImageFile);
    await userEvent.click(canvas.getByTestId("ExperienceForm-SubmitButton"));
    await waitFor(() => {
      expect(uploadFoodPhotoButton).not.toBeInTheDocument();
      expect(uploadPersonPhotoButton).not.toBeInTheDocument();
      expect(backButton).not.toBeInTheDocument();
      expect(submitButton).not.toBeInTheDocument();
    });

    // Thank You Message
    const thankYouMessageContainer = canvas.getByTestId("ExperienceForm-ThankYouMessage");
    const thankYouMessageText = within(thankYouMessageContainer).getByText("Thank you for submitting your experience");
    expect(thankYouMessageContainer).toBeInTheDocument();
    expect(thankYouMessageText).toBeInTheDocument();
  }
};

export const UpdateExperienceTest: Story = {
  args: {
    existingExperience: mockExperience
  },
  parameters: {
    msw: {
      handlers: {
        submitUpdate: [submitUpdateHandler],
        autoComplete: [autocompleteHandler],
        getUserData: [getUserDataHandler]
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
    const forwardButton = canvas.getByTestId("ExperienceForm-ForwardButton");
    expect(titleField).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();
    expect(experienceDateField).toBeInTheDocument();
    expect(locationField).toBeInTheDocument();
    expect(forwardButton).toBeInTheDocument();

    const titleInput = within(titleField).getByRole('textbox');
    const descriptionInput = within(descriptionField).getByRole('textbox');
    const experienceDateInput = within(experienceDateField).getByRole('textbox');
    const locationInput = within(locationField).getByRole('textbox');
    expect(titleInput).toHaveValue(mockExperience.title);
    expect(descriptionInput).toHaveValue(mockExperience.description);
    expect(experienceDateInput).toHaveValue(formatISOToAmericanDate(mockExperience.experienceDate));
    expect(locationInput).toHaveValue(mockExperience.place.address.label);

    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    await waitFor(() => {
      expect(titleField).not.toBeInTheDocument();
      expect(descriptionField).not.toBeInTheDocument();
      expect(experienceDateField).not.toBeInTheDocument();
      expect(locationField).not.toBeInTheDocument();
    });

    // Verify page 2 fields and values
    const recipeField = canvas.getByTestId("ExperienceForm-RecipeField");
    expect(recipeField).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-BackButton")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-ForwardButton")).toBeInTheDocument();

    const recipeInput = within(recipeField).getByRole('textbox');
    expect(recipeInput).toHaveValue(mockExperience.recipe);

    await sleep(1000);
    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    await waitFor(() => {
      expect(recipeField).not.toBeInTheDocument();
    });

    // Verify page 3 fields and values
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

    const personItRemindsThemOfInput = within(personItRemindsThemOfField).getByRole('textbox');
    const periodOfLifeInput = within(periodOfLifeField).getByRole('textbox');
    const moodInput = within(moodField).getByRole('textbox');
    const foodTypeInput = within(foodTypeField).getByRole('textbox');
    const flavourProfileInput = within(flavourProfileField).getByRole('textbox');
    expect(personItRemindsThemOfInput).toHaveValue(mockExperience.personItRemindsThemOf);
    expect(periodOfLifeInput).toHaveValue(mockExperience.periodOfLifeAssociation);
    expect(moodInput).toHaveValue(mockExperience.mood);
    expect(foodTypeInput).toHaveValue(mockExperience.foodtype);
    expect(flavourProfileInput).toHaveValue(mockExperience.flavourProfile);

    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    await waitFor(() => {
      expect(personItRemindsThemOfField).not.toBeInTheDocument();
      expect(periodOfLifeField).not.toBeInTheDocument();
      expect(moodField).not.toBeInTheDocument();
      expect(foodTypeField).not.toBeInTheDocument();
      expect(flavourProfileField).not.toBeInTheDocument();
    });

    // Verify page 4 fields
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

export const PagingFunctionalityTest: Story = {
  args: {
    existingExperience: mockExperience
  },
  parameters: {
    msw: {
      handlers: {
        submitUpdate: [submitUpdateHandler],
        autoComplete: [autocompleteHandler],
        getUserData: [getUserDataHandler]
      }
    }
  },
  decorators: [createQueryClientDecorator(new QueryClient())],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify paging starts at page 1
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

    // Verify page 2 appears and page 1 disappears when forward button is pressed  
    await sleep(1000);
    await userEvent.click(canvas.getByTestId("ExperienceForm-ForwardButton"));
    await waitFor(() => {
      expect(titleField).not.toBeInTheDocument();
      expect(descriptionField).not.toBeInTheDocument();
      expect(experienceDateField).not.toBeInTheDocument();
      expect(locationField).not.toBeInTheDocument();
    });
 
    const recipeField = canvas.getByTestId("ExperienceForm-RecipeField");
    const backButton = canvas.getByTestId("ExperienceForm-BackButton");
    expect(canvas.getByTestId("ExperienceForm-ForwardButton")).toBeInTheDocument();

    console.log(`back button: ${JSON.stringify(backButton.classList)}`);
    

    // Verify pressing the back button makes page 2 disappear and page 1 re-appear
    await userEvent.click(backButton);
    await waitFor(() => {
      expect(recipeField).not.toBeInTheDocument();
    });

    expect(canvas.getByTestId("ExperienceForm-TitleField")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-DescriptionField")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-ExperienceDateField")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-LocationField")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceForm-ForwardButton")).toBeInTheDocument();
    await waitFor(() => {
      expect(canvas.queryByTestId("ExperienceForm-BackButton")).not.toBeInTheDocument();
    });
  }
};