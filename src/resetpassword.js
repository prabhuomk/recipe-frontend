import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export function ResetPassword() {
  let { id } = useParams();
  let { token } = useParams();
  const history = useHistory();

  const repass = () => {
    if (password.length > 5) {
      fetch(`https://pk-recipe.herokuapp.com/resetpassword/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          history.push("/login");
        });
    } else {
      alert("password should have mim 6 chars");
    }
  };

  const [password, SetPassWord] = useState();
  return (
    <div className="forget">
      <TextField
        id="outlined-basic"
        label="Enter the new password"
        variant="outlined"
        onChange={(event) => SetPassWord(event.target.value)}
      />
      <br />
      <br />

      <Button onClick={repass} variant="contained" color="primary">
        SUBMIT
      </Button>
    </div>
  );
}
