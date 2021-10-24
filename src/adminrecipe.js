import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

export function AdminRecipe() {
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

  function DeleteRecipe(id) {
    fetch(`https://pk-recipe.herokuapp.com/recipe/${id}`, {
      method: "DELETE"
    })
      .then((data) => data.json())
      .then((data) => {
        alert(data.message);
        LoadRecipe();
      });
  }

  return (
    <div className="Head">
      {dish.map((dish) => (
        <div
          className="App"
          style={{
            backgroundImage:
              "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
            width: "350px",

            margin: "50px",
            borderRadius: "10px",
            color: "white"
          }}
        >
          <h3 style={{ color: "black", cursor: "pointer" }}>{dish.title}</h3>
          <Button
            style={{ backgroundColor: "yellow" }}
            onClick={() => history.push(`/editrecipe/${dish._id}`)}
          >
            EDIT
          </Button>
          <span> </span>
          <Button
            style={{ backgroundColor: "yellow" }}
            onClick={() => DeleteRecipe(dish._id)}
          >
            DELETE
          </Button>
          <br />
          <img
            src={dish.src}
            alt={"not found"}
            height={"130px"}
            style={{ borderRadius: "10px" }}
          />
          <h4 style={{ color: "black" }}>Ingredients</h4>

          <ul style={{ listStyleType: "circle" }}>
            {dish.list.map((steps) => (
              <li>{steps}</li>
            ))}
          </ul>

          <h4 style={{ color: "black" }}>How to Make</h4>

          <ul style={{ listStyleType: "circle" }}>
            {dish.prep.map((steps) => (
              <li>{steps}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
