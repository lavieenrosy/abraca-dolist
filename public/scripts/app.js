$(() => {


  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;


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
        console.log("ROSY ",data);
      },
      error: function (err, data) {
        console.log('Error: ', err);
      }
    });
  };


loadTodos();

function loadNewTodos(){

}

});

