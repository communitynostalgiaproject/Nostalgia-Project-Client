import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useQuery } from 'react-query';
import axios from "axios";
import LocationSearch from '../form-elements/locationSearch';

interface Experience {
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

const ExperienceForm: React.FC = () => {
  const [experience, setExperience] = useState<Experience>({
    title: '',
    description: '',
    recipe: '',
    experienceDate: '',
    mood: '',
    foodtype: '',
    personItRemindsThemOf: '',
    flavourProfile: '',
    periodOfLifeAssociation: '',
    place: undefined
  });
  const [foodPhoto, setFoodPhoto] = useState<File | null>(null);
  const [personPhoto, setPersonPhoto] = useState<File | null>(null);
  const { data: user } = useQuery("users", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fetchData`, { withCredentials: true });

    return res.data;
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setExperience({ ...experience, [name]: value });
  };

  const setLocation = (location: any) => {
    const place = {
      address: location.properties,
      location: location.geometry
    };

    setExperience({
      ...experience,
      place
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData();
    const stringifiedExperience = JSON.stringify({
      ...experience,
      creatorId: user._id
    })
    formData.append("experience", stringifiedExperience);
    if (foodPhoto) {
      formData.append("foodPhoto", foodPhoto);
    }
    if (personPhoto) {
      formData.append("personPhoto", personPhoto);
    }

    try {
      // // await experiencesRequest.post(formData);
      // console.log(`form data: ${JSON.stringify(formData.entries)}`);
      await axios.post(`${process.env.REACT_APP_API_URL}/experiences`, formData, {
        withCredentials: true
      });
    } catch(err) {
      console.log(`Could not complete post: ${err}`);
    }
  };

  useEffect(() => {
    console.log(`user: ${JSON.stringify(user)}`);
  }, [user]);

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Experience
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Experience Title"
            name="title"
            autoFocus
            onChange={handleChange}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Describe your experience"
            name="description"
            multiline
            autoFocus
            onChange={handleChange}
        />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            label="Recipe"
            name="recipe"
            autoFocus
            onChange={handleChange}
        />
        <LocationSearch
          setLocation={setLocation}
          currentLocation={experience.place?.address.label}
        />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            label="Experience Date"
            name="experienceDate"
            autoFocus
            onChange={handleChange}
        />

        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Who does this food remind you of?"
            name="personItRemindsThemOf"
            autoFocus
            onChange={handleChange}
        />  
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="What period of life do you associate with this food?"
            name="periodOfLifeAssociation"
            autoFocus
            onChange={handleChange}
        />  
        <TextField
          label="What mood(s) do you associate with this food?"
          name="mood"
          value={experience.mood}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Food Type"
          name="foodtype"
          value={experience.foodtype}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          select
          label="Flavour Profile"
          name="flavourProfile"
          value={experience.flavourProfile}
          onChange={handleChange}
          fullWidth
        >
        </TextField>
        {/* File upload for food photo */}
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="food-photo-upload"
          type="file"
          name="foodPhoto"
          onChange={(e) => e.target?.files?.[0] && setFoodPhoto(e.target.files[0])}
        />
        <label htmlFor="food-photo-upload">
          <Button variant="contained" color="primary" component="span">
            Upload Food Photo
          </Button>
        </label>

        {/* File upload for person photo */}
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="person-photo-upload"
          type="file"
          name="personPhoto"
          onChange={(e) => e.target?.files?.[0] && setPersonPhoto(e.target.files[0])}
        />
        <label htmlFor="person-photo-upload">
          <Button variant="contained" color="primary" component="span" style={{ marginTop: 10 }}>
            Upload Person Photo
          </Button>
        </label>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ExperienceForm;
