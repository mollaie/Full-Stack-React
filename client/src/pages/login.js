import React, { useState } from "react";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";
import LoginImage from "../assets/images/login.svg";
import { Formik } from "formik";
import * as Yup from "yup";
import Signup from "./sign-up";
import { Login as LoginApi } from "../services/api";

const loginUser = async (username, password) => {
  const result = await LoginApi(username, password);

  return result;
};

const Login = ({ setToken }) => {
  const [signup, setSignup] = useState(false);

  if (signup) return <Signup setSignup={setSignup} />;

  return (
    <div className="main-container">
      <Image src={LoginImage} width="250" height="250" />
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          const token = await loginUser(values.username, values.password);

          if (token?.length > 0) {
            setSubmitting(false);

            setToken(token);
          }
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Required"),
          password: Yup.string()
            .required("Required")
            .min(6, "Password is too short - should be 6 characters minimum"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;

          return (
            <form onSubmit={handleSubmit}>
              <div className="item-container">
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Please enter your username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.username && touched.username && "error"}
                />
                {errors.username && touched.username && (
                  <div className="input-feedback">{errors.username}</div>
                )}
              </div>

              <div className="item-container">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Please enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.username && touched.username && "error"}
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-footer">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setSignup(true);
                  }}
                >
                  Signup
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
