import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { debounce } from "lodash";
import { Place } from "../../types/experience";
import axios from "axios";
import {
  TextField,
  List,
  ListItem,
  Paper,
  Box
} from "@mui/material";
import { PeliasGeoJSONFeature } from "@stadiamaps/api";

interface LocationSearchParams {
  setLocation: (location: PeliasGeoJSONFeature) => void;
  currentLocation?: string;
  focus?: { lat: number, long: number };
  error?: boolean;
  boxProps?: any;
  listProps?: any;
  fieldProps?: any;
}

const LocationSearch: React.FC<LocationSearchParams> = ({ 
  setLocation,
  currentLocation,
  focus,
  error,
  boxProps,
  listProps,
  fieldProps
}) => {
  const [inputText, setInputText] = useState<string>(currentLocation || "");
  const [searchText, setSearchText] = useState<string>("");
  const [doSearch, setDoSearch] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<PeliasGeoJSONFeature[]>([]);
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

    setSuggestions(res.data.features as PeliasGeoJSONFeature[]);
  }, {
    enabled: false
  });

  const debouncedChangeHandler = useCallback(debounce((text) => {
    setSearchText(text);
  }, 150), []);

  const hideSuggestions = () => {
    setDoSearch(false);
    setSuggestions([]);
  };

  const handleSelectSuggestion = (suggestion: PeliasGeoJSONFeature) => {
    setLocation(suggestion);
    hideSuggestions();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    debouncedChangeHandler(e.target.value);
  };

  const handleFocus = () => {
    setDoSearch(true);
    setInputText("");
  };

  const handleOnBlur = () => {
    setDoSearch(false);
    setInputText(currentLocation || "");
    setTimeout(() => {
      setSuggestions([]);
    }, 150);
  };

  useEffect(() => {
    if (searchText.length >= 2 && doSearch) refetch();
  }, [searchText, refetch]);
  
  useEffect(() => {
    setInputText(currentLocation || "");
  }, [currentLocation]);

  return (
    <Box {...boxProps}>
      <TextField
        fullWidth
        value={inputText}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleOnBlur}
        placeholder="Search for a location"
        variant="outlined"
        data-testid="LocationSearch-InputField"
        label="Location"
        error={error}
        {...fieldProps}
      />
      {suggestions.length > 0 && (
        <Paper 
          style={{ 
            position: 'absolute', 
            width: '100%', 
            maxHeight: 200, 
            overflow: 'auto', 
            zIndex: 5,
            backgroundColor: "rgba(255,255,255,1)",
            opacity: 1
          }}
          elevation={3}
          data-testid="LocationSearch-SuggestionListContainer"
          {...listProps}
        >
          <List
            component="nav"
          >
            {suggestions.map((suggestion, index) => (
              <ListItem 
                button 
                key={index} 
                onClick={() => handleSelectSuggestion(suggestion)}
                data-testid="LocationSearch-SuggestionListItem"
              >
                {suggestion.properties?.label}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default LocationSearch;