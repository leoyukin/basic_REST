// server.js — Notes API
// Your playground. Build this step by step.
const express = require('express');
const cors = require('cors');

const app = express();

let notes = [
    { id: 1, title: "first note", body: "hello world" },
    { id: 2, title: "second note", body: "learning express" },
    { id: 3, title: "third note", body: "getting there", }
];

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    const { search } = req.query;

    if (search) {

        const filteredNotes = notes.filter(n =>
            n.title.toLowerCase().includes(search.toLowerCase())
        );
        return res.json(filteredNotes);
    }

    res.json(notes);
})

app.get('/api/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id)
    const note = notes.find((n) => {
        return n.id === noteId
    });
    if (!note) {
        return res.status(404).json({ error: "Note not found" });
    }
    res.json(note)
});

app.post('/api/notes', (req, res) => {
    const newNote = {
        id: notes.length + 1,
        title: req.body.title,
        body: req.body.body,
    };
    notes.push(newNote);
    res.status(201).json(newNote);

});

app.put('/api/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    const note = notes.find((n) => n.id === noteId);

    if (!note) {
        return res.status(404).json({ error: "Note not found" });
    }

    note.title = req.body.title || note.title;
    note.body = req.body.body || note.body;

    res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    const noteIndex = notes.findIndex((n) => n.id === noteId);

    if (noteIndex === -1) {
        return res.status(404).json({ error: "Note not found" });
    }

    notes.splice(noteIndex, 1);

    res.json({ message: "Note deleted successfully", id: noteId });
})


app.listen(3000, () => {
    console.log('Server running on port 3000')
})