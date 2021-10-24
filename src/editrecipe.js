import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const RecipeSchema = yup.object().shape({
  title: yup.string().required("⚠️ Provide your Recipe name"),
  src: yup.string().required().url(),
  list: yup.array().required(),
  prep: yup.array().required()
});

export function RecipeEdit() {
  let { _id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(RecipeSchema)
  });

  const history = useHistory();

  const editRecipe = (data) => {
    fetch(`https://pk-recipe.herokuapp.com/recipe/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((data) => data.json())
      .then((data) => {
        alert(data.message);

        history.push("/recipe");
      });
  };
  const [dish, setDish] = useState([]);

  function LoadRecipe() {
    fetch(`https://pk-recipe.herokuapp.com/recipe/${_id}`, {
      method: "GET"
    })
      .then((data) => data.json())
      .then((result) => setDish(result));
  }

  useEffect(() => {
    LoadRecipe();
  }, []);

  return (
    <div>
      {dish._id ? (
        <div className="Edit">
          <br />
          <TextField
            // onChange={(event) => setTitle(event.target.value)}
            {...register("title")}
            label="ENTER THE DISH NAME"
            variant="outlined"
            style={{ backgroundColor: "whitesmoke" }}
            defaultValue={dish.title}
            error={errors.title}
            helperText={errors.title && errors.title.message}
          />

          <TextField
            // onChange={(event) => setSrc(event.target.value)}
            {...register("src")}
            label="ENTER THE IMAGE URL"
            variant="outlined"
            style={{ backgroundColor: "whitesmoke" }}
            defaultValue={dish.src}
            error={errors.src}
            helperText={errors.src && errors.src.message}
          />

          <TextField
            // onChange={(event) => setList(event.target.value)}
            {...register("list")}
            label="ENTER THE INGREDIENT LIST"
            variant="outlined"
            style={{ backgroundColor: "whitesmoke" }}
            defaultValue={dish.list}
            error={errors.list}
            helperText={errors.list && errors.list.message}
          />

          <TextField
            // onChange={(event) => setPrep(event.target.value)}
            {...register("prep")}
            label="ENTER THE STEPS TO MAKE THE DISH"
            variant="outlined"
            style={{ backgroundColor: "whitesmoke" }}
            defaultValue={dish.prep}
            error={errors.prep}
            helperText={errors.prep && errors.prep.message}
          />

          <Button
            onClick={handleSubmit(editRecipe)}
            variant="contained"
            color="primary"
          >
            Edit Recipe
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
