import Cropper from 'cropperjs';

document.querySelectorAll('#change-photo').forEach(changePhotoElement => {

    const inputFile = changePhotoElement.querySelector('#file')
    const btnChoosePhoto = changePhotoElement.querySelector('.choose-photo')
    const photoPreview = changePhotoElement.querySelector('#photo-preview')
    const form = changePhotoElement.querySelector('#form-change-photo')

    form.addEventListener('submit', e => {

        e.preventDefault()

        console.log(changePhotoElement.querySelector('[name=x]').value)
        console.log(changePhotoElement.querySelector('[name=y]').value)
        console.log(changePhotoElement.querySelector('[name=width]').value)
        console.log(changePhotoElement.querySelector('[name=height]').value)

    })

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

                        changePhotoElement.querySelector('[name=x]').value = event.detail.x
                        changePhotoElement.querySelector('[name=y]').value = event.detail.y
                        changePhotoElement.querySelector('[name=width]').value = event.detail.width
                        changePhotoElement.querySelector('[name=height]').value = event.detail.height
                        
                    }
                })

            }

            reader.readAsDataURL(file)

        }

    })

});
