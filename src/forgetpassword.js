import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export function ForgetPassword() {
  const forpass = () => {
    if (email_id) {
      fetch("https://pk-recipe.herokuapp.com/forgetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email_id })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
        });
    } else {
      alert("enter the email_id");
    }
  };

  const [email_id, SetEmail_id] = useState();

  return (
    <div className="forget">
      <TextField
        id="outlined-basic"
        label="Enter the email"
        variant="outlined"
        onChange={(event) => SetEmail_id(event.target.value)}
      />
      <br />
      <br />
      <Button onClick={forpass} variant="contained" color="primary">
        SUBMIT
      </Button>
    </div>
  );
}
