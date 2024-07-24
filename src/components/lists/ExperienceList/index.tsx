import React from 'react';
import { Experience } from '../../../types/experience';

interface ExperienceListProps {
  experiences: Experience[];
}

const ExperienceList: React.FC<ExperienceListProps> = ({
  experiences
}) => {


  return (
    <div>
      {
        experiences.map((experience, index) => {
          return (
            <p>{experience.title}</p>
          )
        })
      }
    </div>
  );
}

export default ExperienceList;