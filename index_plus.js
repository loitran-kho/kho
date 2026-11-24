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
 if(window.LT){var sel=document.createElement('select');sel.id='gov';sel.setAttribute('aria-label','Góc nhìn Thống đốc');sel.style.cssText='font:13px var(--sans);margin-left:8px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:inherit;padding:3px 6px;max-width:48%';
  sel.innerHTML='<option value="">🏛 Toàn kho (Tổng quản)</option>'+Object.keys(LT.DEPTS).filter(function(d){return LT.RULES.some(function(r){return r.dept===d})}).map(function(d){return '<option value="'+d+'">Xem bản đồ: '+d+'</option>'}).join('');
  sel.onchange=function(){GOV=sel.value;render()};$('dstat').parentNode.insertBefore(sel,$('dstat').nextSibling)}
 hb.innerHTML='<button id="bAl" type="button" aria-label="Cảnh báo">🔔</button><button id="bDb" type="button" aria-label="Tổng quan kho">📊</button><button id="bQr" type="button" aria-label="Quét mã QR">📷</button>';
 function stopCam(){if(scanT){clearInterval(scanT);scanT=null}if(stream){stream.getTracks().forEach(function(t){t.stop()});stream=null}}
 function show(h){stopCam();pop.innerHTML=h;pop.hidden=false;var x=pop.querySelector('.cls');if(x)x.onclick=hide}
 function hide(){stopCam();pop.hidden=true}
 document.addEventListener('click',function(e){if(!pop.hidden&&!pop.contains(e.target)&&!hb.contains(e.target)&&e.target.id!=='nkb')hide();var a=e.target.closest&&e.target.closest('.hpop a[href^="#"]');if(a)hide()});
 var H3=function(t){return '<h3>'+t+'<button class="cls" type="button" aria-label="Đóng">×</button></h3>'};
 /* ---- trạng thái dữ liệu ---- */
 function stat(){var on=navigator.onLine!==false;$('dstat').innerHTML=(on?'🟢':'🟠')+' '+DATA.length+' dòng · Cập nhật: '+esc(String(UPDATED).split(' (')[0])+(on?'':' · đang offline (dùng dữ liệu đã tải)')}
 stat();try{new MutationObserver(stat).observe($('foot'),{childList:true,characterData:true,subtree:true})}catch(e){}addEventListener('online',stat);addEventListener('offline',stat);
 /* ---- phân tích cảnh báo ---- */
 function analyse(){var A={xn:[],hs:[],vol:[],wt:[],hi:[],frag:[],nokt:[],cf:(window.LT?LT.conflicts():[])},T=window.TT,seen={};
  DATA.forEach(function(r){if(r.ai==='Cần xác nhận')A.xn.push(r);var h=hsdOne(r);if(h)A.hs.push([r,h])});
  DATA.forEach(function(r){if(!r.vt||seen[r.vt])return;seen[r.vt]=1;var c=capOf(r.vt);
   if(c.pct!=null&&c.pct>100)A.vol.push([r.vt,c.pct]);if(c.miss.length)A.nokt.push([r.vt,c.miss.length]);
   if(T){var t=T.cell(r.vt,c.rs,c.type);t.warn.forEach(function(w){var k=/Quá tải|Gần đầy/.test(w)?'wt':(/cao/.test(w)?'hi':'frag');A[k].push([r.vt,w])})}});
  return A}
 function li(loc,txt){return '<li><a href="#'+hashOf(loc)+'">'+esc(loc)+'</a> — '+txt+'</li>'}
 $('bAl').onclick=function(){var A=analyse(),n=A.xn.length+A.hs.length+A.vol.length+A.wt.length+A.hi.length+A.frag.length+A.cf.length;
  function grp(ic,t,arr,fn){return arr.length?'<details><summary>'+ic+' '+t+' ('+arr.length+')</summary><ul>'+arr.slice(0,40).map(fn).join('')+(arr.length>40?'<li>… và '+(arr.length-40)+' mục nữa</li>':'')+'</ul></details>':''}
  show(H3('🔔 Cảnh báo')+(n?'':'<p>Không có cảnh báo nóng. ✅</p>')+
   grp('🏛','Tranh chấp lãnh thổ (2 bộ phận cùng 1 vị trí)',A.cf,function(c){return '<li><a href="#'+c.cl+'">'+c.cl+'</a> — '+esc(c.msg)+' → cần Tổng quản phân xử</li>'})+
   grp('⚖️','Quá tải / gần đầy tải hộp (kg)',A.wt,function(a){return li(a[0],a[1])})+
   grp('⚖️','Đồ nặng ở tầng cao',A.hi,function(a){return li(a[0],a[1])})+
   grp('🔻','Dễ vỡ chung đồ nặng',A.frag,function(a){return li(a[0],a[1])})+
   grp('📦','Quá tải thể tích (>100%)',A.vol,function(a){return li(a[0],Math.round(a[1])+'%')})+
   grp('❓','Cần xác nhận',A.xn,function(r){return '<li><a href="#'+r.kk+'">'+r.kk+'</a> · '+esc(r.vt)+' — '+esc((r.cx||'').slice(0,80))+'</li>'})+
   grp('📅','HSD quá hạn / dưới 30 ngày',A.hs,function(a){return '<li><a href="#'+a[0].kk+'">'+a[0].kk+'</a> — '+(a[1]==='e'?'quá hạn':'dưới 30 ngày')+'</li>'})+
   '<details><summary>ℹ️ Chưa tính được ('+A.nokt.length+' ô thiếu kích thước)</summary><ul>'+A.nokt.slice(0,30).map(function(a){return li(a[0],a[1]+' dòng thiếu kích thước')}).join('')+'</ul></details>');
  var d=$('bAl').querySelector('.dot');};
 (function badge(){var A=analyse(),n=A.xn.length+A.hs.length+A.vol.length+A.wt.length+A.hi.length+A.frag.length+A.cf.length;if(n){var d=document.createElement('span');d.className='dot';d.textContent=n>99?'99+':n;$('bAl').appendChild(d)}})();
 /* ---- tổng quan ---- */
 $('bDb').onclick=function(){var T=window.TT,sk={},cells={},vp=[],wp=[],kg=0,kn=0;
  DATA.forEach(function(r){if(r.sku)sk[r.sku]=1;if(r.vt)cells[r.vt]=1;if(T){var e=T.est(r);if(e&&e.kg!=null){kg+=e.kg;kn++}}});
  Object.keys(cells).forEach(function(l){var c=capOf(l);if(c.pct!=null)vp.push(c.pct);if(T){var t=T.cell(l,c.rs,c.type);if(t.pct!=null)wp.push(t.pct)}});
  var av=function(a){return a.length?Math.round(a.reduce(function(x,y){return x+y},0)/a.length)+'%':'—'};
  show(H3('📊 Tổng quan kho')+'<div class="kpi"><div><b>'+DATA.length+'</b><span>dòng kiểm kê</span></div><div><b>'+Object.keys(sk).length+'</b><span>SKU khác nhau</span></div><div><b>'+Object.keys(cells).length+'</b><span>ô/box đang có nhãn</span></div><div><b>'+av(vp)+'</b><span>📦 thể tích TB (trên '+vp.length+' ô tính được)</span></div><div><b>'+av(wp)+'</b><span>⚖️ tải trọng hộp TB ('+wp.length+' ô)</span></div><div><b>≈ '+(T?T.fmt(kg):'—')+' kg</b><span>tổng khối lượng ước tính ('+kn+'/'+DATA.length+' dòng có số)</span></div></div><p style="font-size:12.5px;color:var(--mute)">Cập nhật dữ liệu: '+esc(UPDATED)+'. Khối lượng là ƯỚC TÍNH (sai số ±40%) cho tới khi ghi số thật vào trong_luong.js.</p>')};
 /* ---- quét QR ---- */
 function fill(txt){var m=/KK-\d{3,4}/i.exec(txt)||/F\d{1,2}[.\-]\d(?:[.\-]\d+){0,2}/i.exec(txt),v=m?m[0].toUpperCase().replace(/-/g,function(x,i,s){return /^KK/.test(s)?'-':'.'}):txt.trim();hide();$('q').value=v;$('f').dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}))}
 function loadJsQR(cb){if(window.jsQR)return cb();var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.min.js';s.onload=cb;s.onerror=function(){$('qrm').textContent='Không tải được thư viện quét (cần mạng lần đầu). Có thể dùng camera điện thoại quét mã rồi bấm vào liên kết.'};document.head.appendChild(s)}
 $('bQr').onclick=function(){show(H3('📷 Quét mã QR trên nhãn')+'<video id="qrv" playsinline muted></video><p id="qrm" style="font-size:13px;margin:6px 0 0">Đưa mã QR vào khung…</p><div class="rw"><span style="font-size:12.5px;color:var(--mute)">Quét xong sẽ tự điền mã KK / mã ô vào ô tìm kiếm.</span></div>');
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){$('qrm').textContent='Trình duyệt này không cho mở camera (cần https). Dùng camera điện thoại quét mã.';return}
  navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false}).then(function(st){stream=st;var v=$('qrv');v.srcObject=st;v.play();
   var done=function(t){fill(t)},bd=window.BarcodeDetector?new BarcodeDetector({formats:['qr_code']}):null,cv=document.createElement('canvas'),cx=cv.getContext('2d',{willReadFrequently:true});
   function tick(){if(!stream||v.videoWidth===0)return;if(bd){bd.detect(v).then(function(r){if(r.length)done(r[0].rawValue)}).catch(function(){})}else if(window.jsQR){cv.width=v.videoWidth;cv.height=v.videoHeight;cx.drawImage(v,0,0);var d=cx.getImageData(0,0,cv.width,cv.height),c=jsQR(d.data,d.width,d.height);if(c&&c.data)done(c.data)}}
   (bd?function(f){f()}:loadJsQR)(function(){scanT=setInterval(tick,300)})}).catch(function(e){$('qrm').textContent='Không mở được camera: '+(e&&e.name==='NotAllowedError'?'bạn chưa cho phép camera.':(e&&e.message||e))})};
 /* ---- nút nổi 📖 Nhật ký ---- */
 var nk=document.createElement('button');nk.id='nkb';nk.type='button';nk.textContent='📖 Nhật ký';nk.setAttribute('aria-label','Nhật ký xuất nhập tồn');document.body.appendChild(nk);
 nk.onclick=function(){if(NHATKY_URL){window.open(NHATKY_URL,'_blank','noopener');return}
  show(H3('📖 Nhật ký Xuất – Nhập – Tồn')+'<p>Chưa gắn link sổ. Làm 1 lần (≈10 phút), sau đó nút này mở thẳng sổ:</p><ol style="padding-left:20px;font-size:14px"><li>Vào <b>Google Sheets</b> → tạo file <b>KHO_NHAT_KY</b>. Import <b>Nhat_ky_XNT_mau.csv</b> thành tab <b>NHAT_KY</b>, và <b>Ton_kho_mau.csv</b> thành tab <b>TON</b> (tab TON import để mặc định, có tick Convert).</li><li>Mỗi lần xuất/nhập: thêm 1 dòng ở NHAT_KY (Loại = NHAP / XUAT / DIEUCHINH). Tab TON tự tính: <b>Tồn = SL kiểm kê + Nhập − Xuất ± Điều chỉnh</b>.</li><li>(Nhập nhanh trên điện thoại) Google Form → Responses liên kết vào tab NHAT_KY, hoặc dùng app Google Sheets.</li><li>Share → "Anyone with the link: Editor" (hoặc chỉ nhóm thủ kho) → copy link, dán vào dòng <code>NHATKY_URL</code> đầu file <b>index_plus.js</b>, up lên GitHub.</li></ol><p style="font-size:12.5px;color:var(--mute)">Giai đoạn 1: trang này vẫn chỉ để tra cứu; sổ nằm ở Google Sheets. Giai đoạn 2 mới có nút +/− trực tiếp (cần cơ sở dữ liệu).</p>')};
})();
