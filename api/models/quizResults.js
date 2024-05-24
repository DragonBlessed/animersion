const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  username: String,
  quizAnswers: Array,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = { QuizResult }; 
