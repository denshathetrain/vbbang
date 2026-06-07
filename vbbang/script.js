const API_URL = "https://script.google.com/macros/s/AKfycbwrhSXWOq6kmv7qqx5YooteCnTSDd14wMcWvp-JhoD0Ub0drV9Wcxit9LR0-gcceeCf6g/exec";

const liveContainer = document.getElementById("live-container");

// 👤 채널 → 이름 변환
const nameMap = {
  vlfvlf789: "빵훈이",
  choelssu: "철쑤",
  cone2026: "코네",
  yotsubakoe: "코에",
  yaom0728: "야옴",
  dougie0328: "올어바웃설이",
  xirus2: "시루냥",
  "015234": "아눙",
  asdk0110: "쏭아야",
  tpdusdl0218: "뽀뽀"
};

async function loadLive() {
  const res = await fetch(API_URL);
  const data = await res.json();
  console.log("API DATA:", data);
  liveContainer.innerHTML = "";

  // 🔥 1. LIVE만 필터
  const liveOnly = data.filter(item =>
  item.status && item.status.toUpperCase().includes("LIVE")
);

  // 🔥 2. 썸네일 + 이름 카드 생성
  liveOnly.forEach(item => {
    const card = document.createElement("div");
    card.className = "live-card";

    card.innerHTML = `
      <img src="${item.img}" onerror="this.style.display='none'">
      <h3>${nameMap[item.channel] || item.channel}</h3>
      <p class="live-badge">🔴 LIVE</p>
    `;

    card.onclick = () => {
      window.open(item.link, "_blank");
    };

    liveContainer.appendChild(card);
  });
}

// 🔄 자동 갱신 (썸네일 자동 반영)
loadLive();
setInterval(loadLive, 60000);
