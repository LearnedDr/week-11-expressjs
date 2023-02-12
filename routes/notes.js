const express = require('express');
const router = express.Router();
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");

router.get('/', (req, res) =>
readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);



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

router.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (title && text) {
        const newNotePost = {
            title,
            text,
        };
        readAndAppend(newNotePost, './db/notes.json');
        // console.log(newNotePost);

        const response = {
            status: 'success',
            body:newNotePost,
        };

        res.json(response);
    } else {
        res.json('Error in posting new note')
    }
});

// // POST Route for a new UX/UI tip
// router.post('/', (req, res) => {
//     console.log(req.body);
  
//     const { username, topic, tip } = req.body;
  
//     if (req.body) {
//       const newTip = {
//         username,
//         tip,
//         topic,
//         tip_id: uuidv4(),
//       };
  
//       readAndAppend(newTip, './db/tips.json');
//       res.json(`Tip added successfully 🚀`);
//     } else {
//       res.error('Error in adding tip');
//     }
//   });