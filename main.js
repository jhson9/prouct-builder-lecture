const colorMap = [
    "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#F44336",
    "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A",
    "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#F44336", "#E91E63",
    "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#00BCD4"
];

class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        const color = this.getColor(number);
        const shadow = this.shadowRoot;

        shadow.innerHTML = `
            <style>
                div {
                    background-color: ${color};
                    color: white;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5em;
                    font-weight: bold;
                    box-shadow: inset -5px -5px 10px rgba(0,0,0,0.3), 2px 2px 5px rgba(0,0,0,0.2);
                    animation: pop-in 0.4s ease-out forwards;
                }
                @keyframes pop-in {
                    0% { transform: scale(0.1); opacity: 0; }
                    60% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); }
                }
            </style>
            <div>${number || '?'}</div>
        `;
    }

    getColor(number) {
        return colorMap[parseInt(number, 10) - 1] || '#ccc';
    }
}
customElements.define('lotto-ball', LottoBall);

const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');
const themeToggle = document.getElementById('checkbox');
const clickSound = document.getElementById('click-sound');
const previousNumbersContainer = document.getElementById('previous-numbers');
const clockElement = document.getElementById('clock');

let history = [];

function updateClock() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    clockElement.textContent = now.toLocaleDateString('ko-KR', options);
}

updateClock();
setInterval(updateClock, 1000);

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.add(currentTheme);
  
    if (currentTheme === 'dark-mode') {
        themeToggle.checked = true;
    }
}

themeToggle.addEventListener('change', function() {
    if(this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
    }
});


generateBtn.addEventListener('click', () => {
    generateBtn.disabled = true;
    clickSound.play();
    lottoNumbersContainer.innerHTML = '';
    
    // Create placeholder balls
    const placeholderBalls = [];
    for (let i = 0; i < 6; i++) {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.classList.add('spinning');
        lottoNumbersContainer.appendChild(lottoBall);
        placeholderBalls.push(lottoBall);
    }

    const numbers = new Set();
    while(numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a,b) => a - b);
    
    let delay = 0;
    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const newBall = document.createElement('lotto-ball');
            newBall.setAttribute('number', number);
            lottoNumbersContainer.replaceChild(newBall, placeholderBalls[index]);
            if (index === 5) {
                generateBtn.disabled = false;
                updateHistory(sortedNumbers);
            }
        }, delay);
        delay += 333; // 2000ms / 6 = 333ms
    });
});

function updateHistory(newNumbers) {
    history.unshift(newNumbers);
    if (history.length > 4) {
        history.pop();
    }
    localStorage.setItem('lotto_history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    previousNumbersContainer.innerHTML = '';
    history.forEach(numberSet => {
        const setContainer = document.createElement('div');
        setContainer.classList.add('previous-set');
        numberSet.forEach(number => {
            const ball = document.createElement('div');
            ball.classList.add('previous-ball');
            ball.style.backgroundColor = getColorForBall(number);
            ball.textContent = number;
            setContainer.appendChild(ball);
        });
        previousNumbersContainer.appendChild(setContainer);
    });
}

function getColorForBall(number) {
    return colorMap[parseInt(number, 10) - 1] || '#ccc';
}

function loadHistory() {
    const savedHistory = localStorage.getItem('lotto_history');
    if (savedHistory) {
        history = JSON.parse(savedHistory);
        renderHistory();
    }
}

loadHistory();
