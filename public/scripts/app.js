$(() => {

//--------------- Creating & Rendering Todos ---------------//

  function createTodoElement(data) {
    const $card     = $("<div>").addClass("card").attr('id', data.id).draggable();
    const $cardText = $("<div>").addClass("card-body").text(data.name).appendTo($card); //change this later
    const $delete   = $("<button>").addClass('delete').attr('id',data.id).data('todo_id', data.id).appendTo($cardText);
    const $check    = $("<i>").addClass("check-mark").attr("data-feather", "check").appendTo($delete);
    const $edit     = $("<button>").addClass("edit-button").appendTo($cardText);
    const $editPen  = $("<i>").addClass("edit-pen").attr("data-feather", "edit-3").appendTo($edit);

    // $delete.on('click', ()=>console.log("log log console console"));

    return $card;
  };

  function renderTodos(data) {
    $('.card').empty();
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

    $('.delete').on('click', function(event) {
      event.preventDefault();
      const todo_id = $(this).data('todo_id');
      console.log($('#'+todo_id).parent());
      // $('#'+todo_id).parent().empty();
      $('#'+todo_id).closest('.ui-draggable').hide();
      $.ajax({
        type: 'POST',
        url: (`/todos/${todo_id}/delete`),
        success: function (data){
          loadTodos();
        },
        error: function (err, data) {
          console.log('Error: ', err);
        }
      });
    })
  };


  function singleTodo(data) {
    const todo = createTodoElement(data);

    if (data.category === "eat") {
      $('.eat').append(todo);
    } else if (data.category == "watch") {
      $('.watch').append(todo);
    } else if (data.category === "read") {
      $('.read').append(todo);
    } else if (data.category === "buy") {
      $('.buy').append(todo);
    }

  };

//------------------------- AJAX Requests -------------------------//

  function loadTodos() {
    $.ajax({
      type: 'GET',
      url: ('/todos'),
      success: function (data) {
        renderTodos(data);
        feather.replace() //renders icons from the feather library
      },
      error: function (err, data) {
        console.log('Error: ', err);
      }
    });
  }
  loadTodos();

$('#todo-input').keyup(function(){
 $('.error').slideUp();
});

// $('.card-body').on('click' ,(function() {
//   console.log("is this clicke")
//     alert("handler for .click called")
// }));

$('#todo-form').on('submit', function (event) {
  event.preventDefault();
  var submitText = $('#todo-input').val();
// text field cannot be left empty---
 $('.error').slideUp();
    if(submitText === "" ){
      $('.error').text("Oops ! did you forget something ?").slideDown();
  } else {
    const data = $('form').serialize();
     $('#todo-input').val("");
    $.ajax( '/todos', { method: 'POST', data: data })
      .then(function (data) {
        console.log('Success!', data);
        singleTodo(data);
        loadTodos();
        feather.replace()
        event.target.reset();
     });
    }
  });

//------------------------- Drag & Drop -------------------------//

  // Tutorial: https://www.tutorialspoint.com/jqueryui/jqueryui_draggable.htm. Look at grid option to snap to a grid

  $('.card').draggable({ appendTo: $('.col'), containment: $('.col') });

  $('.eat' ).droppable({
    drop: function( event, ui ) {
      const card_id = parseInt($(ui.draggable[0]).attr('id'));
      saveCat('eat', card_id);
    }
  });

  $('.watch').droppable({
    drop: function( event, ui ) {
      const card_id = parseInt($(ui.draggable[0]).attr('id'));
      saveCat('watch', card_id);
    }
  });

  $('.read').droppable({
    drop: function( event, ui ) {
      const card_id = parseInt($(ui.draggable[0]).attr('id'));
      saveCat('read', card_id);
    }
  });

  $('.buy').droppable({
    drop: function( event, ui ) {
      const card_id = parseInt($(ui.draggable[0]).attr('id'));
      saveCat('buy', card_id);
    }
  });

  function saveCat(category, id){

    const data2BSent = {category: category};
    $.ajax({
      type: 'PATCH',
      url: (`/todos/${id}/edit`),
      data: data2BSent,
      dataType:'text',
      success: function (data){
        ;
      },
      error: function (err, data) {
        console.log('Error: ', err);
      }
    });
    loadTodos();
  }

});


