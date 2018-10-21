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
var auth          = require('./secrets.js');
var request       = require('request');
const apihelpers  = require('./apihelpers')

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");


const todos       = datahelpers.getTodos();
const name = 'Starbucks';




  // .then((todo)=>{
  //   return datahelpers.findTodoByName(todo.name);
  // })
  // .then((updatedTodo) => {
  //   console.log(updatedTodo)
  // })
// deleteTodo.then((data) =>{
//   console.log('You deleted', data)
// });

// datahelpers.insertTodo('la croix', 'food', 2).then((id) => {
//   console.log("Record insertion was successful", id);
// });

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
//---------------------DELETE ROUTES---------------------//
app.post('/todos/:id/delete', function(req, res) {

  datahelpers.deleteTodo(req.params.id).then((data) =>{
    res.json({result:"True"});
  })


})


//---------------------EDIT ROUTES---------------------//
// client --changes--> server --changes--> DB
// changes are simply the todo id and new category

app.patch('/todos/:id/edit', function(req, res) {

 datahelpers.updateTodo(req.params.id, req.body.category).then((data) =>{
  res.json({result:"True"});
 })

 console.log(req.body);



});

//-------------------NEW TODO ROUTES-------------------//
// client --todo--> server --todo--> API --data--> server(dataHelper1) --dataHelper2--> DB --id--> server(datahelper3) --todo--> client
// dataHelper1 parses API data and returns a name & category
// dataHelper2 creates new todo in DB
// dataHelper3 SELECT the new todo from the DB and send it to the client

app.post('/todos', function(req, res) {
  const name = req.body.text;
  const foundTodo   = datahelpers.findTodoByName(name);

  foundTodo
  .then((resp) => {
    if (resp.length != 0){
      return datahelpers.unDeleteTodo(resp[0].id).then(()=>{
        datahelpers.findTodoByName(name)
        .then((result)=> res.json(result))
      });
    } else {

      requestToWolfram(name, function(err, result) {
        const category = apihelpers(result);
        let id         = 0;

        datahelpers.insertTodo(name, category).then((id) => {
          id = id;
        });

        const newTodoObject = { id, name, category };

        res.json(newTodoObject);

      });
    }
  })


});

function requestToWolfram(input, cb) {
  var options = {
    url: "http://api.wolframalpha.com/v2/query?input=" + input + "&appid=" + auth.WOLFRAM_ID + "&output=json",
    json: true
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
};



app.listen(PORT, () => {
  console.log("Abraca-Dolist listening on port:" + PORT);
});










