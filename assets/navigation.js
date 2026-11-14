(() => {
    const links = [...document.querySelectorAll('.section-tabs a')];
    const sections = [...document.querySelectorAll('[data-page]')];
    const pages = new Set(sections.map(section => section.dataset.page));
    let activePage;

    function showPage() {
        const hash = window.location.hash.slice(1);
        // The skip link should focus the current page without changing views.
        const page = hash === 'main' ? (activePage || 'about') :
            (pages.has(hash) ? hash : 'about');

        sections.forEach(section => {
            section.hidden = section.dataset.page !== page;
        });
        links.forEach(link => {
            if (link.hash === `#${page}`) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        document.title = `${links.find(link => link.hash === `#${page}`).textContent} | Alejandro Buendia`;
        if (activePage !== page && hash !== 'main') {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
        activePage = page;
    }

    links.forEach(link => {
        link.addEventListener('click', event => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            if (window.location.hash !== link.hash) {
                window.history.pushState(null, '', link.hash);
            }
            showPage();
        });
    });

    window.addEventListener('popstate', showPage);
    window.addEventListener('hashchange', showPage);
    showPage();
})();
