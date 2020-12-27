import React, { useEffect, useState } from "react";

import getData from "../helper/DataToList";
import { FormInput } from "./Helpers/FormInput/FormInput";
import "./Search.css";
import houseApi from "../api/houseApi";

export const Search = ({ dataSearch, setDataSearch, setListHouse }) => {
  const typeRoomData = [
    { code: 0, name: "Phòng trọ" },
    { code: 1, name: "Chung cư mini" },
    { code: 2, name: "Nhà nguyên căn" },
    { code: 3, name: "Chung cư" },
  ];

  const priceRange = [
    { code: "* - 1000", name: "Thấp (Nhỏ hơn 1Tr)" },
    { code: "1000 - 2000", name: "Trung bình thấp (Từ 1Tr - 2Tr)" },
    { code: "2000 - 3500", name: "Trung bình cao (Từ 2tr - 3tr5)" },
    { code: "3500 - 5000", name: "Cao (Từ 3tr5 - 5tr)" },
    { code: "5000 - *", name: "Rất cao (Trên 5tr)" },
  ];

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

  useEffect(async () => {
    let res = await houseApi.searchHouse(dataSearch);
    console.log(res);
    if (res.code === 200) {
      setListHouse(res.data);
    }
  }, [dataSearch]);

  return (
    <div>
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
              setDataSearch({ ...dataSearch, ...{ province: e.target.value } });
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
              setDataSearch({ ...dataSearch, ...{ district: e.target.value } });
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
            onChange={(e) =>
              setDataSearch({ ...dataSearch, ...{ commune: e.target.value } })
            }
          />
        </div>
      </div>
      <div className="search-price">
        <p>Khoảng giá: </p>
        <div className="search-price__select">
          <FormInput
            typeInput="select"
            name="price"
            placeholder="Chọn khoảng giá"
            listOption={priceRange}
            style={{ padding: "unset" }}
            onChange={(e) =>
              setDataSearch({ ...dataSearch, ...{ price: e.target.value } })
            }
          />
        </div>
      </div>
      <div className="search-typehouse">
        <p>Loại phòng: </p>
        <div className="search-typehouse__select">
          <FormInput
            typeInput="select"
            name="house_type"
            placeholder="Chọn loại phòng"
            listOption={typeRoomData}
            style={{ padding: "unset" }}
            onChange={(e) =>
              setDataSearch({
                ...dataSearch,
                ...{ house_type: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};
