import { userEvent, waitFor, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createExperiences } from '../util/mockGenerators';
import { Box } from '@mui/material';
import ExperienceList from '../../components/lists/ExperienceList';
import { createLandingPageContextDecorator } from '../assets/StorybookDecorators';
import { QueryClient } from 'react-query';

interface ExperienceListWrapperProps {
  numExperiences: number;
}

const ExperienceListWrapper: React.FC<ExperienceListWrapperProps> = ({
  numExperiences
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white"
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: "600px",
          paddingBottom: "30px",
        }}
      >
        <ExperienceList
          headerText="List Title"
          experiences={createExperiences(numExperiences)}
        />
      </Box>
    </div>
  )
}

const meta = {
  title: 'Lists/Experience List',
  component: ExperienceListWrapper,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ExperienceListWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    numExperiences: 10,
  },
  decorators: [
    createLandingPageContextDecorator(new QueryClient())
  ]
}