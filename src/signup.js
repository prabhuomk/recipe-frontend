import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UserSchema = yup.object().shape({
  email_id: yup.string().email().required("Email is required"),
  firstname: yup
    .string()
    .required()
    .min(3, "name is too short - should be 3 chars minimum"),
  lastname: yup.string().required(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum")
});

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(UserSchema)
  });
  const history = useHistory();

  const adduser = (data) => {
    console.log("hai");
    fetch("https://pk-recipe.herokuapp.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((data) => data.json())
      .then((data) => {
        alert(data.message);

        history.push("/login");
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://www.ampersandtravel.com/media/845987/chettinad-south-india-4.jpg?mode=crop&quality=95&width=820&height=534")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh"
      }}
    >
      <div className="form">
        <TextField
          id="outlined-basic"
          label="Enter the email_id"
          variant="outlined"
          style={{ backgroundColor: "whitesmoke" }}
          {...register("email_id")}
          error={errors?.email_id?.message}
          helperText={errors?.email_id?.message}
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="Enter the firstname"
          variant="outlined"
          style={{ backgroundColor: "whitesmoke" }}
          {...register("firstname")}
          error={errors?.firstname?.message}
          helperText={errors?.firstname?.message}
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="Enter the lastname"
          variant="outlined"
          style={{ backgroundColor: "whitesmoke" }}
          {...register("lastname")}
          error={errors?.lastname?.message}
          helperText={errors?.lastname?.message}
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="create password"
          variant="outlined"
          style={{ backgroundColor: "whitesmoke" }}
          {...register("password")}
          error={errors?.password?.message}
          helperText={errors?.password?.message}
        />
        <br />
        <br />
        <Button
          onClick={handleSubmit(adduser)}
          variant="contained"
          color="primary"
        >
          SIGN UP
        </Button>
      </div>
    </div>
  );
}
