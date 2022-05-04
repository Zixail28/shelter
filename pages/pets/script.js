const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.nav-menu');
const logo = document.querySelector('.logo');
const bef = document.querySelector('.before');
const navLink = document.querySelectorAll('.nav-link');

burger.addEventListener('click', () => {
	burger.classList.toggle('active');
	nav.classList.toggle('active');
	logo.classList.toggle('active');
	bef.classList.toggle('active');
	body.style.overflow = 'hidden'
})
 
navLink.forEach(e => {
	e.addEventListener('click', () => {
		burger.classList.toggle('active');
		nav.classList.toggle('active');
		logo.classList.toggle('active');
		bef.classList.toggle('active');
		body.style.overflow = 'initial'
	})
})

bef.addEventListener('click', () => {
	burger.classList.toggle('active');
	nav.classList.toggle('active');
	logo.classList.toggle('active');
	bef.classList.toggle('active');
	body.style.overflow = 'initial'
})




const body = document.querySelector('body');
const modalBox = document.querySelector('.modal-box');
const modalWindow = document.querySelector('.modal-window');
const modalBtn = document.querySelector('.btn-modal');
const cards = document.querySelectorAll('.card');
const btnsSliderCard = document.querySelectorAll('.btn-slider-card');
const btnLeft = document.querySelector('.navigation .once-left.nav-btn');
const btnDblLeft = document.querySelector('.dbl-left.nav-btn');
const btnRight = document.querySelector('.navigation .once-right.nav-btn');
const btnDblRight = document.querySelector('.dbl-right.nav-btn');
const btnPage = document.querySelector('.navigation .page.nav-btn');
let width = document.body.clientWidth;
let arr = [];
let page = 1;
let pages = 0;
let arrEight = [0, 1, 2, 3, 4, 5, 6, 7];
let isOpen = false;

let getPetsLeft = () => { 
	if(page != 1){
		page--; 
		getPets()
	}
 };
let getPetsRight = () => { 
	if(page != pages){
		page++; 
		getPets()
	}
 };


if (width >= 1280) {
	pages = 6;
	arr = [[], [], [], [], [], []];
	(function generateRandArr() {
		for (i = 0; i < arr.length; i++) {
			arr[i] = arrEight.slice(0)
			shuffle(arr[i])
		}
	})()
} else if (width >= 768 && width < 1280) {
	pages = 8;
	arr = [[], [], [], [], [], [], [], []];
	let tempArr = [
		0, 1, 2, 3, 4, 5, 6, 7, 
		0, 1, 2, 3, 4, 5, 6, 7, 
		0, 1, 2, 3, 4, 5, 6, 7,
		0, 1, 2, 3, 4, 5, 6, 7,
		0, 1, 2, 3, 4, 5, 6, 7,
		0, 1, 2, 3, 4, 5, 6, 7,
	]
	shuffle(tempArr)
	console.log(tempArr);
	for(i = 0; i < arr.length; i++){
		for(l = 0; l < 48 / pages; l++){
			while(arr[i].includes(tempArr[0]) && tempArr.length >= 48 / pages){
				shuffle(tempArr)
				console.log(tempArr);
				console.log(arr);
			}
				arr[i][l] = tempArr[0]
				tempArr.shift();
		}
	}
	console.log(arr);

} else if (width < 768) {
	pages = 16;
	arr = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
	let tempArr = [
		0, 1, 2, 3, 4, 5, 6, 7, 
		0, 1, 2, 3, 4, 5, 6, 7, 
		0, 1, 2, 3, 4, 5, 6, 7,
		0, 1, 2, 3, 4, 5, 6, 7,
		0, 1, 2, 3, 4, 5, 6, 7,
		0, 1, 2, 3, 4, 5, 6, 7,
	]
	shuffle(tempArr)
	
	for(i = 0; i < arr.length; i++){
		for(l = 0; l < 48 / pages; l++){
			while(arr[i].includes(tempArr[0]) && tempArr.length >= 48 / pages){
				shuffle(tempArr)
			}
				arr[i][l] = tempArr[0]
				tempArr.shift();
		}
	}
	
}


