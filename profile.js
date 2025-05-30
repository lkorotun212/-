document.addEventListener("DOMContentLoaded", () => {
    const graph = document.getElementById("wave-graph");

    const users = [
        { name: "Любов", x: 150, y: 50, r: 20, color: "#00bcd4" },
        { name: "Ірина", x: 60, y: 130, r: 15, color: "#4dd0e1" },
        { name: "Олександр", x: 150, y: 130, r: 15, color: "#4dd0e1" },
        { name: "Марина", x: 240, y: 130, r: 15, color: "#4dd0e1" },
    ];

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "220");
    svg.setAttribute("viewBox", "0 0 320 220");

    // Лінії
    svg.appendChild(makeLine(users[0], users[1]));
    svg.appendChild(makeLine(users[0], users[2]));
    svg.appendChild(makeLine(users[0], users[3]));

    // Вузли (кружечки + текст)
    users.forEach(user => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", user.x);
        circle.setAttribute("cy", user.y);
        circle.setAttribute("r", user.r);
        circle.setAttribute("fill", user.color);
        svg.appendChild(circle);

        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", user.x);
        label.setAttribute("y", user.y + 5);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("font-size", "12px");
        label.setAttribute("fill", "#333");
        label.textContent = user.name;
        svg.appendChild(label);
    });

    graph.innerHTML = ""; // Очищаємо попередній SVG
    graph.appendChild(svg);
});

function makeLine(from, to) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", from.x);
    line.setAttribute("y1", from.y + from.r);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y - to.r);
    line.setAttribute("stroke", "#aaa");
    line.setAttribute("stroke-width", "1.5");
    return line;
}
window.addEventListener('DOMContentLoaded', () => {
    // якщо новий користувач (тобто ще не заходив)
    if (!localStorage.getItem('hasVisitedProfile')) {
        // позначаємо, що він уже заходив
        localStorage.setItem('hasVisitedProfile', 'true');
        // перекидуємо на сторінку з історіями
        window.location.href = 'stories.html?new=true';
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        showRegistrationPrompt();
    } else {
        fetch(`../users_${userId}.json`)
            .then(res => {
                if (!res.ok) throw new Error("Користувача не знайдено");
                return res.json();
            })
            .then(userData => showUserProfile(userData))
            .catch(() => showRegistrationPrompt());
    }
});

function showRegistrationPrompt() {
    document.querySelector("main").innerHTML = `
    <section class="section-box">
      <h2>👤 Новий користувач</h2>
      <p>Вас ще не зареєстровано. Оберіть спосіб реєстрації:</p>
      <button onclick="location.href='registration.html'">Зареєструватися на сайті</button>
      <button onclick="window.open('https://t.me/Wave_of_Kindness_bot')">Зареєструватися в боті</button>
    </section>
  `;
}

function showUserProfile(user) {
    document.querySelector("main").innerHTML = `
    <section class="section-box">
      <h2>Загальна інформація</h2>
      <p><strong>Ім’я:</strong> ${user.name}</p>
      <p><strong>Місто:</strong> ${user.city}</p>
      <p><strong>Чим можу допомогти:</strong> ${user.help}</p>
      <p><strong>Реферальне посилання:</strong> <a href="https://t.me/Wave_of_Kindness_bot?start=${user.id}">
        t.me/Wave_of_Kindness_bot?start=${user.id}</a></p>
    </section>

    <section class="section-box">
      <h2>Запрошені учасники</h2>
      <ul id="ref-users">
        ${user.referrals.map(ref => `<li>${ref}</li>`).join("")}
      </ul>
    </section>
  `;
}
function registerInBot() {
  const userId = generateRandomId(); // або отримуй з URL, або згенеруй
  const botLink = `https://t.me/Wave_of_Kindness_bot?start=${userId}`;
  window.location.href = botLink;
}

function registerOnSite() {
  window.location.href = "stories.html";
}

function generateRandomId() {
  // Проста функція для генерації унікального ID
  return Math.floor(100000 + Math.random() * 900000);
}
