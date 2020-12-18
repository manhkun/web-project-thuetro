import React, { useState } from "react";
import { useStep } from "react-hooks-helper";

import { Address } from "../components/multiFormPost/Address";
import { Description } from "../components/multiFormPost/Description";
import { Information } from "../components/multiFormPost/Information";
import { Infrastructure } from "../components/multiFormPost/Infrastructure";
import OverView from "../components/multiFormPost/OverView";
import { Picture } from "../components/multiFormPost/Picture";
import { Title } from "../components/multiFormPost/Title";

const defaultData = {
  appear_time: 0,
  province_code: "",
  district_code: "",
  commune_code: "",
  content: "",
  header: "",
  image_link: [],
  house_type: 0,
  infrastructure: {
    air_condition: false,
    balcony: false,
    electric_price: 0,
    heater: false,
    kitchen: false,
    number_of_room: 0,
    other: "",
    private_bathroom: false,
    water_price: 0,
  },
  near_by: [],
  pre_order: 0,
  price: 0,
  street: "",
  surface: 0,
  unit: 0,
  with_owner: false,
  image_source: [],
};

const steps = [
  { id: "address" },
  { id: "infor" },
  { id: "infrastructure" },
  { id: "picture" },
  { id: "title_duration" },
  { id: "description" },
  { id: "overview" },
];

export const Post = () => {
  const [formData, setForm] = useState(defaultData);
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  });

  const props = { formData, setForm, navigation };

  switch (step.id) {
    case "address":
      return <Address {...props} />;
    case "infor":
      return <Information {...props} />;
    case "infrastructure":
      return <Infrastructure {...props} />;
    case "picture":
      return <Picture {...props} />;
    case "title_duration":
      return <Title {...props} />;
    case "description":
      return <Description {...props} />;
    case "overview":
      return <OverView {...props} />;
  }
};
