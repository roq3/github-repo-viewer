require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Zastąp swoim tokenem GitHub (zachowaj w tajemnicy!)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Token pobierany z pliku .env

app.use(express.static('public'));

app.get('/api/repos', async (req, res) => {
    try {
        const username = process.env.GITHUB_USERNAME; // Nazwa użytkownika pobierana z pliku .env
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'User-Agent': 'Node.js App'
            }
        });
        const repos = await response.json();
        console.log('Status:', response.status);
        console.log('Repos:', repos);
        res.json(repos);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});