
//Query's the database and returns the object it obtains

module.exports = function(knex) {
  return {
    getTodos: function() {

      query =  knex.select('*').from('todos')

      return query;
    }
  };
}
