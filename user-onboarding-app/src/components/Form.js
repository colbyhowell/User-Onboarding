import React, { useEffect, useState } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axious from "axios";

const OnboardingForm = () => {
  return (
    <div className="onboarding-form-container">
      <Form>
        <Field type="text" name="name" placeholder="Enter Name" />
        <Field type="text" name="email" placeholder="Enter Email" />
      </Form>
    </div>
  );
};

export default OnboardingForm;
