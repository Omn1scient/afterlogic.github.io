/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);


const hamburger = document.querySelector('.hamburger')
const headerMainNav = document.querySelector('.header__main-navigation')

function handleHamburgerClick() {
	hamburger.classList.toggle('active');
	headerMainNav.classList.toggle('active');

	if (headerMainNav.classList.contains('active')) {
		let mainNavHeight = headerMainNav.scrollHeight;
		headerMainNav.style.maxHeight = mainNavHeight + 'px';
	} else {
		headerMainNav.style.maxHeight = 0;
	}
}


function resize() {
	const windowWidth = window.innerWidth;
	if (windowWidth <= 1064) {
		hamburger.addEventListener('click', handleHamburgerClick);
	} else {
		hamburger.removeEventListener('click', handleHamburgerClick);
		headerMainNav.classList.remove('active');
		headerMainNav.style.maxHeight = 'none';
	}
}

window.addEventListener('load', resize);
window.addEventListener('resize', resize);


const overlayModal = document.querySelector('.overlay-modal');
const modalWrapper = document.querySelector('.modal-wrapper');

function openModal(modalId) {
	const modal = document.querySelector(modalId);
	if (modal) {
		modal.classList.add('modal-shown');
		overlayModal.classList.add('overlay-modal--active');
		modalWrapper.classList.add('modal-wrapper--active');
		document.querySelector('body').classList.add('modal-open');
	}
}

function closeModal(modalId) {
	const modal = document.querySelector(modalId);
	if (modal) {
		modal.classList.remove('modal-shown');
		overlayModal.classList.remove('overlay-modal--active');
		modalWrapper.classList.remove('modal-wrapper--active');
		document.querySelector('body').classList.remove('modal-open');
	}
}

function handleModalToggle(event) {
	const target = event.target;
	const modalToggle = target.closest('[data-toggle="modal"]');

	if (modalToggle) {
		event.preventDefault();

		const modalId = modalToggle.getAttribute('href');
		if (modalId) {
			openModal(modalId);
		}
	}
}

function handleModalClose(event) {
	const target = event.target;
	const closeButton = target.closest('.modal-close-btn');
	const overlayModal = target.closest('.overlay-modal--active');

	if (closeButton || overlayModal) {
		const modal = document.querySelector('.modal-shown');
		if (modal) {
			const modalId = `#${modal.getAttribute('id')}`;
			closeModal(modalId);
		}
	}
}

document.addEventListener('click', handleModalToggle);
document.addEventListener('click', handleModalClose);


let isFirstSubmit = true;

function validateForm() {
	const form = document.callbackForm;
	const inputs = form.querySelectorAll('input.modal__input');
	const select = form.someSelect;
	const customSelect = form.querySelector('.custom-select'); // Получаем элемент .custom-select
	const submitButton = form.querySelector('button.modal__modal-btn');

	let isFormValid = true;

	inputs.forEach((input) => {
		if (input.value.trim() === '') {
			if (!isFirstSubmit) {
				input.classList.add('invalid');
			}
			isFormValid = false;
		} else {
			input.classList.remove('invalid');
		}
	});

	if (select.value === '') {
		if (!isFirstSubmit) {
			customSelect.classList.add('invalid');
		}
		isFormValid = false;
	} else {
		customSelect.classList.remove('invalid');
	}

	if (isFormValid) {
		submitButton.classList.remove('disabled');
		submitButton.disabled = false;
	} else {
		submitButton.classList.add('disabled');
		submitButton.disabled = true;
		event.preventDefault();
	}
}

callbackForm.addEventListener('submit', (event) => {
	if (isFirstSubmit) {
		isFirstSubmit = false;
	}

	validateForm();

	if (!isFirstSubmit && !document.querySelector('button.modal__modal-btn').classList.contains('disabled')) {

		isFirstSubmit = true;
		document.querySelector('form.modal__form').reset();
		console.log('форма отправлена')

		event.preventDefault(); // Это просто предотвращает отправку, чтобы визуально можно было увидеть сообщение об успехе

		// После успешной отправки покажите модальное окно
		const successModal = document.querySelector('#successModal');
		successModal.classList.add('modal-shown');

		const callbackModal = document.querySelector('#callbackModal');
		callbackModal.classList.remove('modal-shown');
	}
});

callbackForm.addEventListener('input', () => {
	if (!isFirstSubmit) {
		validateForm();
	}
});
/******/ })()
;