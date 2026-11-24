/* lanh_tho.js — Module ĐỊNH KHU THEO NGƯỜI SỬ DỤNG ("liên bang hoá kho lẫm"). Chỉ khai báo + tính; không sửa WMS.
   Mỗi QUY TẮC giao một khoảng tầng của một cụm kệ cho một bộ phận (tuỳ chọn thu hẹp theo ô).
   DỮ LIỆU DƯỚI ĐÂY LÀ MẪU từ lời kể của Lợi — sửa cho đúng thực tế. */
window.LT=(function(){
 var DEPTS={'HVAC-B1':'#1976d2','KTBT-B2':'#d32f2f','KTBT-B1':'#ef6c00','R01':'#00897b','R02':'#8e24aa','TIEN-ICH':'#6d4c41','Tổng quản (Lợi)':'#2e7d32'};
 /* Nguồn: sheet BO_PHAN (31/10/2026: "Khu hiện trạng" theo dãy) + lời Lợi (F9.2 chia tầng; F5.2 của KTBT-B2). mix:true = dãy dùng chung, CHƯA chia tầng/ô → không tính tranh chấp.
    Khi Lợi gửi sheet "Định khu theo bộ phận": thay mảng RULES này (mỗi dòng: dept, cl, t:[tầng từ,đến], o:[ô từ,đến] tuỳ chọn). */
 var RULES=[
  {dept:'HVAC-B1',cl:'F9.1',t:[1,7],note:'cả kệ F9.1'},
  {dept:'HVAC-B1',cl:'F9.2',t:[5,7],note:'mượn tầng 5–7 của F9.2'},
  {dept:'KTBT-B2',cl:'F9.2',t:[1,4],note:'phần còn lại của F9.2'},
  {dept:'KTBT-B2',cl:'F5.2',t:[1,7],note:'"địa bàn" của bro Hiếu'},
  {dept:'KTBT-B2',cl:'F5.1',t:[1,7],mix:true,note:'sheet: F5 = KTBT-B2 + R02, chưa chia tầng'},
  {dept:'R02',cl:'F5.1',t:[1,7],mix:true,note:'sheet: F5 = KTBT-B2 + R02, chưa chia tầng'}
 ];
 ['F6.1','F6.2','F7.1','F7.2','F8.1','F8.2'].forEach(function(c){RULES.push({dept:'KTBT-B1',cl:c,t:[1,7],note:'sheet BO_PHAN: F6–F8 = KTBT-B1'})});
 ['F10.1','F10.2'].forEach(function(c){RULES.push({dept:'TIEN-ICH',cl:c,t:[1,7],mix:true,note:'sheet: F10 = Tiện ích + R01, chưa chia'});RULES.push({dept:'R01',cl:c,t:[1,7],mix:true,note:'sheet: F10 = Tiện ích + R01, chưa chia'})});
 ['F1.1','F1.2','F2.1','F2.2','F4.1','F4.2','F11.1','F11.2','F12.1','F12.2','F12.3'].forEach(function(c){RULES.push({dept:'Tổng quản (Lợi)',cl:c,t:[1,7],note:'Lợi quản trực tiếp (F1,F2,F4,F11,F12)'})});
 function ov(a,b){return a[0]<=b[1]&&b[0]<=a[1]}
 function owners(loc){var p=loc.split('.'),cl=p[0]+'.'+p[1],t=+p[2],o=+p[3],r=[];
  RULES.forEach(function(x){if(x.cl===cl&&(!p[2]||(t>=x.t[0]&&t<=x.t[1]))&&(!x.o||!p[3]||(o>=x.o[0]&&o<=x.o[1])))if(r.indexOf(x.dept)<0)r.push(x.dept)});return r}
 function clusterOwners(cl){var r=[];RULES.forEach(function(x){if(x.cl===cl&&r.indexOf(x.dept)<0)r.push(x.dept)});return r}
 function stripes(cl){var s=[];for(var k=1;k<=7;k++){var o=owners(cl+'.'+k);s.push(o.length?o:null)}return s}   /* [tầng1..tầng7] → mảng bộ phận */
 function conflicts(){var out=[];for(var i=0;i<RULES.length;i++)for(var j=i+1;j<RULES.length;j++){var a=RULES[i],b=RULES[j];
   if(a.cl===b.cl&&a.dept!==b.dept&&!a.mix&&!b.mix&&ov(a.t,b.t)&&(!a.o||!b.o||ov(a.o,b.o)))out.push({cl:a.cl,a:a,b:b,msg:a.cl+': '+a.dept+' (tầng '+a.t.join('–')+') trùng '+b.dept+' (tầng '+b.t.join('–')+')'})}return out}
 return {DEPTS:DEPTS,RULES:RULES,owners:owners,clusterOwners:clusterOwners,stripes:stripes,conflicts:conflicts}
})();
