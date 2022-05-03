import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { addNote, removeNote, listNotes, readNote } from './notes.js';

// Create add command

yargs(hideBin(process.argv))
.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        addNote(argv.title, argv.body);
    }
})

.command({
    command: 'remove',
    describe: 'Remove an added note',
    builder: {
        title: {
            describe: 'Note title which you wanna remove',
            demandOption: true,
            type: 'string'
        },
    },
    handler: function (argv) {
        removeNote(argv.title);
    }
})

.command({
    command: 'list',
    describe: 'List title for each note',
    handler: () => {
        listNotes();
    },
})

.command({
    command: 'read',
    describe: 'Read selected note body',
    builder: {
        title: {
            describe: 'Title selected note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        readNote(argv.title);
    }
})

.parse()