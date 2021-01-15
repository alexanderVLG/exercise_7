"use strict"
const addButton = document.querySelector('.add__button');
const formList = document.querySelector('.form__list');
const length = document.getElementById('get_length');
const height = document.getElementById('get_height');
const color = document.getElementById('get_color');
const createButton = document.getElementById('create__btn');
let textAreaCollection = document.getElementsByTagName('textarea');
createButton.addEventListener('click', getDataFromInputs);
addButton.addEventListener('click', createElement);

function createElement() {
  let newTextArea = document.createElement('textarea');
  newTextArea.setAttribute('cols', '30');
  newTextArea.setAttribute('rows', '10'); 
  let newLi = document.createElement('li');
  let closeButton = document.createElement('div');
  let symbolX = document.createTextNode('x');

    function addElements() {
      closeButton.append(symbolX);
      closeButton.classList.add('close__button');
      newLi.append(newTextArea);
      newLi.append(closeButton);
      formList.append(newLi);

      closeButton.addEventListener('click', e => { 
        let parent = e.target.parentElement;
        parent.remove();
        textAreaCollection = document.getElementsByTagName('textarea');
    });

      textAreaCollection = document.getElementsByTagName('textarea');
    }

  addElements();
}

function getDataFromInputs() {
  let zoneForCreation = document.querySelector('.creation__zone');
  let lengthValue = parseInt(length.value);
  let heightValue = parseInt(height.value);
  let colorValue = color.value;
  let stringsFromTextAreas = [];

  for(let i = 0; i < textAreaCollection.length; i++) {
    if(textAreaCollection[i].value.length >= 1) {
      stringsFromTextAreas.push(textAreaCollection[i].value);
    } else {
      warningFunc();
    }
  }
  function warningFunc() {
    warningAboutError();
    throw new Error('Введены неверные данные');
  }

  if(lengthValue >= 50 && lengthValue <= 1000 && heightValue >= 50 && heightValue <= 600 && colorValue.length >= 1) {
    createSquare();
  } else {
    warningAboutError ();
  }

  function createSquare() {
    let divElem = document.createElement('div');
    divElem.classList.add('textarea--inner');
    divElem.style.width = lengthValue + 'px';
    divElem.style.height = heightValue + 'px';
    divElem.style.backgroundColor = color.value;

    function addInfoInsideSquare() {
      for(let i = 0; i < stringsFromTextAreas.length; i++) {
        let innerDiv = document.createElement('div');
        innerDiv.append(stringsFromTextAreas[i]);
        divElem.append(innerDiv);
      }
    }
    
    function addToHtml() {
      zoneForCreation.append(divElem);
      createButton.addEventListener('click', removeSquare);
    }

    addInfoInsideSquare();
    addToHtml();
  }

  function removeSquare() {
    zoneForCreation.firstChild.remove();
    createButton.removeEventListener('click', removeSquare);
  }

  function warningAboutError () {
    let textForError = document.createTextNode('Введены неправильные данные');
    zoneForCreation.append(textForError);
    zoneForCreation = document.querySelector('.creation__zone');
    createButton.addEventListener('click', removeSquare);
  }
}