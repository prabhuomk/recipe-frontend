import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useHistory } from "react-router-dom";
export function Header({ isToken, setIsToken }) {
  const history = useHistory();
  const Logout = () => {
    localStorage.setItem("token", "");
    setIsToken("");
    history.push("/");
  };
  return (
    <div>
      <AppBar
        position="sticky"
        style={{ backgroundColor: "yellow", color: "black" }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h3>
              <b>PK's Authentic Chettinad Cuisine Recipe</b>
            </h3>
          </div>
          <div>
            {isToken === "" ? (
              <>
                <Button onClick={() => history.push("/")} color="inherit">
                  <b>HOME</b>
                </Button>
                <Button onClick={() => history.push("/recipe")} color="inherit">
                  <b>RECIPE</b>
                </Button>
                <Button onClick={() => history.push("/signup")} color="inherit">
                  <b>signup</b>
                </Button>
                <Button onClick={() => history.push("/login")} color="inherit">
                  <b>Login</b>
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => history.push("/addrecipe")}
                  color="inherit"
                >
                  <b> ADD RECIPE</b>
                </Button>
                <Button
                  onClick={() => history.push("/forRecipeEdit")}
                  color="inherit"
                >
                  <b> EDIT RECIPE</b>
                </Button>
                <Button onClick={Logout} color="inherit">
                  <b> Logout</b>
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
