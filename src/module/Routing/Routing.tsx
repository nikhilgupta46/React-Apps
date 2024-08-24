import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteConfig } from "./routeConfig";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {RouteConfig.map((r) => (
          <Route path={r.route} Component={r.component() as any} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
