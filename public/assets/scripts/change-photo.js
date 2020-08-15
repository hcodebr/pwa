const inputFile = document.querySelector('#file')
const btnChoosePhoto = document.querySelector('.choose-photo')
const photoPreview = document.querySelector('#photo-preview')

btnChoosePhoto.addEventListener('click', e => {

    inputFile.click()

})

inputFile.addEventListener('change', e => {

    if (e.target.files.length) {
        
        const file = e.target.files[0]

        const reader = new FileReader()

        reader.onload = () => {

            photoPreview.src = reader.result

        }

        reader.readAsDataURL(file)

    }

})