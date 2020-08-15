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

            photoPreview.closest('form').classList.add('cropping')
            photoPreview.src = reader.result

            new Cropper(photoPreview, {
                aspectRatio: 1 / 1,
                crop(event) {

                    document.querySelector('[name=x]').value = event.detail.x
                    document.querySelector('[name=y]').value = event.detail.y
                    document.querySelector('[name=width]').value = event.detail.width
                    document.querySelector('[name=height]').value = event.detail.height
                    
                }
            })

        }

        reader.readAsDataURL(file)

    }

})