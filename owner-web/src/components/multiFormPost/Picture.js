import React, { useState } from "react";

import { HeaderFormStep } from "../HeaderFormStep";
import Section from "../Section";
import { Note } from "../Note";
import { Button } from "../Button";
import { ImageUpload } from "../ImageUpload";

export const Picture = ({ formData, setForm, navigation }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleImageChange = (e) => {
    if (e.target.files) {
      Array.from(e.target.files).map((file) => {
        return setSelectedFiles([...selectedFiles, file]);
      });

      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  const handleSubmit = () => {
    let data = {
      image_source: selectedFiles,
    };
    console.log("select img " + selectedFiles);
    setForm({ ...formData, ...data });
    navigation.next();
  };
  return (
    <div>
      <HeaderFormStep
        title="HÌNH ẢNH"
        percent={"percent-60"}
        onClick={() => navigation.previous()}
      ></HeaderFormStep>
      <Section>
        <form action="" onSubmit={handleSubmit}>
          <ImageUpload
            selectedFiles={selectedFiles}
            handleImageChange={handleImageChange}
            setSelectedFiles={setSelectedFiles}
          ></ImageUpload>
          <Note>
            <h3>Để cho thuê nhanh hơn: </h3>
            <p>
              - Chụp hình khổ ngang: phòng trọ, phòng vệ sinh, không gian sử
              dụng chung (nếu có), bên ngoài, ...
            </p>
            <h3>Không: </h3>
            <p>- Sử dụng hình ảnh trùng lặp hoặc lấy từ Internet</p>
            <p>- Chèn số điện thoại/email/logo vào hình</p>
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
