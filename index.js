const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const Users = require('./users/user-model');
const restricted = require('./auth/restricted');
const authRouter = require('./auth/auth-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.send("It's alive!");
  });
  
  server.get('/api/users', restricted, (req, res) => {
    Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
  });
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
