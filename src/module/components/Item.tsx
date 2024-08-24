import "./styles.css";
import React from "react";
import { useNavigate } from "react-router-dom";
export const Item = ({
  label,
  route,
  children,
}: {
  label: string;
  children: any;
  route: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className={`gridItem ${!label ? "gridItem__hide" : null}`}>
      {label ? (
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
            onClick={() => {
              navigate(route);
            }}
          >
            Full View
          </button>
        </div>
      ) : null}
      {children}
    </div>
  );
};
