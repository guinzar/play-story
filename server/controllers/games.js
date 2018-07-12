const axios = require('axios');
const config = require('../config');

exports.searchGames = (req, res) => {
  console.log(req.query.search);
  axios.get(config.apiUrl,
    {
      headers: {
        'user-key': config.apiKey,
        'Accept': 'application/json'
      },
      params: {
        'search': req.query.search,
        'fields': 'name,summary,genres,first_release_date,platforms,cover,websites'
      }
    }
  ).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.log(error);
    res.end();
  });
};
