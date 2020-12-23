import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { HeaderFormStep } from "../HeaderFormStep";
import getData from "../../helper/DataToList";
import Section from "../Section";
import { FormInput } from "../FormInput";
import { Button } from "../Button";

export const Address = ({ formData, setForm, navigation }) => {
  const province = getData.province();
  const districtValue = getData.district();
  const communeValue = getData.commune();

  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");
  const [nearby, setNearby] = useState([{ stt: 1, value: "" }]);

  const handleAddNearbyForm = (e) => {
    setNearby([...nearby, { stt: nearby.length + 1, value: "" }]);
    console.log(nearby);
  };

  const handleListNearby = (e, stt) => {
    nearby[stt - 1].value = e.target.value;
    setNearby(nearby);
    console.log(nearby);
  };

  const renderNearbyForm = (list) => {
    return list.map((item) => {
      return (
        <FormInput
          label={item.stt === 1 ? "Gần các địa điểm" : ""}
          placeholder={"Địa điểm " + item.stt}
          name="near_by"
          onChange={(e) => handleListNearby(e, item.stt)}
        ></FormInput>
      );
    });
  };

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

  const { handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      province: "",
      district: "",
      commune: "",
      street: "",
    },
    validationSchema: Yup.object({
      commune: Yup.string().required("Vui lòng chọn phường/xã/thị trấn!"),
    }),
    onSubmit: (value) => {
      let data = {
        province_code: value.province,
        district_code: value.district,
        commune_code: value.commune,
        near_by: nearby,
        street: value.street,
      };
      setForm({ ...formData, ...data });
      navigation.next();
    },
  });
  return (
    <div>
      <HeaderFormStep title="ĐỊA CHỈ" percent={"percent-20"}></HeaderFormStep>
      <Section>
        <form action="" onSubmit={handleSubmit}>
          <FormInput
            typeInput="select"
            name="province"
            label="Chọn tỉnh/thành phố"
            required={true}
            placeholder="Chọn tỉnh/thành phố"
            listOption={province}
            onChange={(e) => {
              handleSelectedProvince(e);
              handleChange(e);
            }}
          ></FormInput>
          <FormInput
            typeInput="select"
            name="district"
            label="Chọn quận/huyện/thị xã"
            required={true}
            placeholder="Chọn quận/huyện/thị xã"
            listOption={district}
            onChange={(e) => {
              handleSelectedDistrict(e);
              handleChange(e);
            }}
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
            label="Số nhà, đường/thôn"
            name="street"
            onChange={handleChange}
            placeholder="Số nhà, đường/thôn"
          ></FormInput>
          {/* <FormInput
            label="Gần các địa điểm"
            name="near_by"
            onChange={handleChange}
            placeholder="Địa điểm 1"
          ></FormInput> */}
          {renderNearbyForm(nearby)}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleAddNearbyForm} type="button">
              <img src="/icons/add.png" alt="" />
            </Button>
          </div>
          <div className="center">
            <Button
              children="Tiếp tục"
              buttonSize="btn--medium"
              type="submit"
            />
          </div>
        </form>
      </Section>
    </div>
  );
};
