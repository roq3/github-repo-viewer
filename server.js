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

app.get('/api/profile', async (req, res) => {
    try {
        const response = await fetch(`https://api.github.com/users/${process.env.GITHUB_USERNAME}`, {
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'User-Agent': 'Node.js App'
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Nie udało się pobrać danych profilu.' });
        }

        const data = await response.json();

        const profile = {
            login: data.login,
            avatar_url: data.avatar_url,
            html_url: data.html_url,
            name: data.name,
            company: data.company,
            blog: data.blog,
            location: data.location,
            email: data.email,
            bio: data.bio,
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following
        };

        res.json(profile);
    } catch (error) {
        console.error('Błąd podczas pobierania danych profilu:', error);
        res.status(500).json({ error: 'Wystąpił błąd serwera.' });
    }
});

app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});