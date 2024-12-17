function popup(){
    const popupContainer = document.createElement('div');
    popupContainer.innerHTML = `
    <div id = "popupContainer">
    <h1>New Code</h1>
    <textarea id = "note-text" placeholder = "Enter your code..."></textarea>
     <div id = "btn-container">
        <button id = "submitBtn" onclick = "createNote()">Save</button>
         <button id = "closeBtn" onclick = "closePopup()">Close</button>
    </div>
         </div>
    `;
    document.body.appendChild(popupContainer);
}

function closePopup(){
    const popupContainer = document.getElementById('popupContainer')
    if (popupContainer){
        popupContainer.remove();
    }
}


function createNote(){
    const popupContainer = document.getElementById('popupContainer');
    const noteText = document.getElementById('note-text').value;
    if(noteText.trim() !== ''){
        const note = {
            id: new Date().getTime(),
            text: noteText
        };

        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(note);

        localStorage.setItem('notes', JSON.stringify(existingNotes));
        document.getElementById('note-text').value = '';

        popupContainer.remove();
        displayNotes();

    }
}


    function displayNotes(){
        const notesList = document.getElementById('notes-list');
        notesList.innerHTML = '';

        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        notes.forEach(note => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <span id = "code" onClick = 'editNote(${note.id})'><pre><code class="language-javascript">${note.text}</code></pre></span>
            <div id = 'noteBtns-container'>
            <button id = "editBtn" onClick = 'editNote(${note.id})'><i
            class = 'fa-solid fa-pen'></i></button>
           <button id = "deleteBtn" onClick = 'deleteNote(${note.id})'><i
            class = 'fa-solid fa-trash'></i></button>
            <button id = 'copyBtn' onClick = 'copyNote(${note.id})'><i 
            class = 'fa-solid fa-copy'></i></button>
            </div>  
            `;
            addPrismResources('code');
            notesList.appendChild(listItem);  
        });
    }


function editNote(noteId){
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.id == noteId) ;
    const noteText = noteToEdit ? noteToEdit.text : '';
    const editingPopup = document.createElement('div');
    editingPopup.innerHTML= `
    <div id='editing-container' data-note-id = "${noteId}">
    <h1>Edit Code</h1>
    <textarea id = "note-text">${noteText}</textarea>
    <div id="btn-container">
        <button id="submitBtn" onclick="updateNote()">Edit</button>
        <button id="closeBtn" onclick="closeEditPopup()">Cancel</button>
        </div>
    </div>
    `;
    document.body.appendChild(editingPopup);
}

function closeEditPopup(){
    const editingPopup = document.getElementById('editing-container');

    if(editingPopup){
        editingPopup.remove();
    }
}

function updateNote(){
    const noteText = document.getElementById('note-text').value.trim();
    const editingPopup = document.getElementById('editing-container');

    if(noteText !== ''){
        const noteId = editingPopup.getAttribute('data-note-id');
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

    //Find the Note to update
    const updatedNotes = notes.map(note => {
        if (note.id == noteId ){
            return {id: note.id, text: noteText};
        }
        return note;
    });

    //Update the notes in local storage
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    //Close the editing popup
    editingPopup.remove();

    //Refresh the displayed notes
    displayNotes();
    }
}

function deleteNote(noteId){
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}


function showToast(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "show";
  
    setTimeout(function() {
      toast.className = toast.className.replace("show", "");
    }, 3000); // 3 seconds
  }
  
  

function copyNote(noteId){
    showToast('Code Copied!'); 
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToCopy = notes.find(note => note.id == noteId) ;
    const noteText = noteToCopy ? noteToCopy.text : '';
    navigator.clipboard.writeText(noteText);
}



// Function to add the links and scripts dynamically
function addPrismResources(targetElementId) {
    // Create and append the Prism CSS link
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
  
    // Create and append the Prism JS script
    const prismScript = document.createElement('script');
    prismScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
  
    // Create and append the Prism JS language component for JavaScript
    const prismJsScript = document.createElement('script');
    prismJsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js';
  
    // Get the target element by ID
    const targetElement = document.getElementById(targetElementId);
  
    // Append the created elements to the target element
    if (targetElement) {
      targetElement.appendChild(cssLink);      // Add CSS link to the target
      targetElement.appendChild(prismScript);  // Add Prism script to the target
      targetElement.appendChild(prismJsScript); // Add the JS language component
    }
  }
  
function darkmode(){

}


displayNotes();
