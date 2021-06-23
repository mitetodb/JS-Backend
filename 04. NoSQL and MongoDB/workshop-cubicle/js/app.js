document.querySelector('.cube-list').addEventListener('click', (ev) => {
    const target = ev.target;

    if (target.classList.contains('showmore')) {
        const desc = target.parentNode.querySelector('.cube-description');

        if (desc.style.display == 'block') {
            desc.style.display = 'none';
            target.textContent = 'Show more';
        } else {
            desc.style.display = 'block';
            target.textContent = 'Hide';
        }
    }
});