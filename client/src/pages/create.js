import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Layout from "../components/layout";

const CreateContainer = () => {
  let navigate = useNavigate();

  return (
    <div className="main-container">
      <Formik
        initialValues={{ name: "", store: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            navigate("/Dashboard");
          }, 500);
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
                <label htmlFor="name">Reservation name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Please enter your reservation name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.name && touched.name && "error"}
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </div>

              <div className="item-container">
                <label htmlFor="store">Store</label>
                <select
                  name="store"
                  value={values.store}
                  onChange={handleChange}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.username && touched.username && "error"}
                >
                  <option>Store A</option>
                  <option>Store B</option>
                  <option>Store C</option>
                </select>
                {errors.store && touched.store && (
                  <div className="input-feedback">{errors.store}</div>
                )}
              </div>

              <div className="item-container">
                <label htmlFor="status">Status</label>
                <div className="radio-container" role="group">
                  <label>
                    <Field type="radio" name="picked" value="Todo" />
                    Todo
                  </label>
                  <label>
                    <Field type="radio" name="picked" value="In Progress" />
                    In Progress
                  </label>

                  <label>
                    <Field type="radio" name="picked" value="Ready" />
                    Ready
                  </label>
                </div>
                {errors.status && touched.status && (
                  <div className="input-feedback">{errors.status}</div>
                )}
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

const Create = () => {
  let props = {
    isCreate: true,
  };
  return (
    <Layout isCreate={true}>
      <CreateContainer />
    </Layout>
  );
};

export default Create;
