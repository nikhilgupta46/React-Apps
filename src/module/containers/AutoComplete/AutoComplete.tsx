import React from "react";
import { API_BASE_URL } from "./constants";
import SearchBox from "./SearchBox";

const AutoComplete = () => {
  return (
    <SearchBox
      label="search"
      placeholder="search"
      baseUrl={API_BASE_URL}
      debounceTimer={2000}
      autoComplete
    />
  );
};

export { AutoComplete };
