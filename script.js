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

              // Refreshes the browser
    location.reload();
    document.getElementById('createBtn').addEventListener('click', myFunction);
    
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
            <span><pre><code class="language-javascript">${note.text}</code></pre></span>
            <div id = 'noteBtns-container'>
            <button id = "editBtn" onClick = 'editNote(${note.id})'><i
            class = 'fa-solid fa-pen'></i></button>
           <button id = "deleteBtn" onClick = 'deleteNote(${note.id})'><i
            class = 'fa-solid fa-trash'></i></button>
            <button id = 'copyBtn' onClick = 'copyNote(${note.id})'><i 
            class = 'fa-solid fa-copy'></i></button>
            </div>  
            `;
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

    // Refreshes the browser
    location.reload();
    document.getElementById('submitBtn').addEventListener('click', myFunction);

    //Refresh the displayed notes
    displayNotes();

    }
}

function deleteNote(noteId){
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem('notes', JSON.stringify(notes));
    refresh(deleteBtn)
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

function refresh(button){
// Save the scroll position before refreshing

    localStorage.setItem('scrollPosition', window.scrollY);
    location.reload(); // Refresh the page

  // Restore the scroll position after reload
  function restoreScrollPosition() {
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      localStorage.removeItem('scrollPosition'); // Clear the saved position
    }
  }
  
     // Add event listener to button
     document.getElementById(button).addEventListener('click', saveScrollPosition);
     
  // Call restore on page load
  window.onload = restoreScrollPosition;  
}
     

displayNotes();