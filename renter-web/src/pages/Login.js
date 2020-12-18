import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import userApi from "../api/userApi";
import { Button } from "../components/Button";
import { FormInput } from "../components/FormInput";
import Section from "../components/Section";
import "./Login.css";

function Login() {
  const [statusLogin, setStatusLogin] = useState("");

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      uname: "",
      password: "",
      typePerson: "renter",
    },
    validationSchema: Yup.object({
      uname: Yup.string().required("Vui lòng nhập tên tài khoản!"),
      password: Yup.string().required("Vui lòng nhập mật khẩu!"),
    }),
    onSubmit: async (value) => {
      let data = {
        username: value.uname,
        password: value.password,
      };
      try {
        const response = await userApi.loginRenter(data);
        console.log(response);
        if (response.code === 200) {
          sessionStorage.setItem("renterID", data.username);
          sessionStorage.setItem("tokenRenter", response.data);
          window.location = "/";
        } else {
          setStatusLogin(
            "Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản hoặc mật khẩu!"
          );
        }
      } catch (error) {
        console.log("Failed to login renter " + error);
      }
    },
  });
  return (
    <div className="center">
      <Section
        title="ĐĂNG NHẬP"
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
            placeholder="Nhập mật khẩu"
            name="password"
            type="password"
            onChange={handleChange}
            error={errors.password}
            touched={touched.password}
          ></FormInput>
          <div className="center">
            <Button
              children="ĐĂNG NHẬP"
              buttonSize="btn--medium"
              type="submit"
            ></Button>
            <p style={{ color: "red", marginTop: "5px" }}>{statusLogin}</p>
          </div>
        </form>
      </Section>
      <p className="or-register">Hoặc</p>
      <p>
        Bạn chưa có tài khoản ? <Link to="/register">Đăng ký</Link>
      </p>
    </div>
  );
}

export default Login;
