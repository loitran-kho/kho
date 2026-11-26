/* kho_version.js — dán dấu phiên bản góc dưới-phải mọi trang. Mỗi lần giao bản mới chỉ sửa dòng KHO_VER. */
(function(){var V='2026-11-27 07:20 · bản: ảnh mini trên thẻ F1.1.1.9 + nạp Sheet gộp bổ sung';
window.KHO_VER=V;
function add(){if(document.getElementById('khoVer'))return;var d=document.createElement('div');d.id='khoVer';d.textContent='v '+V;
 d.style.cssText='position:fixed;right:8px;bottom:4px;z-index:2;font:11px system-ui,sans-serif;color:#7a8696;background:#ffffffcc;padding:1px 6px;border-radius:6px;pointer-events:none';
 (document.body||document.documentElement).appendChild(d)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add);else add()})();
