import React from "react";
import * as Yup from "yup";

import { HeaderFormStep } from "../HeaderFormStep";
import Section from "../Section";
import { FormInput } from "../FormInput";
import { Button } from "../Button";
import { useFormik } from "formik";

export const Infrastructure = ({ formData, setForm, navigation }) => {
  const option = [
    { code: 1, name: "Có" },
    { code: 0, name: "Không" },
  ];
  const message = "Vui lòng chọn trường này!";
  const { handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      bathroom: "",
      heater: "",
      kitchen: "",
      airconditional: "",
      balcony: "",
      electric_price: "",
      water_price: "",
      other: "",
    },
    validationSchema: Yup.object({
      bathroom: Yup.number().required(message),
      heater: Yup.number().required(message),
      kitchen: Yup.number().required(message),
      airconditional: Yup.number().required(message),
      balcony: Yup.number().required(message),
      electric_price: Yup.number("Vui lòng nhập đúng định dạng!").required(
        message
      ),
      water_price: Yup.number("Vui lòng nhập đúng định dạng!").required(
        message
      ),
    }),
    onSubmit: (value) => {
      console.log(value);
      let infrastructure = {
        air_condition: value.airconditional === "1",
        balcony: value.balcony === "1",
        heater: value.heater === "1",
        other: value.other,
        kitchen: value.kitchen === "1",
        private_bathroom: value.bathroom === "1",
        electric_price: parseInt(value.electric_price),
        water_price: parseInt(value.water_price),
        number_of_room: formData.infrastructure.number_of_room,
      };
      setForm({ ...formData, infrastructure });
      navigation.next();
    },
  });
  return (
    <div>
      <HeaderFormStep
        title="CƠ SỞ VẬT CHẤT"
        percent={"percent-60"}
        onClick={() => navigation.previous()}
      ></HeaderFormStep>
      <Section>
        <form action="" onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <FormInput
              name="bathroom"
              label="Phòng tắm"
              required={true}
              placeholder="Phòng tắm"
              error={errors.bathroom}
              touched={touched}
              listOption={option}
              onChange={handleChange}
              typeInput="select"
              typeWidth="large"
            ></FormInput>
            <FormInput
              name="heater"
              label="Nóng lạnh"
              required={true}
              placeholder="Nóng lạnh"
              error={errors.heater}
              touched={touched}
              listOption={option}
              onChange={handleChange}
              typeWidth="small"
              typeInput="select"
            ></FormInput>
          </div>
          <FormInput
            name="kitchen"
            label="Phòng bếp"
            required={true}
            error={errors.kitchen}
            listOption={option}
            touched={touched}
            onChange={handleChange}
            placeholder="Phòng bếp"
            typeInput="select"
          ></FormInput>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <FormInput
              name="airconditional"
              label="Điều hoà"
              required={true}
              placeholder="Điều hoà"
              error={errors.airconditional}
              listOption={option}
              touched={touched}
              onChange={handleChange}
              typeInput="select"
              typeWidth="medium"
            ></FormInput>
            <FormInput
              name="balcony"
              label="Ban công"
              required={true}
              placeholder="Ban công"
              error={errors.balcony}
              listOption={option}
              touched={touched}
              onChange={handleChange}
              typeWidth="medium"
              typeInput="select"
            ></FormInput>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <FormInput
              name="electric_price"
              label="Điện (đ/kWh)"
              required={true}
              error={errors.electric_price}
              touched={touched}
              onChange={handleChange}
              placeholder="Điện (đ/kWh)"
              typeWidth="medium"
            ></FormInput>
            <FormInput
              name="water_price"
              label="Nước (đ/m3)"
              error={errors.water_price}
              touched={touched}
              onChange={handleChange}
              required={true}
              placeholder="Nước (đ/m3)"
              typeWidth="medium"
            ></FormInput>
          </div>
          <FormInput
            name="other"
            label="Tiện ích khác"
            placeholder="Tiện ích khác"
            onChange={handleChange}
          ></FormInput>
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
