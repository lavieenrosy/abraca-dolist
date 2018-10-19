"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const datahelpers = require('./datahelpers')(knex);

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

const todos = datahelpers.getTodos();

// todos.then((data) => {
//   console.log(data);
// })
// .catch((error) => {
//   console.log(error);
// })
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

//-----------------------HOME PAGE-----------------------//
app.get("/", (req, res) => {
  res.render("index");
});

//-------------------GET /lists ROUTES-------------------//
// client --req--> server --lookup--> DB --todos--> server --todos--> client

//grabs data from DB and sends json to client

app.get('/todos', function(req, res) {

  todos.then((data) => {
    res.json(data);
  })
  .catch((error) => {
    res.status(500).json({error: err.message});
  });

});

//---------------------EDIT ROUTES---------------------//
// client --changes--> server --changes--> DB
// changes are simply the todo id and new category

app.patch('/todo/:id', function(req, res) {

  knex('table-name')
    .where('id', id)
    .update({
      category: 'category'
    })
  //figure out what knex returns (a promise?) and send that back to the client

});

//-------------------NEW TODO ROUTES-------------------//
// client --todo--> server --todo--> API --data--> server(dataHelper1) --dataHelper2--> DB --id--> server(datahelper3) --todo--> client
// dataHelper1 parses API data and returns a name & category
// dataHelper2 creates new todo in DB
// dataHelper3 SELECT the new todo from the DB and send it to the client

app.post('/todos', function(req, res) {

  const todoName = req.body.text;
  //send request to API with req.body.text
  const nameAndCategory = dataHelper1(responseFromAPI);
  dataHelper2();
  const newTodo = dataHelper3()
  res.json(newTodo);

});

app.listen(PORT, () => {
  console.log("Abraca-Dolist listening on port:" + PORT);
});

app.post('/todo/:id', function(req, res) {
  knex('table-name')
  .where('id', id)
  .delete({
    category: 'category'
  })
})









