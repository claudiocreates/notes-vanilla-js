class Note {
    constructor(id, name, content) {
        this.id = id;
        this.name = name;
        this.content = content;        
    }
}

class Notes {
    constructor() {
        this.list = [];
        this.selectedNote;
    }
    addNote() {
        var length = this.list.length;
        var note = new Note(this.list.length, '', '');
        this.list[length] = note;
        length = this.list.length;
        this.renderNotes();
        this.selectNote(this.list.length-1);
        this.saveFile();
        window.location.reload(false)
    }
    renderNotes(){
        document.getElementById('content').innerHTML='';
        for (let index = this.list.length-1; index >= 0; index--) {
            document.getElementById('content').innerHTML += `
            <div class="note" id="note${index}">
                <input type="text" name="" 
                class="noteTitle" 
                id="title${index}" 
                placeholder="Note Title"
                autofocus
                onkeyup="notes.updateNotes(${index})" 
                onfocus="notes.selectNote(${index})"
                value="${this.list[index].name}">
                </input>
                <textarea name="" 
                class="noteContent" 
                id="content${index}" 
                placeholder="Note Content" 
                onkeyup="notes.updateNotes(${index})" 
                onfocus="notes.selectNote(${index})"
                >${this.list[index].content}</textarea>
            </div>`;
        }
    }
    selectNote(id) {
        if (id != null) {
            if (document.querySelector(".noteActive")) {
                document.querySelector(".noteActive").classList.toggle("noteActive");
            }
            document.getElementById("note"+id).classList.toggle("noteActive");
            this.selectedNote = id;
        }
    }
    removeNote() {
        if (this.selectedNote === null) {
            alert("Please select a note before trying to delete.")
        } else {
            this.list.splice(this.selectedNote, 1);
            this.renderNotes();
            if (this.selectedNote > 0) {
                this.selectNote(this.selectedNote-1);
            } else if (this.selectedNote == 0 && this.list.length >= 1){
                this.selectNote(this.selectedNote);
            } else {
                this.selectNote(this.selectedNote = null);
            }
        }
        this.saveFile();
    }
    updateNotes(id) {
        var title = document.getElementById(`title${id}`).value;
        this.list[id].name = title;

        var content = document.getElementById(`content${id}`).value;
        this.list[id].content = content;

        this.saveFile();
    }
    saveFile() {
        localStorage.setItem('notes', JSON.stringify(this.list));
    }
}

var notes = new Notes();

if (localStorage.getItem('notes') != null) {
    list = localStorage.getItem('notes');
    list = JSON.parse(list);
    notes.list = list;
    notes.renderNotes();
}