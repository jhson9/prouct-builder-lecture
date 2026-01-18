const themeSwitch = document.getElementById('checkbox');
const clock = document.getElementById('clock');
const recommendBtn = document.getElementById('recommend-btn');
const restaurantList = document.getElementById('restaurant-list');

const restaurants = [
    // 화북동
    { name: '현서네두루치기', location: '화북동', food: '간장게장', rating: 5 },
    { name: '착한튀김', location: '화북동', food: '떡볶이', rating: 5 },
    { name: '키에키커피스탠드', location: '화북동', food: '커피', rating: 4.5 },
    { name: '도남돼지', location: '화북동', food: '흑돼지', rating: 4.2 },
    // 조천읍
    { name: '램앤블랙 제주 조천 본점', location: '조천읍', food: '양고기, 양갈비', rating: 4.8 },
    { name: '고집돌우럭 제주함덕점', location: '조천읍', food: '우럭', rating: 4.8 },
    { name: '함덕골목 제주', location: '조천읍', food: '내장탕, 해장국', rating: 4.7 },
    { name: '미영이네 조천점', location: '조천읍', food: '고등어회, 고등어탕', rating: 4.6 },
    { name: '시인의 집 조천', location: '조천읍', food: '카페, 전집', rating: 4.5 },
    { name: '무우수 커피 로스터스 조천', location: '조천읍', food: '카페, 커피', rating: 4.5 },
    { name: '카페 시소 제주', location: '조천읍', food: '베이커리, 카페', rating: 4.4 },
    { name: '점점 조천', location: '조천읍', food: '아이스크림, 옥수수', rating: 4.1 },
    // 삼양동
    { name: '옥이이모', location: '삼양동', food: '비빔밥', rating: 5 },
    { name: '화성식당', location: '삼양동', food: '접짝뼈국', rating: 4.8 },
    { name: '회춘', location: '삼양동', food: '한정식', rating: 4.7 },
    { name: '오병장', location: '삼양동', food: '흑돼지', rating: 4.6 },
    { name: '진양해장국', location: '삼양동', food: '해장국', rating: 4.6 },
    { name: '에오마르', location: '삼양동', food: '커피', rating: 4.4 },
    { name: '원신식당', location: '삼양동', food: '갈치국', rating: 4 },
    { name: '제주인짬뽕 삼화점', location: '삼양동', food: '짬뽕, 짜장면, 탕수육', rating: 5 },
    { name: '아임파인 제주', location: '삼양동', food: '크림 짬뽕, 우삼겹 짬뽕, 토마토 짬뽕', rating: 4.4 },
];

function setClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

function setInitialTheme() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeSwitch.checked = false;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

function recommendRestaurants() {
    restaurantList.innerHTML = '';

    const shuffled = restaurants.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    for (const restaurant of selected) {
        const restaurantEl = document.createElement('div');
        restaurantEl.classList.add('restaurant');
        restaurantEl.innerHTML = `
            <h2>${restaurant.name}</h2>
            <p><strong>위치:</strong> ${restaurant.location}</p>
            <p><strong>추천 메뉴:</strong> ${restaurant.food}</p>
            <p><strong>평점:</strong> ${restaurant.rating}</p>
        `;
        restaurantList.appendChild(restaurantEl);
    }
}

themeSwitch.addEventListener('change', switchTheme, false);
recommendBtn.addEventListener('click', recommendRestaurants);

setInitialTheme();
setClock();
setInterval(setClock, 1000);
recommendRestaurants(); // Initial recommendations on page load
