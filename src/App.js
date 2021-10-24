import "./styles.css";

import { Route, Switch } from "react-router-dom";

import { Home } from "./Home";

import { Details } from "./Details";
import { RecipeAdd } from "./RecipeAdd";
import { MainRecipe } from "./MainRecipe";
import { AdminRecipe } from "./adminrecipe";
import { RecipeEdit } from "./editrecipe";
import { Header } from "./header";
import { SignUp } from "./signup";
import { Login } from "./login";

import { ForgetPassword } from "./forgetpassword";

import { ResetPassword } from "./resetpassword";
import { useState } from "react";

export default function App() {
  const tkn = !localStorage.getItem("token") && "";
  const [isToken, setIsToken] = useState(tkn);
  return (
    <div className="Full">
      <Header isToken={isToken} setIsToken={setIsToken} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/recipe">
          <MainRecipe />
        </Route>
        <Route path="/forRecipeEdit">
          <AdminRecipe />
        </Route>

        <Route path="/addrecipe">
          <RecipeAdd />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login setIsToken={setIsToken} />
        </Route>

        <Route exact path="/forgetpassword">
          <ForgetPassword />
        </Route>
        <Route exact path="/password-reset/:id/:token">
          <ResetPassword />
        </Route>
        <Route path="/editrecipe/:_id">
          <RecipeEdit />
        </Route>

        <Route path="/:id">
          <Details />
        </Route>
      </Switch>
    </div>
  );
}
