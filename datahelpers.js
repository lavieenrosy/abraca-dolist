
//Query's the database and returns the object it obtains

module.exports = function(knex) {

  return {
    //gets all the todos
    getTodos: function() {
      const query =  knex.select('*').from('todos')
      .where('deleted', 'n')
      return query;
    },
    //gets one todo by a given id
    findTodo: function(id){
      const query = knex.select('*')
      .from('todos')
      .where('id', id)
      return query;
    },
    //inserts a todo with three fields
    insertTodo: function(name, category, user_id) {
      return knex('todos')
      .insert({
        name:     name,
        category: category,
        user_id:  user_id
      })
      .returning('id')
    },//deletes a todo by a given ID
    deleteTodo: function(id){
      return knex('todos')
      .where('id', id)
      .update({
        deleted: 'y'
      })
    }
  };


}
