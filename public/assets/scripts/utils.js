export function formatCurrency(value) {

    return parseFloat(value).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
    });

}

export function appendTemplate(element, wrapTagName, html) {

    const wrapElement = document.createElement(wrapTagName);

    wrapElement.innerHTML = html;

    element.appendChild(wrapElement);

    return wrapElement;

}

export function getQueryString() {

    const params = {};

    window.location.search.split('?')[1].split("&").forEach(param => {

        param = param.split("=");

        //params[param[0]] = decodeURIComponent(param[1]);

        const value = decodeURIComponent(param[1]);

        if (params[param[0]]) {

            params[param[0]] = [...params[param[0]], value];

        } else {
            params[param[0]] = value;
        }

    });

    return params;

}

export function setFormValues(form, values) {

    Object.keys(values).forEach(key => {

        form.querySelectorAll(`[name=${key}]`).forEach(field => field.value = values[key]);

    });

}

export function formatZipcode(value) {

    return value.substr(0, 5) + '-' + value.substr(5, 3);

}