import React from 'react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { Experience } from '../types/experience';
import ExperienceView from '../components/ExperienceView';

const mockExperience = {
  "_id": "111111111",
  "title": "Aunt Carol's Surprise",
  "place": {
      "address": {
          "label": "Boca Raton, FL, USA",
      },
      "location": {
          "type": "Point",
          "coordinates": [-80.104975, 26.375019]
      }
  },
  "description": 'It was a sultry summer evening in Boca Raton, FL, when I experienced something truly unexpected. My aunt, known for her adventurous cooking, had invited the family over for what she described as a "special Floridian feast." The aroma wafting from her kitchen was mouthwatering, and the spread on the dining table was a sight to behold. As we all gathered around, she proudly presented the main dish, a succulent, tender meat that I initially mistook for chicken. With the first bite, I was enveloped in a symphony of flavors, unlike anything I%27d ever tasted. It was only after savoring a few more bites that my aunt, with a mischievous glint in her eye, revealed that we were feasting on alligator. The revelation sent a ripple of surprise around the table, followed by laughter and a sense of nostalgia. Here I was, in the heart of Florida, enjoying a local delicacy that I had only heard about in stories. It was a moment of culinary adventure that etched itself into my memory, a surprising twist in a familiar setting, leaving me with a newfound appreciation for my aunt\'s unconventional culinary skills.',
  "experienceDate": "2024-01-24T07:00:00.000Z",
  "recipe": "Ingredients:\n- One part sugar\n- One part love\nInstructions:\n1. Add to pot\n2. Stir",
  "foodPhotoUrl": "https://i.imgur.com/wQGlMG6.png",
  "createdDate": "2024-01-24T16:11:55.240Z",
  "mood": "Joyous, Grateful",
  "personItRemindsThemOf": "Aunt Carol",
  "periodOfLifeAssociation": "High School",
  "creatorId": "232156884",
  "placesToGetFood": [],
  "flavourProfile": "Savory, Spicy",
  "foodtype": "Soup",
  "personPhotoUrl": "https://i.imgur.com/yoOp5xN.png",
} as Experience;

const mockUser1 = {
  "_id": "11212121",
  "googleId": "yadayada",
  "email": "faker@test.com",
  "displayName": "Test User 1"
};

const mockUser2 = {
  "_id": mockExperience.creatorId,
  "googleId": "whatever",
  "email": "faker@test.com",
  "displayName": "Test User 2"
};

const createUserFetchHandler = (user: any) => {
  return rest.get(
    /^.+\/users\/fetchData/,
    (_req, res, ctx) => {
      return res(ctx.json(user));
    }
  );
};

const createUserGetHandler = (user: any) => {
  return rest.get(
    /^.+\/users\/[0-9a-zA-Z]+$/,
    (_req, res, ctx) => {
      return res(ctx.json(user));
    }
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Experience View',
  component: ExperienceView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof ExperienceView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotLoggedInAsCreator: Story = {
  args: {
    experience: mockExperience,
    onDelete: async () => {
      console.log("You shouldn't be able to call this if you're not logged in as the experience creator");
      return false;
    }
  },
  parameters: {
    msw: {
      handlers: {
        fetchNonCreatorUserData: [createUserFetchHandler(mockUser1)],
        getCreatorUserData: [createUserGetHandler(mockUser2)]
      }
    }
  }
};

export const LoggedInAsCreator: Story = {
  args: {
    experience: mockExperience,
    onDelete: async () => {
      console.log("Called onDelete");
      await new Promise(resolve => setTimeout(resolve, 1500));
    
      return true;
    }
  },
  parameters: {
    msw: {
      handlers: {
        fetchNonCreatorUserData: [createUserFetchHandler(mockUser2)],
        getCreatorUser: [createUserGetHandler(mockUser2)]
      }
    }
  }
};

export const CreatorNotFound: Story = {
  args: {
    experience: mockExperience,
    onDelete: async () => {
      console.log("You shouldn't be able to call this if you're not logged in as the experience creator");
      return false;
    }
  },
  parameters: {
    msw: {
      handlers: {
        fetchNonCreatorUserData: [createUserFetchHandler(mockUser1)]
      }
    }
  }
};

// export const NonCreatorUserRenderingTest: Story = {
//   args: {
//     experience: mockExperience,
//     onDelete: async () => {
//       console.log("You shouldn't be able to call this if you're not logged in as the experience creator");
//       return false;
//     }
//   },
//   parameters: {
//     msw: {
//       handlers: {
//         fetchNonCreatorUserData: [createUserFetchHandler(mockUser)]
//       }
//     }
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);

//     const 
//   }
// };