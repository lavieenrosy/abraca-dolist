$(() => {


  function createTodoElement(data) {
    const $cardText = $("<div>").addClass("card-body").text(data.name); //change this later
    const $card = $("<div>").addClass("card").append($cardText);
    const $edit = $("<button class='edit'> Edit</button>").appendTo($cardText);
    const $delete= $("<button class='delete'> Delete</button>").appendTo($cardText);
    return $card;

  };

  //assuming dat is in an array
  function renderTodos(data) {
    for (i = 0; i < data.length; i++) {
      const todo = createTodoElement(data[i]);

      if (data[i].category === "eat") {
        $('.eat').append(todo);
      } else if (data[i].category == "watch") {
        $('.watch').append(todo);
      } else if (data[i].category == "read") {
        $('.read').append(todo);
      } else if (data[i].category == "buy") {
        $('.buy').append(todo);
      }
    }
  }

  function singleTodo(data) {
    const todo = createTodoElement(data);

    if (data.category === "eat") {
      $('.eat').append(todo);
    } else if (data.category == "watch") {
      $('.watch').append(todo);
    } else if (data.category == "read") {
      $('.read').append(todo);
    } else if (data.category == "buy") {
      $('.buy').append(todo);
    }
  };


  function loadTodos() {
    $.ajax({
      type: 'GET',
      url: ('/todos'),
      success: function (data) {
        renderTodos(data);
      },
      error: function (err, data) {
        console.log('Error: ', err);
      }
    });
  };


  loadTodos();

// Drag and drop functionality. Tutorial: https://www.tutorialspoint.com/jqueryui/jqueryui_draggable.htm

$( '.card' ).draggable({ appendTo: $('.col'), containment: $('.col') });

  //look at grid option to snap to a grid

$( '.col' ).droppable();

// Form capture

$('#todo-form').on('submit', function (event) {
  event.preventDefault();
  var submitText = $('#todo-input').val();

  // text field cannot be left empty---
   $('.error').slideUp();
      if(submitText === "" ){
        $('.error').text("Error: Cannot leave this field empty").slideDown();
    } else {
      const data = $('form').serialize();

      //form validation?

      $.ajax( '/todos', { method: 'POST', data: data })
        .then(function (data) {
          console.log('Success!', data);
          singleTodo(data);
          event.target.reset();
       });
    }
  });

});

