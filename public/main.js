const body = document.querySelector('body')
const btnOpen = document.getElementById('btn-open')
const closeMenu = document.querySelectorAll('[data-close="menu"]')
const btnFooter = document.querySelector('#footer button')

btnFooter.addEventListener('click', e => {
    window.scrollTo(0, 0)
})

btnOpen.addEventListener('click', e => {
    body.classList.add('open-menu')
})

closeMenu.forEach(el => {
    el.addEventListener('click', e => {
        body.classList.remove('open-menu')
    })
})
