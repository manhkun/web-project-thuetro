import React from "react";

import "./Footer.css";

function Footer() {
  return (
    <footer>
      <table>
        <tr>
          <th>HỖ TRỢ KHÁCH HÀNG</th>
          <th>VỀ NHÀ TRỌ SINH VIÊN</th>
          <th>LIÊN KẾT</th>
        </tr>
        <tr>
          <td>Trung tâm trợ giúp</td>
          <td>Giới thiệu</td>
          <td rowSpan="2">
            <img src="icons/fb.png" alt="" />
            <img src="icons/ytb.png" alt="" />
            <img src="icons/gg.png" alt="" />
          </td>
        </tr>
        <tr>
          <td>An toàn mua bán</td>
          <td>Tuyển dụng</td>
        </tr>
        <tr>
          <td>Quy định cần biết</td>
          <td>Truyền thông</td>
          <th>Chứng nhận</th>
        </tr>
        <tr>
          <td>Quy chế quyền riêng tư</td>
          <td>Blog</td>
          <td rowSpan="2">
            <img src="icons/registed.png" alt="" />
          </td>
        </tr>
        <tr>
          <td>Liên hệ hỗ trợ</td>
        </tr>
      </table>
      <section>
        <p>
          ỨNG DỤNG CHO THUÊ NHÀ TRỌ - Địa chỉ: Số 144, Xuân Thủy, Dịch Vọng Hậu,
          Cầu Giấy, Hà Nội
        </p>
        <p>Email: conga@gmail.com - Đường dây nóng: (079)69696969</p>
      </section>
    </footer>
  );
}

export default Footer;
