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
  const debouncedChangeHandler = (fn: any, debTimeout: any) => {
    let timerRef: any;

    return function () {
      const { shouldSearch } = onChangeHandler(arguments[0]);
      clearTimeout(timerRef);
      if (shouldSearch && autoComplete) {
        timerRef = setTimeout(() => {
          console.log("arguments", arguments[0]);
          const event = arguments[0];
          fn({ searchItem: "people" }).then((dataList: any) => {
            console.log("dataList", dataList);
            setListData(dataList);
          });
        }, debTimeout);
      }
    };
  };
  const onChangeHandler = (event: any) => {
    const value = event.target.value;
    setSearchValue(value);
    return { shouldSearch: value && value !== "" };
  };
  return (
    <div className="searchBoxContainer">
      <input
        style={{ padding: "10px", borderRadius: "10px", fontSize: "15px" }}
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
