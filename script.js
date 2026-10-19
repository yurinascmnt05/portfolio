function writeTitle(){
    function activeWorld(element){
        const arrText = element.innerHTML.split('');
        element.innerHTML = '';
        arrText.forEach((letra, i) =>{
            setTimeout(()=>{
                element.innerHTML += letra;
            }, 75 * i);
        })
    }
    const title = document.querySelector('.digitando');
    activeWorld(title);
}
writeTitle();




function menuMobile(){
    const btnMenu = document.querySelector('.btn_menu_mobile') || document.querySelector('.fa-bars');
    const iconMenu = btnMenu.querySelector('i') || btnMenu;
    const navMenu = document.querySelector('header .navegacao-primaria');
    const navLinks = document.querySelectorAll('header .navegacao-primaria li a');
    
    if (!btnMenu || !navMenu) return;

    function closeMenu() {
        navMenu.classList.remove('ativado');
        iconMenu.classList.remove('fa-x');
        btnMenu.setAttribute('aria-expanded', 'false');
    }

    btnMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        iconMenu.classList.toggle('fa-x');
        navMenu.classList.toggle('ativado');
        const isExpanded = navMenu.classList.contains('ativado');
        btnMenu.setAttribute('aria-expanded', isExpanded);
    });

    // Fecha o menu ao clicar em qualquer item de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('ativado') && !navMenu.contains(e.target) && !btnMenu.contains(e.target)) {
            closeMenu();
        }
    });

    // Fecha o menu ao pressionar a tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('ativado')) {
            closeMenu();
        }
    });
}
menuMobile();

function aboutMe(){
    const containerExp = document.querySelector('.experience_content');
    const cardsExp = document.querySelectorAll('.experience_content > div'); 
    const dotsExp = document.querySelectorAll('.experience_content ul li'); 

    const containerEdu = document.querySelector('.education_content');
    const cardsEdu = document.querySelectorAll('.education_content > div'); 
    const dotsEdu = document.querySelectorAll('.education_content ul li'); 

    let currentExp = 0;
    let currentEdu = 0;
    let timerExp = null;
    let timerEdu = null;
    const intervalTime = 4500; // 4.5 segundos para troca automática

    function showExp(index){
        if (cardsExp.length === 0) return;
        currentExp = (index + cardsExp.length) % cardsExp.length;
        cardsExp.forEach((card, i) => {
            card.classList.toggle('active', i === currentExp);
        });
        dotsExp.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentExp);
            dot.setAttribute('aria-selected', i === currentExp);
        });
    }

    function showEdu(index){
        if (cardsEdu.length === 0) return;
        currentEdu = (index + cardsEdu.length) % cardsEdu.length;
        cardsEdu.forEach((card, i) => {
            card.classList.toggle('active', i === currentEdu);
        });
        dotsEdu.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentEdu);
            dot.setAttribute('aria-selected', i === currentEdu);
        });
    }

    // Inicializa o primeiro card ativo
    showExp(0);
    showEdu(0);

    // Funções de controle do temporizador automático
    function startTimerExp(){
        stopTimerExp();
        timerExp = setInterval(() => {
            showExp(currentExp + 1);
        }, intervalTime);
    }

    function stopTimerExp(){
        if (timerExp) clearInterval(timerExp);
    }

    function resetTimerExp(){
        stopTimerExp();
        startTimerExp();
    }

    function startTimerEdu(){
        stopTimerEdu();
        timerEdu = setInterval(() => {
            showEdu(currentEdu + 1);
        }, intervalTime);
    }

    function stopTimerEdu(){
        if (timerEdu) clearInterval(timerEdu);
    }

    function resetTimerEdu(){
        stopTimerEdu();
        startTimerEdu();
    }

    // Inicia os timers automáticos
    startTimerExp();
    startTimerEdu();

    // Controles manuais (clique e teclado) nos marcadores de Experiência
    dotsExp.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showExp(index);
            resetTimerExp();
        });
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showExp(index);
                resetTimerExp();
            }
        });
    });

    // Controles manuais (clique e teclado) nos marcadores de Educação
    dotsEdu.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showEdu(index);
            resetTimerEdu();
        });
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showEdu(index);
                resetTimerEdu();
            }
        });
    });

    // Pausa a troca automática enquanto o usuário passa o mouse ou toca no card para ler
    if (containerExp) {
        containerExp.addEventListener('mouseenter', stopTimerExp);
        containerExp.addEventListener('mouseleave', startTimerExp);
        containerExp.addEventListener('touchstart', stopTimerExp, { passive: true });
        containerExp.addEventListener('touchend', startTimerExp, { passive: true });
    }

    if (containerEdu) {
        containerEdu.addEventListener('mouseenter', stopTimerEdu);
        containerEdu.addEventListener('mouseleave', startTimerEdu);
        containerEdu.addEventListener('touchstart', stopTimerEdu, { passive: true });
        containerEdu.addEventListener('touchend', startTimerEdu, { passive: true });
    }
}

aboutMe();