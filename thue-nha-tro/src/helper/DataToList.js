const dataToList = (jsons) => {
    var list = [];
    for (var json in jsons) {
      list.push(jsons[json]);
    }
    return list;
}

const getData = {
    province: () => {
        const province = require("./tinh_tp.json");
        return dataToList(province);
    },
    district: () => {
        const district = require("./quan_huyen.json");
        return dataToList(district);
    },
    commune: () => {
        const commune = require("./xa_phuong.json");
        return dataToList(commune);
    }
}

export default getData;