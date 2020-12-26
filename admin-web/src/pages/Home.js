import React, { useEffect, useState } from "react";
import "./Home.css";

import CardItem from "../components/CardItem";
import { FormInput } from "../components/FormInput";
import Section from "../components/Section";
import houseApi from "../api/houseApi";
import { price } from "../helper/convertPrice";
import getData from "../helper/DataToList";

function Home() {
  const province = getData.province();
  const districtValue = getData.district();
  const communeValue = getData.commune();

  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");

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

  const [listHouse, setListHouse] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    let res = await houseApi.getAllHouse();
    if (res.code === 200) {
      setListHouse(res.data);
      setLoading(true);
    }
  }, []);

  return (
    <div>
      <div className="hero-container">
        <img src="image/unnamed.jpg" alt="" />
      </div>
      <Section title="TÌM KIẾM" size="40%">
        <div className="search-address">
          <p>Địa chỉ: </p>
          <div className="search-address__select">
            <FormInput
              typeInput="select"
              name="province"
              placeholder="Chọn tỉnh/thành phố"
              listOption={province}
              style={{ padding: "unset" }}
              onChange={(e) => {
                handleSelectedProvince(e);
              }}
            />
          </div>
          <div className="search-address__select">
            <FormInput
              typeInput="select"
              name="district"
              placeholder="Chọn quận/huyện/thị xã"
              listOption={district}
              style={{ padding: "unset" }}
              onChange={(e) => {
                handleSelectedDistrict(e);
              }}
            />
          </div>
          <div className="search-address__select">
            <FormInput
              typeInput="select"
              name="commune"
              placeholder="Chọn xã/phường/thị trấn"
              listOption={commune}
              style={{ padding: "unset" }}
            />
          </div>
        </div>
      </Section>
      <Section title="TIN ĐĂNG DÀNH CHO BẠN">
        <div className="grid-container">
          {loading && listHouse ? (
            listHouse.map((item) => {
              console.log(item);
              return (
                <CardItem
                  houseid={item.house_id}
                  title={item.header}
                  price={price(item)}
                  location={`${item.address.district} - ${item.address.province}`}
                  image={item.image_link[0]}
                  like={item.like}
                  view={item.view}
                ></CardItem>
              );
            })
          ) : (
            <p>Loading</p>
          )}
        </div>
      </Section>
    </div>
  );
}

export default Home;
