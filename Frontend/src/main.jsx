import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Menu from "./Components/Pages/Menu";
import Auth from "./Auth/Auth";
import GameCreation from "./Components/Pages/GameCreation";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="/" element={<Menu />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/creation" element={<GameCreation />} /> 
      {/* <Route path="forgotPwd" element={<ForgotPassword />} />
      <Route path="/game/:id" element={<Game />} />
      */}
      
    </Route>
  ),
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes}>
      <App />
    </RouterProvider>
  </StrictMode>,
);
