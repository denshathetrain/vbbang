const API_URL = "https://script.google.com/macros/s/AKfycbxI6PWnZaVBH37bydaOA3i0hvOObjroV4wTzHXK4qYrC8E_Tjp07ernQw983r0f-Kut_A/exec"
const liveContainer = document.getElementById("live-container");

async function loadLive() {

    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        liveContainer.innerHTML = "";

        if (!Array.isArray(data)) {
            liveContainer.innerHTML = "<p>데이터 형식 오류</p>";
            return;
        }

        data.forEach(item => {

            const card = document.createElement("div");
            card.className = "live-card";

            card.innerHTML = `
                <img src="${item.img || ''}" onerror="this.style.display='none'">
                <h3>${item.channel || ''}</h3>
                <p>${item.status || ''}</p>
            `;

            card.onclick = () => {
                if (item.link) {
                    window.open(item.link, "_blank");
                }
            };

            liveContainer.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        liveContainer.innerHTML = "<p>LIVE 데이터를 불러올 수 없음</p>";
    }
}

loadLive();
setInterval(loadLive, 60000);