export interface ExperienceSubmission {
  title: string;
  description: string;
  recipe: string;
  experienceDate: string;
  mood: string;
  foodtype: string;
  personItRemindsThemOf: string;
  flavourProfile: string;
  periodOfLifeAssociation: string;
  place: undefined | {
    address: any;
    location: any;
  };
}