// Dữ liệu box kho (v5). Dùng: const WH = window.WAREHOUSE_DATA
window.WAREHOUSE_DATA = {
 "version": "v5",
 "source": "14 bản vẽ tay F1–F12 (đã xác nhận 26/11/2026)",
 "units": "mm",
 "totalBoxes": 871,
 "totalsByType": {
  "T1": 108,
  "T2": 124,
  "T3": 53,
  "T4": 216,
  "T5": 237,
  "T6": 49,
  "T7": 65,
  "T8": 4,
  "T9": 11,
  "T10": 4
 },
 "rack": {
  "moduleWidth": 2810,
  "innerWidth": 2720,
  "depth": 600,
  "height": 3500,
  "floorOffset": 150,
  "tierPitch": 465,
  "topTierMin": 450,
  "tiers": 7,
  "cellWidth_mm": 453,
  "note": "Tầng 1 = dưới cùng, 7 = trên cùng. Mỗi kệ x.1/x.2 rộng 2720 mm; \"cells\" là số box/tầng, xếp từ trái sang phải theo thứ tự các dòng cùng kệ+tầng. levels>1 = số hàng xếp chồng đứng trong 1 tầng."
 },
 "types": {
  "T1": {
   "name": "Máng heo",
   "interior": [
    420,
    273,
    180
   ],
   "levels": 2,
   "zoneH": 180,
   "shape": "box"
  },
  "T2": {
   "name": "Sọt lùn",
   "interior": [
    570,
    385,
    135
   ],
   "levels": 1,
   "zoneH": 135,
   "shape": "box"
  },
  "T3": {
   "name": "Thùng Nghiệp",
   "interior": [
    580,
    385,
    305
   ],
   "levels": 1,
   "zoneH": 300,
   "shape": "box"
  },
  "T4": {
   "name": "Bé mini",
   "interior": [
    210,
    130.5,
    120
   ],
   "levels": 3,
   "zoneH": 120,
   "shape": "box"
  },
  "T5": {
   "name": "Mặt trời",
   "interior": [
    570,
    390,
    370
   ],
   "levels": 1,
   "zoneH": 370,
   "shape": "box"
  },
  "T6": {
   "name": "CHUPPY thùng xanh 35L",
   "interior": null,
   "levels": 1,
   "zoneH": 290,
   "shape": "frustum",
   "top": [
    360,
    0
   ],
   "bottom": [
    300,
    0
   ],
   "note": "zone rộng 388.5, 7 ô/tầng"
  },
  "T7": {
   "name": "CHIBI thùng xanh 20L",
   "interior": null,
   "levels": 2,
   "zoneH": 225,
   "shape": "frustum",
   "top": [
    310,
    0
   ],
   "bottom": [
    245,
    0
   ],
   "note": "zone rộng 340, 8 ô/hàng, chồng 2 tầng"
  },
  "T8": {
   "name": "Khuôn PANTO ép vỉ",
   "interior": [
    500,
    400,
    400
   ],
   "levels": 1,
   "zoneH": 400,
   "shape": "box"
  },
  "T9": {
   "name": "Xám lùn",
   "interior": [
    565,
    370,
    145
   ],
   "levels": 1,
   "zoneH": 145,
   "shape": "box"
  },
  "T10": {
   "name": "Xám cao",
   "interior": [
    565,
    365,
    230
   ],
   "levels": 1,
   "zoneH": 230,
   "shape": "box"
  }
 },
 "slots": [
  {
   "day": "F1",
   "rack": "F1.1",
   "tier": 1,
   "type": 1,
   "cells": 18,
   "note": "Bản vẽ F1: 2 hàng × 9 ô"
  },
  {
   "day": "F1",
   "rack": "F1.1",
   "tier": 2,
   "type": 1,
   "cells": 18,
   "note": "Bản vẽ F1: 2 hàng × 9 ô"
  },
  {
   "day": "F1",
   "rack": "F1.1",
   "tier": 3,
   "type": 1,
   "cells": 18,
   "note": "Bản vẽ F1: 2 hàng × 9 ô"
  },
  {
   "day": "F1",
   "rack": "F1.1",
   "tier": 4,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F1: 6 ô"
  },
  {
   "day": "F1",
   "rack": "F1.1",
   "tier": 5,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F1: 6 ô"
  },
  {
   "day": "F1",
   "rack": "F1.1",
   "tier": 6,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F1: 6 ô"
  },
  {
   "day": "F1",
   "rack": "F1.2",
   "tier": 1,
   "type": 1,
   "cells": 18,
   "note": "Bản vẽ F1: 2 hàng × 9 ô"
  },
  {
   "day": "F1",
   "rack": "F1.2",
   "tier": 2,
   "type": 1,
   "cells": 18,
   "note": "Bản vẽ F1: 2 hàng × 9 ô"
  },
  {
   "day": "F1",
   "rack": "F1.2",
   "tier": 3,
   "type": 1,
   "cells": 18,
   "note": "Bản vẽ F1: 2 hàng × 9 ô"
  },
  {
   "day": "F1",
   "rack": "F1.2",
   "tier": 4,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F1: 6 ô"
  },
  {
   "day": "F1",
   "rack": "F1.2",
   "tier": 5,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F1: 6 ô"
  },
  {
   "day": "F1",
   "rack": "F1.2",
   "tier": 6,
   "type": 3,
   "cells": 6,
   "note": "Bản vẽ F1: 6 ô"
  },
  {
   "day": "F2",
   "rack": "F2.1",
   "tier": 1,
   "type": 4,
   "cells": 54,
   "note": "Bản vẽ F2.1: 54 ô = 3 hàng × 18"
  },
  {
   "day": "F2",
   "rack": "F2.1",
   "tier": 2,
   "type": 4,
   "cells": 54,
   "note": "Bản vẽ F2.1: 54 ô = 3 hàng × 18"
  },
  {
   "day": "F2",
   "rack": "F2.1",
   "tier": 3,
   "type": 4,
   "cells": 54,
   "note": "Bản vẽ F2.1: 54 ô = 3 hàng × 18"
  },
  {
   "day": "F2",
   "rack": "F2.1",
   "tier": 4,
   "type": 4,
   "cells": 54,
   "note": "Bản vẽ F2.1: 54 ô = 3 hàng × 18"
  },
  {
   "day": "F2",
   "rack": "F2.1",
   "tier": 5,
   "type": 3,
   "cells": 6,
   "note": "Bản vẽ F2.1: 6 ô lớn"
  },
  {
   "day": "F2",
   "rack": "F2.1",
   "tier": 6,
   "type": 3,
   "cells": 6,
   "note": "Bản vẽ F2.1: 6 ô lớn"
  },
  {
   "day": "F2",
   "rack": "F2.1",
   "tier": 7,
   "type": 3,
   "cells": 6,
   "note": "Bản vẽ F2.1: tầng 7 cũng là Zone Type 3 (bảng anh gửi chỉ ghi tầng 5, 6)"
  },
  {
   "day": "F2",
   "rack": "F2.2",
   "tier": 1,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F2.2: 6 ô lớn"
  },
  {
   "day": "F2",
   "rack": "F2.2",
   "tier": 2,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F2.2: 6 ô lớn"
  },
  {
   "day": "F2",
   "rack": "F2.2",
   "tier": 3,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F2.2: 6 ô lớn"
  },
  {
   "day": "F2",
   "rack": "F2.2",
   "tier": 4,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F2.2: 6 ô lớn"
  },
  {
   "day": "F2",
   "rack": "F2.2",
   "tier": 5,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F2.2: 6 ô lớn"
  },
  {
   "day": "F2",
   "rack": "F2.2",
   "tier": 6,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F2.2: 6 ô lớn"
  },
  {
   "day": "F3",
   "rack": "F3.1",
   "tier": 1,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F3: 6 ô"
  },
  {
   "day": "F3",
   "rack": "F3.1",
   "tier": 2,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F3: 6 ô"
  },
  {
   "day": "F3",
   "rack": "F3.2",
   "tier": 2,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F3: 6 ô"
  },
  {
   "day": "F3",
   "rack": "F3.2",
   "tier": 1,
   "type": 5,
   "cells": 2,
   "note": "Bản vẽ F3.2 tầng 1: chỉ 2 ô Type 5, ô 3 đến 6 là Empty Slot"
  },
  {
   "day": "F3",
   "rack": "F3.1",
   "tier": 3,
   "type": 6,
   "cells": 7,
   "note": "Bản vẽ F3: 7 ô thùng xanh 35L"
  },
  {
   "day": "F3",
   "rack": "F3.1",
   "tier": 4,
   "type": 6,
   "cells": 7,
   "note": "Bản vẽ F3: 7 ô thùng xanh 35L"
  },
  {
   "day": "F3",
   "rack": "F3.1",
   "tier": 5,
   "type": 6,
   "cells": 7,
   "note": "Bản vẽ F3: 7 ô thùng xanh 35L"
  },
  {
   "day": "F3",
   "rack": "F3.1",
   "tier": 6,
   "type": 7,
   "cells": 16,
   "note": "Bản vẽ F3: 2 hàng × 8 thùng xanh 20L"
  },
  {
   "day": "F3",
   "rack": "F3.1",
   "tier": 7,
   "type": 7,
   "cells": 16,
   "note": "Bản vẽ F3: 2 hàng × 8 thùng xanh 20L"
  },
  {
   "day": "F3",
   "rack": "F3.2",
   "tier": 3,
   "type": 6,
   "cells": 7,
   "note": "Bản vẽ F3: 7 ô thùng xanh 35L"
  },
  {
   "day": "F3",
   "rack": "F3.2",
   "tier": 4,
   "type": 6,
   "cells": 7,
   "note": "Bản vẽ F3: 7 ô thùng xanh 35L"
  },
  {
   "day": "F3",
   "rack": "F3.2",
   "tier": 5,
   "type": 6,
   "cells": 7,
   "note": "Bản vẽ F3: 7 ô thùng xanh 35L"
  },
  {
   "day": "F3",
   "rack": "F3.2",
   "tier": 6,
   "type": 7,
   "cells": 16,
   "note": "Bản vẽ F3: 2 hàng × 8 thùng xanh 20L"
  },
  {
   "day": "F3",
   "rack": "F3.2",
   "tier": 7,
   "type": 7,
   "cells": 16,
   "note": "Bản vẽ F3: 2 hàng × 8 thùng xanh 20L"
  },
  {
   "day": "F4",
   "rack": "F4.1",
   "tier": 1,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F4"
  },
  {
   "day": "F4",
   "rack": "F4.1",
   "tier": 2,
   "type": 3,
   "cells": 6,
   "note": "Bản vẽ F4: ô F4.1.2.4 cao hơn, đã xác nhận Type 3"
  },
  {
   "day": "F4",
   "rack": "F4.1",
   "tier": 3,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F4"
  },
  {
   "day": "F4",
   "rack": "F4.1",
   "tier": 4,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F4"
  },
  {
   "day": "F4",
   "rack": "F4.1",
   "tier": 5,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F4"
  },
  {
   "day": "F4",
   "rack": "F4.1",
   "tier": 6,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F4"
  },
  {
   "day": "F4",
   "rack": "F4.1",
   "tier": 7,
   "type": 3,
   "cells": 2,
   "note": "Bản vẽ F4: ô 5, 6 ghi Type 3"
  },
  {
   "day": "F4",
   "rack": "F4.1",
   "tier": 7,
   "type": 3,
   "cells": 4,
   "note": "Bản vẽ F4: ô 1 đến 4 chưa ghi nhãn, đã xác nhận Type 3"
  },
  {
   "day": "F4",
   "rack": "F4.2",
   "tier": 1,
   "type": 2,
   "cells": 4,
   "note": "Bản vẽ F4: Zone-L (khu chất lỏng) dùng Type 2"
  },
  {
   "day": "F4",
   "rack": "F4.2",
   "tier": 1,
   "type": 5,
   "cells": 1,
   "note": "Bản vẽ F4: ô 6 Type 5 (đã xác nhận), ô 5 là không gian chết"
  },
  {
   "day": "F4",
   "rack": "F4.2",
   "tier": 2,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F4 (tầng 2: ô 3 đến 6 là Zone-L)"
  },
  {
   "day": "F4",
   "rack": "F4.2",
   "tier": 3,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F4 (tầng 2: ô 3 đến 6 là Zone-L)"
  },
  {
   "day": "F4",
   "rack": "F4.2",
   "tier": 4,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F4 (tầng 2: ô 3 đến 6 là Zone-L)"
  },
  {
   "day": "F4",
   "rack": "F4.2",
   "tier": 5,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F4 (tầng 2: ô 3 đến 6 là Zone-L)"
  },
  {
   "day": "F4",
   "rack": "F4.2",
   "tier": 6,
   "type": 2,
   "cells": 6,
   "note": "Bản vẽ F4 (tầng 2: ô 3 đến 6 là Zone-L)"
  },
  {
   "day": "F5",
   "rack": "F5.1",
   "tier": 2,
   "type": 5,
   "cells": 5,
   "note": "Bản vẽ F5"
  },
  {
   "day": "F5",
   "rack": "F5.1",
   "tier": 2,
   "type": 3,
   "cells": 1,
   "note": "Bản vẽ F5: ô F5.1.2.4 là Type 3"
  },
  {
   "day": "F5",
   "rack": "F5.1",
   "tier": 3,
   "type": 5,
   "cells": 5,
   "note": "Bản vẽ F5: ô 1 là Awaiting box"
  },
  {
   "day": "F5",
   "rack": "F5.1",
   "tier": 6,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F5"
  },
  {
   "day": "F5",
   "rack": "F5.1",
   "tier": 7,
   "type": 6,
   "cells": 5,
   "note": "Bản vẽ F5: Reserve box Type 6+7 (hộp xanh dự phòng), 5 ô (đã xác nhận); tính là Type 6"
  },
  {
   "day": "F5",
   "rack": "F5.2",
   "tier": 1,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F5"
  },
  {
   "day": "F5",
   "rack": "F5.2",
   "tier": 2,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F5"
  },
  {
   "day": "F5",
   "rack": "F5.2",
   "tier": 3,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F5"
  },
  {
   "day": "F5",
   "rack": "F5.2",
   "tier": 4,
   "type": 5,
   "cells": 3,
   "note": "Bản vẽ F5"
  },
  {
   "day": "F5",
   "rack": "F5.2",
   "tier": 5,
   "type": 5,
   "cells": 4,
   "note": "Bản vẽ F5"
  },
  {
   "day": "F5",
   "rack": "F5.2",
   "tier": 6,
   "type": 5,
   "cells": 4,
   "note": "Bản vẽ F5"
  },
  {
   "day": "F6",
   "rack": "F6.1",
   "tier": 1,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F6"
  },
  {
   "day": "F6",
   "rack": "F6.1",
   "tier": 3,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F6"
  },
  {
   "day": "F6",
   "rack": "F6.1",
   "tier": 2,
   "type": 5,
   "cells": 5,
   "note": "Bản vẽ F6"
  },
  {
   "day": "F6",
   "rack": "F6.1",
   "tier": 2,
   "type": 7,
   "cells": 1,
   "note": "Bản vẽ F6: ô F6.1.2.4 là Type 7 (hộp xanh 20L)"
  },
  {
   "day": "F6",
   "rack": "F6.2",
   "tier": 1,
   "type": 5,
   "cells": 4,
   "note": "Bản vẽ F6.2 (rộng ô 458): ô 1 là Bulk Zone"
  },
  {
   "day": "F6",
   "rack": "F6.2",
   "tier": 2,
   "type": 5,
   "cells": 5,
   "note": "Bản vẽ F6.2 (rộng ô 458)"
  },
  {
   "day": "F6",
   "rack": "F6.2",
   "tier": 3,
   "type": 5,
   "cells": 5,
   "note": "Bản vẽ F6.2 (rộng ô 458)"
  },
  {
   "day": "F6",
   "rack": "F6.2",
   "tier": 4,
   "type": 8,
   "cells": 4,
   "note": "Bản vẽ F6.2: khuôn PANTO = Zone box type 8 (500×400×400)"
  },
  {
   "day": "F7",
   "rack": "F7.1",
   "tier": 1,
   "type": 9,
   "cells": 6,
   "note": "Bản vẽ F7"
  },
  {
   "day": "F7",
   "rack": "F7.1",
   "tier": 2,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F7"
  },
  {
   "day": "F7",
   "rack": "F7.1",
   "tier": 3,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F7"
  },
  {
   "day": "F7",
   "rack": "F7.1",
   "tier": 4,
   "type": 5,
   "cells": 3,
   "note": "Bản vẽ F7"
  },
  {
   "day": "F7",
   "rack": "F7.1",
   "tier": 4,
   "type": 10,
   "cells": 2,
   "note": "Bản vẽ F7"
  },
  {
   "day": "F7",
   "rack": "F7.1",
   "tier": 5,
   "type": 5,
   "cells": 3,
   "note": "Bản vẽ F7: ô 3 đã xác nhận Type 5"
  },
  {
   "day": "F7",
   "rack": "F7.2",
   "tier": 1,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F7"
  },
  {
   "day": "F7",
   "rack": "F7.2",
   "tier": 2,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F7"
  },
  {
   "day": "F8",
   "rack": "F8.1",
   "tier": 1,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F8"
  },
  {
   "day": "F8",
   "rack": "F8.1",
   "tier": 2,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F8"
  },
  {
   "day": "F8",
   "rack": "F8.1",
   "tier": 3,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F8"
  },
  {
   "day": "F8",
   "rack": "F8.1",
   "tier": 5,
   "type": 5,
   "cells": 5,
   "note": "Bản vẽ F8"
  },
  {
   "day": "F8",
   "rack": "F8.1",
   "tier": 5,
   "type": 6,
   "cells": 1,
   "note": "Bản vẽ F8: ô 6 Type 6"
  },
  {
   "day": "F8",
   "rack": "F8.1",
   "tier": 6,
   "type": 5,
   "cells": 2,
   "note": "Bản vẽ F8: ô 3, 4"
  },
  {
   "day": "F8",
   "rack": "F8.1",
   "tier": 7,
   "type": 5,
   "cells": 1,
   "note": "Bản vẽ F8: ô 6"
  },
  {
   "day": "F8",
   "rack": "F8.2",
   "tier": 1,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F8"
  },
  {
   "day": "F8",
   "rack": "F8.2",
   "tier": 2,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F8"
  },
  {
   "day": "F8",
   "rack": "F8.2",
   "tier": 3,
   "type": 9,
   "cells": 3,
   "note": "Bản vẽ F8: ô 3 đến 5"
  },
  {
   "day": "F8",
   "rack": "F8.2",
   "tier": 3,
   "type": 10,
   "cells": 1,
   "note": "Bản vẽ F8: ô 6"
  },
  {
   "day": "F8",
   "rack": "F8.2",
   "tier": 5,
   "type": 5,
   "cells": 1,
   "note": "Bản vẽ F8: ô 6"
  },
  {
   "day": "F8",
   "rack": "F8.2",
   "tier": 6,
   "type": 5,
   "cells": 1,
   "note": "Bản vẽ F8: ô 2"
  },
  {
   "day": "F9",
   "rack": "F9.1",
   "tier": 1,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F9"
  },
  {
   "day": "F9",
   "rack": "F9.1",
   "tier": 2,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F9"
  },
  {
   "day": "F9",
   "rack": "F9.1",
   "tier": 3,
   "type": 5,
   "cells": 5,
   "note": "Bản vẽ F9"
  },
  {
   "day": "F9",
   "rack": "F9.1",
   "tier": 3,
   "type": 3,
   "cells": 1,
   "note": "Bản vẽ F9: ô 5 Type 3"
  },
  {
   "day": "F9",
   "rack": "F9.2",
   "tier": 1,
   "type": 5,
   "cells": 1,
   "note": "Bản vẽ F9"
  },
  {
   "day": "F9",
   "rack": "F9.2",
   "tier": 2,
   "type": 5,
   "cells": 2,
   "note": "Bản vẽ F9"
  },
  {
   "day": "F9",
   "rack": "F9.2",
   "tier": 3,
   "type": 5,
   "cells": 4,
   "note": "Bản vẽ F9"
  },
  {
   "day": "F9",
   "rack": "F9.2",
   "tier": 4,
   "type": 5,
   "cells": 4,
   "note": "Bản vẽ F9"
  },
  {
   "day": "F9",
   "rack": "F9.2",
   "tier": 5,
   "type": 5,
   "cells": 1,
   "note": "Bản vẽ F9"
  },
  {
   "day": "F10",
   "rack": "F10.1",
   "tier": 1,
   "type": 5,
   "cells": 5,
   "note": "Bản vẽ F10"
  },
  {
   "day": "F10",
   "rack": "F10.1",
   "tier": 1,
   "type": 5,
   "cells": 1,
   "note": "Bản vẽ F10: ô 2 đã xác nhận Type 5"
  },
  {
   "day": "F10",
   "rack": "F10.1",
   "tier": 2,
   "type": 5,
   "cells": 5,
   "note": "Bản vẽ F10"
  },
  {
   "day": "F10",
   "rack": "F10.1",
   "tier": 2,
   "type": 3,
   "cells": 1,
   "note": "Bản vẽ F10"
  },
  {
   "day": "F10",
   "rack": "F10.1",
   "tier": 3,
   "type": 3,
   "cells": 3,
   "note": "Bản vẽ F10"
  },
  {
   "day": "F10",
   "rack": "F10.1",
   "tier": 3,
   "type": 5,
   "cells": 2,
   "note": "Bản vẽ F10"
  },
  {
   "day": "F10",
   "rack": "F10.1",
   "tier": 4,
   "type": 5,
   "cells": 3,
   "note": "Bản vẽ F10"
  },
  {
   "day": "F10",
   "rack": "F10.1",
   "tier": 4,
   "type": 3,
   "cells": 3,
   "note": "Bản vẽ F10"
  },
  {
   "day": "F10",
   "rack": "F10.1",
   "tier": 5,
   "type": 5,
   "cells": 3,
   "note": "Bản vẽ F10"
  },
  {
   "day": "F10",
   "rack": "F10.2",
   "tier": 1,
   "type": 5,
   "cells": 2,
   "note": "Bản vẽ F10"
  },
  {
   "day": "F10",
   "rack": "F10.2",
   "tier": 2,
   "type": 5,
   "cells": 6,
   "note": "Bản vẽ F10"
  },
  {
   "day": "F10",
   "rack": "F10.2",
   "tier": 3,
   "type": 5,
   "cells": 3,
   "note": "Bản vẽ F10"
  },
  {
   "day": "F10",
   "rack": "F10.2",
   "tier": 4,
   "type": 5,
   "cells": 3,
   "note": "Bản vẽ F10"
  },
  {
   "day": "F10",
   "rack": "F10.2",
   "tier": 5,
   "type": 5,
   "cells": 2,
   "note": "Bản vẽ F10"
  },
  {
   "day": "F10",
   "rack": "F10.2",
   "tier": 5,
   "type": 6,
   "cells": 1,
   "note": "Bản vẽ F10: ô 5 Type 6"
  },
  {
   "day": "F11",
   "rack": "F11.2",
   "tier": 5,
   "type": 10,
   "cells": 1,
   "note": "Bản vẽ F11: ô F11.2.5.6"
  },
  {
   "day": "F11",
   "rack": "F11.2",
   "tier": 5,
   "type": 9,
   "cells": 1,
   "note": "Bản vẽ F11: ô F11.2.5.6 (chồng cùng Type 10)"
  },
  {
   "day": "F12",
   "rack": "F12.1",
   "tier": 3,
   "type": 3,
   "cells": 4,
   "note": "Bản vẽ F12.1 (khu nhận hàng), ô rộng 442,5 (đã xác nhận)"
  },
  {
   "day": "F12",
   "rack": "F12.1",
   "tier": 3,
   "type": 9,
   "cells": 1,
   "note": "Bản vẽ F12.1: 1 ô Type 9 (đã xác nhận)"
  },
  {
   "day": "F12",
   "rack": "F12.2",
   "tier": 3,
   "type": 3,
   "cells": 4,
   "note": "Bản vẽ F12.2 (khu hàng chờ hủy), ô rộng 470,8"
  }
 ]
};
if (typeof module!=="undefined") module.exports = window.WAREHOUSE_DATA;
