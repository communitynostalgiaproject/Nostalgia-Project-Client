import type { Meta, StoryObj } from '@storybook/react';
import ExperienceForm from '../../../components/forms/ExperienceForm';

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
    existingExperience: {
      "_id": "65b137539dad1e02ce49de6e",
      "title": "Test Experience 2",
      "place": {
          "address": {
              "id": "85932083",
              "gid": "whosonfirst:locality:85932083",
              "layer": "locality",
              "source": "whosonfirst",
              "source_id": "85932083",
              "country_code": "US",
              "name": "Boca Raton",
              "accuracy": "centroid",
              "country": "United States",
              "country_gid": "whosonfirst:country:85633793",
              "country_a": "USA",
              "region": "Florida",
              "region_gid": "whosonfirst:region:85688651",
              "region_a": "FL",
              "county": "Palm Beach County",
              "county_gid": "whosonfirst:county:102085845",
              "locality": "Boca Raton",
              "locality_gid": "whosonfirst:locality:85932083",
              "continent": "North America",
              "continent_gid": "whosonfirst:continent:102191575",
              "label": "Boca Raton, FL, USA",
              "addendum": {
                  "concordances": {
                      "dbp:id": "Boca_Raton%2C_Florida",
                      "fb:id": "en.boca_raton",
                      "fct:id": "08bfb846-8f76-11e1-848f-cfd5bf3ef515",
                      "fips:code": "1207300",
                      "gn:id": {
                          "$numberInt": "4148411"
                      },
                      "gp:id": {
                          "$numberInt": "2366220"
                      },
                      "nyt:id": "31229688319904993791",
                      "qs_pg:id": {
                          "$numberInt": "240066"
                      },
                      "uscensus:geoid": "1207300",
                      "wd:id": "Q29422",
                      "wk:page": "Boca Raton, Florida"
                  }
              }
          },
          "location": {
              "type": "Point",
              "coordinates": [-80.104975, 26.375019]
          }
      },
      "description": "This one doesn't have a person photo",
      "experienceDate": "2024-01-24T07:00:00.000Z",
      "foodPhotoUrl": "https://cni-dev.s3.amazonaws.com/2Q==",
      "createdDate": "2024-01-24T16:11:55.240Z",
      "mood": "Pain",
      "personItRemindsThemOf": "",
      "periodOfLifeAssociation": "Prison",
      "creatorId": "65738d94bcb233ecb2cea1ed",
      "placesToGetFood": [],
      "flavourProfile": "Despair",
      "foodtype": "Prison food",
      "personPhotoUrl": "https://cni-dev.s3.amazonaws.com/38GOT3bOcYjMQAAAABJRU5ErkJggg=="
    }
  }
};