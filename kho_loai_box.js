/* kho_loai_box.js — đọc kho_box_v5.js (window.WAREHOUSE_DATA, 871 box, 14 bản vẽ tay đã xác nhận 26/11/2026)
   → BX.cell(cụm, tầng, số ô) = loại box của ô đó;  BX.info(type) = kích thước lòng (mm).
   KHÔNG đụng data.js (tồn kho) và kho_geo.js (hình học). Chỉ BỔ SUNG thông tin "loại box".
   est=true: data v5 chỉ cho SỐ LƯỢNG box theo loại, không ghi vị trí ô → vị trí xếp theo thứ tự bản vẽ (ước tính).
   exact: vị trí được ghi rõ trong ghi chú bản vẽ (bảng OV bên dưới). */
(function(){
var W=window.WAREHOUSE_DATA;if(!W){window.BX=null;return}
var TC={1:0x4c8bd6,2:0x59b36a,3:0xe0a43a,4:0xd2586c,5:0x8b6fd0,6:0x2fb8c4,7:0x7fd36a,8:0x9a7358,9:0x98a2a8,10:0x5f6c73};
var TI={};Object.keys(W.types).forEach(function(k){var t=W.types[k],n=+k.slice(1),o={n:n,name:t.name,shape:t.shape,lv:t.levels,zoneH:t.zoneH,note:t.note||'',color:TC[n]};
 if(t.shape==='box'){o.L=t.interior[0];o.W=t.interior[1];o.H=t.interior[2]}else{o.top=t.top[0];o.bot=t.bottom[0];o.H=t.zoneH}TI[n]=o});
/* vị trí ô GHI RÕ trong ghi chú bản vẽ (mỗi mục: rack.tầng → {ô: type | [type chồng]}) */
var OV={
 'F3.2.1':{1:5,2:5},
 'F4.1.7':{1:3,2:3,3:3,4:3,5:3,6:3},
 'F4.2.1':{1:2,2:2,3:2,4:2,6:5},
 'F5.1.2':{1:5,2:5,3:5,4:3,5:5,6:5},
 'F5.1.3':{2:5,3:5,4:5,5:5,6:5},
 'F6.1.2':{1:5,2:5,3:5,4:7,5:5,6:5},
 'F6.2.1':{2:5,3:5,4:5,5:5},
 'F8.1.5':{1:5,2:5,3:5,4:5,5:5,6:6},
 'F8.1.6':{3:5,4:5},
 'F8.1.7':{6:5},
 'F8.2.3':{3:9,4:9,5:9,6:10},
 'F8.2.5':{6:5},
 'F8.2.6':{2:5},
 'F9.1.3':{1:5,2:5,3:5,4:5,5:3,6:5},
 'F10.1.1':{1:5,2:5,3:5,4:5,5:5,6:5},
 'F11.2.5':{6:[10,9]},
 'F10.1.7':{1:7,2:7}   /* Lợi 26/11: 26 thùng Type 7 (20L) dự phòng cho F3, đặt ở F10.1 tầng 7 ô 1 và 2 */
};
/* ghi chú nghiệp vụ gắn vào ô (hiện trong hộp 3D). tổng: số thùng chung cho các ô trong nhóm (chưa rõ chia mỗi ô bao nhiêu) */
var NOTE={'F10.1.7':{cells:[1,2],note:'Dự phòng F3',qty:26,extra:true}};
var cache={};
function tier(cl,k){var key=cl+'.'+k;if(cache[key])return cache[key];
 var sl=W.slots.filter(function(s){return s.rack===cl&&s.tier===k}),m={},exact=false;
 if(!sl.length&&!OV[key]){return cache[key]={map:{},n:0,exact:true}}
 if(OV[key]){Object.keys(OV[key]).forEach(function(c){var v=OV[key][c];m[c]={t:[].concat(v)[0],all:[].concat(v)}});exact=true}
 else{var no=1;sl.forEach(function(s){for(var i=0;i<s.cells;i++){m[no]={t:s.type,all:[s.type]};no++}});exact=sl.length===1}
 /* F2.1 đối lưng 2 mặt (Lợi xác nhận 26/11): bản vẽ ghi 1 mặt = 54 ô → mặt kia (ô 55–108) giống hệt, đánh dấu ước tính */
 if(cl==='F2.1'&&Object.keys(m).length===54){for(var q=1;q<=54;q++)m[q+54]={t:m[q].t,all:m[q].all.slice()};exact=false}
 var n=0;Object.keys(m).forEach(function(c){n++});
 return cache[key]={map:m,n:n,exact:exact,types:sl.map(function(s){return s.type})}}
window.BX={
 W:W,TC:TC,TI:TI,
 CASE:[170,120,60],
 info:function(t){return TI[t]||null},
 tier:tier,
 cell:function(cl,k,no){var T=tier(cl,k),c=T.map[no];if(!c&&/^F12\./.test(cl)&&!T.map[no]&&!(T.n>0&&T.exact)){c={t:3,all:[3]};T={exact:false}}/* Lợi 28/11: F12 tạm lấy Type 3 làm box cơ sở (ước) cho ô chưa có dữ liệu */if(!c)return null;var r={t:c.t,all:c.all,est:!T.exact},nt=NOTE[cl+'.'+k];if(nt&&nt.cells.indexOf(no)>=0){r.note=nt.note;r.qty=nt.qty;r.extra=nt.extra}return r},
 /* đếm số ô theo loại trong 1 cụm (chỉ ô có trong map v5) */
 count:function(cl){var o={};for(var k=1;k<=7;k++){var T=tier(cl,k);Object.keys(T.map).forEach(function(c){T.map[c].all.forEach(function(t){o[t]=(o[t]||0)+1})})}return o},
 /* xếp hộp con Parts Case vào lòng L×W×H (mm): trả {nl,nw,sw,lay,n} */
 fit:function(L,Wd,H){var a=this.CASE[0],b=this.CASE[1],h=this.CASE[2],o1=[Math.floor(L/a),Math.floor(Wd/b),0],o2=[Math.floor(L/b),Math.floor(Wd/a),1],o=(o1[0]*o1[1]>=o2[0]*o2[1])?o1:o2,lay=Math.floor(H/h);return{nl:o[0],nw:o[1],sw:o[2],lay:lay,n:o[0]*o[1]*lay}}
}})();
