import { within, userEvent, waitFor, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { Experience } from '../types/experience';
import { createQueryClientDecorator } from './assets/StorybookDecorators';
import { QueryClient } from 'react-query';
import {
  createUserFetchHandler,
  createUserGetHandler
} from './util/mswHandlers';
import ExperienceView from '../shared/components/side-drawer/ExperienceView';

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
  "foodPhotoUrl": "https://i.imgur.com/EHe1E66.png",
  "createdDate": "2024-01-24T16:11:55.240Z",
  "mood": "joyous,grateful",
  "personItRemindsThemOf": "Aunt Carol",
  "periodOfLifeAssociation": "High School",
  "creatorId": "232156884",
  "placesToGetFood": [],
  "flavourProfile": "savory,spicy",
  "cuisine": "chinese",
  "foodtype": "breakfast",
  "personPhotoUrl": "https://i.imgur.com/E1kZTkU.png",
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

const formatMultiSelectData = (text: string) => {
  return text
    .split(",")
    .map((value: string) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
    .join(", ");
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'views/Experience View',
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
    onClose: () => {},
    setEditModalOpen: () => {},
    setDeleteModalOpen: () => {}
  },
  parameters: {
    msw: {
      handlers: {
        fetchNonCreatorUserData: [createUserFetchHandler(200, [mockUser1])],
        getCreatorUserData: [createUserGetHandler(200, mockUser2)]
      }
    }
  },
  decorators: [createQueryClientDecorator(new QueryClient())]
};

export const LoggedInAsCreator: Story = {
  args: {
    experience: mockExperience,
    onClose: () => { },
    setEditModalOpen: () => { },
    setDeleteModalOpen: () => { }
  },
  parameters: {
    msw: {
      handlers: {
        fetchNonCreatorUserData: [createUserFetchHandler(200, [mockUser2])],
        getCreatorUser: [createUserGetHandler(200, mockUser2)]
      }
    }
  },
  decorators: [createQueryClientDecorator(new QueryClient())]
};

export const CreatorNotFound: Story = {
  args: {
    experience: mockExperience,
    onClose: () => { },
    setEditModalOpen: () => { },
    setDeleteModalOpen: () => { }
  },
  parameters: {
    msw: {
      handlers: {
        fetchNonCreatorUserData: [createUserGetHandler(500)]
      }
    }
  },
  decorators: [createQueryClientDecorator(new QueryClient())]
};

export const NonCreatorViewTest: Story = {
  args: {
    experience: mockExperience,
    onClose: () => { },
    setEditModalOpen: () => { },
    setDeleteModalOpen: () => { }
  },
  parameters: {
    msw: {
      handlers: {
        fetchNonCreatorUserData: [createUserFetchHandler(200, [mockUser1])],
        getCreatorUser: [createUserGetHandler(200, mockUser2)]
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
    expect(canvas.getByTestId("ExperienceView-FoodType").textContent).toContain(formatMultiSelectData(mockExperience.foodtype as string));
    expect(canvas.getByTestId("ExperienceView-FlavourProfile").textContent).toContain(formatMultiSelectData(mockExperience.flavourProfile as string));
    expect(canvas.getByTestId("ExperienceView-Mood").textContent).toContain(formatMultiSelectData(mockExperience.mood as string));
    expect(canvas.getByTestId("ExperienceView-PeriodOfLife").textContent).toContain(formatMultiSelectData(mockExperience.periodOfLifeAssociation as string));
    expect(canvas.getByTestId("ExperienceView-Cuisine").textContent).toContain(formatMultiSelectData(mockExperience.cuisine as string));
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
    onClose: () => { },
    setEditModalOpen: () => { },
    setDeleteModalOpen: () => { }
  },
  parameters: {
    msw: {
      handlers: {
        fetchNonCreatorUserData: [createUserFetchHandler(200, [mockUser2])],
        getCreatorUser: [createUserGetHandler(200, mockUser2)]
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
    expect(canvas.getByTestId("ExperienceView-FoodType").textContent).toContain(formatMultiSelectData(mockExperience.foodtype as string));
    expect(canvas.getByTestId("ExperienceView-FlavourProfile").textContent).toContain(formatMultiSelectData(mockExperience.flavourProfile as string));
    expect(canvas.getByTestId("ExperienceView-Mood").textContent).toContain(formatMultiSelectData(mockExperience.mood as string));
    expect(canvas.getByTestId("ExperienceView-PeriodOfLife").textContent).toContain(formatMultiSelectData(mockExperience.periodOfLifeAssociation as string));
    expect(canvas.getByTestId("ExperienceView-Cuisine").textContent).toContain(formatMultiSelectData(mockExperience.cuisine as string));
    expect(canvas.getByTestId("ExperienceView-RecipeContainer")).toBeInTheDocument();

    await waitFor(() => {
      expect(canvas.getByTestId("ExperienceView-EditButton")).toBeInTheDocument();
      expect(canvas.getByTestId("ExperienceView-DeleteButton")).toBeInTheDocument();
    });

  //   await userEvent.click(canvas.getByTestId("ExperienceView-EditButton"));
  //   await waitFor(() => {
  //     const editModal = screen.getByTestId("ExperienceView-EditModal");
  //     const modal = within(editModal);

  //     expect(editModal).toBeInTheDocument();
  //     expect(modal.getByTestId("ExperienceForm-TitleField")).toBeInTheDocument();
  //     expect(modal.getByTestId("ExperienceForm-DescriptionField")).toBeInTheDocument();
  //     expect(modal.getByTestId("ExperienceForm-ExperienceDateField")).toBeInTheDocument();
  //     expect(modal.getByTestId("ExperienceForm-LocationField")).toBeInTheDocument();
  //     expect(modal.getByTestId("ExperienceForm-ForwardButton")).toBeInTheDocument();

  //     expect(screen.getByTestId("CardModal-CloseButton")).toBeInTheDocument();
  //   });

  //   await userEvent.click(screen.getByTestId("CardModal-CloseButton"));
  //   await waitFor(() => {
  //     expect(screen.queryByTestId("ExperienceView-EditModal")).not.toBeInTheDocument();
  //   });

  //   await userEvent.click(canvas.getByTestId("ExperienceView-DeleteButton"));
  //   await waitFor(() => {
  //     const deleteModal = screen.getByTestId("ExperienceView-DeleteModal");
  //     const modal = within(deleteModal);

  //     expect(deleteModal).toBeInTheDocument();
  //     expect(modal.queryByTestId("ExperienceView-DeleteModalText")).toBeInTheDocument();
  //     expect(modal.queryByTestId("ExperienceView-DeleteModalCancelButton")).toBeInTheDocument();
  //     expect(modal.queryByTestId("ExperienceView-DeleteModalDeleteButton")).toBeInTheDocument();
  //     expect(screen.queryByTestId("CardModal-CloseButton")).toBeInTheDocument();
  //   });

  //   await userEvent.click(screen.getByTestId("ExperienceView-DeleteModalCancelButton"));
  //   await waitFor(() => {
  //     expect(screen.queryByTestId("ExperienceView-DeleteModal")).not.toBeInTheDocument();
  //   });
  }
};