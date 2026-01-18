async function fetchProfile() {
    try {
        console.log('Rozpoczęto pobieranie profilu...');
        const response = await fetch('/api/profile');
        console.log('Odpowiedź serwera dla profilu:', response);

        if (!response.ok) {
            throw new Error(`Błąd podczas pobierania profilu: ${response.status} ${response.statusText}`);
        }

        const profile = await response.json();
        console.log('Dane profilu:', profile);

        if (profile.error) {
            console.error('Błąd podczas pobierania profilu:', profile.error);
            return null;
        }

        return profile;
    } catch (error) {
        console.error('Błąd:', error);
        return null;
    }
}

async function fetchRepos() {
    try {
        console.log('Rozpoczęto pobieranie repozytoriów...');
        const response = await fetch('/api/repos');
        console.log('Odpowiedź serwera dla repozytoriów:', response);

        if (!response.ok) {
            throw new Error(`Błąd podczas pobierania repozytoriów: ${response.status} ${response.statusText}`);
        }

        const repos = await response.json();
        console.log('Dane repozytoriów:', repos);

        if (repos.error) {
            console.error('Błąd podczas pobierania repozytoriów:', repos.error);
            return [];
        }

        return repos; // Zwraca listę JSON
    } catch (error) {
        console.error('Błąd:', error);
        return []; // Zwraca pustą listę w przypadku błędu
    }
}

async function renderProfile() {
    const profile = await fetchProfile();
    const profileAvatar = document.getElementById('profile-avatar');
    const profileDetails = document.getElementById('profile-details');

    if (!profile) {
        profileDetails.innerHTML = `<p>${translate('errorFetching')}</p>`;
        return;
    }

    profileAvatar.src = profile.avatar_url;
    profileAvatar.alt = `${profile.name || profile.login} Avatar`;

    profileDetails.innerHTML = `
        <p data-key="name" data-value="${profile.name || 'Nie podano'}"><strong>${translate('name')}:</strong> ${profile.name || translate('not_provided')}</p>
        <p data-key="email" data-value="${profile.email || 'Nie podano'}"><strong>${translate('email')}:</strong> ${profile.email || translate('not_provided')}</p>
        <p data-key="bio" data-value="${profile.bio || 'Nie podano'}"><strong>${translate('bio')}:</strong> ${profile.bio || translate('not_provided')}</p>
        <p data-key="location" data-value="${profile.location || 'Nie podano'}"><strong>${translate('location')}:</strong> ${profile.location || translate('not_provided')}</p>
        <p data-key="blog" data-value="${profile.blog || 'Nie podano'}"><strong>${translate('blog')}:</strong> <a href="${profile.blog || '#'}" target="_blank">${profile.blog || translate('not_provided')}</a></p>
        <p data-key="company" data-value="${profile.company || 'Nie podano'}"><strong>${translate('company')}:</strong> ${profile.company || translate('not_provided')}</p>
        <p data-key="public_repos" data-value="${profile.public_repos}"><strong>${translate('public_repos')}:</strong> ${profile.public_repos || 0}</p>
        <p data-key="followers" data-value="${profile.followers}"><strong>${translate('followers')}:</strong> ${profile.followers || 0}</p>
        <p data-key="following" data-value="${profile.following}"><strong>${translate('following')}:</strong> ${profile.following || 0}</p>
    `;
}

async function renderRepos() {
    const repos = await fetchRepos();
    const reposContainer = document.getElementById('repos');

    if (repos.length === 0) {
        reposContainer.innerHTML = `<p>${translate('noRepos')}</p>`;
        return;
    }

    reposContainer.innerHTML = repos.map(repo => `
        <div class="repo">
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            <p><strong>${translate('description')}:</strong> ${repo.description || translate('not_provided')}</p>
            <p><strong>${translate('language')}:</strong> ${repo.language || translate('not_provided')}</p>
            <p><strong>${translate('stars')}:</strong> ⭐ ${repo.stargazers_count}</p>
        </div>
    `).join('');
}

const languageSwitcher = document.getElementById('language-switcher');
languageSwitcher.addEventListener('change', async () => {
    const selectedLanguage = languageSwitcher.value;
    setLanguage(selectedLanguage);

    // Wywołanie renderowania profilu i repozytoriów po zmianie języka
    await renderProfile();
    await renderRepos();
});