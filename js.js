document.documentElement.classList.add('js');

// Плавное появление блоков при прокрутке
(function () {
    const items = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-in'));
        return;
    }

    // небольшой каскад внутри одной группы
    document.querySelectorAll('.scope-grid, .contact-list').forEach((group) => {
        group.querySelectorAll('.reveal').forEach((el, i) => el.style.setProperty('--stagger', i + 1));
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-in');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

    items.forEach((el) => observer.observe(el));
})();

// Копирование почты
(function () {
    const status = document.getElementById('copy-status');

    document.querySelectorAll('.copy').forEach((btn) => {
        const label = btn.querySelector('.copy-text');
        const icon = btn.querySelector('.ph');
        const initial = label.textContent;
        let timer;

        const setState = (state, text, iconName) => {
            btn.classList.remove('is-done', 'is-error');
            if (state) btn.classList.add(state);
            label.textContent = text;
            icon.className = 'ph ' + iconName;
            status.textContent = state ? text : '';
        };

        btn.addEventListener('click', async () => {
            clearTimeout(timer);
            try {
                await navigator.clipboard.writeText(btn.dataset.copy);
                setState('is-done', 'Скопировано', 'ph-check');
            } catch (err) {
                setState('is-error', 'Не вышло', 'ph-warning');
            }
            timer = setTimeout(() => setState(null, initial, 'ph-copy'), 2200);
        });
    });
})();
