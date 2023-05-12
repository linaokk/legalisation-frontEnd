import { FunctionComponent, useState } from "react";
import axios from "axios";

export const SignUpComponent: FunctionComponent = () => {
 const [username,setUsername]=useState<string>();
 const [password,setPassword]=useState<string>();
  const signupHandler = () => {
    axios
      .post("http://localhost:8080/signup", { login: username,password:password})
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <input placeholder="username "  onChange={(e)=>setUsername(e.target.value)}/>
      <input placeholder="password " type="password" onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={signupHandler}>signup</button>
    </>
  );
};
