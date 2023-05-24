"use strict";

let parent = document.getElementById('parent');
let header = document.createElement('h1');
let messageParagraph = document.createElement('p');
let headerText = document.createTextNode("HEX validator");
let hexArray = [];
let hex;
let isValid;
const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const hexTable = document.createElement('table');
const tableHeader = document.createElement('thead');
const tableBody = document.createElement('tbody');
const validationText = document.getElementById('validation');
const input = document.getElementById('hex');

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter" && isValid) {
    event.preventDefault();
    addHex();
  }
});

const tableCreate = () => {
  hexTable.appendChild(tableHeader);
  const headerRow = tableHeader.insertRow();
  const th1 = document.createElement('th');
  th1.innerHTML = "HEX";
  const th2 = document.createElement('th');
  th2.innerHTML = "Valid?";
  const th3 = document.createElement('th');
  th3.innerHTML = "Color";
  headerRow.appendChild(th1);
  headerRow.appendChild(th2);
  headerRow.appendChild(th3);
  hexTable.appendChild(tableBody);
  parent.appendChild(hexTable);
}

const buildContainer = () => {
  hex = document.getElementById('hex').value;
  header.appendChild(headerText);
  parent.appendChild(header);
  if (!hex || hex === "") {
    document.getElementById('btnAdd').disabled = true;
  }
  tableCreate();
};

const checkValue = () => {
  let stringLength;
  hex = document.getElementById('hex').value
  document.getElementById('btnAdd').disabled = !hex || hex === "";

  if (hex.startsWith("#")) {
    stringLength = 7;
  } else {
    stringLength = 6;
  }

  if (hex.length === stringLength) {
    validationText.innerHTML = 'Value is valid';
    validationText.style.color = '#8ed433';
    isValid = true;
    document.getElementById('btnAdd').disabled = false;
  } else if (hex.length < stringLength) {
    validationText.innerHTML = 'Value is too short';
    validationText.style.color = '#A92222';
    document.getElementById('btnAdd').disabled = true;
    isValid = false;
  } else {
    validationText.innerHTML = 'Value is too long';
    validationText.style.color = '#A92222';
    document.getElementById('btnAdd').disabled = true;
    isValid = false;
  }
};

window.onload = buildContainer;

const addHex = () => {
  const lastItem = hexArray[hexArray. length - 1];
  messageParagraph.innerHTML = '';

  if (hex.startsWith("#")) {
    console.log('String starts with #');
  } else {
    hex = `#${hex}`;
  }

  if (hexArray.length >= 10) {
    messageParagraph.innerHTML = `Added <span class="itemName itemAdded">${hex}</span>. Removed <span class="itemName itemRemoved">${lastItem.name}.</span>`;
    hexArray.pop();
    hexArray.unshift({name: hex, valid: isValidHex(hex)});
  } else {
    messageParagraph.innerHTML = `Added <span class="itemName itemAdded">${hex}</span>.`;
    hexArray.unshift({name: hex, valid: isValidHex(hex)});
  }
  parent.appendChild(messageParagraph);
  updateTable();
}

const updateTable = () => {
  tableBody.innerHTML = '';
  hexArray.forEach(el => {
    const tr = tableBody.insertRow();
    const td1 = tr.insertCell();
    const td2 = tr.insertCell();
    const td3 = tr.insertCell();
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('color-div');
    if (el.valid) {
      td2.style.color = '#5db74e';
      colorDiv.style.backgroundColor = el.name;
    } else {
      colorDiv.style.backgroundColor = '#E3E2E1';
      td2.style.color = '#A92222';
    }
    td1.appendChild(document.createTextNode(el.name));
    td2.appendChild(document.createTextNode(el.valid ? 'Valid' : 'Invalid'));
    td3.appendChild(colorDiv);
  });
  parent.appendChild(hexTable);
  document.getElementById('hex').value = '';
}

const reset = () => {
  hexArray = [];
  updateTable();
}

const isValidHex = (hex) => {
  return regex.test(hex);
}
