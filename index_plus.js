/* index_plus.js — Header trang chủ: 🔔 Cảnh báo · 📊 Tổng quan · 📷 Quét QR · 🟢 Trạng thái dữ liệu · 📖 Nhật ký XNT.
   Chỉ ĐỌC dữ liệu của index.html (DATA, capOf, hashOf…). Nạp SAU script chính. */
(function(){
 /* >>> DÁN LINK Google Sheet / Form nhật ký xuất–nhập vào đây (xem hướng dẫn trong nút 📖). Để trống = hiện hướng dẫn. <<< */
 var NHATKY_URL='';
 var $=function(i){return document.getElementById(i)};
 var css=document.createElement('style');css.textContent=
 '.hdr{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:nowrap}.hdr h1{margin:0;flex:1 1 auto;min-width:0}'+
 '.hbt{display:flex;gap:6px;flex:none}.hbt button{position:relative;width:40px;height:40px;border-radius:12px;border:1px solid var(--line);background:var(--card);font-size:19px;line-height:1;padding:0;cursor:pointer;color:inherit}'+
 '.hbt .dot{position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;border-radius:9px;background:#d32f2f;color:#fff;font:700 11px/18px var(--sans);text-align:center;padding:0 4px}'+
 '.nkl{list-style:none;padding:0;margin:8px 0;font-size:13.5px}.nkl li{border:1.5px solid var(--line);border-radius:10px;padding:8px 10px;margin:0 0 6px}.nkd{float:right;border:0;background:transparent;font-size:16px}'+
 '.dstat{font-size:12.5px;color:var(--mute);margin:2px 0 8px}'+
 '.hpop{position:fixed;left:50%;transform:translateX(-50%);top:64px;width:min(94vw,430px);max-height:72vh;overflow:auto;z-index:120;background:var(--card);border:1px solid var(--line);border-radius:14px;box-shadow:0 8px 28px rgba(0,0,0,.35);padding:12px 14px}'+
 '.hpop h3{margin:0 0 8px;font-size:16px;display:flex;justify-content:space-between;align-items:center}.hpop h3 button{border:0;background:none;font-size:22px;color:inherit;cursor:pointer}'+
 '.hpop details{border-top:1px solid var(--line);padding:6px 0}.hpop summary{cursor:pointer;font-weight:600;font-size:14.5px}.hpop li{margin:4px 0;font-size:14px}.hpop a{color:var(--ink)}'+
 '.kpi{display:grid;grid-template-columns:1fr 1fr;gap:8px}.kpi div{border:1px solid var(--line);border-radius:10px;padding:8px 10px}.kpi b{display:block;font-size:20px}.kpi span{font-size:12.5px;color:var(--mute)}'+
 '#nkb{position:fixed;right:158px;bottom:14px;z-index:90;min-height:44px;padding:0 14px;border:0;border-radius:22px;background:#1d3fa8;color:#fff;font-size:16px;font-weight:700;box-shadow:0 2px 10px rgba(0,0,0,.35);cursor:pointer}'+
 '#qrv{width:100%;border-radius:10px;background:#000;max-height:50vh}.hpop .rw{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap}.hpop .rw button,.hpop .rw a{padding:8px 12px;border:1px solid var(--line);border-radius:10px;background:var(--card);color:inherit;font:600 14px var(--sans);text-decoration:none;cursor:pointer}'+
 '.hpop pre{white-space:pre-wrap;font:12.5px var(--mono);background:rgba(128,128,128,.14);padding:8px;border-radius:8px;overflow:auto}';
 document.head.appendChild(css);
 var hb=$('hbt'),pop=$('hpop'),stream=null,scanT=null;
 if(window.LT){var sel=document.createElement('select');sel.id='gov';sel.setAttribute('aria-label','Góc nhìn Thống đốc');sel.style.cssText='font:13px var(--sans);margin-left:8px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:inherit;padding:3px 6px;max-width:100%';
  sel.innerHTML='<option value="">🏛 Toàn kho (Tổng quản)</option>'+Object.keys(LT.DEPTS).filter(function(d){return LT.RULES.some(function(r){return r.dept===d})}).map(function(d){return '<option value="'+d+'">Xem bản đồ: '+d+'</option>'}).join('');
  sel.onchange=function(){GOV=sel.value;if(location.hash&&location.hash!=='#'){location.hash=''}else render();window.scrollTo(0,0)};$('dstat').parentNode.insertBefore(sel,$('dstat').nextSibling)}
 hb.innerHTML='<button id="bAl" type="button" aria-label="Cảnh báo">🔔</button><button id="bDb" type="button" aria-label="Tổng quan kho">📊</button><button id="bQr" type="button" aria-label="Quét mã QR">📷</button><button id="bQt" type="button" aria-label="Quản trị dữ liệu" title="Quản trị dữ liệu / Góp ý">🗂</button>';
 function stopCam(){if(scanT){clearInterval(scanT);scanT=null}if(stream){stream.getTracks().forEach(function(t){t.stop()});stream=null}}
 function show(h){stopCam();pop.innerHTML=h;pop.hidden=false;var x=pop.querySelector('.cls');if(x)x.onclick=hide}
 function hide(){stopCam();pop.hidden=true}
 document.addEventListener('click',function(e){if(!pop.hidden&&e.target.isConnected&&!pop.contains(e.target)&&!hb.contains(e.target)&&e.target.id!=='nkb'&&e.target.id!=='faqnk')hide();var a=e.target.closest&&e.target.closest('.hpop a[href^="#"]');if(a)hide()});
 var H3=function(t){return '<h3>'+t+'<button class="cls" type="button" aria-label="Đóng">×</button></h3>'};
 /* ---- trạng thái dữ liệu ---- */
 function stat(){var on=navigator.onLine!==false;$('dstat').innerHTML=(on?'🟢':'🟠')+' '+DATA.length+' dòng · Cập nhật: '+esc(String(UPDATED).split(' (')[0])+(on?'':' · đang offline (dùng dữ liệu đã tải)')}
 stat();try{new MutationObserver(stat).observe($('foot'),{childList:true,characterData:true,subtree:true})}catch(e){}addEventListener('online',stat);addEventListener('offline',stat);
/* ---- NHẬT KÝ THAO TÁC (localStorage "nhat_ky_xnt"): Xuất nhanh / Báo kiểm kê lệch ---- */
 var NKEY='nhat_ky_xnt';
 function nkAll(){try{return JSON.parse(localStorage.getItem(NKEY)||'[]')}catch(e){return []}}
 function nkSave(a){try{localStorage.setItem(NKEY,JSON.stringify(a))}catch(e){}refreshNk()}
 window.NK={all:nkAll,add:function(e){var a=nkAll();a.push(e);nkSave(a)},clear:function(){nkSave([])}};
 function csvEsc(v){v=String(v==null?'':v);return '"'+v.replace(/"/g,'""')+'"'}
 function nkCSV(){var a=nkAll(),rows=[['Ngày','Giờ','Người thao tác','Hành động','Mã KK','Số lượng','Mã ô','SKU','ĐVT','Số sổ sách (cũ)','Số thực tế (mới)','Kết quả','Ghi chú']].concat(a.slice().reverse().reverse().map(function(e){return [e.d,e.t,e.who,e.act,e.kk,e.qty,e.vt,e.sku,e.dvt,e.so==null?'':e.so,(e.act==='LECH'||e.act==='ĐỐI SOÁT')?e.qty:'',e.kq||(e.act==='LECH'?(e.done?'Lệch (đã xử lý)':'Lệch'):''),e.act==='LECH'?'Sổ '+e.so+' / Thực tế '+e.qty:'']}));
  var b=new Blob(['\ufeff'+rows.map(function(r){return r.map(csvEsc).join(',')}).join('\r\n')],{type:'text/csv;charset=utf-8'}),u=URL.createObjectURL(b),l=document.createElement('a');l.href=u;l.download='Nhat_ky_XNT_'+new Date().toISOString().slice(0,10)+'.csv';document.body.appendChild(l);l.click();setTimeout(function(){l.remove();URL.revokeObjectURL(u)},500)}
 function lechList(){var o=[];nkAll().forEach(function(e,i){if(e.act==='LECH'&&!e.done){var c=Object.assign({},e);c._i=i;o.push(c)}});return o}
 function alCount(A){return A.xn.length+A.hs.length+A.vol.length+A.wt.length+A.hi.length+A.frag.length+A.cf.length+A.lech.length+A.kn.length}
 function refreshNk(){var n=nkAll().length,b=$('nkb');if(b)b.textContent='📖 Nhật ký'+(n?' ('+n+')':'');var al=$('bAl');if(al){var d=al.querySelector('.dot'),c=0;try{c=alCount(analyse())}catch(x){c=lechList().length}if(c){if(!d){d=document.createElement('span');d.className='dot';al.appendChild(d)}d.textContent=c>99?'99+':c}else if(d)d.remove()}}
 function nkView(){var a=nkAll().slice().reverse();
  show(H3('📖 Nhật ký thao tác (lưu trên máy này)')+'<p style="font-size:13px;margin:0 0 8px;color:var(--mute)">Mỗi lần bấm <b>➖ Xuất nhanh</b> / <b>➕ Báo kiểm kê lệch</b> ở thẻ vật tư, 1 dòng được ghi vào đây (còn khi tắt trình duyệt). Cuối ngày bấm <b>Tải CSV</b>, dán vào file Master, rồi bấm <b>Đã lưu xong</b>. Xoá lịch sử trình duyệt sẽ mất nhật ký — nhớ tải CSV mỗi ngày.</p>'+
  '<div class="rw"><button type="button" id="nkcsv">⬇ Tải nhật ký về máy (CSV)</button><button type="button" id="nkdone">✅ Đã lưu xong – Xoá nhật ký tạm</button><button type="button" id="nkall">🗑 Xoá toàn bộ</button></div>'+
  (a.length?'<ul class="nkl">'+a.map(function(e,i){var ix=a.length-1-i;return '<li><b>'+esc(e.d+' '+e.t)+'</b> · '+(e.act==='LECH'?(e.done?'✔ Lệch (đã xử lý)':'⚠️ Lệch'):(e.act==='ĐỐI SOÁT'?'🧮 Đối soát · '+esc(e.kq||''):'➖ Xuất'))+' · <a href="#'+esc(e.kk)+'">'+esc(e.kk)+'</a> · '+(e.act==='LECH'||e.act==='ĐỐI SOÁT'?'Sổ '+esc(e.so)+' → Thực tế '+esc(e.qty):'SL '+esc(e.qty))+' '+esc(e.dvt||'')+' · '+esc(e.who||'?')+' <button type="button" class="nkd" data-i="'+ix+'" aria-label="Xoá dòng">🗑</button></li>'}).join('')+'</ul>':'<p>Chưa có thao tác nào.</p>')+
  (NHATKY_URL?'<p><a href="'+NHATKY_URL+'" target="_blank" rel="noopener">Mở sổ Google Sheets ↗</a></p>':''));
  $('nkcsv').onclick=nkCSV;
  $('nkdone').onclick=function(){if(confirm('Đã lưu CSV xong? Xoá '+nkAll().length+' dòng nhật ký tạm trên máy này.')){nkSave([]);nkView()}};
  $('nkall').onclick=function(){if(nkAll().length&&confirm('Xoá TOÀN BỘ nhật ký trên máy này?')){nkSave([]);nkView()}};
  pop.querySelectorAll('.nkd').forEach(function(b){b.onclick=function(){var x=nkAll();x.splice(+b.dataset.i,1);nkSave(x);nkView()}})}
 window.NK.view=nkView;
 /* ---- phân tích cảnh báo ---- */
function kyNhauList(){var out=[];((window.TD&&TD.ky_nhau)||[]).forEach(function(p){var a=DATA.filter(function(x){return x.kk===p[0]})[0],b=DATA.filter(function(x){return x.kk===p[1]})[0];if(a&&b&&a.vt&&b.vt&&a.vt.split('.').slice(0,2).join('.')===b.vt.split('.').slice(0,2).join('.'))out.push({a:a,b:b,why:p[2]||''})});return out}
 function analyse(){var A={xn:[],hs:[],vol:[],wt:[],hi:[],frag:[],nokt:[],cf:(window.LT?LT.conflicts():[]),lech:lechList(),kn:kyNhauList()},T=window.TT,seen={};
  DATA.forEach(function(r){if(r.ai==='Cần xác nhận')A.xn.push(r);var h=hsdOne(r);if(h)A.hs.push([r,h])});
  DATA.forEach(function(r){if(!r.vt||seen[r.vt])return;seen[r.vt]=1;var c=capOf(r.vt);
   if(c.pct!=null&&c.pct>100)A.vol.push([r.vt,c.pct]);if(c.miss.length)A.nokt.push([r.vt,c.miss.length]);
   if(T){var t=T.cell(r.vt,c.rs,c.type);t.warn.forEach(function(w){var k=/Quá tải|Gần đầy/.test(w)?'wt':(/cao/.test(w)?'hi':'frag');A[k].push([r.vt,w])})}});
  return A}
 function li(loc,txt){return '<li><a href="#'+hashOf(loc)+'">'+esc(loc)+'</a> — '+txt+'</li>'}
 $('bQt').onclick=function(){location.href='quan_tri.html'};
 $('bAl').onclick=function(){var A=analyse(),n=alCount(A);
  function grp(ic,t,arr,fn){return arr.length?'<details><summary>'+ic+' '+t+' ('+arr.length+')</summary><ul>'+arr.slice(0,40).map(fn).join('')+(arr.length>40?'<li>… và '+(arr.length-40)+' mục nữa</li>':'')+'</ul></details>':''}
  show(H3('🔔 Cảnh báo')+(n?'':'<p>Không có cảnh báo nóng. ✅</p>')+
   grp('⛔','Vật tư KỴ NHAU đang để cùng dãy kệ',A.kn,function(c){return '<li>🔴 <a href="#'+c.a.kk+'">'+c.a.kk+'</a> (<a href="#'+hashOf(c.a.vt)+'">'+esc(c.a.vt)+'</a>) ⛔ <a href="#'+c.b.kk+'">'+c.b.kk+'</a> (<a href="#'+hashOf(c.b.vt)+'">'+esc(c.b.vt)+'</a>)'+(c.why?' — '+esc(c.why):'')+'</li>'})+
   grp('🔴','Lệch kiểm kê do người dùng báo',A.lech,function(e){return '<li><a href="#'+esc(e.kk)+'">'+esc(e.kk)+'</a> lệch: Sổ '+esc(e.so)+', Thực tế '+esc(e.qty)+', Người báo: '+esc(e.who||'?')+' ('+esc(e.d+' '+e.t)+') <button type="button" class="lechdone" data-i="'+e._i+'">✔ Đã xử lý / Xóa cảnh báo</button></li>'})+
   grp('🏛','Tranh chấp lãnh thổ (2 bộ phận cùng 1 vị trí)',A.cf,function(c){return '<li><a href="#'+c.cl+'">'+c.cl+'</a> — '+esc(c.msg)+' → cần Tổng quản phân xử</li>'})+
   grp('⚖️','Quá tải / gần đầy tải hộp (kg)',A.wt,function(a){return li(a[0],a[1])})+
   grp('⚖️','Đồ nặng ở tầng cao',A.hi,function(a){return li(a[0],a[1])})+
   grp('🔻','Dễ vỡ chung đồ nặng',A.frag,function(a){return li(a[0],a[1])})+
   grp('📦','Quá tải thể tích (>100%)',A.vol,function(a){return li(a[0],Math.round(a[1])+'%')})+
   grp('❓','Cần xác nhận',A.xn,function(r){return '<li><a href="#'+r.kk+'">'+r.kk+'</a> · '+esc(r.vt)+' — '+esc((r.cx||'').slice(0,80))+'</li>'})+
   grp('📅','HSD quá hạn / dưới 30 ngày',A.hs,function(a){return '<li><a href="#'+a[0].kk+'">'+a[0].kk+'</a> — '+(a[1]==='e'?'quá hạn':'dưới 30 ngày')+'</li>'})+
   '<details><summary>ℹ️ Chưa tính được ('+A.nokt.length+' ô thiếu kích thước)</summary><ul>'+A.nokt.slice(0,30).map(function(a){return li(a[0],a[1]+' dòng thiếu kích thước')}).join('')+'</ul></details>');
  pop.querySelectorAll('.lechdone').forEach(function(b){b.onclick=function(){var x=nkAll(),i=+b.dataset.i,e=x[i],n=new Date(),p=function(v){return('0'+v).slice(-2)};if(!e)return;e.done=1;e.doneAt=p(n.getDate())+'/'+p(n.getMonth()+1)+'/'+n.getFullYear()+' '+p(n.getHours())+':'+p(n.getMinutes());e.doneBy=localStorage.getItem('kho_who')||'';nkSave(x);$('bAl').onclick()}});};
 (function badge(){var A=analyse(),n=alCount(A);if(n){var d=document.createElement('span');d.className='dot';d.textContent=n>99?'99+':n;$('bAl').appendChild(d)}refreshNk();refreshNk();
try{if(typeof render==='function')render()}catch(e){}
})();
 /* ---- tổng quan ---- */
 $('bDb').onclick=function(){var T=window.TT,sk={},cells={},vp=[],wp=[],kg=0,kn=0;
  DATA.forEach(function(r){if(r.sku)sk[r.sku]=1;if(r.vt)cells[r.vt]=1;if(T){var e=T.est(r);if(e&&e.kg!=null){kg+=e.kg;kn++}}});
  Object.keys(cells).forEach(function(l){var c=capOf(l);if(c.pct!=null)vp.push(c.pct);if(T){var t=T.cell(l,c.rs,c.type);if(t.pct!=null)wp.push(t.pct)}});
  var av=function(a){return a.length?Math.round(a.reduce(function(x,y){return x+y},0)/a.length)+'%':'—'};
  show(H3('📊 Tổng quan kho')+'<div class="kpi"><div><b>'+DATA.length+'</b><span>dòng kiểm kê</span></div><div><b>'+Object.keys(sk).length+'</b><span>SKU khác nhau</span></div><div><b>'+Object.keys(cells).length+'</b><span>ô/box đang có nhãn</span></div><div><b>'+av(vp)+'</b><span>📦 thể tích TB (trên '+vp.length+' ô tính được)</span></div><div><b>'+av(wp)+'</b><span>⚖️ tải trọng hộp TB ('+wp.length+' ô)</span></div><div><b>≈ '+(T?T.fmt(kg):'—')+' kg</b><span>tổng khối lượng ước tính ('+kn+'/'+DATA.length+' dòng có số)</span></div></div><p style="font-size:12.5px;color:var(--mute)">Cập nhật dữ liệu: '+esc(UPDATED)+'. Khối lượng là ƯỚC TÍNH (sai số ±40%) cho tới khi ghi số thật vào trong_luong.js.</p><div class="rw"><button type="button" id="kkgo">🩺 Khám toàn kho</button></div>');$('kkgo').onclick=window.khamKho};
 /* ---- quét QR ---- */
 function fill(txt){var m=/KK-\d{3,4}/i.exec(txt)||/F\d{1,2}[.\-]\d(?:[.\-]\d+){0,2}/i.exec(txt),v=m?m[0].toUpperCase().replace(/-/g,function(x,i,s){return /^KK/.test(s)?'-':'.'}):txt.trim();hide();$('q').value=v;$('f').dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}))}
 function loadJsQR(cb){if(window.jsQR)return cb();var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.min.js';s.onload=cb;s.onerror=function(){$('qrm').textContent='Không tải được thư viện quét (cần mạng lần đầu). Có thể dùng camera điện thoại quét mã rồi bấm vào liên kết.'};document.head.appendChild(s)}
 $('bQr').onclick=function(){show(H3('📷 Quét mã QR trên nhãn')+'<video id="qrv" playsinline muted></video><p id="qrm" style="font-size:13px;margin:6px 0 0">Đưa mã QR vào khung…</p><div class="rw"><span style="font-size:12.5px;color:var(--mute)">Quét xong sẽ tự điền mã KK / mã ô vào ô tìm kiếm.</span></div>');
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){$('qrm').textContent='Trình duyệt này không cho mở camera (cần https). Dùng camera điện thoại quét mã.';return}
  navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false}).then(function(st){stream=st;var v=$('qrv');v.srcObject=st;v.play();
   var done=function(t){fill(t)},bd=window.BarcodeDetector?new BarcodeDetector({formats:['qr_code']}):null,cv=document.createElement('canvas'),cx=cv.getContext('2d',{willReadFrequently:true});
   function tick(){if(!stream||v.videoWidth===0)return;if(bd){bd.detect(v).then(function(r){if(r.length)done(r[0].rawValue)}).catch(function(){})}else if(window.jsQR){cv.width=v.videoWidth;cv.height=v.videoHeight;cx.drawImage(v,0,0);var d=cx.getImageData(0,0,cv.width,cv.height),c=jsQR(d.data,d.width,d.height);if(c&&c.data)done(c.data)}}
   (bd?function(f){f()}:loadJsQR)(function(){scanT=setInterval(tick,300)})}).catch(function(e){$('qrm').textContent='Không mở được camera: '+(e&&e.name==='NotAllowedError'?'bạn chưa cho phép camera.':(e&&e.message||e))})};

 /* ================= 🩺 BÁC SĨ KHÁM BOX — kết luận từng box + tổng kết toàn kho (phục vụ GĐ2: tái sắp xếp kho) ================= */
 var SKUMAP=null;
 function skuMap(){if(SKUMAP)return SKUMAP;SKUMAP={};DATA.forEach(function(r){if(r.sku){(SKUMAP[r.sku]=SKUMAP[r.sku]||{})[r.vt]=1}});return SKUMAP}
 function freeBoxes(loc){var p=loc.split('.'),cl=p[0]+'.'+p[1],es=(window.KHO_VITRI&&vtIdx()[cl])||[],o=[];
  es.forEach(function(e){if(e[0]===loc)return;var c=capOf(e[0]),pc=c.rs.length?c.pct:0;if((pc==null||pc<50)&&+e[0].split('.')[2]<=4)o.push([e[0],pc==null?0:pc])});
  o.sort(function(a,b){return a[1]-b[1]});return o.slice(0,2).map(function(x){return x[0]})}
 window.diagnose=function(loc){var c=capOf(loc),rs=c.rs;if(!rs.length)return null;var T=window.TT,t=T?T.cell(loc,rs,c.type):{warn:[],kg:0,n:0,pct:null,cap:null},tags=[],F=[],S=[],sev=0,tang=+loc.split('.')[2];
  var xn=rs.filter(function(r){return r.ai==='Cần xác nhận'}),hs=rs.filter(function(r){return hsdOne(r)}),hse=rs.filter(function(r){return hsdOne(r)==='e'});
  var nosku=rs.filter(function(r){return !r.sku}),nohang=rs.filter(function(r){return !r.hang&&!r.model}),mnh=rs.filter(function(r){return r.mnh==='Có'});
  var dup=[];rs.forEach(function(r){if(!r.sku)return;var o=Object.keys(skuMap()[r.sku]||{}).filter(function(v){return v!==loc});if(o.length)dup.push([r,o])});
  var dupSku={};dup.forEach(function(d){dupSku[d[0].sku]=d[1]});var nd=Object.keys(dupSku).length;
  if(c.pct!=null&&c.pct>100){F.push('📦 Quá tải thể tích '+Math.round(c.pct)+'% (vượt ngưỡng 80% an toàn)');tags.push('QUA_TAI_THE_TICH');sev+=3}
  else if(c.pct!=null&&c.pct>=CAP_HI){F.push('📦 Sắp đầy: '+Math.round(c.pct)+'%');tags.push('SAP_DAY');sev+=2}
  t.warn.forEach(function(w){F.push(w);if(/Quá tải/.test(w)){tags.push('QUA_TAI_KG');sev+=3}else if(/Gần đầy/.test(w)){tags.push('GAN_DAY_KG');sev+=1}else if(/cao/.test(w)){tags.push('NANG_O_TREN');sev+=2}else{tags.push('DE_VO_CHUNG_NANG');sev+=2}});
  if(c.miss.length){F.push('📏 '+c.miss.length+' dòng thiếu kích thước (nên % có thể thấp hơn thực tế): '+c.miss.slice(0,6).join(', '));tags.push('THIEU_KICH_THUOC');sev+=1}
  if(xn.length){F.push('❓ '+xn.length+' dòng "Cần xác nhận": '+xn.slice(0,6).map(function(r){return r.kk}).join(', '));tags.push('CAN_XAC_NHAN');sev+=1}
  if(hse.length){F.push('📅 '+hse.length+' món HSD quá hạn');tags.push('HSD_QUA_HAN');sev+=3}
  if(hs.length-hse.length>0){F.push('📅 '+(hs.length-hse.length)+' món HSD dưới 30 ngày');tags.push('HSD_SAP_HET');sev+=1}
  if(nosku.length){F.push('🏷 '+nosku.length+' dòng chưa có SKU');tags.push('THIEU_SKU');sev+=1}
  if(nohang.length>rs.length*.3){F.push('🏭 '+nohang.length+'/'+rs.length+' dòng chưa có hãng/model');tags.push('THIEU_HANG')}
  if(mnh.length){F.push('🧾 '+mnh.length+' dòng mất nhãn gốc');tags.push('MAT_NHAN_GOC')}
  if(nd){F.push('🔗 '+nd+' SKU cũng nằm ở box khác (phân tán)');tags.push('SKU_PHAN_TAN')}
  if(rs.length>40){F.push('🧩 Quá nhiều loại trong 1 box ('+rs.length+' dòng) — khó lấy, dễ nhầm');tags.push('QUA_NHIEU_LOAI');sev+=1}
  if(t.n<rs.length*.5){F.push('⚖️ Mới ước được kg cho '+t.n+'/'+rs.length+' dòng — tải trọng chưa đáng tin');tags.push('THIEU_KG')}
  /* đề xuất */
  var fb=freeBoxes(loc);
  if(c.pct!=null&&c.pct>=CAP_HI)S.push('Chuyển bớt đồ ít dùng/ít lấy sang box còn trống cùng cụm'+(fb.length?': '+fb.join(', '):'')+'.');
  if(tags.indexOf('NANG_O_TREN')>=0)S.push('Hạ các món nặng (≥2 kg/cái) xuống tầng 1–3; tầng '+tang+' chỉ để đồ nhẹ.');
  if(tags.indexOf('DE_VO_CHUNG_NANG')>=0||tags.indexOf('QUA_NHIEU_LOAI')>=0)S.push('Chia ngăn Box-trong-Box: -A đồ nặng (dưới) / -B đồ thường / -C đồ dễ vỡ (trên).');
  if(tags.indexOf('QUA_TAI_KG')>=0)S.push('Giảm tải: chuyển ≥'+Math.max(1,Math.ceil(t.kg-t.cap))+' kg sang box khác hoặc dùng box lớn hơn.');
  if(nd)S.push('Gom SKU trùng về 1 box chính (xem danh sách "SKU có ở box khác"): '+Object.keys(dupSku).slice(0,4).map(function(k){return k+'→'+dupSku[k][0]}).join('; ')+'.');
  if(hs.length)S.push('Ưu tiên xuất/dùng các món sắp hoặc đã hết HSD; đã quá hạn thì lập phiếu xử lý.');
  if(xn.length||c.miss.length||nosku.length)S.push('Bổ sung dữ liệu còn thiếu (xác nhận, kích thước, SKU) rồi khám lại.');
  if(t.n<rs.length*.5)S.push('Ghi kg thật/cảm nhận vào trong_luong.js để tải trọng chính xác hơn.');
  if(!S.length)S.push('Không cần can thiệp; giữ nguyên.');
  var grade=sev>=5?['🔴','Cần xử lý'] :(sev>=2?['🟡','Cần theo dõi']:['🟢','Khoẻ']);
  return {loc:loc,grade:grade,sev:sev,F:F,S:S,tags:tags,vol:c.pct,kg:t.kg,kgp:t.pct,n:rs.length,type:c.type}};
 window.docHTML=function(loc){var d=window.diagnose(loc);if(!d)return '';
  return '<details class="cap doc" open><summary style="cursor:pointer;font-size:15px"><b>🩺 Kết luận khám box '+esc(loc)+': '+d.grade[0]+' '+d.grade[1]+'</b></summary>'+
   '<div class="capt" style="margin-top:6px"><b>Chỉ số:</b> 📦 '+(d.vol!=null?Math.round(d.vol)+'%':'chưa tính') +' · ⚖️ '+(d.kg?'≈'+(window.TT?TT.fmt(d.kg):d.kg)+' kg':'chưa có')+(d.kgp!=null?' ('+Math.round(d.kgp)+'% tải hộp)':'')+' · '+d.n+' dòng · hộp '+esc(d.type)+'</div>'+
   '<div class="capt"><b>Phát hiện:</b></div>'+(d.F.length?'<ul style="margin:2px 0 4px;padding-left:20px">'+d.F.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>':'<div class="capt">Không phát hiện vấn đề.</div>')+
   '<div class="capt"><b>Đề xuất (dữ liệu cho GĐ2 — tái sắp xếp):</b></div><ul style="margin:2px 0 4px;padding-left:20px">'+d.S.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>'+
   '<small>Thẻ phân loại: '+(d.tags.join(' · ')||'—')+'. Kết luận tự động từ dữ liệu hiện có (kg là ước tính); không thay cho kiểm tra thực tế.</small></details>'};
 function allDiag(){var seen={},o=[];DATA.forEach(function(r){if(r.vt&&!seen[r.vt]){seen[r.vt]=1;var d=window.diagnose(r.vt);if(d)o.push(d)}});o.sort(function(a,b){return b.sev-a.sev});return o}
 function csvq(x){return '"'+String(x==null?'':x).replace(/"/g,'""')+'"'}
 function dlCSV(){var ds=allDiag(),L=[['Mã ô','Mức','Điểm nặng','Thể tích %','Ước kg','Tải hộp %','Số dòng','Loại hộp','Phát hiện','Đề xuất','Thẻ']].concat(ds.map(function(d){return [d.loc,d.grade[1],d.sev,d.vol!=null?Math.round(d.vol):'',d.kg?Math.round(d.kg*10)/10:'',d.kgp!=null?Math.round(d.kgp):'',d.n,d.type,d.F.join(' | '),d.S.join(' | '),d.tags.join(' ')]})),
   txt='﻿'+L.map(function(r){return r.map(csvq).join(',')}).join('\n'),b=new Blob([txt],{type:'text/csv;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='Kham_kho_'+(new Date().toISOString().slice(0,10))+'.csv';document.body.appendChild(a);a.click();a.remove()}
 window.khamKho=function(){var ds=allDiag(),tg={};ds.forEach(function(d){d.tags.forEach(function(t){tg[t]=(tg[t]||0)+1})});
  var g=[0,0,0];ds.forEach(function(d){g[d.sev>=5?2:(d.sev>=2?1:0)]++});
  show(H3('🩺 Khám toàn kho')+'<p style="margin:0 0 6px">Đã khám <b>'+ds.length+'</b> box có nhãn: 🟢 '+g[0]+' khoẻ · 🟡 '+g[1]+' theo dõi · 🔴 '+g[2]+' cần xử lý.</p>'+
   '<details open><summary>Box cần ưu tiên</summary><ul>'+ds.slice(0,8).map(function(d){return '<li><a href="#'+hashOf(d.loc)+'">'+d.loc+'</a> '+d.grade[0]+' — '+esc((d.F[0]||'—'))+'</a></li>'}).join('')+'</ul></details>'+
   '<details><summary>Bệnh phổ biến toàn kho</summary><ul>'+Object.keys(tg).sort(function(a,b){return tg[b]-tg[a]}).map(function(k){return '<li>'+k+': '+tg[k]+' box</li>'}).join('')+'</ul></details>'+
   '<div class="rw"><button type="button" id="kkcsv">⬇ Tải báo cáo khám (CSV)</button></div><p style="font-size:12.5px;color:var(--mute)">CSV dùng làm cơ sở Giai đoạn 2: tái sắp xếp cấu trúc kho. Càng nạp thêm box, báo cáo càng đầy đủ.</p>');
  $('kkcsv').onclick=dlCSV};
 /* ---- nút nổi 📖 Nhật ký ---- */
 var nk=document.createElement('button');nk.id='nkb';nk.type='button';nk.textContent='📖 Nhật ký';nk.setAttribute('aria-label','Nhật ký xuất nhập tồn');document.body.appendChild(nk);
 nk.onclick=function(){nkView()};
 var nkOld=function(){
  show(H3('📖 Nhật ký Xuất – Nhập – Tồn')+'<p>Chưa gắn link sổ. Làm 1 lần (≈10 phút), sau đó nút này mở thẳng sổ:</p><ol style="padding-left:20px;font-size:14px"><li>Vào <b>Google Sheets</b> → tạo file <b>KHO_NHAT_KY</b>. Import <b>Nhat_ky_XNT_mau.csv</b> thành tab <b>NHAT_KY</b>, và <b>Ton_kho_mau.csv</b> thành tab <b>TON</b> (tab TON import để mặc định, có tick Convert).</li><li>Mỗi lần xuất/nhập: thêm 1 dòng ở NHAT_KY (Loại = NHAP / XUAT / DIEUCHINH). Tab TON tự tính: <b>Tồn = SL kiểm kê + Nhập − Xuất ± Điều chỉnh</b>.</li><li>(Nhập nhanh trên điện thoại) Google Form → Responses liên kết vào tab NHAT_KY, hoặc dùng app Google Sheets.</li><li>Share → "Anyone with the link: Editor" (hoặc chỉ nhóm thủ kho) → copy link, dán vào dòng <code>NHATKY_URL</code> đầu file <b>index_plus.js</b>, up lên GitHub.</li></ol><p style="font-size:12.5px;color:var(--mute)">Giai đoạn 1: trang này vẫn chỉ để tra cứu; sổ nằm ở Google Sheets. Giai đoạn 2 mới có nút +/− trực tiếp (cần cơ sở dữ liệu).</p>')};
refreshNk();
try{if(typeof render==='function')render()}catch(e){}
})();

/* dấu phiên bản */
(function(){if(window.KHO_VER)return;var s=document.createElement('script');s.src='kho_version.js';document.head.appendChild(s)})();
