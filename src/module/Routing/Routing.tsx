import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteConfig } from "./routeConfig";
import App from "../../App";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={App} />
        {RouteConfig.map((r) => (
          <Route path={r.route} Component={r.component as any} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
