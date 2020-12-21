import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "../Button";
import { FormInput } from "../FormInput";
import Section from "../Section";

function RegisterForm({ formData, setForm, navigation }) {
  const userReg = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  const phoneReg = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      fname: "",
      uname: "",
      password: "",
      email: "",
      phone: "",
      confirmPassword: "",
      commune: "",
    },
    validationSchema: Yup.object({
      uname: Yup.string()
        .matches(userReg, "Vui lòng nhập đúng định dạng tên đăng nhập!")
        .required("Vui lòng nhập tên tài khoản!"),
      fname: Yup.string().required("Vui lòng nhập họ tên!"),
      email: Yup.string()
        .email("Vui lòng nhập đúng định dạng email!")
        .required("Vui lòng nhập email"),
      phone: Yup.string()
        .matches(phoneReg, "Vui lòng nhập đúng định dạng số điện thoại!")
        .required("Vui lòng nhập số điện thoại"),
      password: Yup.string().required("Vui lòng nhập mật khẩu !"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Mật khẩu không khớp, vui lòng nhập lại!"
      ),
    }),
    onSubmit: (value) => {
      let data = {
        full_name: value.fname,
        user_name: value.uname,
        password: value.password,
        email: value.email,
        phone_number: value.phone,
      };
      setForm(data);
      navigation.next();
    },
  });
  return (
    <div className="center">
      <Section
        title="ĐĂNG KÝ"
        sectionSize="section--medium"
        sectionStyle="section--validate"
      >
        <form action="" onSubmit={handleSubmit}>
          <FormInput
            placeholder="Nhập tên tài khoản"
            name="uname"
            type="text"
            onChange={handleChange}
            error={errors.uname}
            touched={touched.uname}
          ></FormInput>
          <FormInput
            placeholder="Nhập họ và tên"
            name="fname"
            type="text"
            onChange={handleChange}
            error={errors.fname}
            touched={touched.fname}
          ></FormInput>
          <FormInput
            placeholder="Nhập email"
            name="email"
            type="email"
            onChange={handleChange}
            error={errors.email}
            touched={touched.email}
          ></FormInput>
          <FormInput
            placeholder="Nhập số điện thoại"
            name="phone"
            type="tel"
            onChange={handleChange}
            error={errors.phone}
            touched={touched.phone}
          ></FormInput>
          <FormInput
            placeholder="Nhập mật khẩu"
            name="password"
            type="password"
            onChange={handleChange}
            error={errors.password}
            touched={touched.password}
          ></FormInput>
          <FormInput
            placeholder="Nhập lại mật khẩu"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
          ></FormInput>
          <div className="center">
            <Button
              children="TIẾP TỤC"
              buttonSize="btn--large"
              type="submit"
            ></Button>
          </div>
        </form>
      </Section>
      <p className="or-register">Hoặc</p>
      <p>
        Bạn đã có tài khoản ? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
}

export default RegisterForm;
