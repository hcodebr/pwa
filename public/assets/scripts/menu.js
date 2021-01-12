/*if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(function(registration){
        console.log('Registration successful, scope is:', registration.scope)
    })
    .catch(function(error){
        console.log('Service Worker registration failed, error:', error)
    });
}*/

const body = document.querySelector('body')
const btnOpen = document.getElementById('btn-open')
const closeMenu = document.querySelectorAll('[data-close="menu"]')
const btnFooter = document.querySelector('#footer button')
const menuLinks = document.querySelectorAll('.menu a')

if (btnFooter) {
    btnFooter.addEventListener('click', e => {
        window.scrollTo(0, 0)
    })
}

if (btnOpen) {
    btnOpen.addEventListener('click', e => {
        body.classList.add('open-menu')
    })
}

if (closeMenu) {
    closeMenu.forEach(el => {
        el.addEventListener('click', e => {
            body.classList.remove('open-menu')
        })
    })
}

if (menuLinks) {
    menuLinks.forEach(el => {
        el.addEventListener('click', e => {
            body.classList.remove('open-menu')
        })
    })
}