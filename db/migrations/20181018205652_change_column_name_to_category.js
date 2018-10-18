
exports.up = function(knex, Promise) {
   return Promise.all([
    knex.schema.table('todos', function (table) {
      table.renameColumn('type', 'category');
    })
  ])
};
exports.down = function(knex, Promise) {
  return knex.schema.renameColumn('category','type');
};
