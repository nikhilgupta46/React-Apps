import "./index.css";
import React from "react";
import { RouteConfig } from "./module/Routing/routeConfig";
import { Item } from "./module/components/Item";

function App() {
  return (
    <div>
      <div style={{ textAlign: "center", margin: "10px" }}>
        <text
          style={{
            color: "black",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          React Apps
        </text>
      </div>

      <div className="app">
        {RouteConfig.map((r) => {
          return (
            <Item label={r.label} route={r.route}>
              {r.component()}
            </Item>
          );
        })}
      </div>
    </div>
  );
}

export default App;
