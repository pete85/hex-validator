"use strict";

let parent = document.getElementById('parent');
let header = document.createElement('h1');
let messageParagraph = document.createElement('p');
let headerText = document.createTextNode("HEX validator");
let messageText;
let hexArray = [];
let hex;
const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const hexTable = document.createElement('table');
const tableHeader = document.createElement('thead');
const tableBody = document.createElement('tbody');
const validationText = document.getElementById('validation');

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
    document.getElementById('btnAdd').disabled = false;
  } else if (hex.length < stringLength) {
    validationText.innerHTML = 'Value is too short';
    validationText.style.color = '#A92222';
    document.getElementById('btnAdd').disabled = true;
  } else {
    validationText.innerHTML = 'Value is too long';
    validationText.style.color = '#A92222';
    document.getElementById('btnAdd').disabled = true;
  }
};

window.onload = buildContainer;

const addHex = () => {
  let li;
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
    if (el.valid) {
      td2.style.color = '#8ed433';
      td3.style.backgroundColor = el.name;
    } else {
      td2.style.color = '#A92222';
      td3.style.backgroundColor = '#E3E2E1';
    }
    td1.appendChild(document.createTextNode(el.name));
    td2.appendChild(document.createTextNode(el.valid ? 'Valid' : 'Invalid'));
  });
  parent.appendChild(hexTable);
}

const reset = () => {
  hexArray = [];
  updateTable();
}

const isValidHex = (hex) => {
  return regex.test(hex);
}

// Simple validation
const checkHexColors = (hexColors) => {
  const results = [];
  for (let i = 0; i < hexColors.length; i++) {
    const hex = hexColors[i];
    const isValid = isValidHex(hex);
    results.push(isValid);
  }
  return results;
}

const colors = ['#ff0000', '#00ff00', '#0000ff', '#123abc', '#xyz123', '#A92222'];
const validationResults = checkHexColors(colors);
// console.log(validationResults);
