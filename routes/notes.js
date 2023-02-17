const express = require('express');
const router = express.Router();
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");
const uuid = require('../helpers/uuid.js')

router.get('/', (req, res) =>
readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);


router.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    
    if (title && text) {
        const newNotePost = {
            title,
            text,
            id : uuid(),
        };
        readAndAppend(newNotePost, './db/notes.json');
        // console.log(newNotePost);
        
        const response = {
            status: 'success',
            body:newNotePost,
        };
        
        // res.send(res.json(response));
        res.json(response);
        
    } else {
        res.json('Error in posting new note')
    }
});

// router.get('/:id', (req, res) => {
//     const requestedId = req.params.id
//     console.log('Hello');
//     console.log(requestedId);
//     readFromFile('./db/notes.json')
//         .then((data) => JSON.parse(data))
//         .then((json) => {
//             const result = json.filter((note) => note.id === requestedId);
//             //ternary operator ---- fancy if statement
//             return result.length > 0 // if
//             ? res.json(result) // yes
//             : res.json('No note with that ID'); // no
//         })
// });

router.route('/:id')
.get((req, res) => {
    const requestedId = req.params.id
    console.log('Hello');
    console.log(requestedId);
    readFromFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === requestedId);
            //ternary operator ---- fancy if statement
            return result.length > 0 // if
            ? res.json(result) // yes
            : res.json('No note with that ID'); // no
        })
});

module.exports = router
// // // -------- REQUIRED IMPORTS --------
// const express = require("express");
// const router = express.Router();
// const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
// const path = require('path');
// // const uuid = require("../helpers/uuid");

// // GET route for retrieving all notes
// router.get("/", (req, res) => {
//     console.log("getting route for all notes");
//     readFromFile("./db/notes.json").then(data => {
//         res.json(JSON.parse(data));
//     })
// })

// module.exports = router;
