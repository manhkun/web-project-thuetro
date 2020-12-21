import React, { useState } from "react";
import { useStep } from "react-hooks-helper";
import "./Register.css";

import RegisterForm from "../components/multiFormRegister/RegisterForm";
import OwnerInfor from "../components/multiFormRegister/OwnerInfor";

const defaultData = {
  commune_code: "",
  full_name: "",
  user_name: "",
  password: "",
  email: "",
  id_card: "",
  phone_number: "",
};

const steps = [{ id: "register" }, { id: "ownerInfo" }];

function Register() {
  const [formData, setForm] = useState(defaultData);
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  });
  const props = { formData, setForm, navigation };

  switch (step.id) {
    case "register":
      return <RegisterForm {...props} />;
    case "ownerInfo":
      return <OwnerInfor {...props} />;
  }
}

export default Register;
