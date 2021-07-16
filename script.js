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
    let note_text = document.getElementById("note-text");
    if (notes == null) {
        notes_obj = [];
    } else {
        notes_obj = JSON.parse(notes);
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
    let random_margin = ["-5px", "1px", "5px", "10px", "15px", "20px"];

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
        html += `<div id="${index}" class="notes_card" ondblclick="deleteNote(this.id)">
                   <h5> ${element} </h5>
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