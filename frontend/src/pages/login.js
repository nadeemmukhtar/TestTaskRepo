import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { userSignup, userLogin } from "../redux/actions/userActions";
import { setErrorFalse } from "../redux/actions/adminUserActions";
export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const ui = useSelector((state) => state.UI);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(userLogin(values, history));
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Please enter your email"),
      password: Yup.string().required("Please enter password"),
    }),
  });
  return (
    <div className="root">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="wrap-login100">
              {ui.isError ? (
                <div class="alert alert-danger">
                  <strong>Error!</strong> {ui.message}.
                </div>
              ) : ui.isSuccess ? (
                <div class="alert alert-success">
                  <strong>Success!</strong> {ui.message}.
                </div>
              ) : null}
              <form
                onSubmit={formik.handleSubmit}
                className="login100-form validate-form"
              >
                <span className="login100-form-title p-b-34 p-t-27 mb-5">
                  Log in
                </span>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter username"
                >
                  <input
                    className="input100"
                    type="text"
                    name="email"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                  />
                  <span className="focus-input100"></span>
                </div>
                <p className="errorMessage">
                  {formik.touched.email && formik.errors.email}
                </p>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter password"
                >
                  <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                  />
                  <span className="focus-input100"></span>
                </div>
                <p className="errorMessage">
                  {formik.touched.password && formik.errors.password}
                </p>
                <div className="container-login100-form-btn">
                  <button type="submit" className="login100-form-btn mb-3">
                    Login
                  </button>
                </div>

                <div className="text-center p-t-90">
                  <a className="txt1" href="/forgot">
                    Forgot Password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
