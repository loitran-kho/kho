/* kho_geo.js — hình học dùng chung cho tim_duong.html + kho_3D_toan_kho.html (mm; gốc toạ độ O = tâm cửa cuốn điện, +X Đông, +Y Bắc)
   Sửa số đo ở ĐÂY. Các giá trị "GIẢ ĐỊNH" chờ Lợi xác nhận được đánh dấu. */
window.KG=(function(){
var ROOM={W:11530,D:7615},DX=ROOM.W-3300-245,RL=2810,Y2=50,Y1=Y2+RL+45,GAP12=255,F12Y=ROOM.D-600-GAP12,MY=F12Y-525;   /* khe sau lưng F12 = 255 (Lợi 24/11); hành lang chính dọc F12 còn 1045 để tổng = D 7615 */
var O={x:DX+1650,y:ROOM.D};
var X={F11:220,F10:1495,F9:2095,F8:3495,F7:4095,F6:5495,F5:6095,F4:7495,F3:8095,F2:9495,F1:10685};
var F12={'F12.3':[220,2820],'F12.2':[3040,2880],'F12.1':[5920,2295]};
var CX=[1157,3095,5095,7095,9095,10390],CN=['HL-A','HL-B','HL-C','HL-D','HL-E','HL-F'],CD=['F11|F10','F9|F8','F7|F6','F5|F4','F3|F2','F2|F1'];
var FACE={F11:'E',F10:'W',F9:'E',F8:'W',F7:'E',F6:'W',F5:'E',F4:'W',F3:'E',F2:'E',F1:'W'}; // mặt nhìn ra hành lang (F2.1: mặt 1 = Đông giáp F1, mặt 2 = Tây giáp F3). F2.2 = GIẢ ĐỊNH Đông
var TIERS={"F1.1":[[9,2,1],[9,2,1],[9,2,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F1.2":[[9,2,1],[9,2,1],[9,2,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F2.1":[[18,3,2],[18,3,2],[18,3,2],[18,3,2],[6,1,1],[6,1,1],[6,1,1]],"F2.2":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F3.1":[[6,1,1],[6,1,1],[7,1,1],[7,1,1],[7,1,1],[8,2,1],[8,2,1]],"F3.2":[[6,1,1],[6,1,1],[7,1,1],[7,1,1],[7,1,1],[8,2,1],[8,2,1]],"F4.1":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F4.2":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F5.1":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F5.2":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F6.1":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F6.2":[[5,1,1],[5,1,1],[5,1,1],[5,1,1],[5,1,1],[5,1,1],[5,1,1]],"F7.1":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F7.2":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F8.1":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F8.2":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F9.1":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F9.2":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F10.1":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F10.2":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F11.1":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F11.2":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F12.1":[[5,1,1],[5,1,1],[5,1,1],[5,1,1],[5,1,1],[5,1,1],[5,1,1]],"F12.2":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]],"F12.3":[[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1],[6,1,1]]};
var FLOOR=150,BEAM=80,ZONE=465;
var ZONES={'F11.2':[715,220,465,465,465,465,465]};   /* F11.2: bim 2 tháo dời lên (Lợi 24/11): vùng tầng 1 = 715, tầng 2 = 220 */
function zoneOf(cl,k){return (ZONES[cl]||[])[k-1]||ZONE}
function deckZ(cl,k){var z=FLOOR+BEAM;for(var i=1;i<k;i++)z+=zoneOf(cl,i)+BEAM;return z}
var GAM=150;   /* khe gầm dưới đáy mỗi dãy: 100–200, lấy TB 150. Mã ô gầm = <cụm>.0.<n> (tầng 0), GAM_N ô mỗi cụm — GIẢ ĐỊNH */
var GAM_N=6;
function rect(cl){if(F12[cl])return{x:F12[cl][0],y:F12Y,w:F12[cl][1],h:600};var f=cl.split('.')[0],s=cl.split('.')[1];return{x:X[f],y:s==='2'?(cl==='F6.2'?470:Y2):Y1,w:600,h:cl==='F6.2'?2380:RL}}
/* Ô SÀN hành lang (Lợi duyệt 23/11): HL-A..HL-F chia theo chiều Bắc→Nam, ô 01.. mỗi ~1 m; HL-G (hành lang chính F12) chia Tây→Đông. Mã dạng HL-C.03 */
function floorCells(h){var i=CN.indexOf(h);if(i>=0){var y0=Y2,y1=Y1+RL,n=Math.round((y1-y0)/1000);return{n:n,h:(y1-y0)/n,vert:true,x:CX[i],y0:y0}}
 if(h==='HL-G'){var x0=200,x1=ROOM.W-200,m=Math.round((x1-x0)/1000);return{n:m,h:(x1-x0)/m,vert:false,y:MY,x0:x0}}return null}
function locFloor(code){var m=String(code).toUpperCase().match(/^(HL-[A-G])[.\-](\d{1,2})$/);if(!m)return null;var f=floorCells(m[1]),no=+m[2];if(!f||no<1||no>f.n)return null;
 var c=(no-.5)*f.h,x=f.vert?f.x:f.x0+c,y=f.vert?f.y0+c:f.y;return{code:m[1]+'.'+(no<10?'0':'')+no,cl:m[1],k:0,no:no,row:0,face:0,side:'F',fx:x,fy:y,sx:x,sy:y,z:0,n:f.n}}
function locate(code){var fl=locFloor(code);if(fl)return fl;var p=String(code).toUpperCase().replace(/-/g,'.').split('.');if(p.length<4)return null;var cl=p[0]+'.'+p[1],k=+p[2],no=+p[3],T=TIERS[cl];if(!T||!T[k-1])return null;
 var t=T[k-1],n=t[0],rows=t[1],per=rows*n,f=Math.floor((no-1)/per),r=Math.floor(((no-1)%per)/n),j=(no-1)%n,pp=((f?n-1-j:j)+.5)/n,R=rect(cl),side,fx,fy,sx,sy,fn=p[0];
 if(F12[cl]){side='N';fx=R.x+R.w-pp*R.w;fy=R.y;sx=fx;sy=MY}
 else{side=(cl==='F2.1'&&f)?'W':FACE[fn];fy=side==='W'?R.y+pp*R.h:R.y+R.h-pp*R.h;fx=side==='W'?R.x:R.x+R.w;
  var c=CX.filter(function(v){return side==='W'?v<fx:v>fx});sx=side==='W'?Math.max.apply(0,c):Math.min.apply(0,c);sy=fy}
 return{code:p.join('.'),cl:cl,k:k,no:no,row:r,face:f,side:side,fx:fx,fy:fy,sx:sx,sy:sy,z:deckZ(cl,k)+(r&&rows>1?215:0)+120}}
function rel(x,y){return{x:Math.round(x-O.x),y:Math.round(O.y-y)}}
function toMain(P){if(P.y>=Y1+RL-1)return[P.x,MY];var c=CX.reduce(function(a,b){return Math.abs(b-P.x)<Math.abs(a-P.x)?b:a});return[c,P.y,c,MY]}
/* PHƯƠNG ÁN: mỗi vị trí 1 lộ trình riêng từ S, sắp xếp ngắn → dài (đường 1 = gần nhất) */
function alts(S,codes){var seen={};return codes.filter(function(c){var l=locate(c);if(!l||seen[l.code])return false;seen[l.code]=1;return true}).map(function(c){var r=route(S,[c]);r.code=locate(c).code;return r}).sort(function(a,b){return a.len-b.len})}
function d(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}
function route(S,codes){var st=codes.map(locate).filter(Boolean),P={x:S.x,y:S.y},pts=[[P.x,P.y]],legs=[],left=st.slice(),order=[];
 while(left.length){var bi=0,bd=1e9;left.forEach(function(q,i){var dd=d(P,{x:q.sx,y:q.sy});if(dd<bd){bd=dd;bi=i}});var q=left.splice(bi,1)[0];order.push(q);
  var seg=[],m=toMain(P);seg.push([m[0],m[1]]);if(m.length>2)seg.push([m[2],m[3]]);
  seg.push([q.sx,MY]);if(q.side!=='N'&&q.side!=='F')seg.push([q.sx,q.sy]);if(q.side==='F'&&q.cl!=='HL-G')seg.push([q.sx,q.sy]);seg.push([q.fx,q.fy]);
  seg.forEach(function(s){pts.push(s)});legs.push({stop:q,pts:seg});P={x:q.sx,y:q.sy}}
 var out=[pts[0]];for(var i=1;i<pts.length;i++){var a=out[out.length-1],b=pts[i];if(Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])>1)out.push(b)}
 var L=0;for(i=1;i<out.length;i++)L+=Math.hypot(out[i][0]-out[i-1][0],out[i][1]-out[i-1][1]);
 return{pts:out,stops:order,len:L}}
return{ROOM:ROOM,DX:DX,RL:RL,Y1:Y1,Y2:Y2,F12Y:F12Y,MY:MY,O:O,X:X,F12:F12,CX:CX,CN:CN,CD:CD,FACE:FACE,TIERS:TIERS,GAM:GAM,GAM_N:GAM_N,ZONES:ZONES,zoneOf:zoneOf,deckZ:deckZ,GAP12:GAP12,rect:rect,locate:locate,floorCells:floorCells,route:route,alts:alts,rel:rel}})();
