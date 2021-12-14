import React, {
  useCallback,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../stores/actions";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Layout from "../components/layout";

const CreateContainer = forwardRef((props, ref) => {
  let navigate = useNavigate();

  const formRef = useRef();

  const data = useSelector((state) => state.stores);

  const dispatch = useDispatch();

  const loadStores = useCallback(() => {
    async function callBack() {
      await dispatch(Actions.fetchStores());
    }
    callBack();
  }, [dispatch]);

  useEffect(() => {
    async function callBack() {
      await loadStores();
    }
    callBack();
  }, [dispatch, loadStores]);

  useImperativeHandle(ref, () => ({
    handleCreate() {
      if (formRef.current) {
        formRef.current.handleSubmit();
      }
    },
  }));

  return (
    <div className="main-container">
      <Formik
        innerRef={formRef}
        initialValues={{ name: "", storeId: "", status: "Todo" }}
        onSubmit={async (values, { setSubmitting }) => {
          await dispatch(Actions.addReservation(values));

          setSubmitting(false);

          navigate("/");
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Required"),
          storeId: Yup.string().required("Required"),
          status: Yup.string().required("Required"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
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
                <label htmlFor="storeId">Store</label>
                <select
                  name="storeId"
                  value={values.storeId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.storeId && touched.storeId && "error"}
                >
                  {data.stores.map((store, i) => (
                    <option value={store.id} key={i}>
                      {store.name}
                    </option>
                  ))}
                </select>
                {errors.storeId && touched.storeId && (
                  <div className="input-feedback">{errors.storeId}</div>
                )}
              </div>

              <div className="item-container">
                <label htmlFor="status">Status</label>
                <div className="radio-container" role="group">
                  <label>
                    <Field type="radio" name="status" value="Todo" />
                    Todo
                  </label>
                  <label>
                    <Field type="radio" name="status" value="In Progress" />
                    In Progress
                  </label>

                  <label>
                    <Field type="radio" name="status" value="Ready" />
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
});

const Create = () => {
  const childRef = useRef();

  const handleOnCreate = () => {
    childRef.current.handleCreate();
  };
  return (
    <Layout isCreate={true} onCreateClicked={handleOnCreate}>
      <CreateContainer ref={childRef} />
    </Layout>
  );
};

export default Create;
