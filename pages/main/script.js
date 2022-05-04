const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.nav-menu');
const logo = document.querySelector('.logo');
const body = document.querySelector('body');
const bef = document.querySelector('.before');
const modalBox = document.querySelector('.modal-box');
const modalWindow = document.querySelector('.modal-window');
const modalBtn = document.querySelector('.btn-modal');
const cards = document.querySelectorAll('.card');
const btnsSliderCard = document.querySelectorAll('.btn-slider-card');
const btnLeft = document.querySelector('.slider .btn-yrg.swipe-btn');
const btnRight = document.querySelector('.slider .btn-yrg.swipe-btn:last-child');
const navLink = document.querySelectorAll('.nav-link');

let arr = [0, 1, 2];
let arrOld = [0, 1, 2];
let pet = 1;
let isOpen = false;

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

btnLeft.addEventListener('click', getPets);
btnRight.addEventListener('click', getPets);

function getPets() {
	fetch('../../assets/scripts/pets.json')
	.then(response => response.json()
	).then(data => {
		arrOld = arr.slice(0)
		cards.forEach((a, index) => {
			while(arr.includes(pet) || arrOld.includes(pet)){
				pet = getRandomInt(0, 8);
			}
			arr[index] = pet;
			a.children[0].src = `${data[pet].img}`
			a.children[1].textContent = data[pet].name;
		})
		console.log(arr);
		console.log(arrOld);
	}).catch(err => {
		console.log("Error Reading data " + err);
	});
}

function getTextPets(index) {
	fetch('../../assets/scripts/pets.json')
	.then(response => response.json()
	).then(data => {
		modalWindow.children[0].children[0].src = data[arr[index]].img //img
		modalWindow.children[0].children[0].alt = data[arr[index]].name //alt
		modalWindow.children[1].children[0].textContent = data[arr[index]].name // name
		modalWindow.children[1].children[1].textContent = `${data[arr[index]].type} - ${data[arr[index]].breed}` // breed
		modalWindow.children[1].children[2].textContent = data[arr[index]].description // desc
		
		modalWindow.children[1].children[3].children[0].innerHTML = `<b>Age: </b>${data[arr[index]].age}` // age
		modalWindow.children[1].children[3].children[1].innerHTML = `<b>Inoculations: </b>${data[arr[index]].inoculations}` // inoculations
		modalWindow.children[1].children[3].children[2].innerHTML = `<b>Diseases: </b>${data[arr[index]].diseases}` // diseases
		modalWindow.children[1].children[3].children[3].innerHTML = `<b>Parasites: </b>${data[arr[index]].parasites}` // parasites
	}).catch(err => {
		console.log("Error Reading data " + err);
	});
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

btnsSliderCard.forEach((e, index) => { e.addEventListener('click', () => {
	getTextPets(index);
	modalBox.style.display = 'flex'
	body.style.overflow = 'hidden'
	isOpen = !isOpen
})})

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
		if(isOpen){
			modalBox.style.display = 'none'
			body.style.overflow = 'initial'
			close()
			isOpen = !isOpen
		}
	}
	}}
	
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