import { useState, useEffect } from "react";

const C = {
  forest: "#1a4a2e", forestLight: "#2d6b45", gold: "#c8922a",
  bg: "#f5f2eb", bgDark: "#ede9df", text: "#1a1a14", textMuted: "#5a5a4a",
  green: "#2d8a4e", yellow: "#e6a817", red: "#c0392b", white: "#ffffff",
};

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, 'Segoe UI', sans-serif; background: ${C.bg}; color: ${C.text}; line-height: 1.6; }
  .page { min-height: 100vh; }
  nav { background: ${C.forest}; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; height: 64px; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 20px rgba(26,74,46,0.3); }
  .nav-logo { font-family: Georgia, serif; font-size: 1.6rem; color: ${C.gold}; font-weight: 900; cursor: pointer; }
  .nav-links { display: flex; gap: 2rem; align-items: center; }
  .nav-link { color: rgba(255,255,255,0.8); font-size: 0.95rem; font-weight: 500; cursor: pointer; }
  .nav-link:hover { color: ${C.gold}; }
  .btn-nav { background: ${C.gold}; color: ${C.forest}; border: none; padding: 0.5rem 1.2rem; border-radius: 6px; font-family: inherit; font-weight: 700; font-size: 0.9rem; cursor: pointer; }
  .hero { background: linear-gradient(135deg, ${C.forest} 0%, #0f3320 60%, #1a4a2e 100%); padding: 5rem 2rem 4rem; text-align: center; }
  .hero-badge { display: inline-block; background: rgba(200,146,42,0.2); border: 1px solid rgba(200,146,42,0.4); color: ${C.gold}; padding: 0.3rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1.5rem; }
  .hero h1 { font-family: Georgia, serif; font-size: clamp(2rem, 5vw, 3.2rem); color: #fff; font-weight: 900; line-height: 1.2; margin-bottom: 1.2rem; max-width: 700px; margin-left: auto; margin-right: auto; }
  .hero h1 span { color: ${C.gold}; }
  .hero p { color: rgba(255,255,255,0.75); font-size: 1.1rem; max-width: 560px; margin: 0 auto 2.5rem; }
  .hero-visual { margin-top: 3rem; opacity: 0.15; font-size: 6rem; line-height: 1; }
  .btn-primary { background: ${C.gold}; color: ${C.forest}; border: none; padding: 0.9rem 2.4rem; border-radius: 8px; font-family: inherit; font-weight: 800; font-size: 1.05rem; cursor: pointer; box-shadow: 0 4px 20px rgba(200,146,42,0.4); display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
  .btn-primary:hover { background: #d4a040; transform: translateY(-2px); }
  .features { padding: 4rem 2rem; max-width: 1000px; margin: 0 auto; }
  .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-top: 1rem; }
  .feature-card { background: ${C.white}; border: 1px solid #e8e4d8; border-radius: 12px; padding: 2rem 1.5rem; transition: all 0.3s; }
  .feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(26,74,46,0.12); }
  .feature-icon { font-size: 2.2rem; margin-bottom: 1rem; }
  .feature-title { font-weight: 700; font-size: 1rem; color: ${C.forest}; margin-bottom: 0.5rem; }
  .feature-desc { color: ${C.textMuted}; font-size: 0.9rem; }
  footer { background: ${C.forest}; color: rgba(255,255,255,0.6); text-align: center; padding: 1.5rem; font-size: 0.875rem; }
  footer span { color: ${C.gold}; }
  .form-page { max-width: 680px; margin: 0 auto; padding: 3rem 1.5rem; }
  .form-header { text-align: center; margin-bottom: 2.5rem; }
  .form-header h2 { font-family: Georgia, serif; font-size: 2rem; color: ${C.forest}; font-weight: 700; margin-bottom: 0.5rem; }
  .form-header p { color: ${C.textMuted}; font-size: 0.95rem; }
  .form-section { background: ${C.white}; border: 1px solid #e8e4d8; border-radius: 12px; padding: 1.8rem; margin-bottom: 1.5rem; }
  .section-label { font-weight: 700; color: ${C.forest}; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 1.5rem; padding-bottom: 0.7rem; border-bottom: 2px solid ${C.bgDark}; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
  .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.2rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
  label { font-size: 0.85rem; font-weight: 600; color: ${C.text}; }
  input, select { padding: 0.65rem 0.9rem; border: 1.5px solid #d8d4c8; border-radius: 7px; font-family: inherit; font-size: 0.95rem; background: ${C.bg}; color: ${C.text}; transition: border-color 0.2s; width: 100%; -webkit-appearance: none; appearance: none; }
  input:focus, select:focus { outline: none; border-color: ${C.forest}; box-shadow: 0 0 0 3px rgba(26,74,46,0.1); background: ${C.white}; }
  .btn-submit { width: 100%; background: ${C.forest}; color: ${C.white}; border: none; padding: 1rem 2rem; border-radius: 8px; font-family: inherit; font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: all 0.25s; margin-top: 0.5rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
  .btn-submit:hover { background: ${C.forestLight}; transform: translateY(-1px); }
  .results-page { max-width: 820px; margin: 0 auto; padding: 2.5rem 1.5rem; }
  .results-header { text-align: center; margin-bottom: 2.5rem; }
  .results-header h2 { font-family: Georgia, serif; font-size: 1.9rem; color: ${C.forest}; margin-bottom: 0.3rem; }
  .results-header .car-name { color: ${C.gold}; font-weight: 700; font-size: 1rem; }
  .result-card { background: ${C.white}; border: 1px solid #e8e4d8; border-radius: 14px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
  .result-card-title { font-weight: 700; color: ${C.forest}; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
  .score-section { text-align: center; }
  .gauge-wrap { position: relative; width: 160px; margin: 0 auto 1rem; }
  .gauge-svg { width: 160px; height: 160px; transform: rotate(-90deg); }
  .gauge-bg { fill: none; stroke: #e8e4d8; stroke-width: 12; }
  .gauge-fill { fill: none; stroke-width: 12; stroke-linecap: round; transition: stroke-dashoffset 1.5s cubic-bezier(.4,0,.2,1); }
  .gauge-score { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; }
  .gauge-number { font-family: Georgia, serif; font-size: 2.6rem; font-weight: 900; line-height: 1; }
  .gauge-label { font-size: 0.75rem; font-weight: 600; margin-top: 0.2rem; color: ${C.textMuted}; }
  .score-verdict { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.2rem; }
  .score-sub { color: ${C.textMuted}; font-size: 0.85rem; }
  .compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .compare-col { border-radius: 10px; padding: 1.2rem; }
  .compare-col.yours { background: #f0f7f3; border: 2px solid ${C.green}; }
  .compare-col.rec { background: #fdf8ed; border: 2px solid ${C.gold}; }
  .compare-col-title { font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 0.8rem; }
  .compare-col.yours .compare-col-title { color: ${C.green}; }
  .compare-col.rec .compare-col-title { color: ${C.gold}; }
  .compare-car-name { font-size: 1.05rem; font-weight: 800; color: ${C.forest}; margin-bottom: 0.8rem; }
  .compare-row { display: flex; justify-content: space-between; font-size: 0.82rem; padding: 0.3rem 0; border-bottom: 1px solid rgba(0,0,0,0.05); }
  .compare-row:last-child { border-bottom: none; }
  .compare-row .label { color: ${C.textMuted}; }
  .compare-row .val { font-weight: 700; }
  .compare-verdict { margin-top: 1rem; padding: 0.7rem 1rem; border-radius: 7px; font-size: 0.85rem; font-weight: 600; }
  .budget-bar-track { background: #e8e4d8; border-radius: 99px; height: 10px; overflow: hidden; margin: 0.5rem 0; }
  .budget-bar-fill { height: 100%; border-radius: 99px; transition: width 1.2s cubic-bezier(.4,0,.2,1); }
  .tco-table { width: 100%; border-collapse: collapse; }
  .tco-table tr { border-bottom: 1px solid #f0ece0; }
  .tco-table td { padding: 0.75rem 0.5rem; font-size: 0.9rem; }
  .tco-table td:last-child { text-align: right; font-weight: 600; }
  .tco-table .total-row td { font-weight: 800; color: ${C.forest}; font-size: 1rem; background: #f5f2eb; }
  .tco-table .net-row td { font-weight: 800; color: ${C.red}; font-size: 1.05rem; }
  .tco-table .resale-row td { color: ${C.green}; }
  .flags-list { display: flex; flex-direction: column; gap: 0.6rem; }
  .flag-item { display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.75rem 0.9rem; border-radius: 7px; font-size: 0.88rem; font-weight: 500; }
  .flag-red { background: #fdf0ef; border-left: 3px solid ${C.red}; color: #8b1a1a; }
  .flag-yellow { background: #fdf8ed; border-left: 3px solid ${C.yellow}; color: #7a5000; }
  .flag-green { background: #eef7f1; border-left: 3px solid ${C.green}; color: #1a5a30; }
  .negotiation-script { background: ${C.bg}; border: 1.5px solid #d8d4c8; border-radius: 8px; padding: 1.2rem; font-size: 0.88rem; line-height: 1.8; color: ${C.text}; margin-bottom: 1.5rem; white-space: pre-wrap; font-family: inherit; }
  .action-buttons { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.75rem; }
  .btn-action { padding: 0.7rem 1rem; border-radius: 7px; font-family: inherit; font-weight: 600; font-size: 0.88rem; cursor: pointer; transition: all 0.2s; border: none; display: flex; align-items: center; justify-content: center; gap: 0.4rem; }
  .btn-forest { background: ${C.forest}; color: ${C.white}; }
  .btn-forest:hover { background: ${C.forestLight}; }
  .btn-outline { background: transparent; color: ${C.forest}; border: 1.5px solid ${C.forest}; }
  .btn-outline:hover { background: ${C.forest}; color: ${C.white}; }
  .btn-gold { background: ${C.gold}; color: ${C.forest}; }
  .btn-gold:hover { background: #d4a040; }
  .copy-toast { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); background: ${C.forest}; color: ${C.white}; padding: 0.7rem 1.5rem; border-radius: 30px; font-size: 0.9rem; font-weight: 600; z-index: 999; }
  .rec-card { display: flex; align-items: center; background: ${C.white}; padding: 0.75rem 1rem; border-radius: 8px; cursor: pointer; border: 1.5px solid #d8f0e0; transition: all 0.2s; gap: 0.75rem; }
  .rec-card:hover { border-color: ${C.green}; box-shadow: 0 2px 8px rgba(45,138,78,0.15); }
  .rec-medal { font-size: 1.3rem; flex-shrink: 0; }
  .rec-body { flex: 1; }
  .rec-name { font-weight: 700; color: ${C.forest}; font-size: 0.95rem; }
  .rec-why { font-size: 0.78rem; color: ${C.textMuted}; margin-top: 0.1rem; }
  .rec-tags { display: flex; gap: 0.3rem; flex-wrap: wrap; margin-top: 0.3rem; }
  .rec-tag { background: #eef7f1; color: ${C.green}; font-size: 0.7rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 99px; }
  .rec-select { font-size: 0.78rem; color: ${C.green}; font-weight: 700; flex-shrink: 0; white-space: nowrap; }
  .toggle-btn { padding: 0.85rem 1rem; border: 2px solid; border-radius: 8px; font-family: inherit; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s; flex: 1; }
  @media (max-width: 600px) {
    nav { padding: 0 1rem; }
    .nav-links .nav-link { display: none; }
    .hero { padding: 3rem 1.2rem 2.5rem; }
    .form-page, .results-page { padding: 1.5rem 1rem; }
    .form-section, .result-card { padding: 1.2rem; }
    .compare-grid { grid-template-columns: 1fr; }
  }
`;

// ── DATA ────────────────────────────────────────────────────────
const CAR_DB = [
  { brand:"Toyota", model:"Vios",       priceRange:[150000,300000], use:["ในเมือง","ทั้งสองอย่าง"], family:["1-2 คน"],         kmPerDay:[1,60],  tags:["ประหยัดน้ำมัน","อะไหล่หาง่าย","เหมาะมือใหม่"], score:82 },
  { brand:"Honda",  model:"City",       priceRange:[180000,330000], use:["ในเมือง","ทั้งสองอย่าง"], family:["1-2 คน","3-4 คน"],kmPerDay:[1,70],  tags:["ห้องโดยสารกว้าง","ประหยัดน้ำมัน","ราคาดี"],     score:80 },
  { brand:"Toyota", model:"Yaris",      priceRange:[150000,280000], use:["ในเมือง"],                 family:["1-2 คน"],         kmPerDay:[1,50],  tags:["เล็กคล่อง","จอดง่าย","ประหยัด"],                 score:75 },
  { brand:"Honda",  model:"Civic",      priceRange:[280000,550000], use:["ในเมือง","ทั้งสองอย่าง"], family:["1-2 คน","3-4 คน"],kmPerDay:[20,100],tags:["สมรรถนะดี","ทันสมัย","ขับสนุก"],                  score:84 },
  { brand:"Mazda",  model:"Mazda2",     priceRange:[200000,400000], use:["ในเมือง","ทั้งสองอย่าง"], family:["1-2 คน"],         kmPerDay:[1,60],  tags:["ดีไซน์หรู","ประหยัดน้ำมัน","คุ้มค่า"],           score:78 },
  { brand:"Honda",  model:"HR-V",       priceRange:[400000,700000], use:["ในเมือง","ทั้งสองอย่าง"], family:["3-4 คน"],         kmPerDay:[20,80], tags:["SUV เล็ก","คล่องในเมือง","พื้นที่กว้าง"],         score:81 },
  { brand:"Toyota", model:"C-HR",       priceRange:[450000,750000], use:["ในเมือง","ทั้งสองอย่าง"], family:["1-2 คน","3-4 คน"],kmPerDay:[20,80], tags:["ดีไซน์โดดเด่น","ขับสนุก","ทันสมัย"],              score:79 },
  { brand:"Isuzu",  model:"D-Max",      priceRange:[250000,600000], use:["ต่างจังหวัด","ทั้งสองอย่าง"],family:["3-4 คน","5 คนขึ้นไป"],kmPerDay:[30,150],tags:["ทนทาน","อะไหล่ทั่วไทย","บรรทุกได้"],      score:80 },
  { brand:"Toyota", model:"Hilux Revo", priceRange:[300000,650000], use:["ต่างจังหวัด","ทั้งสองอย่าง"],family:["3-4 คน","5 คนขึ้นไป"],kmPerDay:[30,150],tags:["ขายดีที่สุดในไทย","ทนทาน","ขายต่อง่าย"],  score:83 },
  { brand:"Toyota", model:"Fortuner",   priceRange:[500000,1000000],use:["ต่างจังหวัด","ทั้งสองอย่าง"],family:["3-4 คน","5 คนขึ้นไป"],kmPerDay:[30,120],tags:["7 ที่นั่ง","แข็งแกร่ง","ครอบครัวใหญ่"],  score:85 },
  { brand:"Toyota", model:"Innova",     priceRange:[300000,600000], use:["ต่างจังหวัด","ทั้งสองอย่าง"],family:["5 คนขึ้นไป"],   kmPerDay:[20,120],tags:["MPV 7 ที่นั่ง","ครอบครัวใหญ่","ทนทาน"],       score:79 },
  { brand:"Mitsubishi",model:"Xpander", priceRange:[250000,500000], use:["ทั้งสองอย่าง"],            family:["5 คนขึ้นไป"],   kmPerDay:[20,100],tags:["พื้นที่กว้าง","ราคาเข้าถึงง่าย","7 ที่นั่ง"],    score:76 },
  { brand:"Toyota", model:"Camry",      priceRange:[400000,800000], use:["ทั้งสองอย่าง"],            family:["3-4 คน"],         kmPerDay:[30,100],tags:["ซีดานหรู","นุ่มนวล","ทนทาน"],                    score:82 },
  { brand:"Honda",  model:"Jazz",       priceRange:[150000,300000], use:["ในเมือง"],                 family:["1-2 คน"],         kmPerDay:[1,50],  tags:["เล็กกะทัดรัด","ประหยัดน้ำมัน","ขับง่าย"],        score:74 },
  { brand:"Nissan", model:"Almera",     priceRange:[150000,280000], use:["ในเมือง","ทั้งสองอย่าง"], family:["1-2 คน","3-4 คน"],kmPerDay:[1,70],  tags:["ราคาประหยัด","ห้องโดยสารกว้าง","เหมาะมือใหม่"],  score:72 },
];

function getRecs(budget, use, family, daily_km) {
  const b = +budget; const km = +daily_km;
  return CAR_DB
    .map(car => {
      let fit = 0;
      if (b >= car.priceRange[0] && b <= car.priceRange[1] * 1.2) fit += 30;
      else if (b >= car.priceRange[0] * 0.8) fit += 15;
      if (car.use.includes(use)) fit += 25;
      if (car.family.includes(family)) fit += 25;
      if (km >= car.kmPerDay[0] && km <= car.kmPerDay[1]) fit += 20;
      else if (km <= car.kmPerDay[1] * 1.3) fit += 10;
      return { ...car, fit };
    })
    .filter(c => c.fit >= 40)
    .sort((a, b) => b.fit - a.fit)
    .slice(0, 3);
}

const fmt = (n) => Number(n).toLocaleString("th-TH") + " บาท";

function calcScore(data) {
  let s = 70;
  if (data.mileage < 60000) s += 10;
  if (data.mileage > 120000) s -= 15;
  if (data.year >= 2019) s += 8;
  if (data.year <= 2014) s -= 10;
  if (data.condition === "ดีมาก") s += 10;
  if (data.condition === "พอใช้") s -= 8;
  if (data.condition === "ไม่แน่ใจ") s -= 5;
  return Math.max(0, Math.min(100, s));
}

function calcTCO(askingPrice, mileage, brand) {
  let maint = mileage < 60000 ? 40000 : mileage <= 100000 ? 65000 : 95000;
  if (["Toyota","Honda"].includes(brand)) maint *= 0.85;
  if (["Ford","Other"].includes(brand)) maint *= 1.2;
  const maintenance_5yr = Math.round(maint);
  const insurance_tax_5yr = 125000;
  const depreciation = Math.round(askingPrice * 0.15 * 5);
  const resale_value = Math.round(askingPrice - depreciation);
  const total_tco = Math.round(askingPrice + maintenance_5yr + insurance_tax_5yr + depreciation);
  const net_cost = Math.round(total_tco - resale_value);
  return { maintenance_5yr, insurance_tax_5yr, depreciation, resale_value, total_tco, net_cost };
}

function getFlags(mileage, year, condition, brand) {
  const red = [], yellow = [], green = [];
  if (mileage > 120000) red.push("ระยะทางสูงมาก — เตรียมรับมือค่าซ่อมใหญ่");
  if (year <= 2013) red.push("รถอายุมาก — อะไหล่อาจหายากและแพง");
  if (condition === "ไม่แน่ใจ") red.push("ไม่ทราบสภาพรถ — ควรตรวจสอบก่อนซื้อ");
  if (mileage >= 80000 && mileage <= 120000) yellow.push("ใกล้ถึงรอบซ่อมใหญ่ — ควรกันเงินสำรองไว้");
  if (year >= 2014 && year <= 2016) yellow.push("รถเริ่มเก่า — ติดตามปัญหาที่พบบ่อยในรุ่นนี้");
  if (condition === "พอใช้") yellow.push("สภาพพอใช้ — ควรตรวจสภาพก่อนตัดสินใจ");
  if (mileage < 60000) green.push("ระยะทางน้อย — รถยังสดมาก");
  if (year >= 2019) green.push("รถใหม่พอสมควร — เทคโนโลยีทันสมัย");
  if (["Toyota","Honda"].includes(brand)) green.push("แบรนด์ญี่ปุ่นที่เชื่อถือได้ — อะไหล่หาง่าย");
  return { red, yellow, green };
}

// ── GAUGE ────────────────────────────────────────────────────────
function ScoreGauge({ score, size = 160 }) {
  const [anim, setAnim] = useState(0);
  const r = size * 0.4375; const circ = 2 * Math.PI * r;
  const color = score >= 75 ? C.green : score >= 50 ? C.yellow : C.red;
  const verdict = score >= 75 ? "คุ้มมาก ✓" : score >= 50 ? "พอใช้" : "ระวัง!";
  useEffect(() => { const t = setTimeout(() => setAnim(score), 100); return () => clearTimeout(t); }, [score]);
  return (
    <div style={{ textAlign:"center" }}>
      <div style={{ position:"relative", width:size, margin:"0 auto 0.8rem" }}>
        <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }} viewBox={`0 0 ${size} ${size}`}>
          <circle fill="none" stroke="#e8e4d8" strokeWidth="12" cx={size/2} cy={size/2} r={r} />
          <circle fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
            cx={size/2} cy={size/2} r={r}
            strokeDasharray={circ}
            strokeDashoffset={circ - (anim/100)*circ}
            style={{ transition:"stroke-dashoffset 1.5s cubic-bezier(.4,0,.2,1)" }} />
        </svg>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center" }}>
          <div style={{ fontFamily:"Georgia,serif", fontSize: size > 140 ? "2.6rem" : "1.8rem", fontWeight:900, color, lineHeight:1 }}>{score}</div>
          <div style={{ fontSize:"0.72rem", color:C.textMuted, fontWeight:600 }}>คะแนน</div>
        </div>
      </div>
      <div style={{ fontWeight:700, color, fontSize:"1rem" }}>{verdict}</div>
    </div>
  );
}

// ── LANDING ──────────────────────────────────────────────────────
function LandingPage({ onStart }) {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-badge">🇹🇭 สำหรับผู้ซื้อรถมือสองชาวไทย</div>
        <h1>ซื้อรถมือสองอย่างชาญฉลาด<br />ด้วย<span>ข้อมูลที่แท้จริง</span></h1>
        <p>FutureRide คำนวณต้นทุนจริง 5 ปี บอกความเสี่ยง และช่วยคุณต่อรองราคาได้อย่างมีหลักการ</p>
        <button className="btn-primary" onClick={onStart}>เริ่มวิเคราะห์รถฟรี →</button>
        <div className="hero-visual">🚗</div>
      </section>
      <section className="features">
        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <div style={{ color:C.textMuted, fontSize:"0.8rem", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", marginBottom:"0.5rem" }}>ทำไมต้อง FutureRide</div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:"1.7rem", color:C.forest, fontWeight:700 }}>รู้จริงก่อนซื้อ — ไม่ต้องเดา ไม่ต้องกลัวโดนหลอก</div>
        </div>
        <div className="features-grid">
          {[
            { icon:"🔬", title:"TCO Calculator", desc:"รู้ต้นทุนจริง 5 ปีก่อนตัดสินใจ — รวมค่าซ่อม ภาษี ประกัน และค่าเสื่อมราคา" },
            { icon:"🛡️", title:"Risk Score", desc:"ตรวจจับความเสี่ยงที่ซ่อนอยู่ — ระยะทาง อายุรถ และสภาพที่ควรระวัง" },
            { icon:"💬", title:"Negotiation Helper", desc:"อาวุธต่อรองราคาที่แม่นยำที่สุด — สคริปต์พร้อมใช้ คัดลอกได้ทันที" },
          ].map((f,i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:"3rem" }}>
          <button className="btn-primary" onClick={onStart}>วิเคราะห์รถคันนี้ฟรี →</button>
        </div>
      </section>
      <footer><span>FutureRide</span> © 2026 — รถยนต์ต้องไม่เป็นจุดรั่วไหลของความมั่งคั่ง</footer>
    </div>
  );
}

// ── FORM ─────────────────────────────────────────────────────────
function InputPage({ onSubmit }) {
  const [knowsCar, setKnowsCar] = useState(null);
  const [form, setForm] = useState({
    brand:"", model:"", year:"", mileage:"", asking_price:"", condition:"ไม่แน่ใจ",
    daily_km:"", primary_use:"", family_size:"", total_budget:""
  });
  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  const years = Array.from({length:14},(_,i) => 2023-i);

  const recs = (form.total_budget && form.primary_use && form.family_size && form.daily_km)
    ? getRecs(form.total_budget, form.primary_use, form.family_size, form.daily_km)
    : [];

  const medals = ["🥇","🥈","🥉"];

  const fillRec = (rec) => {
    setForm(f => ({...f, brand:rec.brand, model:rec.model,
      asking_price: String(Math.round((rec.priceRange[0]+rec.priceRange[1])/2)),
      mileage: "70000", year: "2019"
    }));
    setKnowsCar(true);
    window.scrollTo({top: document.body.scrollHeight, behavior:"smooth"});
  };

  const handleSubmit = () => {
    if (!form.total_budget || !form.daily_km || !form.primary_use || !form.family_size) {
      alert("กรุณากรอกข้อมูลของคุณให้ครบก่อน (งบ / ระยะขับ / การใช้งาน / จำนวนคน)");
      return;
    }
    const budget = +form.total_budget;
    const km = +form.daily_km;

    // Auto-fill from recs if no car specified
    let brand = form.brand || "Other";
    let model = form.model || "ไม่ระบุ";
    let year = form.year ? +form.year : 2019;
    let mileage = form.mileage ? +form.mileage : km * 365 * 3;
    let asking_price = form.asking_price ? +form.asking_price : Math.round(budget * 0.85);
    let condition = form.condition || "ไม่แน่ใจ";

    // If recs exist and no car filled, use top rec
    if (!form.brand && recs.length > 0) {
      const top = recs[0];
      brand = top.brand; model = top.model;
      asking_price = Math.round((top.priceRange[0]+top.priceRange[1])/2);
    }

    onSubmit({
      brand, model, year, mileage, asking_price, condition,
      daily_km: km,
      primary_use: form.primary_use,
      family_size: form.family_size,
      total_budget: budget,
      recs,
    });
  };

  return (
    <div className="page">
      <div className="form-page">
        <div className="form-header">
          <h2>วิเคราะห์รถของคุณ</h2>
          <p>ตอบแค่สิ่งที่รู้ — FutureRide จัดการส่วนที่เหลือให้</p>
        </div>

        {/* ข้อมูลของคุณ */}
        <div className="form-section">
          <div className="section-label">👤 ข้อมูลของคุณ <span style={{color:C.gold,fontSize:"0.72rem",textTransform:"none",letterSpacing:0,fontWeight:600}}>— กรอกก่อนเลย</span></div>
          <div className="form-grid">
            <div className="form-group">
              <label>งบประมาณทั้งหมดที่มี (บาท)</label>
              <input type="number" placeholder="เช่น 400000" value={form.total_budget} onChange={e=>set("total_budget",e.target.value)} />
            </div>
            <div className="form-group">
              <label>ขับวันละกี่กิโล (ประมาณ)</label>
              <input type="number" placeholder="เช่น 40" value={form.daily_km} onChange={e=>set("daily_km",e.target.value)} />
            </div>
            <div className="form-group">
              <label>ใช้รถเพื่ออะไรเป็นหลัก</label>
              <select value={form.primary_use} onChange={e=>set("primary_use",e.target.value)}>
                <option value="">เลือก</option>
                {["ในเมือง","ต่างจังหวัด","ทั้งสองอย่าง"].map(u=><option key={u}>{u}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>จำนวนคนที่ใช้รถ</label>
              <select value={form.family_size} onChange={e=>set("family_size",e.target.value)}>
                <option value="">เลือก</option>
                {["1-2 คน","3-4 คน","5 คนขึ้นไป"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Recommendations */}
          {recs.length > 0 && (
            <div style={{marginTop:"1.2rem",padding:"1rem",background:"#eef7f1",borderRadius:"10px",border:"1px solid #b8dfc8"}}>
              <div style={{fontSize:"0.78rem",fontWeight:700,color:C.green,marginBottom:"0.8rem",letterSpacing:"0.5px"}}>
                🎯 รถที่เหมาะกับ Lifestyle ของคุณ — กดเพื่อเลือกวิเคราะห์ได้เลย
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
                {recs.map((r,i) => (
                  <div key={i} className="rec-card" onClick={()=>fillRec(r)}>
                    <div className="rec-medal">{medals[i]}</div>
                    <div className="rec-body">
                      <div className="rec-name">{r.brand} {r.model}</div>
                      <div className="rec-tags">
                        {r.tags.map((t,j)=><span className="rec-tag" key={j}>{t}</span>)}
                      </div>
                      <div className="rec-why" style={{marginTop:"0.3rem"}}>
                        ราคาตลาด: {r.priceRange[0].toLocaleString("th-TH")} – {r.priceRange[1].toLocaleString("th-TH")} บาท
                      </div>
                    </div>
                    <div className="rec-select">เลือก →</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ข้อมูลรถ (optional) */}
        <div className="form-section">
          <div className="section-label">
            🚗 มีรถในใจแล้วใช่ไหม?
            <span style={{color:C.gold,fontSize:"0.72rem",textTransform:"none",letterSpacing:0,fontWeight:600}}>— ไม่บังคับ</span>
          </div>

          {knowsCar === null && (
            <div style={{display:"flex",gap:"0.75rem"}}>
              <button className="toggle-btn" onClick={()=>setKnowsCar(true)}
                style={{borderColor:C.forest,color:C.forest,background:"transparent"}}
                onMouseEnter={e=>{e.currentTarget.style.background=C.forest;e.currentTarget.style.color="#fff"}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.forest}}>
                ✅ มีรถในใจแล้ว
              </button>
              <button className="toggle-btn" onClick={()=>setKnowsCar(false)}
                style={{borderColor:"#d8d4c8",color:C.textMuted,background:"transparent"}}>
                ⏭️ ยังไม่รู้ — ข้ามได้เลย
              </button>
            </div>
          )}

          {knowsCar === false && (
            <div style={{textAlign:"center",padding:"0.9rem",color:C.textMuted,fontSize:"0.9rem",background:C.bg,borderRadius:"8px"}}>
              ✅ ไม่เป็นไรครับ — ระบบจะวิเคราะห์จากงบและ Lifestyle ของคุณ
              <div style={{marginTop:"0.4rem"}}>
                <span onClick={()=>setKnowsCar(null)} style={{color:C.forest,fontWeight:600,cursor:"pointer",textDecoration:"underline",fontSize:"0.82rem"}}>เปลี่ยนใจ — กรอกข้อมูลรถ</span>
              </div>
            </div>
          )}

          {knowsCar === true && (
            <>
              <div style={{marginBottom:"1rem",fontSize:"0.82rem",color:C.textMuted,background:C.bg,padding:"0.6rem 0.9rem",borderRadius:"6px"}}>
                💡 ดูข้อมูลได้จากประกาศขายบน Kaidee, One2car หรือถามผู้ขายได้เลย
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>ยี่ห้อรถ</label>
                  <select value={form.brand} onChange={e=>set("brand",e.target.value)}>
                    <option value="">เลือกยี่ห้อ</option>
                    {["Toyota","Honda","Mazda","Isuzu","Mitsubishi","Nissan","Suzuki","Ford","Other"].map(b=><option key={b}>{b}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>รุ่นรถ <span style={{color:C.textMuted,fontWeight:400}}>(ถ้าทราบ)</span></label>
                  <input placeholder="เช่น Civic, Yaris" value={form.model} onChange={e=>set("model",e.target.value)} />
                </div>
                <div className="form-group">
                  <label>ปีที่ผลิต <span style={{color:C.textMuted,fontWeight:400}}>(ถ้าทราบ)</span></label>
                  <select value={form.year} onChange={e=>set("year",e.target.value)}>
                    <option value="">ไม่ทราบ</option>
                    {years.map(y=><option key={y}>{y}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>เลขไมล์ (กม.)</label>
                  <input type="number" placeholder="เช่น 85000" value={form.mileage} onChange={e=>set("mileage",e.target.value)} />
                </div>
                <div className="form-group">
                  <label>ราคาที่เขาขาย (บาท)</label>
                  <input type="number" placeholder="เช่น 350000" value={form.asking_price} onChange={e=>set("asking_price",e.target.value)} />
                </div>
                <div className="form-group">
                  <label>สภาพรถที่เห็น</label>
                  <select value={form.condition} onChange={e=>set("condition",e.target.value)}>
                    {["ดีมาก","ดี","พอใช้","ไม่แน่ใจ"].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{marginTop:"0.75rem",textAlign:"right"}}>
                <span onClick={()=>setKnowsCar(null)} style={{color:C.textMuted,fontSize:"0.8rem",cursor:"pointer",textDecoration:"underline"}}>ยกเลิก</span>
              </div>
            </>
          )}
        </div>

        <button className="btn-submit" onClick={handleSubmit}>วิเคราะห์เลย →</button>
      </div>
    </div>
  );
}

// ── RESULTS ──────────────────────────────────────────────────────
function ResultsPage({ data, onReset }) {
  const [copied, setCopied] = useState(false);

  const score = calcScore(data);
  const tco = calcTCO(data.asking_price, data.mileage, data.brand);
  const flags = getFlags(data.mileage, data.year, data.condition, data.brand);
  const budget = data.total_budget;
  const budgetOk = budget >= tco.net_cost;
  const budgetPct = Math.min(100, Math.round((budget / tco.net_cost) * 100));

  // Top rec comparison
  const topRec = data.recs && data.recs[0];
  const recMidPrice = topRec ? Math.round((topRec.priceRange[0]+topRec.priceRange[1])/2) : null;
  const recTco = topRec ? calcTCO(recMidPrice, 70000, topRec.brand) : null;
  const recScore = topRec ? topRec.score : null;
  const isSameCar = topRec && data.brand === topRec.brand && data.model === topRec.model;

  // Negotiation
  const hasRed = flags.red.length > 0;
  const allGreen = flags.red.length === 0 && flags.yellow.length === 0 && flags.green.length > 0;
  const fairPrice = Math.round(data.asking_price * (hasRed ? 0.85 : allGreen ? 0.97 : 0.92));
  const suggestedOffer = Math.round(fairPrice * 0.95);
  const flagLines = [...flags.red.map(f=>`🔴 ${f}`),...flags.yellow.map(f=>`🟡 ${f}`)].join("\n");
  const script = `รถคันนี้ราคาประกาศ ${Number(data.asking_price).toLocaleString("th-TH")} บาท\nจากการวิเคราะห์ของ FutureRide ราคายุติธรรมที่ควรจะเป็นคือประมาณ ${fairPrice.toLocaleString("th-TH")} บาท\n\nจุดที่ใช้ต่อรองได้:\n${flagLines || "✅ ไม่พบจุดบกพร่องสำคัญ"}\n\nแนะนำให้เสนอราคาที่: ${suggestedOffer.toLocaleString("th-TH")} บาท`;

  const copy = () => { navigator.clipboard.writeText(script); setCopied(true); setTimeout(()=>setCopied(false),2500); };

  return (
    <div className="page">
      <div className="results-page">
        <div className="results-header">
          <h2>ผลการวิเคราะห์รถ</h2>
          <div className="car-name">{data.brand} {data.model} ปี {data.year} • {Number(data.mileage).toLocaleString("th-TH")} กม.</div>
        </div>

        {/* Score */}
        <div className="result-card">
          <div className="result-card-title">⭐ คะแนนความคุ้มค่า</div>
          <ScoreGauge score={score} />
        </div>

        {/* Compare with recommendation */}
        {topRec && !isSameCar && (
          <div className="result-card">
            <div className="result-card-title">⚖️ เทียบกับรถที่แนะนำ อันดับ 1</div>
            <div className="compare-grid">
              <div className="compare-col yours">
                <div className="compare-col-title">🚗 รถที่คุณเลือก</div>
                <div className="compare-car-name">{data.brand} {data.model}</div>
                <div style={{marginBottom:"0.8rem"}}><ScoreGauge score={score} size={100} /></div>
                <div className="compare-row"><span className="label">ราคาซื้อ</span><span className="val">{Number(data.asking_price).toLocaleString("th-TH")} ฿</span></div>
                <div className="compare-row"><span className="label">TCO สุทธิ 5 ปี</span><span className="val">{tco.net_cost.toLocaleString("th-TH")} ฿</span></div>
                <div className="compare-row"><span className="label">ค่าซ่อม 5 ปี</span><span className="val">{tco.maintenance_5yr.toLocaleString("th-TH")} ฿</span></div>
                <div className="compare-row"><span className="label">ธงแดง</span><span className="val" style={{color: flags.red.length > 0 ? C.red : C.green}}>{flags.red.length > 0 ? `⚠️ ${flags.red.length} จุด` : "✅ ไม่มี"}</span></div>
              </div>
              <div className="compare-col rec">
                <div className="compare-col-title">🥇 แนะนำอันดับ 1</div>
                <div className="compare-car-name">{topRec.brand} {topRec.model}</div>
                <div style={{marginBottom:"0.8rem"}}><ScoreGauge score={recScore} size={100} /></div>
                <div className="compare-row"><span className="label">ราคาตลาด</span><span className="val">{recMidPrice.toLocaleString("th-TH")} ฿</span></div>
                <div className="compare-row"><span className="label">TCO สุทธิ 5 ปี</span><span className="val">{recTco.net_cost.toLocaleString("th-TH")} ฿</span></div>
                <div className="compare-row"><span className="label">ค่าซ่อม 5 ปี</span><span className="val">{recTco.maintenance_5yr.toLocaleString("th-TH")} ฿</span></div>
                <div className="compare-row"><span className="label">ความเชื่อถือได้</span><span className="val" style={{color:C.green}}>✅ สูง</span></div>
              </div>
            </div>
            {/* Verdict */}
            {(() => {
              const yourBetter = score > recScore && tco.net_cost <= recTco.net_cost;
              const recBetter = recScore > score || recTco.net_cost < tco.net_cost;
              return (
                <div className="compare-verdict" style={{background: yourBetter ? "#eef7f1" : "#fdf8ed", color: yourBetter ? "#1a5a30" : "#7a5000"}}>
                  {yourBetter
                    ? `✅ รถที่คุณเลือกดีกว่าที่แนะนำ — คะแนนสูงกว่าและต้นทุนต่ำกว่า`
                    : recScore > score
                    ? `💡 ${topRec.brand} ${topRec.model} มีคะแนนสูงกว่า ${recScore - score} คะแนน และประหยัดกว่า ${(tco.net_cost - recTco.net_cost).toLocaleString("th-TH")} บาทใน 5 ปี`
                    : `💡 รถทั้งสองคันใกล้เคียงกัน — ${topRec.brand} ${topRec.model} อาจหาซื้อง่ายกว่า`}
                </div>
              );
            })()}
          </div>
        )}

        {isSameCar && (
          <div className="result-card">
            <div className="result-card-title">🥇 รถที่คุณเลือก = อันดับ 1 ที่แนะนำ!</div>
            <div style={{padding:"0.8rem 1rem",background:"#eef7f1",borderRadius:"8px",color:"#1a5a30",fontWeight:600,fontSize:"0.9rem"}}>
              ✅ {data.brand} {data.model} คือรถที่เหมาะกับ Lifestyle ของคุณมากที่สุด — เลือกได้ถูกต้องแล้วครับ
            </div>
          </div>
        )}

        {/* Budget check */}
        <div className="result-card">
          <div className="result-card-title">💰 งบของคุณ vs ต้นทุนจริง</div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.85rem",color:C.textMuted,marginBottom:"0.4rem"}}>
            <span>งบที่มี: <strong style={{color:C.text}}>{fmt(budget)}</strong></span>
            <span>ต้นทุนสุทธิ 5 ปี: <strong style={{color:C.text}}>{fmt(tco.net_cost)}</strong></span>
          </div>
          <div className="budget-bar-track">
            <div className="budget-bar-fill" style={{width:`${budgetPct}%`,background:budgetOk?C.green:C.red,transition:"width 1.2s cubic-bezier(.4,0,.2,1)"}} />
          </div>
          <div style={{marginTop:"0.6rem",padding:"0.7rem 1rem",borderRadius:"7px",background:budgetOk?"#eef7f1":"#fdf0ef",color:budgetOk?"#1a5a30":"#8b1a1a",fontSize:"0.9rem",fontWeight:600}}>
            {budgetOk
              ? `✅ งบของคุณเกินพออีก ${fmt(budget - tco.net_cost)} — มีเงินสำรองไว้ใช้ได้`
              : `⚠️ งบของคุณขาดอีก ${fmt(tco.net_cost - budget)} จากต้นทุนสุทธิจริง 5 ปี`}
          </div>
        </div>

        {/* TCO */}
        <div className="result-card">
          <div className="result-card-title">📊 ต้นทุนจริง 5 ปี (TCO)</div>
          <table className="tco-table">
            <tbody>
              <tr><td>ราคาซื้อ</td><td>{fmt(data.asking_price)}</td></tr>
              <tr><td>ค่าซ่อมบำรุง 5 ปี</td><td>{fmt(tco.maintenance_5yr)}</td></tr>
              <tr><td>ภาษีและค่าประกัน 5 ปี</td><td>{fmt(tco.insurance_tax_5yr)}</td></tr>
              <tr><td>ค่าเสื่อมราคา</td><td>{fmt(tco.depreciation)}</td></tr>
              <tr className="total-row"><td>รวมต้นทุนจริง 5 ปี</td><td>{fmt(tco.total_tco)}</td></tr>
              <tr className="resale-row"><td>มูลค่าขายต่อโดยประมาณ</td><td>−{fmt(tco.resale_value)}</td></tr>
              <tr className="net-row"><td>ต้นทุนสุทธิที่แท้จริง</td><td>{fmt(tco.net_cost)}</td></tr>
            </tbody>
          </table>
        </div>

        {/* Flags */}
        <div className="result-card">
          <div className="result-card-title">🚩 ธงเตือนความเสี่ยง</div>
          <div className="flags-list">
            {flags.red.map((f,i)=><div className="flag-item flag-red" key={i}><span>🔴</span><span>{f}</span></div>)}
            {flags.yellow.map((f,i)=><div className="flag-item flag-yellow" key={i}><span>🟡</span><span>{f}</span></div>)}
            {flags.green.map((f,i)=><div className="flag-item flag-green" key={i}><span>🟢</span><span>{f}</span></div>)}
            {flags.red.length+flags.yellow.length+flags.green.length===0 &&
              <div style={{color:C.textMuted,textAlign:"center",padding:"1rem"}}>ไม่พบธงเตือน</div>}
          </div>
        </div>

        {/* Negotiation */}
        <div className="result-card">
          <div className="result-card-title">💬 อาวุธต่อรองราคาของคุณ</div>
          <div className="negotiation-script">{script}</div>
          <div className="action-buttons">
            <button className="btn-action btn-forest" onClick={copy}>📋 คัดลอกข้อความ</button>
            <button className="btn-action btn-outline" onClick={onReset}>🔄 วิเคราะห์รถคันอื่น</button>
            <button className="btn-action btn-gold" onClick={()=>alert("ฟีเจอร์นี้กำลังจะมา!")}>📤 แชร์ผล</button>
          </div>
        </div>

        <div style={{textAlign:"center",padding:"1rem 0 2rem",color:C.textMuted,fontSize:"0.8rem"}}>
          FutureRide © 2026 — การวิเคราะห์นี้เป็นการประมาณการเท่านั้น
        </div>
      </div>
      {copied && <div className="copy-toast">✓ คัดลอกแล้ว!</div>}
    </div>
  );
}

// ── APP ──────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  const [carData, setCarData] = useState(null);
  return (
    <>
      <style>{styles}</style>
      <nav>
        <div className="nav-logo" onClick={()=>setPage("landing")}>FutureRide</div>
        <div className="nav-links">
          <span className="nav-link" onClick={()=>setPage("landing")}>หน้าแรก</span>
          <span className="nav-link" onClick={()=>setPage("form")}>วิเคราะห์รถ</span>
          <button className="btn-nav" onClick={()=>setPage("form")}>วิเคราะห์รถฟรี</button>
        </div>
      </nav>
      {page==="landing" && <LandingPage onStart={()=>setPage("form")} />}
      {page==="form" && <InputPage onSubmit={d=>{ setCarData(d); setPage("results"); }} />}
      {page==="results" && carData && <ResultsPage data={carData} onReset={()=>{ setCarData(null); setPage("form"); }} />}
    </>
  );
}
