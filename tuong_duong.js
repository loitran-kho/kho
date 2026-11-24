/* tuong_duong.js — CẤU TRÚC DỮ LIỆU "VẬT TƯ THAY THẾ / COMBO / KỴ NHAU". Lợi điền dần; để trống thì giao diện không hiện gì.
   tuong_duong : mã KK → mảng mã KK thay thế được (có thể ghi chú sau mã: "KK-0102 (SMC 12-8)") hoặc mã combo "COMBO_x".
   combo       : mã combo → {ten, gom:[[mã KK, số lượng], …]}  ("Thay thế bằng combo: 1x KK-A + 1x KK-B")
   ky_nhau     : mảng [mã KK A, mã KK B, lý do] — KHÔNG được để gần nhau (cùng một dãy kệ = gần).
   Ví dụ (đang tắt):
     tuong_duong:{"KK-0059":["KK-0102 (SMC 12-8)","COMBO_12-10_10-8"]},
     combo:{"COMBO_12-10_10-8":{ten:"Giảm 12→10 + giảm 10→8",gom:[["KK-0102",1],["KK-0015",1]]}},
     ky_nhau:[["KK-0059","KK-0102","Ví dụ lý do"]]
*/
window.TD={tuong_duong:{},combo:{},ky_nhau:[]};
