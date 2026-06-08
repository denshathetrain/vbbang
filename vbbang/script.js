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
        window.open(
            `https://play.sooplive.com/${item.channel}`,
            "_blank"
        );
    };

    liveContainer.appendChild(card);
    });
}

// 🔄 자동 갱신 (썸네일 자동 반영)
loadLive();
setInterval(loadLive, 60000);

const calendarEl = document.getElementById("calendar");
const monthTitle = document.getElementById("month-title");


let currentYear = 2026;
let currentMonth = 6;

// 공휴일
const holidays = {
  6: [6],      // 현충일
  8: [15]      // 광복절
};

function prevMonth() {

  if (currentYear === 2026 && currentMonth === 6) {
    return;
  }

  currentMonth--;

  if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  }

  renderCalendar(currentYear, currentMonth);
}

function nextMonth() {

  if (currentYear === 2027 && currentMonth === 12) {
    return;
  }

  currentMonth++;

  if (currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  }

  renderCalendar(currentYear, currentMonth);
}

function renderCalendar(year, month) {

  calendarEl.innerHTML = "";

  monthTitle.textContent = `${year}년 ${month}월`;

  const firstDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();

  const days = ["일","월","화","수","목","금","토"];

  // 요일 헤더
  days.forEach(day => {

    const div = document.createElement("div");
    div.className = "day-header";

    div.textContent = day;

    if (day === "일") div.style.color = "red";
    if (day === "토") div.style.color = "blue";

    calendarEl.appendChild(div);
  });

  // 시작 빈칸
  for (let i = 0; i < firstDay; i++) {
    calendarEl.appendChild(document.createElement("div"));
  }

  // 날짜 생성
  for (let date = 1; date <= lastDate; date++) {

    const div = document.createElement("div");
    div.className = "day";

    div.textContent = date;

    const dayOfWeek =
      new Date(year, month - 1, date).getDay();

    if (dayOfWeek === 0) {
      div.style.color = "red";
    }

    if (dayOfWeek === 6) {
      div.style.color = "blue";
    }

    if (holidays[month]?.includes(date)) {
      div.style.color = "red";
    }

    calendarEl.appendChild(div);
  }
}

renderCalendar(currentYear, currentMonth);