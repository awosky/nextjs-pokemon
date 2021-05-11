import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const swallOnCatch = (timerInterval) => Swal.fire({
    text: 'Try to catch the pokemon',
    html: 'Say adacadabra to catch and make pokemon yours',
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        const content = Swal.getContent()
        if (content) {
            const b = content.querySelector('b')
            if (b) {
            b.textContent = Swal.getTimerLeft()
            }
        }
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
})

export const swallOnCapture = (pokemon) => Swal.fire({
    text:`${pokemon.name} successfully caught, give your pokemon name`,
    imageUrl: `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`,
    input: 'text',
    inputAttributes: {
    autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Submit',
    showLoaderOnConfirm: true,
    preConfirm: (data) => {
    return data
    },
    allowOutsideClick: () => !Swal.isLoading()
})

export const swallOnCaptureSuccess = (pokemon, name) => Swal.fire({
    text: `${name} - ${pokemon.name} is yours`,
    icon: 'success'
})


export const swallOnCatchError = () => Swal.fire({
    icon: 'error',
    title: 'Failed',
    text: 'The pokemon run away, try again with louder adacadabra okay',
})

export const swallOnCaptureError = () => Swal.fire({
    icon: 'error',
    title: 'Failed',
    text: 'That name is already used.. try again !',
})

export const swallOnRelease = () => Swal.fire({
    text: 'Are you sure to release this pokemon?',
    showCancelButton: true,
    confirmButtonText: `Yes`,
  })