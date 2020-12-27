import React from "react";

import { HeaderFormStep } from "../HeaderFormStep";
import Section from "../Section";
import { FormInput } from "../Helpers/FormInput/FormInput";
import { Button } from "../Helpers/Button/Button";
import { Note } from "../Note";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Title = ({ formData, setForm, navigation }) => {
  const { handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      title: "",
      duration_year: 0,
      duration_quater: 0,
      duration_month: 0,
      duration_week: 0,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Vui lòng nhập tiêu đề!")
        .test("len", "Vui lòng nhập tối thiểu 20 ký tự", (val) => {
          if (val) return val.toString().length >= 20;
        }),
    }),
    onSubmit: (value) => {
      let data = {
        header: value.title,
        appear_time:
          value.duration_week +
          value.duration_month * 4 +
          value.duration_quater * 13 +
          value.duration_year * 52,
      };
      setForm({ ...formData, ...data });
      navigation.next();
    },
  });
  return (
    <div>
      <HeaderFormStep
        title="TIÊU ĐỀ & THỜI HẠN ĐĂNG"
        percent={"percent-80"}
        onClick={() => navigation.previous()}
      ></HeaderFormStep>
      <Section>
        <form action="" onSubmit={handleSubmit}>
          <FormInput
            name="title"
            label="Tiêu đề"
            placeholder="Tiêu đề"
            onChange={handleChange}
            error={errors.title}
            touched={touched}
            required={true}
          ></FormInput>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <FormInput
              name="duration_year"
              label="Thời hạn đăng"
              placeholder="Năm"
              required={true}
              typeWidth="small"
              onChange={handleChange}
              type="number"
              min="0"
            ></FormInput>
            <div style={{ alignSelf: "flex-end" }}>
              <FormInput
                name="duration_quater"
                placeholder="Quý"
                onChange={handleChange}
                type="number"
                min="0"
              ></FormInput>
            </div>
            <div style={{ alignSelf: "flex-end" }}>
              <FormInput
                name="duration_month"
                label=" "
                onChange={handleChange}
                placeholder="Tháng"
                type="number"
                min="0"
              ></FormInput>
            </div>
            <div style={{ alignSelf: "flex-end" }}>
              <FormInput
                name="duration_week"
                label=" "
                onChange={handleChange}
                placeholder="Tuần"
                type="number"
                min="0"
              ></FormInput>
            </div>
          </div>
          <Note>
            <h3>Lưu ý</h3>
            <p>
              - Tiêu đề rõ ràng, ngắn gọn, dễ hiểu, không điền số điện thoại,
              địa chỉ cụ thể vào tiêu đề
            </p>
            <p>- Lựa chọn thời hạn đăng phù hợp </p>
          </Note>
          <div className="center">
            <Button buttonSize="btn--medium" type="submit">
              Tiếp tục
            </Button>
          </div>
        </form>
      </Section>
    </div>
  );
};
