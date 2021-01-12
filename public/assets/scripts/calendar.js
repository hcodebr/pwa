import { addDays, addMonths, differenceInSeconds, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths } from "date-fns"
import { ptBR } from 'date-fns/locale'

document.querySelectorAll("#schedule-new form").forEach(form => {

    const input = form.querySelector('[name=schedule_at]')
    const button = form.querySelector('[type=submit]')

    input.addEventListener('change', e => {

        if (input.value) {
            button.disabled = false
        } else {
            button.disabled = true
        }

    })

    form.addEventListener('submit', e => {

        if (!form.querySelector('[name="schedule_at"]').value) {
            e.preventDefault()
        }

    })

})

document.querySelectorAll('.calendar').forEach(el => {

    const calendar = el
    const today = new Date()
    let startMonth = startOfMonth(new Date())
    let startAt = startOfWeek(startMonth)
    let endAt = endOfWeek(endOfMonth(new Date()))
    const title = calendar.querySelector('h2')
    const days = calendar.querySelector('.days')
    const bntPrev = calendar.querySelector('.btn-prev')
    const bntNext = calendar.querySelector('.btn-next')
    const bntToday = calendar.querySelector('.btn-today')

    bntPrev.addEventListener('click', e => {
        startMonth = subMonths(startMonth, 1)
        startAt = startOfWeek(startMonth)
        endAt = endOfWeek(endOfMonth(startMonth))
        render()
    })

    bntNext.addEventListener('click', e => {
        startMonth = addMonths(startMonth, 1)
        startAt = startOfWeek(startMonth)
        endAt = endOfWeek(endOfMonth(startMonth))
        render()
    })

    bntToday.addEventListener('click', e => {
        startMonth = startOfMonth(new Date())
        startAt = startOfWeek(startMonth)
        endAt = endOfWeek(endOfMonth(startMonth))
        render()
    })

    const render = () => {

        title.innerHTML = format(startMonth, 'MMMM yyyy', {locale: ptBR})

        days.innerHTML = ''

        let day = new Date(startAt.getTime())

        while(differenceInSeconds(endAt, day) > 0)
        {

            const li = document.createElement('li')

            li.innerHTML = format(day, 'd')
            li.dataset.date = format(day, 'yyyy-MM-dd')

            if (format(day, 'MM') < format(startMonth, 'MM')) {
                li.classList.add('month-prev')
            } else if (format(day, 'MM') > format(startMonth, 'MM')) {
                li.classList.add('month-next')
            } else if (format(day, 'dd/MM/yyyy') === format(today, 'dd/MM/yyyy')) {
                li.classList.add('active')
            }

            li.addEventListener('click', e => {

                const target = e.target
                const selected = calendar.querySelector('.selected')
                let date = target.dataset.date

                if (selected) {
                    selected.classList.remove('selected')
                    if (target === selected) {
                        date = ''
                    }
                }

                document.querySelector('[name=schedule_at]').value = date

                const evt = document.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                document.querySelector('[name=schedule_at]').dispatchEvent(evt);

                if (date) {
                    target.classList.add('selected')
                }

            })

            days.append(li)

            day = addDays(day, 1)
            
        }

    }
    
    render()    

})