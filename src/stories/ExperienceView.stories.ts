import React from 'react';
import { within, userEvent, waitFor, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { Experience } from '../types/experience';
import { createQueryClientDecorator } from './assets/StorybookDecorators';
import { QueryClient } from 'react-query';
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

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
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
  },
  decorators: [createQueryClientDecorator(new QueryClient())]
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
  },
  decorators: [createQueryClientDecorator(new QueryClient())]
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
  },
  decorators: [createQueryClientDecorator(new QueryClient())]
};

export const NonCreatorViewTest: Story = {
  args: {
    experience: mockExperience,
    onDelete: async () => true,
  },
  parameters: {
    msw: {
      handlers: {
        fetchNonCreatorUserData: [createUserFetchHandler(mockUser1)],
        getCreatorUser: [createUserGetHandler(mockUser2)]
      }
    }
  },
  decorators: [createQueryClientDecorator(new QueryClient())],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByTestId("ExperienceView-FoodPhotoImage")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceView-ExperienceTitle").textContent).toBe(mockExperience.title);
    expect(canvas.getByTestId("ExperienceView-Description").textContent).toBe(decodeURIComponent(mockExperience.description));
    expect(canvas.getByTestId("ExperienceView-ExperienceLocationLabel").textContent).toBe(mockExperience.place.address.label);
    expect(canvas.getByTestId("ExperienceView-ExperienceDateText")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceView-PersonPhoto")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceView-FoodType").textContent).toContain(mockExperience.foodtype);
    expect(canvas.getByTestId("ExperienceView-FlavourProfile").textContent).toContain(mockExperience.flavourProfile);
    expect(canvas.getByTestId("ExperienceView-Mood").textContent).toContain(mockExperience.mood);
    expect(canvas.getByTestId("ExperienceView-PeriodOfLife").textContent).toContain(mockExperience.periodOfLifeAssociation);
    expect(canvas.getByTestId("ExperienceView-RecipeContainer")).toBeInTheDocument();

    await waitFor(() => {
      expect(canvas.getByTestId("ExperienceView-CreatedBy").textContent).toContain(`Created by: ${mockUser2.displayName}`);
      expect(canvas.queryByTestId("ExperienceView-EditButton")).not.toBeInTheDocument();
      expect(canvas.queryByTestId("ExperienceView-DeleteButton")).not.toBeInTheDocument();
      expect(canvas.queryByTestId("ExperienceView-EditModal")).not.toBeInTheDocument();
      expect(canvas.queryByTestId("ExperienceView-DeleteModal")).not.toBeInTheDocument();
    });
  }
};

export const CreatorViewTest: Story = {
  args: {
    experience: mockExperience,
    onDelete: async () => true,
  },
  parameters: {
    msw: {
      handlers: {
        fetchNonCreatorUserData: [createUserFetchHandler(mockUser2)],
        getCreatorUser: [createUserGetHandler(mockUser2)]
      }
    }
  },
  decorators: [createQueryClientDecorator(new QueryClient())],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByTestId("ExperienceView-FoodPhotoImage")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceView-ExperienceTitle").textContent).toBe(mockExperience.title);
    expect(canvas.getByTestId("ExperienceView-Description").textContent).toBe(decodeURIComponent(mockExperience.description));
    expect(canvas.getByTestId("ExperienceView-ExperienceLocationLabel").textContent).toBe(mockExperience.place.address.label);
    expect(canvas.getByTestId("ExperienceView-ExperienceDateText")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceView-CreatedBy").textContent).toContain("Created by:");
    expect(canvas.getByTestId("ExperienceView-PersonPhoto")).toBeInTheDocument();
    expect(canvas.getByTestId("ExperienceView-FoodType").textContent).toContain(mockExperience.foodtype);
    expect(canvas.getByTestId("ExperienceView-FlavourProfile").textContent).toContain(mockExperience.flavourProfile);
    expect(canvas.getByTestId("ExperienceView-Mood").textContent).toContain(mockExperience.mood);
    expect(canvas.getByTestId("ExperienceView-PeriodOfLife").textContent).toContain(mockExperience.periodOfLifeAssociation);
    expect(canvas.getByTestId("ExperienceView-RecipeContainer")).toBeInTheDocument();

    await waitFor(() => {
      expect(canvas.getByTestId("ExperienceView-EditButton")).toBeInTheDocument();
      expect(canvas.getByTestId("ExperienceView-DeleteButton")).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByTestId("ExperienceView-EditButton"));
    await waitFor(() => {
      const editModal = screen.getByTestId("ExperienceView-EditModal");
      const modal = within(editModal);

      expect(editModal).toBeInTheDocument();
      expect(modal.getByTestId("ExperienceForm-TitleField")).toBeInTheDocument();
      expect(modal.getByTestId("ExperienceForm-DescriptionField")).toBeInTheDocument();
      expect(modal.getByTestId("ExperienceForm-ExperienceDateField")).toBeInTheDocument();
      expect(modal.getByTestId("ExperienceForm-LocationField")).toBeInTheDocument();
      expect(modal.getByTestId("ExperienceForm-ForwardButton")).toBeInTheDocument();

      expect(screen.getByTestId("CardModal-CloseButton")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("CardModal-CloseButton"));
    await waitFor(() => {
      expect(screen.queryByTestId("ExperienceView-EditModal")).not.toBeInTheDocument();
    });

    await userEvent.click(canvas.getByTestId("ExperienceView-DeleteButton"));
    await waitFor(() => {
      const deleteModal = screen.getByTestId("ExperienceView-DeleteModal");
      const modal = within(deleteModal);

      expect(deleteModal).toBeInTheDocument();
      expect(modal.queryByTestId("ExperienceView-DeleteModalText")).toBeInTheDocument();
      expect(modal.queryByTestId("ExperienceView-DeleteModalCancelButton")).toBeInTheDocument();
      expect(modal.queryByTestId("ExperienceView-DeleteModalDeleteButton")).toBeInTheDocument();
      expect(screen.queryByTestId("CardModal-CloseButton")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("ExperienceView-DeleteModalCancelButton"));
    await waitFor(() => {
      expect(screen.queryByTestId("ExperienceView-DeleteModal")).not.toBeInTheDocument();
    });
  }
};