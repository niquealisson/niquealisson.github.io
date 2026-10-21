// Light Mode

const initLightMode = () => {
    document.querySelector('input[type="checkbox"]').addEventListener('change', () => {
        document.body.classList.toggle('light-mode')
    })

}

initLightMode()

// Open Menu

const initOpenMenu = () => {

    const menuBtn = document.querySelector('header .menu i')
    const closeBtn = document.querySelector('header .menu i:nth-child(2)')
    const menu = document.querySelector('.menuOpen');
    const header = document.querySelector('header')

    const close = () => {
        menu.classList.add('hidden')
        menuBtn.classList.remove('hidden')
        closeBtn.classList.add('hidden')
        document.body.style.overflow = 'visible';
        header.classList.remove('open')

    }

    const open = () => {
        menu.classList.remove('hidden')
        menuBtn.classList.add('hidden')
        closeBtn.classList.remove('hidden')
        document.body.style.overflow = 'hidden';
        header.classList.add('open')
    }

    // Open with Btn
    menuBtn.addEventListener('click', open)

    // Close with Btn
    closeBtn.addEventListener('click', close)

    // Close with Esc
    document.addEventListener ('keydown', (event) => event.key === "Escape" ? close() : '');

    // Close with Links
    const links = document.querySelectorAll('nav a')

    links.forEach(link => {
        link.addEventListener('click', close)
    })

}

initOpenMenu()

// Scroll Animation

const initAnimationScroll = () => {
    const sections = document.querySelectorAll('.js-section')

    const windowHalfSize = window.innerHeight * 0.6
    
    const animateScroll = () => {
        sections.forEach(item => {
            const sectionTop = item.getBoundingClientRect().top

            const isSectionVisible = (sectionTop - windowHalfSize) < 0

            if (isSectionVisible) {
                item.classList.add('active')
            } else {
                item.classList.remove('active')
            }

        })
        
    }

    animateScroll()

    window.addEventListener('scroll', animateScroll)


}

initAnimationScroll()

// Scroll Smooth

const initScrollSmooth = () => {

    const linksInternos = document.querySelectorAll('nav a')

    linksInternos.forEach(item => {

        const scrollToSection = (event) => {
            event.preventDefault()
            const href = event.currentTarget.getAttribute('href');
            const section = document.querySelector(href)

            window.scrollTo ({
                top: section.offsetTop - 100
            })


        }


        item.addEventListener('click', scrollToSection)

    })

}

initScrollSmooth()

// Language (EN / PT)

const TEXTS = {
    en: { hello: 'Hi, I\'m ', name: 'Nique Souza', role: 'QA Engineer · ISTQB® CTFL 4.0' },
    pt: { hello: 'Olá, eu sou ', name: 'Nique Souza', role: 'QA Engineer · ISTQB® CTFL 4.0' }
}

const getSavedLang = () => {
    try {
        const saved = localStorage.getItem('lang')
        if (saved === 'en' || saved === 'pt') return saved
    } catch (e) {}
    return navigator.language && navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

let currentLang = getSavedLang()

const applyLang = (lang) => {
    currentLang = lang
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.documentElement.dataset.lang = lang
    try { localStorage.setItem('lang', lang) } catch (e) {}
}

applyLang(currentLang)

// Typing Animation

const initTypingAnimation = () => {
    const title = document.querySelector('#sobre .banner h1')
    const span = document.querySelector('#sobre .banner .title > span')
    const paragraph = document.querySelector('#sobre .banner .title p')
    let timers = []

    const type = (element, text, speed, delay) => {
        text.split('').forEach((char, index) => {
            timers.push(setTimeout(() => element.textContent += char, delay + speed * index))
        })
    }

    const run = (animate) => {
        timers.forEach(clearTimeout)
        timers = []
        const t = TEXTS[currentLang]

        if (!animate) {
            title.textContent = t.hello
            span.textContent = t.name
            paragraph.textContent = t.role
            return
        }

        title.textContent = ''
        span.textContent = ''
        paragraph.textContent = ''
        type(title, t.hello, 120, 0)
        type(span, t.name, 150, 1600)
        type(paragraph, t.role, 60, 3600)
    }

    run(true)

    document.querySelector('.lang-switch').addEventListener('click', () => {
        applyLang(currentLang === 'en' ? 'pt' : 'en')
        run(false)
    })
}

initTypingAnimation()
