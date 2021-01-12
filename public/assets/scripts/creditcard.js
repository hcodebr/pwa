import IMask from 'imask';
import { getQueryString, setFormValues } from './utils';

document.querySelectorAll("#schedules-payment").forEach(schedulesPayment => {

    const form = schedulesPayment.querySelector('form')
    const creditCard = schedulesPayment.querySelector('#credit-card')
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

    setFormValues(form, getQueryString())

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

        cardNumber1[0].innerHTML = inputNumber.value.replace(/ /g, '').substr(0, 4)
        cardNumber2[0].innerHTML = inputNumber.value.replace(/ /g, '').substr(4, 4)
        cardNumber3[0].innerHTML = inputNumber.value.replace(/ /g, '').substr(8, 4)
        cardNumber4[0].innerHTML = inputNumber.value.replace(/ /g, '').substr(12, 4)

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

    new IMask(inputNumber, {
        mask: '0000 0000 0000 0000'
    });

    new IMask(inputExpiry, {
        mask: '00/00'
    })
    
    new IMask(inputCvv, {
        mask: '000[0]'
    })

    if (creditCard) {
        creditCard.addEventListener('click', () => {
            creditCard.classList.toggle('flipped')
        })
    }

})