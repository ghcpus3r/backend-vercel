require("dotenv").config(); // Charger les variables d'environnement

const fetch = require("node-fetch"); // Importer fetch pour l'API Google Gemini

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const userMessage = req.body.message;

    // Récupérer votre clé API depuis le fichier .env
    const apiKey = process.env.GEMINI_API_KEY;

    // Appeler l'API Google Gemini
    const apiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=GEMINI_API_KEY', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        message: userMessage
      })
    });

    // Transmettre la réponse de l'API au frontend
    const data = await apiResponse.json();
    res.status(200).json({ reply: data.reply });
  } else {
    res.status(405).send('Méthode non autorisée'); // Autoriser uniquement les POST
  }
};
