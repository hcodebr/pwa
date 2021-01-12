import { appendTemplate, formatCurrency, getQueryString, setFormValues } from "./utils";

const serviceOptions = [{
    id: 1,
    name: 'Revisão',
    description: 'Verificação mínima necessária.',
    price: 100
}, {
    id: 2,
    name: 'Alinhamento',
    description: 'Alinhamento e balanceamento.',
    price: 350.99
}, {
    id: 3,
    name: 'Filtros',
    description: 'Troca do filtro de ar e combustível.',
    price: 200
}];

let serviceSummary = [];

const renderServiceOptions = (serviceElement) => {

    const optionsEl = serviceElement.querySelector(".options");

    optionsEl.innerHTML = '';

    serviceOptions.forEach(item => {

        const label = appendTemplate(optionsEl, "label", `
            <input type="checkbox" name="service" value="${item.id}" />
            <div class="square">
                <div></div>
            </div>
            <div class="content">
                <span class="name">${item.name}</span>
                <span class="description">${item.description}</span>
                <span class="price">${formatCurrency(item.price)}</span>
            </div>
        `);

        label.querySelector('[type="checkbox"]').addEventListener("change", e => {

            const { checked, value } = e.target;

            if (checked) {

                const item = serviceOptions.filter(option => Number(option.id) === Number(value))[0];

                serviceSummary.push(item);

            } else {

                serviceSummary = serviceSummary.filter(option => Number(option.id) !== Number(value));

            }

            serviceSummary.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                } else {
                    return 0;
                }
            });

            renderServiceSummary(serviceElement);

        });

    });

}

const renderServiceSummary = (serviceElement) => {

    const tbodyEl = serviceElement.querySelector("aside tbody");

    tbodyEl.innerHTML = '';

    serviceSummary.forEach(item => {

        appendTemplate(tbodyEl, "tr", `
            <td>${item.name}</td>
            <td class="price">${formatCurrency(item.price)}</td>
        `);

    });

    const totalEl = serviceElement.querySelector("footer .total");

    const total = serviceSummary.reduce((total, item) => total + item.price, 0);

    totalEl.innerHTML = formatCurrency(total);

}

document.querySelectorAll("#schedules-services").forEach(serviceElement => {

    renderServiceOptions(serviceElement);

    renderServiceSummary(serviceElement);

    const params = getQueryString();

    setFormValues(serviceElement.querySelector("form"), params);

});