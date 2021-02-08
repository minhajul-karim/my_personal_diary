const entryForm = document.getElementById('entryForm')
const entriesSection = document.querySelector('#entries')
const entryTextbox = document.querySelector('.entry-textbox')
const entriesNav = document.querySelector('.entries-nav')

let diaryEntires = []

let count = 1

function renderEntry(entry) {
  // Create a div for entry
  const entryDiv = document.createElement('div')
  entryDiv.className = 'single-entry'
  entryDiv.innerText = entry
  entryDiv.style.display = 'none'
  entriesSection.appendChild(entryDiv)

  // Create a button to view this entry
  const displayEntryButton = document.createElement('button')
  displayEntryButton.className = 'display-entry-button'
  displayEntryButton.innerText = count++
  entriesNav.appendChild(displayEntryButton)

  // Display the corresponding entry after clicking a button
  displayEntryButton.addEventListener('click', function() {
    const allEntries = document.querySelectorAll('.single-entry')
    for (let index = 0; index < allEntries.length; index++) {
      allEntries[index].style.display = 'none'
    }
    entryDiv.style.display = 'block'        
  })

  // Create a delete button to remove this entry
  const removeButton = document.createElement('button')
  removeButton.className = 'display-delete-button'
  removeButton.innerText = 'Delete'
  entryDiv.appendChild(removeButton)

  // Remove clicked entry
  removeButton.addEventListener('click', function() {
    displayEntryButton.remove()
    entryDiv.remove()
    // Update local storage
    diaryEntires = diaryEntires.filter(entryItem => entryItem !== entry)
    localStorage.setItem('entries', JSON.stringify(diaryEntires))

    // Rename display entry buttons
    count = 1
    for (let i = 0; i < entriesNav.children.length; i++) {
      entriesNav.children[i].innerText = count++
    }
  })
}

// Render diary entries form local storage
let entries = localStorage.getItem('entries')
if (entries) {
  entries = JSON.parse(entries)
  for (let i = 0; i < entries.length; i++) {
    renderEntry(entries[i])
  }
}

// Addd entry to DOM
function addEntryToDom(event) {
  event.preventDefault()
  // Save entry to local storage
  diaryEntires.push(entryTextbox.value)
  localStorage.setItem('entries', JSON.stringify(diaryEntires))
  renderEntry(entryTextbox.value)
  entryTextbox.value = ''
}

entryForm.addEventListener('submit', addEntryToDom)