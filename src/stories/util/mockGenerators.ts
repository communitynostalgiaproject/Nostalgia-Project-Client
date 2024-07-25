import { faker } from "@faker-js/faker";
import { Experience } from "../../types/experience";

const moods = [
  "Happy",
  "Sad",
  "Angry",
  "Anxious",
  "Relieved",
  "Confident",
  "Hopeful",
  "Frustrated",
  "Bored",
  "Excited",
  "Calm",
  "Content",
  "Overwhelmed",
  "Indifferent",
  "Nervous",
  "Grateful",
  "Guilty",
  "Fearful",
  "Joyful",
  "Lonely",
  "Curious",
  "Apathetic",
  "Optimistic",
  "Pessimistic",
  "Envious",
  "Jealous",
  "Inspired",
  "Motivated",
  "Relaxed",
  "Resentful"
];

const foodTypes = [
  "Fruits",
  "Vegetables",
  "Grains",
  "Protein",
  "Dairy",
  "Nuts and Seeds",
  "Legumes",
  "Sweets",
  "Beverages",
  "Baked Goods",
  "Snacks",
  "Fast Food",
  "Seafood",
  "Condiments",
  "Herbs and Spices",
  "Frozen Foods",
  "Canned Goods",
  "Prepared Meals",
  "International Cuisine",
  "Gluten-Free",
  "Vegan",
  "Vegetarian",
  "Organic",
  "Non-GMO",
  "Low Carb",
  "Low Fat",
  "Low Sodium",
  "High Protein",
  "Keto",
  "Paleo"
];

const peopleToBeRemindedOf = [
  "Childhood Friend",
  "High School Sweetheart",
  "College Roommate",
  "Favorite Teacher",
  "First Boss",
  "Mentor",
  "Neighbor From Home Town",
  "Summer Camp Buddy",
  "Travel Companion",
  "Family Friend",
  "Old Rival",
  "Team Captain",
  "Band Mate",
  "Art Class Partner",
  "Lab Partner",
  "Library Study Buddy",
  "First Date",
  "Dance Partner",
  "Karaoke Partner",
  "Cooking Class Pal",
  "Gym Buddy",
  "Yoga Instructor",
  "Music Teacher",
  "Sports Coach",
  "Childhood Hero",
  "Parent's Friend",
  "Cousin's Best Friend",
  "Sibling's Ex",
  "Former Colleague",
  "Chess Opponent",
  "Mother",
  "Father",
  "Sibling",
  "Brother",
  "Sister",
  "Grandmother",
  "Grandfather",
  "Aunt",
  "Uncle",
  "Cousin",
  "Niece",
  "Nephew",
  "Best Friend"
];

const flavourProfiles = [
  "Sweet",
  "Sour",
  "Salty",
  "Bitter",
  "Umami",
  "Spicy",
  "Savory",
  "Tangy",
  "Citrus",
  "Earthy",
  "Herbaceous",
  "Fruity",
  "Floral",
  "Nutty",
  "Smoky",
  "Woody",
  "Minty",
  "Creamy",
  "Rich",
  "Crisp",
  "Astringent",
  "Metallic",
  "Pungent",
  "Sharp",
  "Buttery",
  "Mellow",
  "Zesty",
  "Peppery",
  "Toasted",
  "Vanilla",
  "Chocolatey",
  "Caramel"
];

const periodOfLifeAssociations = [
  "Infancy",
  "Toddlerhood",
  "Early Childhood",
  "Middle Childhood",
  "Adolescence",
  "Early Adulthood",
  "Midlife",
  "Mature Adulthood",
  "Late Adulthood",
  "Elderly",
  "Quarter-life Crisis",
  "Midlife Crisis",
  "Empty Nest",
  "Retirement",
  "Golden Years",
  "Second Childhood",
  "Reinvention",
  "Enlightenment",
  "Self-Discovery",
  "Adventure Phase",
  "Sabbatical",
  "Legacy Building",
  "Wisdom Era",
  "Exploration Stage",
  "Reflection Period"
];

const cuisines = [
  "Italian",
  "Chinese",
  "Mexican",
  "French",
  "Japanese",
  "Indian",
  "Thai",
  "Greek",
  "Lebanese",
  "Korean",
  "Spanish",
  "Vietnamese",
  "Moroccan",
  "Turkish",
  "Ethiopian",
  "Brazilian",
  "Peruvian",
  "German",
  "Russian",
  "American"
];

const randomInt = (max: number, min: number = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }

  return Math.floor(Math.random() * (max - min) + min);
}

const createRandomPlaces = (n: number) => {
  if (n < 1) return [];

  const places = [];

  for (let i = 0; i < n; i++) {
    places.push({
      address: {
        gid: faker.string.uuid(),
        sourceId: faker.string.uuid(),
        name: faker.location.streetAddress(),
        accuracy: "point",
        country: faker.location.country(),
        street: faker.location.street(),
        locality: faker.location.city()
      },
      location: {
        type: "Point",
        coordinates: [
          faker.location.latitude(),
          faker.location.longitude()
        ]
      }
    });
  }

  return places;
}

export const createExperiences = (n: number) => {
  if (n < 1) return [];

  const experiences = [];

  for (let i = 0; i < n; i++) {
    const createdDate = faker.date.past().toISOString();
    experiences.push({
      title: faker.lorem.words(randomInt(3, 6)),
      place: createRandomPlaces(1)[0],
      description: faker.lorem.paragraphs({
        min: 1,
        max: 12
      }),
      foodPhotoUrl: "https://whatever.dnm/photos/1234.png",
      personPhotoUrl: Math.random() < 0.4 ? "https://whatever.dnm/photos/2345.png" : undefined,
      createdDate,
      experienceDate: faker.date.past({
        refDate: createdDate
      }).toISOString(),
      mood: moods[randomInt(moods.length)],
      foodtype: foodTypes[randomInt(foodTypes.length)],
      personItRemindsThemOf: peopleToBeRemindedOf[randomInt(peopleToBeRemindedOf.length)],
      flavourProfile: flavourProfiles[randomInt(flavourProfiles.length)],
      cuisine: cuisines[randomInt(cuisines.length)],
      periodOfLifeAssociation: periodOfLifeAssociations[randomInt(periodOfLifeAssociations.length)],
      placesToGetFood: createRandomPlaces(randomInt(3)),
      creatorId: "1111111111111"
    } as Experience);
  }

  return experiences;
};