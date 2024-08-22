import React, { useState } from "react";
import "./styles.css";
import { getCachedData } from "./utils/getCachedData";
interface SearchBoxProps {
  label: string;
  placeholder: string;
  baseUrl: string;
  autoComplete: boolean;
  debounceTimer: number;
}

const SearchBox = ({
  label,
  placeholder,
  baseUrl,
  autoComplete,
  debounceTimer,
}: SearchBoxProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [listData, setListData] = useState([]);
  const getData = getCachedData({ baseUrl, cacheTimeout: 3000 });
  const debouncedChangeHandler = (fn, debTimeout) => {
    let timerRef;

    return function () {
      const { shouldSearch } = onChangeHandler(arguments[0]);
      clearTimeout(timerRef);
      if (shouldSearch && autoComplete) {
        timerRef = setTimeout(() => {
          fn(...arguments).then((dataList) => {
            setListData(dataList);
          });
        }, debTimeout);
      }
    };
  };
  const onChangeHandler = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    return { shouldSearch: value && value !== "" };
  };
  return (
    <div className="searchBoxContainer">
      <text>{label}</text>
      <input
        placeholder={placeholder}
        value={searchValue}
        onChange={debouncedChangeHandler(getData, debounceTimer)}
      ></input>
      <div className="listBox">
        {listData.map((item: { name: string }) => item.name)}
      </div>
    </div>
  );
};
export default SearchBox;
