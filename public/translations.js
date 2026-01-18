const translations = {
    en: {
        headerTitle: "My GitHub Repositories",
        noRepos: "No repositories found.",
        errorFetching: "Error fetching repositories: ",
        description: "Description",
        language: "Language",
        stars: "Stars",
        name: "Name",
        email: "Email",
        bio: "Bio",
        location: "Location",
        blog: "Blog",
        company: "Company",
        public_repos: "Public Repositories",
        followers: "Followers",
        following: "Following",
        not_provided: "Not provided"
    },
    pl: {
        headerTitle: "Moje Repozytoria na GitHubie",
        noRepos: "Brak repozytoriów.",
        errorFetching: "Błąd podczas pobierania repozytoriów: ",
        description: "Opis",
        language: "Język",
        stars: "Gwiazdki",
        name: "Imię",
        email: "Email",
        bio: "Bio",
        location: "Lokalizacja",
        blog: "Blog",
        company: "Firma",
        public_repos: "Publiczne repozytoria",
        followers: "Obserwujący",
        following: "Obserwowani",
        not_provided: "Nie podano"
    }
};

function translate(key) {
    const languageSwitcher = document.getElementById('language-switcher');
    const selectedLanguage = languageSwitcher.value;
    return translations[selectedLanguage][key] || translations.en[key] || key;
}

function setLanguage(lang) {
    const elements = {
        headerTitle: document.getElementById('header-title'),
        repos: document.getElementById('repos'),
        profile: document.getElementById('profile-details')
    };

    elements.headerTitle.textContent = translations[lang].headerTitle;

    // Update repository list if already loaded
    const reposDiv = elements.repos;
    if (reposDiv.children.length > 0) {
        Array.from(reposDiv.children).forEach(repoDiv => {
            const repoDescription = repoDiv.querySelector('p[data-description]');
            const repoLanguage = repoDiv.querySelector('p[data-language]');
            const repoStars = repoDiv.querySelector('p[data-stars]');

            // Dodano sprawdzenie, czy elementy istnieją przed próbą odczytu ich właściwości
            if (repoDescription) {
                repoDescription.textContent = translations[lang].description + ": " + (repoDescription.dataset.description || translations[lang].not_provided);
            }
            if (repoLanguage) {
                repoLanguage.textContent = translations[lang].language + ": " + (repoLanguage.dataset.language || translations[lang].not_provided);
            }
            if (repoStars) {
                repoStars.textContent = translations[lang].stars + ": ⭐ " + (repoStars.dataset.stars || 0);
            }
        });
    }

    // Update profile details if already loaded
    const profileDiv = elements.profile;
    if (profileDiv.children.length > 0) {
        const profileItems = profileDiv.querySelectorAll('p');
        profileItems.forEach(item => {
            const key = item.dataset.key;
            const value = item.dataset.value;
            item.textContent = `${translations[lang][key]}: ${value || translations[lang].not_provided}`;
        });
    }
}

document.getElementById('language-switcher').addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
});