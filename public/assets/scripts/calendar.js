moment.locale('pt-br')

document.querySelectorAll('.calendar').forEach(el => {

    const calendar = el
    const today = moment()
    const startMonth = today.clone().startOf('month')
    let startAt = startMonth.clone().startOf('week')
    let endAt = startMonth.clone().endOf('month').endOf('week')
    const title = calendar.querySelector('h2')
    const days = calendar.querySelector('.days')
    const bntPrev = calendar.querySelector('.btn-prev')
    const bntNext = calendar.querySelector('.btn-next')
    
    bntPrev.addEventListener('click', e => {
        startMonth.subtract(1, 'months')
        startAt = startMonth.clone().startOf('week')
        endAt = startMonth.clone().endOf('month').endOf('week')
        render()
    })

    bntNext.addEventListener('click', e => {
        startMonth.add(1, 'months')
        startAt = startMonth.clone().startOf('week')
        endAt = startMonth.clone().endOf('month').endOf('week')
        render()
    })

    const render = () => {

        title.innerHTML = startMonth.format('MMMM YYYY')

        days.innerHTML = ''

        const day = startAt.clone()

        while(endAt.diff(day, 'seconds') > 0)
        {

            const li = document.createElement('li')

            li.innerHTML = day.format('D')
            li.dataset.date = day.format('YYYY-MM-DD')

            if (day.format('MM') < startMonth.format('MM')) {
                li.classList.add('month-prev')
            } else if (day.format('MM') > startMonth.format('MM')) {
                li.classList.add('month-next')
            } else if (day.format('DD/MM/YYYY') === today.format('DD/MM/YYYY')) {
                li.classList.add('active')
            }

            li.addEventListener('click', e => {

                const target = e.target
                const selected = calendar.querySelector('.selected')

                if (selected) {
                    selected.classList.remove('selected')
                }

                document.querySelector('[name=schedule_at]').value = target.dataset.date

                target.classList.add('selected')

            })

            days.append(li)

            day.add(1, 'days')
            
        }

    }
    
    render()    

})