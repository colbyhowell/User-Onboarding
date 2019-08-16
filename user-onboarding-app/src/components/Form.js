import React, { useEffect, useState } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardingForm = ({ errors, touched, values, status }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (status) {
      setUserList([...userList, status]);
    }
  }, [status]);

  return (
    <div className="">
      <Form className="onboarding-form-container">
        <Field type="text" name="name" placeholder="Enter Name" />
        {touched.name && errors.name && (
          <p className="error-message">{errors.name}</p>
        )}
        <Field type="text" name="email" placeholder="Enter Email" />
        {touched.email && errors.email && (
          <p className="error-message">{errors.email}</p>
        )}
        <Field type="password" name="password" placeholder="Enter Password" />
        {touched.password && errors.password && (
          <p className="error-message">{errors.password}</p>
        )}
        <Field component="select" className="drop-down" name="role">
        <option>Select Role</option>
        <option value="dude">That dude over there</option>
        <option value="lady">That lady over here</option>
        <option value="child">This child</option>
        </Field>
        <label className="terms-checkbox">
          Accept Terms Of Service?
          <Field type="checkbox" name="terms" checked={values.terms} />
          {touched.terms && errors.terms && (
            <p className="error-message">{errors.terms}</p>
          )}
        </label>
        <button type="submit">Submit!</button>
      </Form>
      {userList.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
};

const formikPassValues = withFormik({
  mapPropsToValues({ name, email, password, terms, role }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false,
      role: role || ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(1, "Come on you know your name is longer than that")
      .max(20, "That is a long ass name")
      .required("please enter your name"),
    email: Yup.string()
      .email()
      .required("must be an email"),
    password: Yup.string()
      .min(6, "Do better")
      .max(20, "Woah slow down")
      .required(),
    terms: Yup.boolean().oneOf([true], "You must accept the terms of service"),
    role: Yup.string().required()
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log("Response here!", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => {
        console.log("error", err);
      });
  }
});

const formWithUserData = formikPassValues(OnboardingForm);

export default formWithUserData;
