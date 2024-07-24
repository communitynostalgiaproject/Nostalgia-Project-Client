import { userEvent, waitFor, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createExperiences } from '../util/mockGenerators';
import ExperienceList from '../../components/lists/ExperienceList';

interface ExperienceListWrapperProps {
  numExperiences: number;
}

const ExperienceListWrapper: React.FC<ExperienceListWrapperProps> = ({
  numExperiences
}) => {
  return (
    <ExperienceList experiences={createExperiences(numExperiences)} />
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
  }
}