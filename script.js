var i = 0;
showNotes();
let create_note_btn = document.getElementById('create-note-btn');
let write_note_container = document.querySelector('.container3');

//displaying the writable box
create_note_btn.addEventListener('click', () => {
    if (write_note_container.style.display == 'none') {
        write_note_container.style.display = 'block';
    }
});

//saving the notes in local storage
let check_icon = document.getElementById('check-icon');
check_icon.addEventListener('click', () => {
    let notes = localStorage.getItem("notes");
    note_text = document.getElementById("note-text");
    if (notes == null) {
        let notes_obj = [];
    } else {
        let notes_obj = JSON.parse(notes);
    }
    notes_obj.push(note_text.value);
    localStorage.setItem("notes", JSON.stringify(notes_obj));
    note_text.value = "";
    showNotes();
});

//removing the writable box when one click on cross icon
let cross_icon = document.getElementById('cross-icon');
let note_text = document.getElementById("note-text");
cross_icon.addEventListener('click', () => {
    write_note_container.style.display = 'none';
    note_text.value = "";
});

//gives random margin to notes
function margin() {
    let random_margin = ["18px", "11px", "13px", "10px", "15px", "20px"];

    return random_margin[Math.floor(Math.random() * random_margin.length)];
}

//rotate notes randomly
function rotate() {
    let random_rotate = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-10deg)"];

    return random_rotate[Math.floor(Math.random() * random_rotate.length)];
}

//gives color to notes
function color() {

    let random_color = ["#c2ff3d", "#ff3de8", "#3dc2ff", "#04e022", "#bc83e6", "#ebb328"];
    if (i > random_color.length - 1) {
        i = 0;
    }
    return random_color[i++];
}

//showing notes
function showNotes() {
    let notes = localStorage.getItem("notes");
    let note_text = document.getElementById("note-text");
    if (notes == null) {
        notes_obj = [];
    } else {
        notes_obj = JSON.parse(notes);
    }
    let write_note_container = document.querySelector('.container3');
    if (notes_obj.length != 0) {
        write_note_container.style.display = 'none';
    } else {
        write_note_container.style.display = 'block';
    }
    let notes_container = document.querySelector('.container2');
    let html = "";
    notes_obj.forEach((element, index) => {
        html += `<div id="${index}" class="notes_card">
                   <h5 id="content-${index}" class="content"> ${element} </h5>
                   <svg class="cross_notes_btn" onclick="deleteNote(parentNode.id)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                   </svg>
                  <img id="note-btn-edit-${index}" class = "edit_btn" width="16px" height="16px" src="edit_button.svg" onclick="changeButton(parentNode.id, this.id)">
                 </div>`;
    });
    notes_container.innerHTML = html;
    let notes_card = document.getElementsByClassName('notes_card');

    for (let i = 0; i < notes_card.length; i++) {
        notes_card[i].style.margin = margin();
        notes_card[i].style.transform = rotate();
        notes_card[i].style.background = color();
    }
}

//deleting all the notes
let delete_all_btn = document.getElementById('delete-all-btn');
delete_all_btn.addEventListener('click', () => {
    localStorage.clear();
    showNotes();
})

//deleting a particular note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notes_obj = [];
    } else {
        notes_obj = JSON.parse(notes);
    }
    notes_obj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes_obj));
    showNotes();
}

//showing edit and save button on clicking the notes
function changeButton(index, btn_id) {
    let note_btn = document.getElementById(btn_id);
    let content = document.getElementById(`content-${index}`);

    if (note_btn.id === `note-btn-edit-${index}`) {
        let numberOfTextArea = document.getElementsByClassName('textarea').length;
        let editableNoteCardColor = content.parentNode.style.background;
        if (numberOfTextArea == 0) {
            let html = content.innerHTML;
            content.innerHTML = `<textarea maxlength="80" style="background-color:${editableNoteCardColor};" onfocus="this.value = this.value;" class="textarea form-control" id="floatingTextarea">${html}</textarea>`;
        }
        note_btn.src = "check_button.svg";
        note_btn.id = `note-btn-check-${index}`;
    } else {
        let textarea = document.querySelector('.textarea');
        content.innerHTML = textarea.value;
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notes_obj = [];
        } else {
            notes_obj = JSON.parse(notes);
        }
        notes_obj[index] = content.innerText;
        localStorage.setItem("notes", JSON.stringify(notes_obj));
        note_btn.id = `note-btn-edit-${index}`;
        note_btn.src = "edit_button.svg";
    }
}
