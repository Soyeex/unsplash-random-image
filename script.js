const accessKey = 'r_Idf2SpDjmPgEw7RM5V6FiMErWBvfIauRUnEMrNCGE';  // Замените на ваш ключ
const imageElement = document.getElementById('randomImage');
const photographerNameElement = document.getElementById('photographerName');
const likeButton = document.getElementById('likeButton');
const likeCountElement = document.getElementById('likeCount');
const historyListElement = document.getElementById('historyList');

let likeCount = localStorage.getItem('likeCount') ? parseInt(localStorage.getItem('likeCount')) : 0;
let imageHistory = JSON.parse(localStorage.getItem('imageHistory')) || [];

likeCountElement.textContent = likeCount;

async function fetchRandomImage() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`);
        if (!response.ok) throw new Error(`Ошибка: ${response.status} - ${response.statusText}`);

        const data = await response.json();  
        console.log(data); 


        imageElement.src = data.urls.regular;
        photographerNameElement.textContent = `Фотограф: ${data.user.name}`;


        saveImageToHistory(data);
        updateHistory();
    } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
    }
}

function saveImageToHistory(data) {
    imageHistory.push({ 
        imageURL: data.urls.regular, 
        photographer: data.user.name 
    });
    localStorage.setItem('imageHistory', JSON.stringify(imageHistory));
}

function updateHistory() {
    historyListElement.innerHTML = '';  
    imageHistory.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<img src="${item.imageURL}" alt="История изображений" style="width: 50%; max-height: 50%; border: none; border-radius: 10px;"> 
        <br>Фотограф: ${item.photographer}`;
        historyListElement.appendChild(listItem);
    });
}

likeButton.onclick = function() {
    likeCount++;
    likeCountElement.textContent = likeCount;
    localStorage.setItem('likeCount', likeCount);
};


window.onload = function() {
    fetchRandomImage();
    likeCountElement.textContent = likeCount;
    updateHistory();
}
