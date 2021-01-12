import Cropper from 'cropperjs';

document.querySelectorAll('#change-photo').forEach(changePhotoElement => {

    let cropper = null
    const inputFile = changePhotoElement.querySelector('#file')
    const btnChoosePhoto = changePhotoElement.querySelector('.choose-photo')
    const photoPreview = changePhotoElement.querySelector('#photo-preview')
    const form = changePhotoElement.querySelector('#form-change-photo')

    form.addEventListener('submit', e => {

        e.preventDefault()

        if (cropper) {

            photoPreview.src = cropper.getCroppedCanvas().toDataURL("image/png")

            cropper.getCroppedCanvas().toBlob(blob => {

                console.log(blob)

            })

            cropper.destroy()

            console.log(changePhotoElement.querySelector('[name=x]').value)
            console.log(changePhotoElement.querySelector('[name=y]').value)
            console.log(changePhotoElement.querySelector('[name=width]').value)
            console.log(changePhotoElement.querySelector('[name=height]').value)

        }

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

                cropper = new Cropper(photoPreview, {
                    aspectRatio: 1 / 1,
                    crop(event) {

                        const { x, y, width, height } = event.detail

                        changePhotoElement.querySelector('[name=x]').value = x
                        changePhotoElement.querySelector('[name=y]').value = y
                        changePhotoElement.querySelector('[name=width]').value = width
                        changePhotoElement.querySelector('[name=height]').value = height

                    }
                })

            }

            reader.readAsDataURL(file)

        }

    })

});
