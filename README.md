# ABRACA-DOLIST

Abraca-dolist is a single page web application that categorizes your todos like magic. Using the Alpha Wolfram and Yelp APIs, Abraca-dolist dynamically 

## Screenshots

Autocategorize your new todos by entering it into the form:

![Create a new todo](https://github.com/lavieenrosy/abraca-dolist/blob/feature/screenshots/docs/create-todo.gif?raw=true)

<br/>

Autocategorize your todos by dragging them into another list. When you're finished a todo, simply check it off:

![Recategorize and check off todos](https://github.com/lavieenrosy/abraca-dolist/blob/feature/screenshots/docs/recategorize-and-check.gif?raw=true)

<br/>

Once a todo's category is changed, it is saved in our database and will re-appear in the new category:

![Save todo in new category](https://github.com/lavieenrosy/abraca-dolist/blob/feature/screenshots/docs/save-category.gif?raw=true)

<br/>

## Features

1. Autocategorization using the Alpha Wolfram and Yelp API
2. Recategorize todos via jQuery UI's drag and drop 
3. A todo's category is saved in our database and will re-appear in the correct list if checked off and re-added.
4. jQuery and AJAX on the front-end to create single-page functionality

## Dependencies

- "body-parser": "^1.15.2",
- "dotenv": "^2.0.0",
- "ejs": "^2.4.1",
- "express": "^4.13.4",
- "fetch": "^1.1.0",
- "knex": "^0.11.7",
- "knex-logger": "^0.1.0",
- "morgan": "^1.7.0",
- "node-fetch": "^2.2.0",
- "node-sass-middleware": "^0.9.8",
- "pg": "^6.0.2",
- "sass": "^1.14.3",
- "xml2js": "^0.4.19"
