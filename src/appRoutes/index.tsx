import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Sports = lazy(() => import("../pages/Sports"));
const Game = lazy(() => import("../pages/Game"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Sports />} />
      <Route path="/:id" element={<Game />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
