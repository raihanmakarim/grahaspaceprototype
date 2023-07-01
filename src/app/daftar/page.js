"use client";
import React, { useState } from "react";
// import style from "bootstrap/dist/css/bootstrap.min.css";

export default function Daftar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);
  console.log(password);
  //
  return (
    <div style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="login-wrap">
        <div className="login-html">
          <input
            id="tab-1"
            type="radio"
            name="tab"
            className="sign-in"
            checked
          />
          <label htmlFor="tab-1" className="tab">
            Sign In
          </label>
          <input id="tab-2" type="radio" name="tab" className="sign-up" />
          <label htmlFor="tab-2" className="tab"></label>
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                  Username
                </label>
                <input
                  id="user"
                  type="text"
                  className="input"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Password
                </label>
                <input
                  id="pass"
                  type="password"
                  className="input"
                  data-type="password"
                  style={{ marginBottom: 50 }}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="group">
                <input id="check" type="checkbox" className="check" checked />
              </div>
              <div className="group">
                <input
                  type="submit"
                  className="button"
                  value="Sign In"
                  //   onClick={handleLogin}
                />
              </div>
              <div className="hr"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
