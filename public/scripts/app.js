$(() => {

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;

  // <div class="row">

  //       <!-- Eat list -->

  //       <div class="col">

  //         <div class="card">
  //           <div class="card-body">
  //             Watch Harry Potter
  //           </div>
  //         </div>

  function createTodoElement(data) {

    const $cardText = $("<div>").addClass("card-body").text(data.todo.name);

  }

  $.ajax('/todos', { method: 'GET', data: data})
    .then(function() {

    });



});

