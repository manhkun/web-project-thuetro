import { useFormik } from "formik";
import React from "react";
import { Button } from "../Button";
import { FormInput } from "../FormInput";
import { HeaderFormStep } from "../HeaderFormStep";
import { Note } from "../Note";
import Section from "../Section";

export const Description = ({ formData, setForm, navigation }) => {
  const { handleChange, handleSubmit } = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: (value) => {
      console.log(value);
      let data = {
        content: value.content,
      };
      setForm({ ...formData, ...data });
      navigation.next();
    },
  });
  return (
    <div>
      <HeaderFormStep
        title="MÔ TẢ"
        percent={"percent-100"}
        onClick={() => navigation.previous()}
      ></HeaderFormStep>
      <Section>
        <form action="" onSubmit={handleSubmit}>
          <FormInput
            typeInput="textaria"
            name="content"
            onChange={handleChange}
            label="Mô tả"
            required={true}
            placeholder="Mô tả chi tiết phòng/nhà, ít nhất 100 ký tự"
          ></FormInput>
          <Note>
            <h3>Lưu ý:</h3>
            <p>- Mô tả bằng tiếng Việt có dấu</p>
            <p>
              - Mô tả rõ ràng những thứ cần thiết như nội thất, khu vực bếp, vệ
              sinh, thiết bị......
            </p>
          </Note>
          <div className="center">
            <Button buttonSize="btn--medium" type="submit">
              Xem lại bài đăng
            </Button>
          </div>
        </form>
      </Section>
    </div>
  );
};
