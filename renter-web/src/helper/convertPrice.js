export const price = (data) => {
  switch (data.unit) {
    case 0:
      return data.price / 1000 + "K/Tháng";
    case 1:
      return (data.price * 3) / 1000 + "K/Quý";
    case 2:
      return (data.price * 12) / 1000 + "K/Năm";
    default:
      return "";
  }
};
