import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import "./App.css";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "movie/add",
    element: <AddMovie />,
  },
  {
    path: "movie/edit/:id",
    element: <EditMovie />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
