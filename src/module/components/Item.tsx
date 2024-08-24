import "./styles.css";
import React from "react";
export const Item = ({
  label,
  route,
  children,
}: {
  label: string;
  children: any;
  route: string;
}) => {
  return (
    <div className="gridItem">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <text style={{ display: "hidden" }} onClick={() => {}}></text>
        <text
          style={{
            color: "black",
            fontSize: "30px",
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          {label}
        </text>
        <button
          style={{
            borderRadius: "10px",
            borderWidth: "0px",
            padding: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
          }}
          onClick={() => {}}
        >
          Full View
        </button>
      </div>
      {children}
    </div>
  );
};
