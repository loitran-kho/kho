/* lanh_tho.js — Module ĐỊNH KHU THEO NGƯỜI SỬ DỤNG ("liên bang hoá kho lẫm"). Chỉ khai báo + tính; không sửa WMS.
   Mỗi QUY TẮC giao một khoảng tầng của một cụm kệ cho một bộ phận (tuỳ chọn thu hẹp theo ô).
   DỮ LIỆU DƯỚI ĐÂY LÀ MẪU từ lời kể của Lợi — sửa cho đúng thực tế. */
window.LT=(function(){
 var DEPTS={'Hvac1':'#1976d2','KTBT2':'#d32f2f','Tổng quản (Lợi)':'#2e7d32'};
 var RULES=[
  {dept:'Hvac1', cl:'F9.1',t:[1,7],note:'cả kệ F9.1'},
  {dept:'Hvac1', cl:'F9.2',t:[5,7],note:'mượn tầng 5–7 của F9.2'},
  {dept:'KTBT2', cl:'F9.2',t:[1,4],note:'phần còn lại của F9.2'},
  {dept:'KTBT2', cl:'F5.2',t:[1,7],note:'"địa bàn" của bro Hiếu'}
  /* ô cụ thể:  {dept:'X', cl:'F1.1', t:[1,1], o:[1,4]}  = ô 1–4 tầng 1 */
 ];
 function ov(a,b){return a[0]<=b[1]&&b[0]<=a[1]}
 function owners(loc){var p=loc.split('.'),cl=p[0]+'.'+p[1],t=+p[2],o=+p[3],r=[];
  RULES.forEach(function(x){if(x.cl===cl&&(!p[2]||(t>=x.t[0]&&t<=x.t[1]))&&(!x.o||!p[3]||(o>=x.o[0]&&o<=x.o[1])))if(r.indexOf(x.dept)<0)r.push(x.dept)});return r}
 function clusterOwners(cl){var r=[];RULES.forEach(function(x){if(x.cl===cl&&r.indexOf(x.dept)<0)r.push(x.dept)});return r}
 function stripes(cl){var s=[];for(var k=1;k<=7;k++){var o=owners(cl+'.'+k);s.push(o.length?o:null)}return s}   /* [tầng1..tầng7] → mảng bộ phận */
 function conflicts(){var out=[];for(var i=0;i<RULES.length;i++)for(var j=i+1;j<RULES.length;j++){var a=RULES[i],b=RULES[j];
   if(a.cl===b.cl&&a.dept!==b.dept&&ov(a.t,b.t)&&(!a.o||!b.o||ov(a.o,b.o)))out.push({cl:a.cl,a:a,b:b,msg:a.cl+': '+a.dept+' (tầng '+a.t.join('–')+') trùng '+b.dept+' (tầng '+b.t.join('–')+')'})}return out}
 return {DEPTS:DEPTS,RULES:RULES,owners:owners,clusterOwners:clusterOwners,stripes:stripes,conflicts:conflicts}
})();
