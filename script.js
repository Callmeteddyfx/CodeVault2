function popup(){
    const popupContainer = document.createElement('div');
    popupContainer.innerHTML = `
    <div id = "popupContainer">
    <h1>New Code</h1>
    <textarea id = "note-text" placeholder = "Enter your code..."></textarea>
     <div id = "btn-container">
     /*Buttons Creation*/
        <button id = "submitBtn" onclick = "createNote()">Create</button>
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


function CreateNote(){
    const popupContainer = document.getElementById('popupContainer');
    const noteText = document.getElementById('note-text').value;
    if(noteText.trim() !== ''){
        const note = {
            id: new Date.getTime(),
            text: noteText
        };

        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(note);

        localStorage.setItem('notes', JSON.stringify(existingNotes));
        document.getElementById('note-text').value = '';

        popupContainer.remove();
        displayNotes();
    }
    


    function displayNotes(){
        const notesList = document.getElementById('notes-list');
        notesList.innerHTML = '';

        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        notes.forEach(note => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <span>${note.text}</span>
            <div id = 'noteBtns-container'>
            /*add copy code button here*/
            <button id = "editBtn" onClick = 'editNote(${note.id})'><i
            class = 'fa-solid fa-pen'></i></button>
           <button id = "deleteBtn" onClick = 'deleteNote(${note.id})'><i
            class = 'fa-solid fa-trash'></i></button>
            </div>  
            `;
            notesList.appendChild(listItem);
        });
    }
} //potential error cause.

function editNote(noteId){
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.id == noteId) ;
    const noteText = noteToEdit ? noteToEdit.text : '';
    const editingPopup = document.createElement('div');

    editingPopup.innerHTML= `
    <div id=editing-container' data-note-id = "${noteId}">
    <h1>Edit Code</h1>
    <textarea id = "note-text">${noteText}</textarea>
    <div id="btn-container">
        <button id="submitBtn" onClick="updateNote()">Done</button>
        <button id="closeBtn" onClick="closeEditPopup()">Cancel</button>
        </div>
    </div>
    `
}