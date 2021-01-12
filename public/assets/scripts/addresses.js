import { appendTemplate, formatZipcode } from "./utils";

const addressList = [{
    id: 1,
    zipcode: '01310100',
    address: 'Av. Paulista',
    number: '1009',
    complement: '9° andar',
    district: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil'
}];

const renderAddressList = element => {

    const target = element.querySelector('.addresses');

    target.innerHTML = '';

    addressList.forEach(item => {

        appendTemplate(target, "label", `
            <div>
                <input type="radio" name="address" value="${item.id}" />
                <div class="circle">
                    <div></div>
                </div>
                <address>
                    <strong>${item.address}, ${item.number}</strong><br />
                    ${item.district}<br />
                    ${item.city} - ${item.state}<br />
                    ${formatZipcode(item.zipcode)}
                </address>
            </div>
            <a href="schedules-address-update.html" class="btn-update">Editar</a>
        `);

    });

}

document.querySelectorAll('#schedules-address').forEach(addressesElement => {

    renderAddressList(addressesElement);

})