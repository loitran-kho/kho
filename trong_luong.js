/* trong_luong.js — NƠI LỢI GHI SỐ KG. Không cần sửa data.js / Google Sheet.
   Quy tắc ghi:
   TT_OVR: số chắc chắn.  {kg: tổng cả dòng}  hoặc  {u: kg mỗi cái}.  src: 'nhãn' | 'cân' | 'model' (tra mạng).
   TT_CAM: cảm nhận bằng tay. Viết "nhẹ tênh", "nặng trịch", "khoảng 2kg" (cả dòng) hoặc "0.5kg/cái" (mỗi cái). */
window.TT_OVR={
 /* 'KK-0001':{kg:8,src:'nhãn'}, */
 /* ── Tra mạng 28/11/2026 (luật vật tư lạ: conf 'cao' = datasheet hãng; 'vừa' = nguồn gián tiếp). Mỗi cái, đơn vị kg ── */
 'KK-0145':{u:0.044,src:'Festo datasheet 153133 QST-16: 44 g',conf:'cao'},
 'KK-0143':{u:0.011,src:'Festo datasheet 153129 QST-6: 11 g',conf:'cao'},
 'KK-0142':{u:0.048,src:'Spec Festo QSY-16-12 (190708): 48 g, bản đăng ở nhà phân phối',conf:'vừa'},
 'KK-0152':{u:0.80,src:'Festo datasheet 192312: 720 g + đồng hồ PAGN-40 ≈80 g (theo datasheet PAGN-P-40-1M-G14, bản tương đương) — chưa gồm hộp',conf:'vừa'},
};
window.TT_CAM={
 /* 'KK-0043':'nhẹ tênh', 'KK-0050':'khoảng 2kg', */
 /* Lợi ước bằng tay 28/11/2026 (độ tin cậy THẤP, chờ cân thật): van DN40 "3~4 kg/cái" → ghi giữa khoảng; van DN15 "1~1,5 kg/cái" */
 'KK-0149':'3.5kg/cái',
 'KK-0150':'3.5kg/cái',
 'KK-0151':'1.25kg/cái',
};
