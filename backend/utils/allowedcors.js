const allowedCors = {
    origin: [      
      'https://evgenias.mesto.nomoredomains.icu',
      'http://evgenias.mesto.nomoredomains.icu',
      'http://localhost:3000',
      'https://locahost:3000',
    ],
    credentials: true,
  };
  
  module.exports = allowedCors;