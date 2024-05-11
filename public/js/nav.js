window.addEventListener('resize', () =>{ 
    const largura = window.innerWidth;
    const imgNav = document.querySelector('nav img');

    if(largura < 781) {
        imgNav.classList.add('hide');
    } else {
        imgNav.classList.remove('hide');
    }
});

window.addEventListener('scroll', () => {
    const rolagem = window.scrollY;
    const nav = document.querySelector('nav');
    const navImg = document.querySelector('.navImg');
    const carrinhoNav = document.documentElement.querySelector('.carrinhoNav');

    if(rolagem > 103) {
        nav.classList.add('posicao');
        navImg.classList.remove('navHide');
        carrinhoNav.classList.remove('navHide');

    } else {
        nav.classList.remove('posicao');
        navImg.classList.add('navHide');
        carrinhoNav.classList.add('navHide');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});