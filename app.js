const express = require("express");
const mysql = require("mysql");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded( { extended: true }));

const db = mysql.createConnection({
    //change these
    user : "user",
    host : "localhost",
    password : "pass",
    database : "db"
});

db.connect((err) => {
    if (!err) {
        console.log("connected!");
    }
    else console.log(err);
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/index", (req, res) => {
    res.render("index");
});

app.post("/add", (req,res) => {
    const title = req.body.title;
    const contents = req.body.contents;
    const language = req.body.language;

    db.query("INSERT INTO snippets (title, contents, language) VALUES (?,?,?)", [title, contents, language], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log("information posted???");
            res.redirect(301, '/');
        }
    });
});

app.post("/remove", (req,res) => {
    const title = req.body.title;

    db.query("DELETE FROM snippets WHERE title = ?", [title], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log("information posted???");
            res.redirect(301, '/');
        }
    });
});

app.get("/cpp", (req, res) => {
    db.query("SELECT * FROM snippets WHERE language = 'cpp'", (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render("list", { snippets : rows});
        }
    });
});

app.get("/php", (req, res) => {
    db.query("SELECT * FROM snippets WHERE language = 'php'", (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render("list", { snippets : rows});
        }
    });
});

app.get("/node", (req, res) => {
    db.query("SELECT * FROM snippets WHERE language = 'node'", (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render("list", { snippets : rows});
        }
    });
});

app.get("/snippet/:id", (req, res) => {
    const uid = req.params['id'];
    db.query("SELECT * FROM snippets WHERE id = ?", uid, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            //console.log(result);
            res.render("snippet", { snippets : rows});
        }
    });
});

app.listen(3000);