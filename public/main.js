if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(function(registration){
        console.log('Registration successful, scope is:', registration.scope)
    })
    .catch(function(error){
        console.log('Service Worker registration failed, error:', error)
    });
}

const body = document.querySelector('body')
const btnOpen = document.getElementById('btn-open')
const closeMenu = document.querySelectorAll('[data-close="menu"]')
const btnFooter = document.querySelector('#footer button')
const menuLinks = document.querySelectorAll('.menu a')
const btnSummaryToggle = document.getElementById('btn-summary-toggle')
const creditCard = document.getElementById('credit-card')
const schedulesPayment = document.getElementById('schedules-payment')

if (schedulesPayment) {

    const cardName = schedulesPayment.querySelectorAll('svg .name')
    const cardNumber1 = schedulesPayment.querySelectorAll('svg .number-1')
    const cardNumber2 = schedulesPayment.querySelectorAll('svg .number-2')
    const cardNumber3 = schedulesPayment.querySelectorAll('svg .number-3')
    const cardNumber4 = schedulesPayment.querySelectorAll('svg .number-4')
    const cardExpiry = schedulesPayment.querySelectorAll('svg .expiry')
    const cardCvv = schedulesPayment.querySelectorAll('svg .cvv')
    const inputName = schedulesPayment.querySelector('#name')
    const inputNumber = schedulesPayment.querySelector('#number')
    const inputExpiry = schedulesPayment.querySelector('#expiry')
    const inputCvv = schedulesPayment.querySelector('#cvv')

    inputCvv.addEventListener('focus', e => {
        creditCard.classList.add('flipped')
    })

    inputCvv.addEventListener('blur', e => {
        creditCard.classList.remove('flipped')
    })

    inputName.addEventListener('keyup', e => {
        cardName.forEach(el => {
            el.innerHTML = inputName.value
        })
    })

    inputNumber.addEventListener('keyup', e => {

        cardNumber1[0].innerHTML = inputNumber.value.substr(0, 4)
        cardNumber2[0].innerHTML = inputNumber.value.substr(4, 4)
        cardNumber3[0].innerHTML = inputNumber.value.substr(8, 4)
        cardNumber4[0].innerHTML = inputNumber.value.substr(12, 4)

    })
    inputExpiry.addEventListener('keyup', e => cardExpiry[0].innerHTML = inputExpiry.value)
    inputCvv.addEventListener('keyup', e => cardCvv[0].innerHTML = inputCvv.value)
    
    schedulesPayment.querySelectorAll('input').forEach(el => {

        el.addEventListener('focus', e => {
            schedulesPayment.classList.add('keyboard-open')
        })

        el.addEventListener('blur', e => {
            schedulesPayment.classList.remove('keyboard-open')
        })

    })
    
}

if (creditCard) {
    creditCard.addEventListener('click', () => {
        creditCard.classList.toggle('flipped')
    })
}

if (btnSummaryToggle) {
    btnSummaryToggle.addEventListener('click', e => {
        btnSummaryToggle.closest('aside').classList.toggle('open')
    })
}

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

const hideAuthForms = () => {

    document.querySelectorAll('#auth form').forEach(el => el.classList.add('hide'))

}

const showAuthForm = id => {

    document.getElementById(id).classList.remove('hide')

}

const authHash = () => {

    console.log('authHash')

    hideAuthForms()

    console.log(window.location.hash)

    switch (window.location.hash) {
        case '#register':
            showAuthForm('auth-register')
            break

        case '#login':
            showAuthForm('auth-login')
            break

        case '#forget':
            showAuthForm('auth-forget')
            break

        case '#reset':
            showAuthForm('auth-reset')
            break

        default:
            showAuthForm('auth-email')
    }

}

window.addEventListener('load', e => {
    authHash()
})
window.addEventListener('hashchange', e => {
    authHash()
})
