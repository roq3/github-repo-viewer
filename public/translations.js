const translations = {
    en: {
        headerTitle: "My GitHub Repositories",
        noRepos: "No repositories found.",
        errorFetching: "Error fetching repositories: ",
        description: "Description",
        language: "Language",
        stars: "Stars"
    },
    pl: {
        headerTitle: "Moje Repozytoria na GitHubie",
        noRepos: "Brak repozytoriów.",
        errorFetching: "Błąd podczas pobierania repozytoriów: ",
        description: "Opis",
        language: "Język",
        stars: "Gwiazdki"
    }
};

function setLanguage(lang) {
    const elements = {
        headerTitle: document.getElementById('header-title'),
        repos: document.getElementById('repos')
    };

    elements.headerTitle.textContent = translations[lang].headerTitle;

    // Update repository list if already loaded
    const reposDiv = elements.repos;
    if (reposDiv.children.length > 0) {
        Array.from(reposDiv.children).forEach(repoDiv => {
            const repoName = repoDiv.querySelector('h3 a').textContent;
            const repoDescription = repoDiv.querySelector('p:nth-child(2)');
            const repoLanguage = repoDiv.querySelector('p:nth-child(3)');
            const repoStars = repoDiv.querySelector('p:nth-child(4)');

            repoDescription.textContent = translations[lang].description + ": " + repoDescription.dataset.description;
            repoLanguage.textContent = translations[lang].language + ": " + repoLanguage.dataset.language;
            repoStars.textContent = translations[lang].stars + ": ⭐ " + repoStars.dataset.stars;
        });
    }
}

document.getElementById('language-switcher').addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
});