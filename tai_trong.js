/* tai_trong.js — Module TẢI TRỌNG (kg). Chỉ ĐỌC data.js; không sửa Database. Cùng thư mục với index.html.
   Mọi con số "GIẢ ĐỊNH" bên dưới: thay bằng thông số thật rồi lưu lại — trang tự tính lại. */
window.TT=(function(){
 var CFG={
  /* ---- LOAD-CHART (kg) — GIẢ ĐỊNH, chờ Lợi đối chiếu tem/catalog kệ ---- */
  RACK_TANG:{def:300,F12:200},   /* sức chịu tải mỗi TẦNG của một cụm kệ (kg). Tham chiếu: kệ trung tải thường 200–350 kg/tầng (Bito M: 200 kg/ngăn; BiGDUG 350 kg UDL/ngăn) */
  TANG_N:{def:7,F12:5},          /* số tầng mỗi cụm (F12 thấp 2605 mm — chỉnh nếu khác) */
  BOX_KG:{'Type 1':15,'Type 2':25,'Type 3':40,'Type 4':5,'Type 5':50,'Type 6':30,'Type 7':20}, /* tải an toàn mỗi hộp/ô (kg) */
  WARN:80, OVER:100,             /* % ngưỡng: ≥80 sắp đầy tải, >100 quá tải */
  HEAVY_UNIT:2, LIGHT_UNIT:0.1,  /* kg/đơn vị: ≥2 = ⚖️ nặng; ≤0,1 = 🪶 nhẹ */
  HIGH_TANG:5                    /* từ tầng này trở lên mà có đồ nặng ⇒ cảnh báo "nặng ở trên cao" */
 };
 /* ---- Vật liệu: mật độ g/cm³ và hệ số đặc (chi tiết rỗng/ren/ống ⇒ <1). Ước đoán sai số ±40% ---- */
 var MAT=[
  {k:/inox|stainless|thép|thep|sắt|sat|steel|gang/i,n:'thép/inox',d:7.85,f:.35},
  {k:/nhôm|nhom|alu/i,n:'nhôm',d:2.7,f:.4},
  {k:/đồng|dong\b|brass|cu\b|thau|đồng thau/i,n:'đồng/thau',d:8.5,f:.4},
  {k:/nhựa|nhua|pvc|pp\b|pe\b|nylon|abs|teflon|ptfe/i,n:'nhựa',d:1.2,f:.5},
  {k:/cao su|rubber|nbr|epdm|gioăng|giăng|o-?ring/i,n:'cao su',d:1.1,f:.6},
  {k:/\bQS\b|đầu nối|dau noi|co nối|nối khí|fitting|khí nén|khi nen/i,n:'đầu nối khí (thau/nhựa)',d:4,f:.35}
 ];
 var CAM=[ /* từ cảm nhận → kg mỗi ĐƠN VỊ (cái) — Lợi chỉnh cho đúng "sức người" của mình */
  [/nhẹ tênh|nhe tenh|nhẹ hều|gần như không/i,.05],[/rất nhẹ|rat nhe/i,.1],[/nhẹ|nhe\b/i,.3],
  [/nặng trịch|nang trich/i,5],[/rất nặng|rat nang|nặng lắm/i,8],[/hơi nặng|hoi nang/i,1.5],[/nặng|nang\b/i,3],[/vừa tay|trung bình|vua tay/i,1]
 ];
 function num(s){return parseFloat(String(s).replace(',','.'))}
 function qty(r){var q=num(r.sl);return q>0?q:null}
 function dims(r){var s=String(r.kt||'').replace(/,/g,'.');
  var m=/[Øø⌀]\s*(\d+(?:\.\d+)?)\s*[×xX*]\s*(\d+(?:\.\d+)?)/.exec(s),u=/\bcm\b/i.test(s)?10:1;
  if(m)return Math.PI*Math.pow(+m[1]*u/2,2)*(+m[2]*u)/1000;
  m=/(\d+(?:\.\d+)?)\s*[×xX*]\s*(\d+(?:\.\d+)?)\s*[×xX*]\s*(\d+(?:\.\d+)?)/.exec(s);
  return m?(+m[1]*u)*(+m[2]*u)*(+m[3]*u)/1000:null}   /* cm³ */
 function mat(r){var t=[r.ten,r.loai,r.hang,r.model,r.gc].join(' ');for(var i=0;i<MAT.length;i++)if(MAT[i].k.test(t))return MAT[i];return null}
 /* est(r) → {u: kg/đơn vị, kg: kg cả dòng, src, conf} hoặc null.  Thứ tự ưu tiên theo Lợi:
    1) số ghi trên nhãn/cân thật (TT_OVR[kk]) → 2) tra mạng theo SKU/model (TT_OVR, src 'model') → 3) tên có "x kg/…" →
    4) kích thước × mật độ vật liệu → 5) cảm nhận sức người (TT_CAM[kk]) */
 function est(r){var q=qty(r),o=(window.TT_OVR||{})[r.kk],c=(window.TT_CAM||{})[r.kk];
  if(o&&(o.u!=null||o.kg!=null)){var u=o.u!=null?o.u:(q?o.kg/q:null),k=o.kg!=null?o.kg:(q?o.u*q:null);return {u:u,kg:k,src:o.src||'nhãn',conf:o.src==='model'?'vừa':'cao'}}
  var m=/(\d+(?:[.,]\d+)?)\s*kg\s*\/\s*(hộp|cuộn|túi|bịch|cái|bộ|thùng|chai)/i.exec(r.ten||'');
  if(m&&q){var u2=num(m[1]);return {u:u2,kg:u2*q,src:'tên (ghi '+m[0]+')',conf:'vừa'}}
  var v=dims(r),mt=mat(r);
  if(v!=null&&mt&&q){var u3=v*mt.d*mt.f/1000;return {u:u3,kg:u3*q,src:'kích thước × '+mt.n,conf:'thấp'}}
  if(c){var t=String(c),n=/(\d+(?:[.,]\d+)?)\s*kg/i.exec(t);
   if(n){var per=/\/\s*(cái|c|đv|bộ)/i.test(t),val=num(n[1]);return {u:per?val:(q?val/q:null),kg:per?(q?val*q:null):val,src:'cảm nhận: "'+t+'"',conf:'thấp'}}
   for(var i=0;i<CAM.length;i++)if(CAM[i][0].test(t)){return {u:CAM[i][1],kg:q?CAM[i][1]*q:null,src:'cảm nhận: "'+t+'"',conf:'thấp'}}}
  return null}
 function icon(e){if(!e||e.u==null)return '';return e.u>=CFG.HEAVY_UNIT?'⚖️':(e.u<=CFG.LIGHT_UNIT?'🪶':'')}
 function fmt(x){return x==null?'?':(x>=10?Math.round(x):Math.round(x*10)/10).toLocaleString('vi-VN')}
 var FRAG=/đồng hồ|ap ke|áp kế|manometer|gauge|kính|thủy tinh|cảm biến|sensor|mạch|pcb/i;
 /* cell(loc, rows, boxType) → thống kê một ô (vd. F1.1.1.8) */
 function cell(loc,rows,type){var kg=0,n=0,heavy=0,frag=0;
  rows.forEach(function(r){var e=est(r);if(e&&e.kg!=null){kg+=e.kg;n++}if(e&&e.u>=CFG.HEAVY_UNIT)heavy++;if(FRAG.test(r.ten||''))frag++});
  var cap=CFG.BOX_KG[type]||null,tang=+(loc.split('.')[2]||0),pct=cap&&n?kg/cap*100:null,w=[];
  if(pct!=null&&pct>CFG.OVER)w.push('⚖️ Quá tải hộp: ≈'+fmt(kg)+' / '+cap+' kg');
  else if(pct!=null&&pct>=CFG.WARN)w.push('⚠ Gần đầy tải hộp ('+Math.round(pct)+'%)');
  if(heavy&&tang>=CFG.HIGH_TANG)w.push('⚖️ Đồ nặng ở tầng '+tang+' (cao) — nên hạ xuống tầng thấp');
  if(heavy&&frag)w.push('🔻 Đồ dễ vỡ chung ô với đồ nặng — cần chia ngăn (box trong box)');
  return {kg:kg,n:n,N:rows.length,cap:cap,pct:pct,heavy:heavy,frag:frag,warn:w}}
 function rackCap(cl){var d=cl.split('.')[0];return (CFG.RACK_TANG[d]||CFG.RACK_TANG.def)*(CFG.TANG_N[d]||CFG.TANG_N.def)}
 function cls(p){return p==null?'':(p>CFG.OVER?'cx':(p>=CFG.WARN?'cr':(p>=50?'cy':'cg')))}
 return {CFG:CFG,MAT:MAT,est:est,icon:icon,fmt:fmt,cell:cell,rackCap:rackCap,cls:cls}
})();
