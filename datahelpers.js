
//Query's the database and returns the object it obtains

module.exports = function(knex) {
  return {
    getTodos: function() {

      query =  knex.select('*').from('todos')

      return query;
    }
  };
}

//send request to Yelp

function requestToYelp(todo, cb) {
  var options = {
    url: "https://api.yelp.com/v3/businesses/search?term=" + todo + "&location=canada",
    headers: {
      'User-Agent': 'lavieenrosy',
      //process.env.USER_AGENT,
      'Authorization': 'token ' + auth.GITHUB_TOKEN
      //'Authorization': 'token ' + process.env.GITHUB_TOKEN
    },
    json: true
  };
  request(options, cb);
}
