import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PrimarySearchAppBar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import LoginComp from "./components/Login.jsx/LoginComp.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import SignUp from "./components/Signup/index.jsx";
import AuthRoute from "./routes/AuthRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe.jsx";
import RecipeComp from "./components/RecipeComp/RecipeComp.jsx";
import MyRecipe from "./components/MyRecipe/MyRecipe.jsx";
import FavRecipe from "./components/MyFavRecip/FavRes.jsx";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="bg-gray-300 min-h-[100vh] ">
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginComp />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="/create-recipe" element={<CreateRecipe/>} />
          <Route path="/recipe/:id" element={<RecipeComp/>} />
          <Route path="/my-recipe" element={<MyRecipe/>} />
          <Route path="/my-fav-recipe" element={<FavRecipe/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
