import Input from "../components/Input";
import Container from "../components/Container";
import Btn from "../components/Btn";
import { useState } from "react";
import { Backdrop, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import classes from "./SignUpElement.module.css";
let idError, emailError, passwordError, confirmError;
let id = "";
let email = "";
let password = "";
let confirm = "";

const SignUp = () => {
  const router = useRouter();

  const [idValid, setIDValid] = useState("true");
  const [emailValid, setEmailValid] = useState("true");
  const [passwordValid, setPasswordValid] = useState("true");
  const [confirmValid, setConfirmValid] = useState("true");
  const [open, setOpen] = useState(false);

  const modalHandler = () => {
    router.push("/login");
  };

  const idValidation = (inputID) => {
    id = inputID;
    if (inputID.length < 4 && inputID.length > 0) {
      idError = "ID is too short!! (at least 3)";
      setIDValid(false);
    } else if (inputID.length > 10) {
      idError = "ID is too Long!! (at most 10)";
      setIDValid(false);
    } else {
      setIDValid(true);
      idError = "";
    }
  };
  const emailValidation = (inputEmail) => {
    email = inputEmail;
    if (inputEmail.length === 0 || inputEmail.includes("@")) {
      emailError = "";
      setEmailValid(true);
    } else {
      emailError = "Email is not valid!!";
      setEmailValid(false);
    }
  };

  const passwordValidation = (inputPassword) => {
    password = inputPassword;
    confirmValidation(confirm);
    const symbols = ["!", "@", "#", "$", "%", "&"];
    for (let symbol of symbols) {
      if (inputPassword.includes(symbol)) {
        passwordError = "";
        setPasswordValid(true);
        return;
      }
    }
    if (inputPassword.length > 0) {
      passwordError = "should contains ! @ # $ % &";
      setPasswordValid(false);
    } else {
      passwordError = "";
      setPasswordValid(true);
    }
  };

  const confirmValidation = (inputConfirm) => {
    confirm = inputConfirm;
    if (inputConfirm.length === 0 || inputConfirm === password) {
      confirmError = "";
      setConfirmValid(true);
    } else {
      confirmError = "Password does not match!!";
      setConfirmValid(false);
    }
  };

  const submitHandler = () => {
    let t = 4;
    if (id === "") {
      idError = "ID is required!!";
      setIDValid(false);
      t--;
    }
    if (email === "") {
      emailError = "Email is required!!";
      setEmailValid(false);
      t--;
    }
    if (password === "") {
      passwordError = "Password is required!!";
      setPasswordValid(false);
      t--;
    }
    if (confirm === "") {
      confirmError = "Confirm password is required!!";
      setConfirmValid(false);
      t--;
    }
    if (t === 4 && idValid && emailValid && passwordValid && confirmValid) {
      localStorage.setItem("id", id);
      localStorage.setItem("password", password);
      setOpen(true);
    }
  };

  return (
    <>
      <Container title="Sign Up">
        <Input
          type="text"
          label="Id"
          onChange={idValidation}
          isValid={idValid}
          errortext={idError}
        />
        <Input
          type="email"
          label="Email"
          onChange={emailValidation}
          isValid={emailValid}
          errortext={emailError}
        />
        <Input
          type="password"
          label="Password"
          onChange={passwordValidation}
          isValid={passwordValid}
          errortext={passwordError}
        />
        <Input
          type="password"
          label="Confirm password"
          onChange={confirmValidation}
          isValid={confirmValid}
          errortext={confirmError}
        />
        <Btn name="Submit" clickHandler={submitHandler} />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}>
          <div className={classes.modal}>
            <Typography
              variant="h5"
              sx={{
                padding: "0.5rem 0",
                marginBottom: "1rem",
                textAlign: "center",
                backgroundColor: "#1565c0",
                color: "#ffffff",
              }}>
              Important note!!
            </Typography>
            <Typography sx={{ padding: "0.5rem" }}>
              Please remember your ID and password for login step:
            </Typography>
            <Typography sx={{ padding: "0.5rem" }}>
              ID: <span className={classes["user-info"]}>{id}</span>
            </Typography>
            <Typography sx={{ padding: "0 0.5rem 1rem 0.5rem" }}>
              Password: <span className={classes["user-info"]}>{password}</span>
            </Typography>
            <div className={classes["modal-button"]}>
              <Button
                variant="contained"
                size="large"
                sx={{ width: "25%" }}
                onClick={modalHandler}>
                OK
              </Button>
            </div>
          </div>
        </Backdrop>
      </Container>
    </>
  );
};

export default SignUp;
