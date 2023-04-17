const express = require('express');
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

const linkRoute = require('./routes/linkRoute');

mongoose.connect('mongodb://127.0.0.1/links', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;

db.on("error", () => console.log("houve um erro"));
db.once("open", () => {console.log("db carregado!")});

app.use('/', linkRoute);

app.listen(PORT, ()=> console.log("app listening on port", PORT));
