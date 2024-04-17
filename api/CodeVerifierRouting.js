import express from 'express';
import CodeVerifier from '/models/CodeVerifier.js';

const router = express.Router();

router.post('/store', async (req, res) => {
    const { codeVerifier } = req.body;
    try {
        const newCodeVerifier = await CodeVerifier.create({ codeVerifier });
        res.status(201).send(newCodeVerifier);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/validate', async (req, res) => {
    const { codeVerifier } = req.query;
    try {
        const verifier = await CodeVerifier.findOne({ codeVerifier });
        if (!verifier) {
            return res.status(404).send({ message: "Code Verifier not found or expired" });
        }
        res.send({ message: "Code Verifier is valid" });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;