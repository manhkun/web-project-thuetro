import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import userApi from "../../api/userApi";
import getData from "../../helper/DataToList";
import { Button } from "../Button";
import { FormInput } from "../FormInput";
import { HeaderFormStep } from "../HeaderFormStep";
import { Section } from "../Section";

function OwnerInfor({ formData, setForm, navigation }) {
  const idReg = /^[0-9]*$/;
  const province = getData.province();
  const districtValue = getData.district();
  const communeValue = getData.commune();

  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");

  const [statusRegister, setStatusRegister] = useState("");

  const handleSelectedProvince = (e) => {
    var newDistrict = districtValue.filter(
      (item) => item.parent_code === e.target.value
    );
    setDistrict(newDistrict);
  };
  const handleSelectedDistrict = (e) => {
    var newCommune = communeValue.filter(
      (item) => item.parent_code === e.target.value
    );
    setCommune(newCommune);
  };

  const { handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      idcard: "",
      province: "",
      district: "",
      commune: "",
      street: "",
    },
    validationSchema: Yup.object({
      idcard: Yup.string()
        .matches(idReg, "Vui lòng nhập đúng định dạng số CMND/CCCD!")
        .required("Vui lòng nhập số CMND/CCCD"),
      commune: Yup.string().required("Vui lòng chọn phường/xã/thị trấn!"),
    }),
    onSubmit: async (value) => {
      let ownerData = {
        commune_code: value.commune,
        owner_full_name: formData.full_name,
        owner_name: formData.user_name,
        password: formData.password,
        profile: {
          email: formData.email,
          id_card: value.idcard,
          phone_number: formData.phone_number,
        },
        street: value.street,
      };
      try {
        const response = await userApi.registerOwner(ownerData);
        console.log(response);
        if (response.code !== 200) {
          setStatusRegister(
            "Đăng ký thất bại, tài khoản đã tồn tại, vui lòng chọn tài khoản khác !"
          );
          console.log(statusRegister);
        } else {
          setStatusRegister("Đăng ký thành công !");
          console.log(statusRegister);
        }
      } catch (error) {
        console.log("Failed to register owner: " + error);
      }
    },
  });
  return (
    <div>
      <HeaderFormStep
        title="BỔ SUNG THÔNG TIN"
        onClick={() => navigation.previous()}
      />
      <Section>
        <form action="" onSubmit={handleSubmit}>
          <FormInput
            label="Số CMND/CCCD"
            name="idcard"
            required={true}
            placeholder="Nhập số CMND/CCCD"
            onChange={handleChange}
            error={errors.idcard}
            touched={touched.idcard}
          />
          <FormInput
            typeInput="select"
            name="province"
            label="Chọn tỉnh/thành phố"
            required={true}
            placeholder="Chọn tỉnh/thành phố"
            listOption={province}
            onChange={handleSelectedProvince}
          ></FormInput>
          <FormInput
            typeInput="select"
            name="district"
            label="Chọn quận/huyện/thị xã"
            required={true}
            placeholder="Chọn quận/huyện/thị xã"
            listOption={district}
            onChange={handleSelectedDistrict}
          ></FormInput>
          <FormInput
            typeInput="select"
            name="commune"
            label="Chọn xã/phường/thị trấn"
            required={true}
            placeholder="Chọn xã/phường/thị trấn"
            listOption={commune}
            onChange={handleChange}
            error={errors.commune}
            touched={touched.commune}
          ></FormInput>
          <FormInput
            label="Số nhà/ Đường/ Thôn/ Xóm"
            name="street"
            placeholder="Nhập Số nhà/ Đường/ Thôn/ Xóm"
            onChange={handleChange}
          />
          <div className="center">
            <Button buttonSize="btn--large" type="submit">
              ĐĂNG KÝ
            </Button>
            <p style={{ color: "red", marginTop: "5px" }}>{statusRegister}</p>
          </div>
        </form>
      </Section>
    </div>
  );
}

export default OwnerInfor;
