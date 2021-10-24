import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { Recipe } from "./Recipe";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

export function MainRecipe() {
  const [dish, setDish] = useState([]);
  const history = useHistory();

  function LoadRecipe() {
    fetch("https://pk-recipe.herokuapp.com/listofrecipes", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((result) => setDish(result));
  }

  useEffect(() => {
    LoadRecipe();
  }, []);

  const [search, setSearch] = useState("");
  return (
    <div>
      <div className="Input">
        <TextField
          label="SEARCH"
          id="standard-start-adornment"
          onChange={(event) => setSearch(event.target.value)}
          style={{ backgroundColor: "whitesmoke" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">🔍</InputAdornment>
          }}
        />
      </div>

      <div className="Head">
        {dish
          .filter((data) =>
            data.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((details) => (
            <div>
              <Recipe
                id={details._id}
                title={details.title}
                src={details.src}
                list={details.list}
                prep={details.prep}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
