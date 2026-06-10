const API_URL = "https://script.google.com/macros/s/AKfycbympgV5UmFUipOmS_U532GyPHsMyWrbvYpgVZFX9lvhqYwrewtDvfWOKASUDyuUH4MznQ/exec";
const boardContainer =
  document.getElementById("board-container");

const liveContainer = document.getElementById("live-container");

const offlineContainer =
  document.getElementById("offline-container");

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
  tpdusdl0218: "뽀뽀",
  gptn1109: "킴아연"
};

async function loadLive() {
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log("API DATA:", data);
    liveContainer.innerHTML = "";
    offlineContainer.innerHTML = "";

  // 🔥 1. LIVE만 필터
    const liveOnly = data.filter(item =>
        item.status && item.status.toUpperCase().includes("LIVE")
    );

    const offlineOnly = data.filter(item =>
        !item.status ||
        !item.status.toUpperCase().includes("LIVE")
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

// ⚫ 오프라인 목록
offlineOnly.forEach(item => {

    const div = document.createElement("div");

    div.className = "offline-member";

    div.textContent =
        nameMap[item.channel] || item.channel;

    div.onclick = () => {
        window.open(
            `https://www.sooplive.com/station/${item.channel}`,
            "_blank"
        );
    };

    offlineContainer.appendChild(div);

    });
}



// 🔄 자동 갱신 (썸네일 자동 반영)
loadLive();
setInterval(loadLive, 60000);

const calendarEl = document.getElementById("calendar");
const monthTitle = document.getElementById("month-title");


let currentYear = 2026;
let currentMonth = 6;

const holidayDates = [
  "2026-06-03",
  "2026-06-06",
  "2026-07-17",
  "2026-08-15",
  "2026-08-17",
  "2026-09-24",
  "2026-09-25",
  "2026-09-26",
  "2026-10-03",
  "2026-10-05",
  "2026-10-09",
  "2026-12-25",

  "2027-01-01",
  "2027-02-06",
  "2027-02-07",
  "2027-02-08",
  "2027-02-09",
  "2027-03-01",
  "2027-05-01",
  "2027-05-05",
  "2027-05-13",
  "2027-06-06",
  "2027-06-07",
  "2027-07-17",
  "2027-07-19",
  "2027-08-15",
  "2027-08-16",
  "2027-09-14",
  "2027-09-15",
  "2027-09-16",
  "2027-10-03",
  "2027-10-04",
  "2027-10-09",
  "2027-10-11",
  "2027-12-25",
  "2027-12-27"
];

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

    const dateStr =
      `${year}-${String(month).padStart(2,"0")}-${String(date).padStart(2,"0")}`;

    if (holidayDates.includes(dateStr)) {
      div.style.color = "red";
    }

    calendarEl.appendChild(div);
  }
}

renderCalendar(currentYear, currentMonth);


async function loadBoard() {

    const url =
      "https://api-channel.sooplive.com/v1.1/channel/xirus2/board?perPage=5&orderBy=reg_date&page=1";

    const res = await fetch(url);
    const json = await res.json();

    console.log("BOARD:", json);

}
loadBoard();