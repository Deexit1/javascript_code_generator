import React, { useState } from "react";
import classes from "../styles/index.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Email & password is required");
    } else {
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Email is invalid");
      } else {
        Cookies.set("email", email);
        Cookies.set("password", password);
        router.push("/code");
      }
    }
  };
  return (
    <div className={classes.login_form}>
      <h2 className={classes.heading}>Login</h2>
      <div className={classes.form_group}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className={classes.form_group}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {error && <div className={classes.error_message}>{error}</div>}
      </div>
      <button type="submit" onClick={handleSubmit}>
        Sign in
      </button>
    </div>
  );
}
