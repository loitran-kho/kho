/* hop_con.js — CẤU TRÚC DỮ LIỆU "BOXX CON" (Giai đoạn 2). Hiện để trống; khi Lợi có dữ liệu, thêm dòng vào mảng.
   Mỗi phần tử:
   { box_id:"HC-0001",            // mã boxx con (duy nhất)
     parent_box:"F1.1.1.3",       // mã ô/box cha (cùng mã ô vt trong data.js)  — hộp trong hộp: có thể là box_id khác ("HC-0001")
     loai_box:"Type 7",           // loại hộp con (tuỳ chọn)
     kich_thuoc:[150,100,80],     // rộng × cao × sâu (mm) của hộp con, để vẽ 3D
     co_nap:false,                // true nếu có nắp
     vat_tu:[ {kk:"KK-0015", sl:10} ]   // vật tư nằm trong hộp con (mã KK + số lượng)
   }
   Ví dụ (đang tắt):  {box_id:"HC-0001",parent_box:"F1.1.1.3",loai_box:"Type 7",kich_thuoc:[150,100,80],co_nap:true,vat_tu:[{kk:"KK-0015",sl:10}]}
*/
window.HOP_CON=[];
