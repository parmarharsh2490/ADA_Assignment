const start_btn = document.getElementById('start_btn');
const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose_insect_btn');
const game_container = document.querySelector('.game_container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const annoying_message = document.getElementById('annoying_message');
let score = 0;
let selected_insect = {};

start_btn.addEventListener('click', () => {
	screens[0].classList.add('up');
});

choose_insect_btns.forEach(btn => {
	btn.addEventListener('click', () => {
		const img = btn.querySelector('img');
		const src = img.getAttribute('src');
		const alt = img.getAttribute('alt');
		selected_insect = {
			src,
			alt
		};
		screens[1].classList.add('up');
		setTimeout(createInsect, 1000);
		startGame();
	});
});
let result = document.getElementById('result');
let scoree = document.getElementById('scoree');
function increaseTime() {
	let m = 0;
	let s = 59;
	setInterval(() => {
		timeEl.innerHTML = `Time: ${m}:${s}`;	
		s--;
		if(s==0){
			console.log("Hi");
			screens[2].classList.add('up');
			scoree.innerHTML = `${score}`;
		}
	}, 1000);

}

function addInsects() {
	setTimeout(createInsect, 1000);
	setTimeout(createInsect, 1500);
}

function createInsect() {
	const insect = document.createElement('div');
	const { x, y } = getRandomLocation();
	insect.classList.add('insect');
	insect.style.left = `${x}px`;
	insect.style.top = `${y}px`;
	insect.innerHTML = `<img src="${selected_insect.src}" arc="${
		selected_insect.alt
	}" style="transform: rotate(${Math.random() * 360}deg)"/>`;
	insect.addEventListener('click', catchInsect);

	game_container.appendChild(insect);
}


function increaseScore() {
	score++;
	scoreEl.innerHTML = `Score: ${score}`;
}

function startGame() {
	increaseTime();
}

function getRandomLocation() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const x = Math.random() * (width - 200) + 100;
	const y = Math.random() * (height - 200) + 100;
	
	return {
		x,
		y
	};
}
const catchSound = new Audio('Sound/sound.wav');
function catchInsect() {
	catchSound.play();
	increaseScore();
	this.classList.add('catched');
	setTimeout(() => {
		this.remove();
	}, 2000);
	addInsects();
}

const restartButton = document.getElementById('restart');
restartButton.addEventListener('click',()=>{
	location.reload();
})
