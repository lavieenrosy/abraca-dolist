
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('todos', function (table) {
      table.string('deleted');
    })
  ])
};

exports.down = function(knex, Promise) {
  table.dropColumn('deleted');
};
