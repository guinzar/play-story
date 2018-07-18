const axios = require('axios');
const config = require('../config');

exports.searchGames = (req, res) => {
  let params = [
    `search=${encodeURIComponent(req.query.search)}`, 
    'fields=name,summary,genres,first_release_date,platforms,cover,websites',
    'filter[first_release_date][gt]=0',
    'filter[platforms][gt]=0',
    'filter[category][not_in]=1,3',
    'limit=20'
  ];
  axios.get(`${config.apiUrl}?${params.join('&')}`,
    {
      headers: {
        'user-key': config.apiKey,
        'Accept': 'application/json'
      }
    }
  ).then(response => {
    res.json(response.data);
  }).catch(error => {
    res.status(500).end();
  });
};
