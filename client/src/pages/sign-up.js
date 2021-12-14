import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";
import LoginImage from "../assets/images/login.svg";
import { Formik } from "formik";
import * as Yup from "yup";
import { SignUp as SignUpApi } from "../services/api";

const signUp = async (first_name, last_name, username, email, password) => {
  const model = {
    first_name,
    last_name,
    username,
    email,
    password,
  };
  const result = await SignUpApi(model);

  return result;
};

const Signup = ({ setSignup }) => {
  return (
    <div className="main-container">
      <Image src={LoginImage} width="250" height="250" />
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          username: "",
          password: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("Logging in", values);

          const result = await signUp(
            values.first_name,
            values.last_name,
            values.username,
            values.email,
            values.password
          );
          console.log(result);
          if (result) {
            setSubmitting(false);
            setSignup(false);
          }
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required("Required").max(250).min(5),
          last_name: Yup.string().required("Required").max(250).min(5),
          email: Yup.string().email().required("Required"),
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
                <label htmlFor="first_name">First Name</label>
                <input
                  name="first_name"
                  type="text"
                  placeholder="Please enter your First Name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.first_name && touched.first_name && "error"}
                />
                {errors.first_name && touched.first_name && (
                  <div className="input-feedback">{errors.first_name}</div>
                )}
              </div>

              <div className="item-container">
                <label htmlFor="last_name">Last Name</label>
                <input
                  name="last_name"
                  type="text"
                  placeholder="Please enter your Last Name"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.last_name && touched.last_name && "error"}
                />
                {errors.last_name && touched.last_name && (
                  <div className="input-feedback">{errors.last_name}</div>
                )}
              </div>

              <div className="item-container">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Please enter your Last Name"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email && "error"}
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </div>

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
                  Sing up
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSignup(false)}
                >
                  Login
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

Signup.propTypes = {
  setSignup: PropTypes.func.isRequired,
};

export default Signup;
