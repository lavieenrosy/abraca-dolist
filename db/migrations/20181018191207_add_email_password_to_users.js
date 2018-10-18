
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.string('email');
      table.string('password');
    })
  ])
};
exports.down = function(knex, Promise) {
  table.dropColumn('email');
  table.dropColumn('password');
};
