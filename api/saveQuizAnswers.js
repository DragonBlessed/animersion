import { kv } from "@vercel/kv";

export default async (req, res) => {
  if (req.method === 'POST') {
    const { clientId, quizAnswers } = req.body;
    try {
      // Uses userId as the key and store their answers as the value.
      await kv.set(`quiz-answers-${clientId}`, JSON.stringify(quizAnswers));
      res.status(200).json({ message: 'Answers saved successfully' });
    } catch (error) {
      console.error('Error saving quiz answers:', error);
      res.status(500).json({ error: 'Failed to save quiz answers' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};