import { Autocomplete } from "@mui/joy";
import React, { Component } from "react";
import Chip from "@mui/joy/Chip";

const SearchBox = (props) => {
  //getting the props
  const { breeds, selected, setSelected } = props;

  //this method gets the latest value and updates the selected value based on that
  const handleChange = (event, newValue) => {
    setSelected(JSON.parse(JSON.stringify(newValue)));
  };

  return (
    <Autocomplete
      multiple
      id="tags-default"
      placeholder="Breeds"
      options={breeds}
      onChange={handleChange}
      getOptionLabel={(option) => option.title}
      size="lg"
      renderTags={(tags, getTagProps) =>
        tags.map((item, index) => (
          <Chip
            variant="solid"
            color="warning"
            // endDecorator={<Close fontSize="sm" />}
            {...getTagProps({ index })}
          >
            {item.title}
          </Chip>
        ))
      }
    />
  );
};

export default SearchBox;
