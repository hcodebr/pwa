const btnSummaryToggle = document.getElementById('btn-summary-toggle')

if (btnSummaryToggle) {
    btnSummaryToggle.addEventListener('click', e => {
        btnSummaryToggle.closest('aside').classList.toggle('open')
    })
}