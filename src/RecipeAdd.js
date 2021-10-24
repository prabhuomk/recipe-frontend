import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const RecipeSchema = yup.object().shape({
  title: yup.string().required("⚠️ Provide your Recipe name"),
  src: yup.string().required().url(),
  list: yup.array().required(),
  prep: yup.array().required()
});

export function RecipeAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(RecipeSchema)
  });

  const history = useHistory();

  const addRecipe = (data) => {
    fetch("https://pk-recipe.herokuapp.com/addrecipe", {
      method: "POST",
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
  return (
    <div>
      <div className="RecipeAdd">
        <TextField
          // onChange={(event) => setTitle(event.target.value)}
          {...register("title")}
          label="ENTER THE DISH NAME"
          variant="outlined"
          style={{ backgroundColor: "whitesmoke" }}
          error={errors.title}
          helperText={errors.title && errors.title.message}
        />

        <TextField
          // onChange={(event) => setSrc(event.target.value)}
          {...register("src")}
          label="ENTER THE IMAGE URL"
          variant="outlined"
          style={{ backgroundColor: "whitesmoke" }}
          error={errors.src}
          helperText={errors.src && errors.src.message}
        />

        <TextField
          // onChange={(event) => setList(event.target.value)}
          {...register("list")}
          label="ENTER THE INGREDIENT LIST IN ARRAY FORMAT => eg: ['ingredient 1','ingredient 2',....])"
          variant="outlined"
          style={{ backgroundColor: "whitesmoke" }}
          error={errors.list}
          helperText={errors.list && errors.list.message}
        />

        <TextField
          // onChange={(event) => setPrep(event.target.value)}
          {...register("prep")}
          label="ENTER THE STEPS TO MAKE THE DISH IN ARRAY FORMAT => eg: ['step 1','step 2',....] )"
          variant="outlined"
          style={{ backgroundColor: "whitesmoke" }}
          error={errors.prep}
          helperText={errors.prep && errors.prep.message}
        />

        <Button
          onClick={handleSubmit(addRecipe)}
          variant="contained"
          color="primary"
        >
          Add Recipe
        </Button>
      </div>
    </div>
  );
}
