# ABRACA-DOLIST

Abraca-dolist is a single page web application that categorizes your todos like magic. Using the Alpha Wolfram and Yelp APIs, Abraca-dolist dynamically adds your todos into the correct list. Todos can be recategorized and checked off, with recategorizations saved in our database for later use.

## Screenshots

New todos are entered it into the form and autocategorized:

![Create a new todo](https://github.com/lavieenrosy/abraca-dolist/blob/feature/screenshots/docs/create-todo.gif?raw=true)

<br/>

Recategorize your todos by dragging them into another list. When you're finished a todo, simply check it off:

![Recategorize and check off todos](https://github.com/lavieenrosy/abraca-dolist/blob/feature/screenshots/docs/recategorize-and-check.gif?raw=true)

<br/>

Once a todo's category is changed, it is saved in our database and will re-appear in the new category:

![Save todo in new category](https://github.com/lavieenrosy/abraca-dolist/blob/feature/screenshots/docs/save-category.gif?raw=true)

<br/>

## Features

1. Autocategorization using the Alpha Wolfram and Yelp API
2. Recategorize todos via jQuery UI's draggable and droppable widget
3. A todo's category is saved in our database and will re-appear in the correct list if checked off and re-added.
4. AJAX on the front-end to create single-page functionality

## Dependencies

- "body-parser": "^1.15.2",
- "express": "^4.13.4",
- "fetch": "^1.1.0",
- "knex": "^0.11.7",
- "pg": "^6.0.2",
- "node-fetch": "^2.2.0",
- "node-sass-middleware": "^0.9.8",
- "sass": "^1.14.3",
