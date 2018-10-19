$(() => {


  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;

const actualData = [
  {id: 1, name: 'Starbucks', category: 'eat', user_id: 1},
  {id: 2, name: 'Whitespot', category: 'eat', user_id: 2},
  {id: 3, name: 'life of pi', category: 'read', user_id: 3},
  {id: 4, name: 'Charlie and the chocolate factory', category:'watch', user_id: 1},
  {id: 5, name: 'Iphone', category:'buy', user_id: 4},
  {id: 6, name: 'Nikon', category:'buy', user_id: 3},
  {id: 7, name: 'Free your mind', category:'read', user_id: 2},
  {id: 8, name: 'Alibaba: The house Jack Ma built', category:'read', user_id: 4},
  {id: 9, name: 'Nikon', category:'buy', user_id: 2}
]

  function createTodoElement(data) {
    const $cardText = $("<div>").addClass("card-body").text(data.name); //change this later
    const $card = $("<div>").addClass("card").append($cardText);
    const $edit = $("<button class='edit'> Edit</button>").appendTo($cardText);
    const $delete= $("<button class='delete'> Delete</button>").appendTo($cardText);
    return $card;

  };

  //assuming data is in an array
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

$('form').on('submit', function (event) {
  event.preventDefault();
  // const newTodo = $('.todo-form').find('.form-control').val();
  // console.log(newTodo);
  const data = $('form').serialize();

  //form validation?

  $.ajax( '/todos', { method: 'POST', data: data })
    .then(function (data) {
      console.log('Success!', data);
      loadNewTodo();
    });
});



});

