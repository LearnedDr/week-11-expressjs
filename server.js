const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/router.js');

// const notesRouter = require("./routes/notes.js");
// app.use("/notes", notesRouter);

const PORT = process.env.PORT || 3001;


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/api', api);
// GET Route for homepage ---- does the same as express.static(pubic)
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// app.get('/notes/*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/notes.html'))
// );

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);