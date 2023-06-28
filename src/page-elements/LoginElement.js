import Input from "../components/Input";
import Container from "../components/Container";
import Btn from "../components/Btn";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

let idError, passwordError;
let id = "";
let password = "";
let storeID, storePassword;
const LogIn = () => {
  const router = useRouter();
  useEffect(() => {
    storeID = localStorage.getItem("id");
    storePassword = localStorage.getItem("password");
  }, []);

  const [idValid, setIDValid] = useState("true");
  const [passwordValid, setPasswordValid] = useState("true");

  const saveID = (inputID) => {
    id = inputID;
  };
  const savePassword = (inputPassword) => {
    password = inputPassword;
  };

  const loginHandler = () => {
    if (id !== storeID || password !== storePassword) {
      idError = "Incorrect ID or Password!!";
      passwordError = "Incorrect ID or Password!!";
      setIDValid(false);
      setPasswordValid(false);
    } else {
      localStorage.setItem("login", true);
      router.push("/home");
    }
  };
  return (
    <>
      <Container title="Log In">
        <Input
          type="text"
          label="Id"
          onChange={saveID}
          isValid={idValid}
          errortext={idError}
        />
        <Input
          type="password"
          label="Password"
          onChange={savePassword}
          isValid={passwordValid}
          errortext={passwordError}
        />
        <Btn name="Login" clickHandler={loginHandler} />
      </Container>
      ;
    </>
  );
};
export default LogIn;
