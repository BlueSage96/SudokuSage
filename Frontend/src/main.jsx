import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import './css/index.css';
import App from './App.jsx';
import Game from "./Components/Game/Game";
import Menu from "./Components/Pages/Menu";
import Settings from "./Components/Pages/Settings";
import Controls from "./Components/Pages/Controls";
import Instructions from "./Components/Pages/Instructions";
import Auth from "./Auth/Auth";

const routes = createBrowserRouter(
   createRoutesFromElements(
      <Route path="" element={<App />}>
        <Route path="/" element={<Menu />}/>
        <Route path="/game" element={<Game />}/>
        <Route path="/settings" element={<Settings />}/>
        <Route path="/controls" element={<Controls />}/>
        <Route path="/instructions" element={<Instructions />}/>
        <Route path="/auth" element={<Auth />}/>
      </Route>
   )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider route={routes}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
