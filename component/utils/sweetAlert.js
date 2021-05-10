import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const swallOnCatch = (timerInterval) => Swal.fire({
    title: 'Try to catch the pokemon',
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
    title:`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} successfully caught, Give your pokemon name`,
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
    title: `${name.charAt(0).toUpperCase() + name.slice(1)} - ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} is yours`,
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