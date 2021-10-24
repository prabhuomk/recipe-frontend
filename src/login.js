import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UserSchema = yup.object().shape({
  email_id: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum")
});

export function Login({ setIsToken }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(UserSchema)
  });
  const history = useHistory();
  const [disable, setDisable] = useState(false);
  const adduser = (data) => {
    fetch("https://pk-recipe.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.email_id) {
          //console.log(data.token);
          localStorage.setItem("token", data.token);
          setIsToken(data.token);
          alert(data.message);
          setDisable(false);
          history.push("/addrecipe");
        } else {
          alert(data.message);
          setDisable(false);
        }
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
          label="Enter your email_id"
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
          label="enter the password"
          variant="outlined"
          style={{ backgroundColor: "whitesmoke" }}
          type="password"
          {...register("password")}
          error={errors?.password?.message}
          helperText={errors?.password?.message}
        />
        <br />
        <br />
        <p
          style={{ cursor: " pointer" }}
          onClick={() => history.push("./forgetpassword")}
        >
          <b>Forget Password</b>
        </p>

        <Button
          onClick={handleSubmit(adduser)}
          variant="contained"
          color="primary"
        >
          LOGIN
        </Button>

        <div style={{ color: "red" }}>
          <div>
            <b>DEMO Credentials</b>
          </div>
          <div>
            <b>EmailId= pk@gmail.com</b>
          </div>
          <div>
            <b>Password= pk0007</b>
          </div>
        </div>
      </div>
    </div>
  );
}
