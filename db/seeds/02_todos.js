exports.seed = function(knex, Promise) {
  return knex('todos').del()
    .then(function () {
      return Promise.all([
        knex('todos').insert({id: 1111111, name: 'Starbucks', category: 'eat', user_id: 1, deleted: 'n'}),
        knex('todos').insert({id: 1111112, name: 'Whitespot', category: 'eat', user_id: 2, deleted: 'n'}),
        knex('todos').insert({id: 1111113, name: 'life of pi', category: 'read', user_id: 3, deleted: 'n'}),
        knex('todos').insert({id: 1111114, name: 'Charlie and the chocolate factory', category:'watch', user_id: 1, deleted: 'n'}),
        knex('todos').insert({id: 1111115, name: 'Iphone', category:'buy', user_id: 4, deleted: 'n'}),
        knex('todos').insert({id: 1111116, name: 'Nikon', category:'buy', user_id: 3, deleted: 'n'}),
        knex('todos').insert({id: 1111117, name: 'Free your mind', category:'read', user_id: 2, deleted: 'n'}),
        knex('todos').insert({id: 1111118, name: 'Alibaba: The house Jack Ma built', category:'read', user_id: 4, deleted: 'n'}),
        knex('todos').insert({id: 1111119, name: 'Nikon', category:'buy', user_id: 2, deleted: 'n'})
      ]);
    });
};
