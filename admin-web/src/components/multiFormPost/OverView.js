import React from "react";

import { HeaderFormStep } from "../HeaderFormStep";
import Section from "../Section";
import { FormInput } from "../FormInput";
import { Button } from "../Helpers/Button/Button";
import { ImageUpload } from "../ImageUpload";
import getData from "../../helper/DataToList";
import houseApi from "../../api/houseApi";
import { useParams } from "react-router-dom";

function OverView({ formData, navigation }) {
  const { id } = useParams();
  const province = getData
    .province()
    .filter((item) => item.code === formData.province_code);
  const district = getData
    .district()
    .filter((item) => item.code === formData.district_code);
  const commune = getData
    .commune()
    .filter((item) => item.code === formData.commune_code);

  const typeRoomData = [
    { code: 0, name: "Phòng trọ" },
    { code: 1, name: "Chung cư mini" },
    { code: 2, name: "Nhà nguyên căn" },
    { code: 3, name: "Chung cư" },
  ];
  const trueFalse = [
    { code: true, name: "Có" },
    { code: false, name: "Không" },
  ];
  const unitTime = [
    { code: 0, name: "Tháng" },
    { code: 1, name: "Quý" },
    { code: 2, name: "Năm" },
  ];

  const duration_year = parseInt(formData.appear_time / 52);
  const duration_quarter = parseInt(
    (formData.appear_time - duration_year * 52) / 13
  );
  const duration_month = parseInt(
    (formData.appear_time - duration_year * 52 - duration_quarter * 13) / 4
  );
  const duration_week = parseInt(
    formData.appear_time -
      duration_year * 52 -
      duration_month * 13 -
      duration_month * 4
  );

  const filterData = (data, value) => {
    return data.filter((item) => item.code === value);
  };

  const renderNearby = (data) => {
    return data.map((item) => {
      return (
        <FormInput
          label={item.stt === 1 ? "Gần các địa điểm" : ""}
          placeholder={"Địa điểm " + item.stt}
          name="near_by"
          value={item.value}
        ></FormInput>
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await houseApi.postImg(formData.image_source);
    let img = {
      image_link: res.data,
      near_by: formData.near_by.map((item) => item["value"]),
    };
    let dataHouse = { ...formData, ...img };
    if (sessionStorage.getItem("tokenOwner")) {
      let token = sessionStorage.getItem("tokenOwner");
      if (id) {
        let res = await houseApi.editHouse(dataHouse, token, id);
        console.log(res);
        window.location.href = "/post-manage";
      } else {
        try {
          let data = await houseApi.postHouse(dataHouse, token);
          window.location.href = "/post-manage";
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  return (
    <div>
      <HeaderFormStep
        title="XEM NỘI DUNG BÀI ĐĂNG"
        onClick={() => navigation.previous()}
      />
      <Section>
        <form action="" onSubmit={handleSubmit}>
          <ImageUpload selectedFiles={formData.image_source}></ImageUpload>
          <FormInput
            typeInput="select"
            name="province"
            label="Chọn tỉnh/thành phố"
            required={true}
            placeholder={province[0].name}
          ></FormInput>
          <FormInput
            typeInput="select"
            name="district"
            label="Chọn quận/huyện/thị xã"
            required={true}
            placeholder={district[0].name}
          ></FormInput>
          <FormInput
            typeInput="select"
            name="commune"
            label="Chọn xã/phường/thị trấn"
            required={true}
            placeholder={commune[0].name}
          ></FormInput>
          <FormInput
            label="Số nhà, đường/thôn"
            placeholder="Số nhà, đường/thôn"
            defaultValue={formData.street}
          ></FormInput>
          {renderNearby(formData.near_by)}
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
              placeholder={
                filterData(typeRoomData, formData.house_type)[0].name
              }
              typeInput="select"
              typeWidth="large"
            ></FormInput>
            <FormInput
              name="numberOfRoom"
              label="Số phòng"
              required={true}
              defaultValue={formData.infrastructure.number_of_room}
              placeholder="Số phòng"
              typeWidth="small"
              type="number"
            ></FormInput>
          </div>
          <FormInput
            name="square"
            label="Diện tích (m2)"
            required={true}
            defaultValue={formData.surface}
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
              placeholder="Giá"
              defaultValue={formData.price}
              typeWidth="large"
            ></FormInput>
            <FormInput
              name="unit"
              label="Thời gian"
              required={true}
              placeholder={filterData(unitTime, formData.unit)[0].name}
              typeInput="select"
              typeWidth="small"
            ></FormInput>
          </div>
          <FormInput
            name="with_owner"
            label="Chung chủ"
            placeholder={filterData(trueFalse, formData.with_owner)[0].name}
            required={true}
            typeInput="select"
          ></FormInput>
          <FormInput
            name="pre_money"
            label="Tiền cọc (đ)"
            placeholder="Tiền cọc"
            defaultValue={formData.pre_order}
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
              name="bathroom"
              label="Phòng tắm"
              required={true}
              placeholder={
                filterData(
                  trueFalse,
                  formData.infrastructure.private_bathroom
                )[0].name
              }
              typeInput="select"
              typeWidth="large"
            ></FormInput>
            <FormInput
              name="heater"
              label="Nóng lạnh"
              required={true}
              placeholder={
                filterData(trueFalse, formData.infrastructure.heater)[0].name
              }
              typeWidth="small"
              typeInput="select"
            ></FormInput>
          </div>
          <FormInput
            name="kitchen"
            label="Phòng bếp"
            required={true}
            placeholder={
              filterData(trueFalse, formData.infrastructure.private_bathroom)[0]
                .name
            }
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
              placeholder={
                filterData(trueFalse, formData.infrastructure.air_condition)[0]
                  .name
              }
              typeInput="select"
              typeWidth="medium"
            ></FormInput>
            <FormInput
              name="balcony"
              label="Ban công"
              required={true}
              typeWidth="medium"
              typeInput="select"
              placeholder={
                filterData(trueFalse, formData.infrastructure.balcony)[0].name
              }
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
              placeholder="Điện (đ/kWh)"
              defaultValue={formData.infrastructure.electric_price}
              typeWidth="medium"
            ></FormInput>
            <FormInput
              name="water_price"
              label="Nước (đ/m3)"
              required={true}
              placeholder="Nước (đ/m3)"
              defaultValue={formData.infrastructure.water_price}
              typeWidth="medium"
            ></FormInput>
          </div>
          <FormInput
            name="other"
            label="Tiện ích khác"
            placeholder="Không"
            defaultValue={formData.infrastructure.other}
          ></FormInput>
          <FormInput
            name="title"
            label="Tiêu đề"
            placeholder="Tiêu đề"
            defaultValue={formData.header}
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
              name="duration"
              label="Thời hạn đăng"
              placeholder="Năm"
              defaultValue={duration_year}
              required={true}
              typeWidth="small"
              type="number"
              min="0"
            ></FormInput>
            <div style={{ alignSelf: "flex-end" }}>
              <FormInput
                name="duration"
                label=" "
                placeholder="Quý"
                defaultValue={duration_quarter}
                type="number"
                min="0"
              ></FormInput>
            </div>
            <div style={{ alignSelf: "flex-end" }}>
              <FormInput
                name="duration"
                label=" "
                placeholder="Tháng"
                defaultValue={duration_month}
                type="number"
                min="0"
              ></FormInput>
            </div>
            <div style={{ alignSelf: "flex-end" }}>
              <FormInput
                name="duration"
                label=" "
                placeholder="Tuần"
                defaultValue={duration_week}
                type="number"
              ></FormInput>
            </div>
          </div>
          <FormInput
            typeInput="textaria"
            label="Mô tả"
            defaultValue={formData.content}
            required={true}
            placeholder="Mô tả chi tiết phòng/nhà, ít nhất 100 ký tự"
          ></FormInput>
          <div className="center">
            <Button children="ĐĂNG BÀI" type="submit"></Button>
          </div>
        </form>
      </Section>
    </div>
  );
}

export default OverView;
