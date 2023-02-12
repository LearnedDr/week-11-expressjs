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
