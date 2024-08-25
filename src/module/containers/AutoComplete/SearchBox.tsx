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
  const [loading, setLoading] = useState(false);
  const getData = getCachedData({ baseUrl, cacheTimeout: 30000 });
  const debouncedChangeHandler = (fn: any, debTimeout: any) => {
    let timerRef: any;

    return function () {
      const { shouldSearch } = onChangeHandler(arguments[0]);
      clearTimeout(timerRef);
      if (shouldSearch && autoComplete) {
        setLoading(true);
        timerRef = setTimeout(() => {
          const event = arguments[0];
          fn({ searchItem: event.target.value }).then((dataList: any) => {
            setListData(dataList.data.items);
            setLoading(false);
          });
        }, debTimeout);
      } else {
        setListData([]);
      }
    };
  };
  const onChangeHandler = (event: any) => {
    const value = event.target.value;
    setSearchValue(value);
    return { shouldSearch: value && value !== "" };
  };
  const searchContainerStyles =
    listData.length > 0
      ? {
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          borderBottomWidth: "0px",
        }
      : {};
  return (
    <div className="searchBoxContainer">
      <input
        style={{
          padding: "10px",
          borderRadius: "10px",
          fontSize: "15px",
          ...searchContainerStyles,
          position: "relative",
        }}
        placeholder={placeholder}
        value={searchValue}
        onChange={debouncedChangeHandler(getData, debounceTimer)}
      ></input>
      {loading ? (
        <div
          style={{
            position: "absolute",
            right: 0,
            color: "black",
            fontSize: "30px",
            fontWeight: "bolder",
            marginRight: "10px",
            height: "100%",
            display: "flex",
            flexDirection: "row",
          }}
          className="loading"
        >
          <div className="dot">.</div>
          <div className="dot">.</div>
          <div className="dot">.</div>
        </div>
      ) : null}
      {listData.length ? (
        <div className="listBox">
          {listData.map((item: { name: string }) => (
            <text
              style={{
                color: "black",
                border: "1px solid black",
                borderTopWidth: "1px",
                borderBottomWidth: "0px",
                cursor: "pointer",
              }}
            >
              {item.name}
            </text>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default SearchBox;
