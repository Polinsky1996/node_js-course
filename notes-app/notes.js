import fs from 'fs';
import chalk from 'chalk';

function getMessage(notes) {
    return 'Your notes: ' + notes;
}

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find( note => {
        return note.title === title;
    })

    if (duplicateNote) {
        console.log(chalk.red.inverse('Note title taken'));
        return
    }

    notes.push({
        title,
        body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
}

const removeNote = (title) => {
    const notes = loadNotes();

    const updatedNotes = notes.filter( note => {
        return note.title != title;
    })

    if (updatedNotes.length === notes.length) {
        console.log(chalk.red.inverse('This note not found'));
        return
    }

    saveNotes(updatedNotes);
    console.log(chalk.green.inverse('Note removed'));
}

const listNotes = () => {
    const notes = loadNotes();
    notes.forEach( note => {
        console.log(chalk.yellow.inverse(note.title));
    });
}

const readNote = (title) => {
    const notes = loadNotes();

    const selectedNote = notes.find( note => {
        return note.title === title;
    })

    if (!selectedNote) {
        console.log(chalk.red.inverse('This note not found'));
        return    
    }

    console.log(chalk.green.inverse(selectedNote.title));
    console.log(selectedNote.body);
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    } 
}

export { 
    getMessage, 
    addNote,
    removeNote,
    listNotes,
    readNote,
}

