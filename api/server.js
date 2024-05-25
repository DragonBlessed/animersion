import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectToDatabase().then(() => {
  import(path.join(__dirname, './jikan.js')).then(module => app.use('/api/jikan', module.default));
  import(path.join(__dirname, './mal.js')).then(module => app.use('/api/mal', module.default));
  import(path.join(__dirname, './saveQuizAnswers.js')).then(module => app.use('/api/saveQuizAnswers', module.default));
  import(path.join(__dirname, './userAnimeList.js')).then(module => app.use('/api/user-animelist', module.default));


  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
