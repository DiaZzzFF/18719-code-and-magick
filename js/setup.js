'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Функция генерации случайных данных.
var getRandomData = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);

  return arr[rand];
};

// Функция создания массива, состоящая из 4 сгенерированных JS объектов.
var createWizards = function () {
  var myWizards = [];

  for (var i = 0; i < 4; i++) {
    myWizards[i] = {
      name: getRandomData(WIZARD_NAMES) + ' ' + getRandomData(WIZARD_SURNAMES),
      coatColor: getRandomData(WIZARD_COAT_COLORS),
      eyesColor: getRandomData(WIZARD_EYES_COLORS)
    };
  }

  return myWizards;
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

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

similarListElement.appendChild(getDocumentFragment());

userDialog.querySelector('.setup-similar').classList.remove('hidden');
