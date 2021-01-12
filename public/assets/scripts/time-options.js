import { format, parse } from "date-fns";
import { appendTemplate, getQueryString } from "./utils";
import { ptBR } from "date-fns/locale";

const timeOptions = [{
    id: 1,
    value: '9:00'
}, {
    id: 2,
    value: '10:00'
}, {
    id: 3,
    value: '11:00'
}, {
    id: 4,
    value: '12:00'
}, {
    id: 5,
    value: '13:00'
}, {
    id: 6,
    value: '14:00'
}, {
    id: 7,
    value: '15:00'
}];

const renderOptionTime = (element) => {

    const targetEl = element.querySelector(".options");

    targetEl.innerHTML = '';

    timeOptions.forEach(item => {

        appendTemplate(targetEl, "label", `
            <input type="radio" name="option" value="${item.value}" />
            <span>${item.value}</span>
        `);

    });

}

const validateSubmitButton = (element) => {

    const inputs = element.querySelectorAll('[name=option]')
    const button = element.querySelector('[type=submit]')

    inputs.forEach(input => {

        input.addEventListener('change', e => {

            if (element.querySelector('[name=option]:checked')) {
                button.disabled = false
            } else {
                button.disabled = true
            }

        })

    })

    element.querySelector('form').addEventListener('submit', e => {

        if (!element.querySelector('[name=option]:checked')) {
            e.preventDefault()
        }

    })

}

document.querySelectorAll("#time-options").forEach(timeOptionElement => {

    renderOptionTime(timeOptionElement)

    validateSubmitButton(timeOptionElement)
    
    const params = getQueryString()
    const scheduleAt = parse(params.schedule_at, "yyyy-MM-dd", new Date())

    document.querySelector('h3').innerHTML = format(scheduleAt, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })
    document.querySelector('[name=schedule_at]').value = params.schedule_at

})
