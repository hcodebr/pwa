const authPage = document.querySelector('main#auth')

if (authPage) {

    const hideAuthForms = () => {

        document.querySelectorAll('#auth form').forEach(el => el.classList.add('hide'))

    }

    const showAuthForm = id => {

        document.getElementById(id).classList.remove('hide')

    }

    const authHash = () => {

        hideAuthForms()

        if (sessionStorage.getItem('email')) {
            document.querySelectorAll('[name=email]').forEach(el => el.value = sessionStorage.getItem('email'))
        }

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

    const formAuthEmail = document.querySelector('#auth-email')

    formAuthEmail.addEventListener('submit', e => {

        e.preventDefault()

        const btnSubmit = e.target.querySelector('[type=submit]')

        btnSubmit.disabled = true

        sessionStorage.setItem('email', formAuthEmail.email.value)
        
        location.hash = '#login'

        btnSubmit.disabled = false

    })

}
