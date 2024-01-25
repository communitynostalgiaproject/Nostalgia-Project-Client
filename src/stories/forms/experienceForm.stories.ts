import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { Experience } from '../../types/experience';
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

const submitUpdateHandler = rest.patch(`${process.env.REACT_APP_API_URL}/experiences/${mockExperience._id}`, (_req, res, ctx) => {
  return res(ctx.status(200));
});

const getUserDataHandler = rest.get(
  `${process.env.REACT_APP_API_URL}/users/fetchData`,
  (_req, res, ctx) => {
    return res(ctx.json(mockUser));
  }
);

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