import axios from 'axios';
import IMask from 'imask';
import { setFormValues } from './utils';

document.querySelectorAll('.zipcode').forEach(zipcodeElement => {

    const form = zipcodeElement.closest('form')
    const button = zipcodeElement.querySelector('button')
    const input = zipcodeElement.querySelector('[name=zipcode]')

    new IMask(input, {
        mask: '00000-000'
    })

    const searchZipcode = () => {

        button.disabled = true;
        button.innerHTML = 'Buscando...';

        const number = input.value.replace('-', '')

        axios({
            url: `https://viacep.com.br/ws/${number}/json/`
        })
            .then(response => {

                const {erro, logradouro, complemento, bairro, localidade, uf} = response.data;

                if (!erro) {

                    setFormValues(form, {
                        address: logradouro,
                        complement: complemento,
                        district: bairro,
                        city: localidade,
                        state: uf,
                        country: 'Brasil',
                    })

                    form.querySelector('[name=number]').focus()

                } else {

                    input.select()

                }

            })
            .catch(err => console.error(err))
            .finally(() => {

                button.disabled = false;
                button.innerHTML = 'Buscar';

            })

    }

    input.addEventListener('change', e => {

        if (input.value.length >= 8) {
            searchZipcode();
        }

    });

    input.addEventListener('paste', e => {

        if (input.value.length >= 8) {
            searchZipcode();
        }

    });

    input.addEventListener('keydown', e => {

        if (e.key === 'Enter' && input.value.length >= 8) {
            e.preventDefault();
            searchZipcode();
        }

    });

    button.addEventListener('click', e => {

        if (input.value.length >= 8) {
            searchZipcode();
        }

    })

});
