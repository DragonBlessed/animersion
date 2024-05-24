import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db.js';
import saveQuizAnswersRouter from './saveQuizAnswers.js';
import userAnimelistRouter from './userAnimelist.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectToDatabase().then(() => {
  import(path.join(__dirname, './jikan.js')).then(module => app.use('/api/jikan', module.default));
  import(path.join(__dirname, './mal.js')).then(module => app.use('/api/mal', module.default));
  app.use('/api/saveQuizAnswers', saveQuizAnswersRouter);
  app.use('/api/user-animelist', userAnimelistRouter);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
