import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Quiz from "@/pages/Quiz";
import Results from "@/pages/Results";
import SelectLessons from "@/pages/SelectLessons";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/quiz",
    element: <SelectLessons />,
  },
  {
    path: "/quiz/:key",
    element: <Quiz />,
  },
  {
    path: "/results",
    element: <Results />,
  },
]);
