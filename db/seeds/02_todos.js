exports.seed = function(knex, Promise) {
  return knex('todos').del()
    .then(function () {
      return Promise.all([
        knex('todos').insert({id: 1, name: 'Starbucks', category: 'eat', user_id: 1}),
        knex('todos').insert({id: 2, name: 'Whitespot', category: 'eat', user_id: 2}),
        knex('todos').insert({id: 3, name: 'life of pi', category: 'read', user_id: 3}),
        knex('todos').insert({id: 4, name: 'Charlie and the chocolate factory', category:'watch', user_id: 1}),
        knex('todos').insert({id: 5, name: 'Iphone', category:'buy', user_id: 4}),
        knex('todos').insert({id: 6, name: 'Nikon', category:'buy', user_id: 3}),
        knex('todos').insert({id: 7, name: 'Free your mind', category:'read', user_id: 2}),
        knex('todos').insert({id: 8, name: 'Alibaba: The house Jack Ma built', category:'read', user_id: 4}),
        knex('todos').insert({id: 9, name: 'Nikon', category:'buy', user_id: 2})
      ]);
    });
};
