const axios = require('axios');
const bcrypt = require('bcryptjs');

const { authenticate, generateToken } = require('../auth/authenticate');
const db = require("../database/helpers/userDb");

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  const user = req.body;

  if (!user || !user.username || !user.password) {
    res.status(400).json({
      error: 'Invalid form of username or password'
    });
  }

  user.password = bcrypt.hashSync(user.password, 12);

  try {
    const userId = await db.register(user);
    const token = generateToken({ id: userId[0] });
    if (userId.length) {
      res.status(201).json({ id: userId[0], token });
    } else {
      next(500);
    }
  } catch (err) {
    res.status(500).json({
      error: 'Unable to register new user'
    });
  }
}

async function login(req, res) {
  const user = req.body;

  if (!user || !user.username || !user.password) {
    res.status(400).json({
      error: 'Invalid username or password'
    });
  }

  try {
    const matchUser = await db.getUserByName(user.username);
    if (
      matchUser &&
      bcrypt.compareSync(user.password, matchUser.password)
    ) {
      const token = generateToken({ id: matchUser.id });
      res.status(200).json({ token });
    } else {
      res.status(400).json({
        error: 'Wrong username or password'
      });
    }
  } catch (err) {
    res.status(500).json({
      error: 'Unable to log into account'
    });
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
