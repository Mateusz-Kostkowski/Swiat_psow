document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Obsługa Menu Mobilnego (Wspólne dla wszystkich stron) --- */
    const menuBtn = document.getElementById('menuBtn');
    const mainNav = document.getElementById('mainNav');

    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Aktualizacja atrybutu dostępności (ARIA)
            const isExpanded = mainNav.classList.contains('active');
            menuBtn.setAttribute('aria-expanded', isExpanded);
        });
    }

    /* --- 2. Przycisk "Back to Top" (Wspólne dla wszystkich stron) --- */
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        // Pokaż przycisk, gdy użytkownik przewinie stronę w dół o 200px
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        // Przewiń do góry po kliknięciu
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* --- 3. Wyszukiwarka (Tylko strona główna - index.html) --- */
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultsContainer = document.getElementById('searchResults');

    if (searchInput && searchBtn && resultsContainer) {
        const searchableContent = [
            { title: 'Zapotrzebowanie Kaloryczne', page: 'zywienie.html', hash: 'zywienie-kalorie', keywords: 'żywienie kalorie energia karma' },
            { title: 'Co Mogą Jeść Psy', page: 'zywienie.html', hash: 'zywienie-produkty', keywords: 'żywienie produkty jedzenie dieta' },
            { title: 'Błędy i Mity Żywienia', page: 'zywienie.html', hash: 'zywienie-mity', keywords: 'żywienie mity błędy' },
            { title: 'Zaglądanie do Uszu', page: 'pielegnacja.html', hash: 'pielegnacja-uszy', keywords: 'pielęgnacja uszy czyszczenie' },
            { title: 'Mycie Psa', page: 'pielegnacja.html', hash: 'pielegnacja-mycie', keywords: 'pielęgnacja mycie kąpiel szampon' },
            { title: 'Czesanie Sierści', page: 'pielegnacja.html', hash: 'pielegnacja-czesanie', keywords: 'pielęgnacja czesanie sierść szczotka' },
            { title: 'Szczepienia i Badania', page: 'zdrowie.html', hash: 'zdrowie-szczepienia', keywords: 'zdrowie szczepienia badania weterynarz' },
            { title: 'Prawidłowa Waga', page: 'zdrowie.html', hash: 'zdrowie-waga', keywords: 'zdrowie waga otyłość dieta' },
            { title: 'Podstawy Treningu', page: 'poradniki.html', hash: 'poradniki-trening', keywords: 'poradniki trening nauka komendy' },
            { title: 'Socjalizacja Psa', page: 'poradniki.html', hash: 'poradniki-socjalizacja', keywords: 'poradniki socjalizacja adaptacja' },
            { title: 'Hodowla czy Schronisko', page: 'poradniki.html', hash: 'poradniki-wybor', keywords: 'poradniki adopcja hodowla schronisko' },
            { title: 'Drugi Pies w Domu', page: 'poradniki.html', hash: 'poradniki-drugi-pies', keywords: 'poradniki drugi pies wprowadzenie' },
            { title: 'Pojawienie się Dziecka', page: 'poradniki.html', hash: 'poradniki-zmiany', keywords: 'poradniki dziecko rodzina' },
            { title: 'Zmiany w Rodzinie', page: 'poradniki.html', hash: 'poradniki-zmiany', keywords: 'poradniki rodzina zmiany adaptacja' }
        ];

        const performSearch = () => {
            const query = searchInput.value.toLowerCase().trim();
            
            if (query.length < 2) {
                resultsContainer.classList.remove('active');
                return;
            }

            const results = searchableContent.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.keywords.toLowerCase().includes(query)
            );

            resultsContainer.innerHTML = ''; // Wyczyść poprzednie wyniki

            if (results.length > 0) {
                const header = document.createElement('h4');
                header.style.marginBottom = '1rem';
                header.style.color = 'var(--primary-color)';
                header.textContent = 'Znalezione wyniki:';
                resultsContainer.appendChild(header);

                results.forEach(result => {
                    const div = document.createElement('div');
                    div.className = 'search-result-item';
                    div.style.cursor = 'pointer';
                    div.style.marginBottom = '0.5rem';
                    div.innerHTML = `<h4>${result.title}</h4><p style="font-size: 0.9rem; color: #666;">Kliknij, aby przejść do tej sekcji</p>`;
                    div.onclick = () => {
                        window.location.href = `${result.page}#${result.hash}`;
                    };
                    resultsContainer.appendChild(div);
                });
                resultsContainer.classList.add('active');
            } else {
                resultsContainer.innerHTML = '<p style="padding: 1rem;">Nie znaleziono wyników.</p>';
                resultsContainer.classList.add('active');
            }
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });

        // Ukrywanie wyników po kliknięciu poza wyszukiwarkę
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target) && !searchBtn.contains(e.target)) {
                resultsContainer.classList.remove('active');
            }
        });
    }

    /* --- 4. Walidacja Formularza (Tylko strona kontakt.html) --- */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Reset errors
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');

            if(nameError) nameError.style.display = 'none';
            if(emailError) emailError.style.display = 'none';
            if(messageError) messageError.style.display = 'none';
            
            // Walidacja Imienia
            if (name === '') {
                if(nameError) nameError.style.display = 'block';
                isValid = false;
            }
            
            // Walidacja Emaila
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if(emailError) emailError.style.display = 'block';
                isValid = false;
            }
            
            // Walidacja Wiadomości
            if (message === '') {
                if(messageError) messageError.style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                alert('Dziękujemy za wiadomość! Skontaktujemy się wkrótce.');
                contactForm.reset();
            }
        });
    }
});