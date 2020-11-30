import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { userSignup } from "../redux/actions/userActions";
import { setErrorFalse } from "../redux/actions/adminUserActions";
import classes from "./style.module.css";
import Logo from "./logo512.png";
export default function Signup() {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.UI);
  const history = useHistory();
  useEffect(() => {
    if (ui.isSuccess) {
      handleResetForm();
    }
  }, [ui.isSuccess]);

  const handleResetForm = () => {
    formik.setFieldValue("first_name", "");
    formik.setFieldValue("last_name", "");
    formik.setFieldValue("email", "");
    formik.setFieldValue("password", "");
    formik.setFieldValue("confirmPassword", "");
    formik.setFieldValue("role", "");
    formik.setFieldValue("profile", "");
    formik.setFieldValue("imageView", "");
  };
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Student",
      profile: "",
      imageView: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(userSignup(values, history));
    },

    validationSchema: Yup.object({
      first_name: Yup.string().required("Please enter your first name."),
      username: Yup.string().required("Please enter your username"),
      email: Yup.string()
        .email("Invalid email")
        .required("Please enter your email."),
      password: Yup.string().required("Please enter password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords don't match!")
        .required("Please enter confirm password."),
      role: Yup.string().required("Please select role."),
      imageView: Yup.mixed()
        .required("Please select profileimage.")
        .test("imagetest", "Invalid File Type ", function validateImage(file) {
          if (file !== undefined || file !== "") {
            var allowedExtensions = /(\.JPG||\.jpg||\.jpeg||\.png||\.gif)$/i;
            if (allowedExtensions.exec(file)) {
              return true;
            } else {
              return false;
            }
          }
        }),
    }),
  });
  const handleSelectCahnge = (value) => {
    console.log(value);
    formik.setFieldValue("role", value);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let name = e.target.files[0].name;

    handleLoadImage(file, name);
  };
  const handleLoadImage = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      formik.setFieldValue("profile", file);
      reader.onloadend = () => {
        formik.setFieldValue("imageView", reader.result);
      };
    }
  };
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
              ) : null}
              <form
                onSubmit={formik.handleSubmit}
                className="login100-form validate-form"
              >
                <span className="login100-form-title p-b-34 p-t-27 mb-5">
                  Signup
                </span>

                <div
                  className={
                    formik.touched.first_name && formik.errors.first_name
                      ? "validation-error wrap-input100 validate-input"
                      : "wrap-input100 validate-input"
                  }
                >
                  <input
                    {...formik.getFieldProps("first_name")}
                    className="input100"
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                  />
                  <span className="focus-input100"></span>
                </div>

                {formik.touched.first_name && formik.errors.first_name && (
                  <p className="errorMessage">
                    {formik.touched.first_name && formik.errors.first_name}
                  </p>
                )}

                <div className="wrap-input100 validate-input">
                  <input
                    {...formik.getFieldProps("last_name")}
                    className="input100"
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                  />
                  <span className="focus-input100"></span>
                </div>
                <div
                  className={
                    formik.touched.username && formik.errors.username
                      ? "validation-error wrap-input100 validate-input"
                      : "wrap-input100 validate-input"
                  }
                >
                  <input
                    {...formik.getFieldProps("username")}
                    className="input100"
                    type="text"
                    name="username"
                    placeholder="User Name"
                  />
                  <span className="focus-input100"></span>
                </div>
                {formik.touched.username && formik.errors.username && (
                  <p className="errorMessage">
                    {formik.touched.first_name && formik.errors.first_name}
                  </p>
                )}
                <div
                  className={
                    formik.touched.email && formik.errors.email
                      ? "validation-error wrap-input100 validate-input"
                      : "wrap-input100 validate-input"
                  }
                >
                  <input
                    {...formik.getFieldProps("email")}
                    className="input100"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <span className="focus-input100"></span>
                </div>

                {formik.touched.email && formik.errors.email && (
                  <p className="errorMessage">
                    {formik.touched.email && formik.errors.email}
                  </p>
                )}
                <div
                  className={
                    formik.touched.password && formik.errors.password
                      ? "validation-error wrap-input100 validate-input"
                      : "wrap-input100 validate-input"
                  }
                >
                  <input
                    {...formik.getFieldProps("password")}
                    className="input100"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    placeholder="Password"
                  />
                  <span className="focus-input100"></span>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="errorMessage">
                    {formik.touched.password && formik.errors.password}
                  </p>
                )}
                <div
                  className={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "validation-error wrap-input100 validate-input"
                      : "wrap-input100 validate-input"
                  }
                >
                  <input
                    {...formik.getFieldProps("confirmPassword")}
                    className="input100"
                    type="password"
                    autoComplete="new-password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                  <span className="focus-input100"></span>
                </div>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="errorMessage">
                      {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword}
                    </p>
                  )}
                <div className="form-group">
                  <select
                    onChange={(event) => handleSelectCahnge(event.target.value)}
                    className="form-control"
                    id="exampleFormControlSelect1"
                  >
                    <option disabled>Select User Role</option>
                    <option className={classes.selectOptions}>Student</option>
                    <option className={classes.selectOptions}>Teacher</option>
                  </select>
                </div>
                <div
                  className={
                    formik.touched.profile && formik.errors.profile
                      ? "validation-error"
                      : ""
                  }
                >
                  <input
                    id="profile"
                    type="file"
                    accept="image/gif, image/jpeg"
                    onChange={(e) => handleImageChange(e)}
                    name="profile"
                    style={{ display: "none" }}
                  />
                  <img
                    src={formik.values.imageView}
                    alt="Profile"
                    className="profileImg"
                  />
                  <button
                    type="button"
                    className="imgBtn"
                    onClick={() => {
                      document.getElementById("profile").click();
                    }}
                  >
                    Uplaod Profile
                  </button>
                </div>
                {formik.errors.imageView && (
                  <p className="profileErrorMessage">
                    {formik.errors.imageView}
                  </p>
                )}
                <div className="container-login100-form-btn">
                  <button type="submit" className="login100-form-btn mb-3">
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
