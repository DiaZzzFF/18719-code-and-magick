'use strict';

// Количество сгенерированных JS объектов.
var NUMBER_OF_WIZARDS = 4;

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');

var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var setupPlayer = setup.querySelector('.setup-player');
var wizardCoat = setupPlayer.querySelector('.wizard-coat');
var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
var fireball = setupPlayer.querySelector('.setup-fireball-wrap');
var wizardCoatInput = setupPlayer.querySelector('input[name="coat-color"]');
var wizardEyesInput = setupPlayer.querySelector('input[name="eyes-color"]');
var fireballInput = setupPlayer.querySelector('input[name="fireball-color"]');

// Функция генерации случайных данных.
var getRandomData = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);

  return arr[rand];
};

// Функция создания массива, состоящая из сгенерированных JS объектов.
var createWizards = function () {
  var myWizards = [];

  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    myWizards[i] = {
      name: getRandomData(WIZARD_NAMES) + ' ' + getRandomData(WIZARD_SURNAMES),
      coatColor: getRandomData(WIZARD_COAT_COLORS),
      eyesColor: getRandomData(WIZARD_EYES_COLORS)
    };
  }

  return myWizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Функция заполнения блока DOM-элементами на основе массива JS-объектов.
var getDocumentFragment = function () {
  var myArray = createWizards();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < myArray.length; i++) {
    fragment.appendChild(renderWizard(myArray[i]));
  }

  return fragment;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && setupUserName !== evt.target) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Функция изменения цвета >>мантии<< персонажа (по нажатию) для обработчика событий
var changeWizardCoatColor = function () {
  var myWizardCoatColor = getRandomData(WIZARD_COAT_COLORS);

  wizardCoat.style.fill = wizardCoatInput.value = myWizardCoatColor;

  return myWizardCoatColor;
};

// Функция изменения цвета >>глаз<< персонажа (по нажатию) для обработчика событий
var changeWizardEyesColor = function () {
  var myWizardEyesColor = getRandomData(WIZARD_EYES_COLORS);

  wizardEyes.style.fill = wizardEyesInput.value = myWizardEyesColor;

  return myWizardEyesColor;
};

// Функция изменения цвета >>фаерболов<< (по нажатию) для обработчика событий
var changeFireballColor = function () {
  var myFireballColor = getRandomData(FIREBALL_COLORS);

  fireball.style.background = fireballInput.value = myFireballColor;

  return myFireballColor;
};

wizardCoat.addEventListener('click', function () {
  changeWizardCoatColor();
});

wizardEyes.addEventListener('click', function () {
  changeWizardEyesColor();
});

fireball.addEventListener('click', function () {
  changeFireballColor();
});

similarListElement.appendChild(getDocumentFragment());
setup.querySelector('.setup-similar').classList.remove('hidden');
