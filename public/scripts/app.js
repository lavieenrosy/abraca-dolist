$(() => {

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;


  function createTodoElement(data) {
    const $cardText = $("<div>").addClass("card-body").text(data.todo.name); //change this later
    const $card = $("<div>").addClass("card").append($cardText);
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

  $.ajax('/todos', { method: 'GET', data: data})
    .then(function() {

    });



});

