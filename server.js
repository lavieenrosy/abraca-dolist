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
const auth        = require('./secrets.js');
const request     = require('request');
const apihelpers  = require('./apihelpers')
const yelphelper  = require('./yelphelper');
const fetch       = require("node-fetch");

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

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

//grabs data from DB and sends json to client

app.get('/todos', function(req, res) {
  const todos = datahelpers.getTodos();
  todos.then((data) => {
    res.json(data);
  })
  .catch((error) => {
    res.status(500).json({error: err.message});
  });
});

//---------------------DELETE ROUTES---------------------//

app.post('/todos/:id/delete', function(req, res) {
  datahelpers.deleteTodo(req.params.id).then((data) => {
    res.json({result:"True"});
  });
});


//---------------------EDIT ROUTES---------------------//
// client --changes--> server --changes--> DB
// changes are simply the todo id and new category

app.patch('/todos/:id/edit', function(req, res) {
 datahelpers.updateTodo(req.params.id, req.body.category).then((data) =>{
  res.json({result:"True"});
 })
 console.log(req.body);
});



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
      requestToYelp(name, function(data) {
        let category = yelphelper(data, name);
        console.log("CATEGORY: ", category);
        if (category === "eat") {
          console.log("SUCCESS EAT")
          let id = 0;

          datahelpers.insertTodo(name, category).then((id) => {
            id = id;
          });

          const newTodoObject = { id, name, category };
          res.json(newTodoObject);

        } else { //if (category === "none") {
            console.log("NO RESTAURANT SO WOLFRAM")
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

      });
    }
  })


});

//-------------------API CALLS-------------------//

// Yelp

function requestToYelp(input, cb) {
  fetch("https://api.yelp.com/v3/businesses/search?term=" + input + "&location=vancouver&categories=restaurants", {
      headers: {
        'Authorization': 'Bearer ' + auth.YELP_TOKEN,
        'Content-Type': 'application/json' }
  })
    .then((res) => {
      if (res.status >= 400) throw new Error('Could not fetch contents');
      return res.json();
    })
    .then((data) => {
      cb(data);
    })
    .catch((err) => {
      console.log('ERROR: ', err);
    });
};


// Wolfram Alpha

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










