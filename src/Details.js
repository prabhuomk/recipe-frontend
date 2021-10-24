import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function Details() {
  let { id } = useParams();

  const [rec, SetRec] = useState({});
  useEffect(() => {
    LoadRecipe(id);
  }, []);

  function LoadRecipe(id) {
    fetch(`https://pk-recipe.herokuapp.com/recipe/${id}`, {
      method: "GET"
    })
      .then((data) => data.json())
      .then((data) => SetRec(data));
  }
  return rec._id ? (
    <div style={{ backgroundColor: "black" }}>
      <h1>{rec.title}</h1>
      <ul style={{ listStyleType: "circle", color: "orange" }}>
        <h3 style={{ color: "orangered" }}>Ingredient list</h3>
        {rec.list.map((steps) => (
          <li>{steps}</li>
        ))}
      </ul>
      <ul style={{ listStyleType: "circle", color: "orange" }}>
        <h3 style={{ color: "orangered" }}>Procedure to prepare the Recipe</h3>
        {rec.prep.map((steps) => (
          <li>{steps}</li>
        ))}
      </ul>
    </div>
  ) : (
    ""
  );
}
