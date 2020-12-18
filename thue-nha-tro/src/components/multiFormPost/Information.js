import React from "react";
import * as Yup from "yup";

import { HeaderFormStep } from "../HeaderFormStep";
import Section from "../Section";
import { FormInput } from "../FormInput";
import { Button } from "../Button";
import { useFormik } from "formik";

export const Information = ({ formData, setForm, navigation }) => {
  const typeRoomData = [
    { code: 0, name: "Phòng trọ" },
    { code: 1, name: "Chung cư mini" },
    { code: 2, name: "Nhà nguyên căn" },
    { code: 3, name: "Chung cư" },
  ];
  const withOwn = [
    { code: 1, name: "Có" },
    { code: 0, name: "Không" },
  ];
  const unitTime = [
    { code: 0, name: "Tháng" },
    { code: 1, name: "Quý" },
    { code: 2, name: "Năm" },
  ];

  const {handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      typeroom: "",
      numberOfRoom: "",
      square: "",
      price: "",
      unit: "",
      with_owner: "",
      pre_money: "",
    },
    validationSchema: Yup.object({
      typeroom: Yup.number().required("Vui lòng chọn loại phòng!"),
      numberOfRoom: Yup.number().required("Vui lòng nhập số lượng phòng!"),
      square: Yup.number("Vui lòng nhập đúng định dạng số!").required(
        "Vui lòng nhập diện tích phòng!"
      ),
      price: Yup.number("Vui lòng nhập đúng định dạng số!").required(
        "Vui lòng nhập giá!"
      ),
      unit: Yup.number().required("Vui lòng chọn đơn vị thời gian!"),
      with_owner: Yup.number().required("Vui lòng chọn trường này!"),
      pre_money: Yup.number("Vui lòng nhập đúng định dạng số!").required(
        "Vui lòng nhập tiền cọc!"
      ),
    }),
    onSubmit: (value) => {
      let data = {
        house_type: parseInt(value.typeroom),
        infrastructure: {
          number_of_room: parseInt(value.numberOfRoom),
        },
        pre_order: parseInt(value.pre_money),
        price: parseInt(value.price),
        surface: parseInt(value.square),
        unit: parseInt(value.unit),
        with_owner: value.with_owner === "1",
      };
      setForm({ ...formData, ...data });
      navigation.next();
    },
  });
  return (
    <div>
      <HeaderFormStep
        title="THÔNG TIN"
        percent={"percent-40"}
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
              name="typeroom"
              label="Loại phòng"
              required={true}
              placeholder="Chọn loại phòng"
              listOption={typeRoomData}
              error={errors.typeroom}
              touched={touched}
              onChange={handleChange}
              typeInput="select"
              typeWidth="large"
            ></FormInput>
            <FormInput
              name="numberOfRoom"
              label="Số phòng"
              required={true}
              onChange={handleChange}
              error={errors.numberOfRoom}
              touched={touched}
              placeholder="Số phòng"
              typeWidth="small"
              type="number"
            ></FormInput>
          </div>
          <FormInput
            name="square"
            label="Diện tích (m2)"
            required={true}
            onChange={handleChange}
            error={errors.square}
            touched={touched}
            placeholder="Diện tích"
          ></FormInput>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <FormInput
              name="price"
              label="Giá (đ)"
              required={true}
              onChange={handleChange}
              error={errors.price}
              touched={touched}
              placeholder="Giá"
              typeWidth="large"
            ></FormInput>
            <FormInput
              name="unit"
              label="Thời gian"
              required={true}
              placeholder="Thời gian"
              onChange={handleChange}
              error={errors.unit}
              touched={touched}
              listOption={unitTime}
              typeInput="select"
              typeWidth="small"
            ></FormInput>
          </div>
          <FormInput
            name="with_owner"
            label="Chung chủ"
            placeholder="Chung chủ"
            listOption={withOwn}
            onChange={handleChange}
            error={errors.with_owner}
            touched={touched}
            required={true}
            typeInput="select"
          ></FormInput>
          <FormInput
            name="pre_money"
            label="Tiền cọc (đ)"
            placeholder="Tiền cọc"
            onChange={handleChange}
            error={errors.pre_money}
            touched={touched}
            required={true}
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
