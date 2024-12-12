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
}