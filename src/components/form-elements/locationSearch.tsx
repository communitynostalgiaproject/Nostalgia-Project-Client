import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { debounce } from "lodash";
import axios from "axios";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";

interface LocationFeature {
  geometry: {
    type: string;
    coordinates: any[];
  };
  properties: any;
}

interface LocationSearchParams {
  setLocation: (location: any) => void;
  location?: LocationFeature;
  focus?: { lat: number, long: number };
}

const LocationSearch: React.FC<LocationSearchParams> = ({ 
  setLocation,
  location,
  focus
}) => {
  const [inputText, setInputText] = useState<string>(location?.properties?.label || "");
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [doSearch, setDoSearch] = useState<boolean>(true);
  const api_key = process.env.REACT_APP_GEOCODE_API_KEY;
  const { refetch } = useQuery("suggestions", async () => {
    const res = await axios.get(`https://api.geocode.earth/v1/autocomplete`, {
      params: {
        api_key,
        text: searchText,
        "focus.point.lat": focus?.lat,
        "focus.point.long": focus?.long
      }
    });

    setSuggestions(res.data.features);
  }, {
    enabled: false
  });

  const selectSuggestion = (location: any) => {
    setLocation(location);
    setDoSearch(false);
    setInputText(location.properties.label);
    setSuggestions([]);
  };

  const debouncedChangeHandler = useCallback(debounce((text) => {
    setSearchText(text);
  }, 150), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!doSearch) setDoSearch(true);
    setInputText(e.target.value);
    debouncedChangeHandler(e.target.value);
  };

  useEffect(() => {
    if (searchText.length >= 2 && doSearch) refetch();
  }, [searchText, refetch]);

  return (
    <div>
      <TextField
        fullWidth
        value={inputText}
        onChange={handleChange}
        placeholder="Search for a location"
        variant="outlined"
      />
      {suggestions.length > 0 && (
        <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
          <List component="nav">
            {suggestions.map((suggestion, index) => (
              <ListItem 
                button 
                key={index} 
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion.properties.label}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default LocationSearch;