btnLeft.addEventListener('click', getPetsLeft);
btnRight.addEventListener('click', getPetsRight);
btnPage.textContent = page;


btnDblRight.addEventListener('click', () => {
	page = pages;
	getPets()
})
btnDblLeft.addEventListener('click', () => {
	page = 1;
	getPets()
})


getPets()


function getPets() {
	btnPage.textContent = page;
	fetch('../../assets/scripts/pets.json')
		.then(response => response.json()
		).then(data => {
			cards.forEach((a, index) => {
				a.children[0].src = `${data[arr[page - 1][index]].img}`
				a.children[1].textContent = data[arr[page - 1][index]].name;
			})
			console.log(arr);
		})
		if(page == pages){
			btnDblRight.classList.add('inactive')
			btnDblRight.classList.remove('btn-yrg')
			btnRight.classList.add('inactive')
			btnRight.classList.remove('btn-yrg')
		} else {
			btnDblRight.classList.remove('inactive')
			btnDblRight.classList.add('btn-yrg')
			btnRight.classList.remove('inactive')
			btnRight.classList.add('btn-yrg')
		}
		if(page == 1){
			btnDblLeft.classList.add('inactive')
			btnDblLeft.classList.remove('btn-yrg')
			btnLeft.classList.add('inactive')
			btnLeft.classList.remove('btn-yrg')
		} else{
			btnDblLeft.classList.remove('inactive')
			btnDblLeft.classList.add('btn-yrg')
			btnLeft.classList.remove('inactive')
			btnLeft.classList.add('btn-yrg')
		}
}

function getTextPets(index) {
	fetch('../../assets/scripts/pets.json')
		.then(response => response.json()
		).then(data => {
			modalWindow.children[0].children[0].src = data[arr[page - 1][index]].img //img
			modalWindow.children[0].children[0].alt = data[arr[page - 1][index]].name //alt
			modalWindow.children[1].children[0].textContent = data[arr[page - 1][index]].name // name
			modalWindow.children[1].children[1].textContent = `${data[arr[page - 1][index]].type} - ${data[arr[page - 1][index]].breed}` // breed
			modalWindow.children[1].children[2].textContent = data[arr[page - 1][index]].description // desc

			modalWindow.children[1].children[3].children[0].innerHTML = `<b>Age: </b>${data[arr[page - 1][index]].age}` // age
			modalWindow.children[1].children[3].children[1].innerHTML = `<b>Inoculations: </b>${data[arr[page - 1][index]].inoculations}` // inoculations
			modalWindow.children[1].children[3].children[2].innerHTML = `<b>Diseases: </b>${data[arr[page - 1][index]].diseases}` // diseases
			modalWindow.children[1].children[3].children[3].innerHTML = `<b>Parasites: </b>${data[arr[page - 1][index]].parasites}` // parasites
		})
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}




btnsSliderCard.forEach((e, index) => {
	e.addEventListener('click', () => {
		getTextPets(index);
		modalBox.style.display = 'flex'
		body.style.overflow = 'hidden'
		isOpen = !isOpen
	})
})

modalBtn.addEventListener('click', () => {
	modalBox.style.display = 'none'
	body.style.overflow = 'initial'
	close()
	isOpen = !isOpen
})

window.onload = function () {
	document.body.onclick = function (e) {
		e = e;
		target = e.target;
		if ((target.tagName == "DIV" && (target.className == "modal-box"))) {
			if (isOpen) {
				modalBox.style.display = 'none'
				body.style.overflow = 'initial'
				close()
				isOpen = !isOpen
			}
		}
	}
}

function close() {
	modalWindow.children[0].children[0].src = '' //img
	modalWindow.children[0].children[0].alt = '' //alt
	modalWindow.children[1].children[0].textContent = '' // name
	modalWindow.children[1].children[1].textContent = '' // breed
	modalWindow.children[1].children[2].textContent = '' // desc

	modalWindow.children[1].children[3].children[0].innerHTML = '' // age
	modalWindow.children[1].children[3].children[1].innerHTML = '' // inoculations
	modalWindow.children[1].children[3].children[2].innerHTML = '' // diseases
	modalWindow.children[1].children[3].children[3].innerHTML = ''
}