import express from 'express';
import { connectToDatabase } from './db.js';


const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();


connectToDatabase().then(() => {
  app.use(cors());
  app.use(express.json());

  const port = process.env.PORT || 3000;

  app.use('/api/jikan', require('./jikan.js'));
  app.use('/api/mal', require('./mal.js'));
  app.use('/api/save', require('./saveQuizAnswers.js'));

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
