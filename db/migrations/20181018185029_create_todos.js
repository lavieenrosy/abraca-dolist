
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', function (table) {
    table.increments();
    table.string('name');
    table.string('type');
    table.integer('user_id');
  });

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('todos');

};
