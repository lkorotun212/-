// stories.js
fetch('/api/stories')
    .then(res => res.json())
    .then(stories => {
        const container = document.getElementById('stories-list');
        container.innerHTML = '';
        stories.forEach(({ name, city, story }) => {
            const el = document.createElement('div');
            el.className = 'story';
            el.innerHTML = `<strong>${name}</strong> з ${city || 'невідомого міста'}:<p>${story}</p>`;
            container.appendChild(el);
        });
    });
document.getElementById('story-form').addEventListener('submit', function(e) {
    e.preventDefault(); // не відправляти форму на сервер (якщо бекенда немає)
    alert('Історію надіслано! Дякуємо 💙');
    window.location.href = 'profile.html';
});

function saveUserId() {
    const input = document.getElementById("user-id-input").value.trim();
    if (input) {
        localStorage.setItem("userId", input);
        alert("ID збережено. Перейдіть на сторінку Профілю.");
    }
}
