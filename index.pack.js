/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var entryForm = document.getElementById('entryForm');
var entriesSection = document.querySelector('#entries');
var entryTextbox = document.querySelector('.entry-textbox');
var entriesNav = document.querySelector('.entries-nav');

var diaryEntires = [];

var count = 1;

function renderEntry(entry) {
  // Create a div for entry
  var entryDiv = document.createElement('div');
  entryDiv.className = 'single-entry';
  entryDiv.innerText = entry;
  entryDiv.style.display = 'none';
  entriesSection.appendChild(entryDiv);

  // Create a button to view this entry
  var displayEntryButton = document.createElement('button');
  displayEntryButton.className = 'display-entry-button';
  displayEntryButton.innerText = count++;
  entriesNav.appendChild(displayEntryButton);

  // Display the corresponding entry after clicking a button
  displayEntryButton.addEventListener('click', function () {
    var allEntries = document.querySelectorAll('.single-entry');
    for (var index = 0; index < allEntries.length; index++) {
      allEntries[index].style.display = 'none';
    }
    entryDiv.style.display = 'block';
  });

  // Create a delete button to remove this entry
  var removeButton = document.createElement('button');
  removeButton.className = 'display-delete-button';
  removeButton.innerText = 'Delete';
  entryDiv.appendChild(removeButton);

  // Remove clicked entry
  removeButton.addEventListener('click', function () {
    displayEntryButton.remove();
    entryDiv.remove();
    // Update local storage
    diaryEntires = diaryEntires.filter(function (entryItem) {
      return entryItem !== entry;
    });
    localStorage.setItem('entries', JSON.stringify(diaryEntires));

    // Rename display entry buttons
    count = 1;
    for (var i = 0; i < entriesNav.children.length; i++) {
      entriesNav.children[i].innerText = count++;
    }
  });
}

// Render diary entries form local storage
var entries = localStorage.getItem('entries');
if (entries) {
  entries = JSON.parse(entries);
  for (var i = 0; i < entries.length; i++) {
    renderEntry(entries[i]);
  }
}

// Addd entry to DOM
function addEntryToDom(event) {
  event.preventDefault();
  // Save entry to local storage
  diaryEntires.push(entryTextbox.value);
  localStorage.setItem('entries', JSON.stringify(diaryEntires));
  renderEntry(entryTextbox.value);
  entryTextbox.value = '';
}

entryForm.addEventListener('submit', addEntryToDom);

/***/ })
/******/ ]);