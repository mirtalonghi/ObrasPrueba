console.log(document.querySelector('title').textContent)

function ajax(url, metodo='get') {
    let xhr = new XMLHttpRequest
    xhr.open(metodo,url)
    xhr.send()

    return xhr
}

function cargarNavbar(cb) {
    const header = document.querySelector('header')
    let xhr = ajax('plantillas/navbar.html')
    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            header.innerHTML = xhr.response
            if(cb) cb()
        }
    })
}

function getArchivo(id) {
    return 'plantillas/' + (id?id:'home') + '.html'
}

cargarNavbar(getPlantillasSinHistory)

function getPlantillasSinHistory(){
    const links = document.querySelectorAll('a')
    const main = document.querySelector('main')

    /* ---------------------- */
    /* Carga de vista inicial */
    /* ---------------------- */
    let archivo = getArchivo('home')
    //marcarLink(archivo)
    let xhr = ajax(archivo)
    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            main.innerHTML = xhr.response
        }
    })

     /* ---------------------- */
    /* Carga de vista elegida */
    /* ---------------------- */
    //console.log(links)
    links.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()

            let id = link.id
            //console.log(id)

            let archivo = getArchivo(id)
            //marcarLink(archivo)
            //console.log(archivo)

            let xhr = ajax(archivo)
            xhr.addEventListener('load', () => {
                if(xhr.status == 200) {
                    main.innerHTML = xhr.response
                    if (archivo === 'plantillas/formCont.html') {
                        activateValidations(xhr.response)
                    }
                }
            })

        })
    })

}

/* ---- Seccion Validaciones ---- */
//const page = window.open('plantillas/formCont.html')
function activateValidations(URL) {
        const page = URL
    //page.response.addEventListener
        //page.addEventListener('load', () => {
        let input = document.querySelectorAll('input')

        let camposValidos = [false];
        
        function algunCampoNoValido() {
            let val =  camposValidos[0]
            return !val
        }
        
        input.setCustomValidityJS = function (mensaje, dest) {
            //const nombre = document.getElementById("nombre")
            //obtengo el id de nombre del input
            let div = document.querySelectorAll('div')
            div[dest].innerHTML = mensaje
            div[dest].style.display = mensaje ? 'block' : 'none'
        }
        /* ---- Validador de nombre ---- */
        function validarNombre(valor) {
            let mensaje = ''
        
            let validador = /^[a-z]{3,20}$/i//regex
            if (!validador.test(valor)) {
                mensaje = 'Ingrese un nombre valido'
                input.setCustomValidityJS(mensaje,9)
                camposValidos[0] = false
                //button.disabled = algunCampoNoValido()
                return null
            }
        
            camposValidos[0] = true
            //button.disabled = algunCampoNoValido()
            input.setCustomValidityJS(mensaje,9)
            return valor
        }

        function validarApellido(valor) {
            let mensaje = ''
        
            let validador = /^[a-z]{3,20}$/i//regex
            if (!validador.test(valor)) {
                mensaje = 'Ingrese un apellido valido'
                input.setCustomValidityJS(mensaje,11)
                camposValidos[0] = false
                //button.disabled = algunCampoNoValido()
                return null
            }
        
            camposValidos[0] = true
            //button.disabled = algunCampoNoValido()
            input.setCustomValidityJS(mensaje,11)
            return valor
        }

        function validarEmail(valor) {
            let mensaje = ''

            let validador = /^\w+@\w+\.\w{2,3}(\.(ar))?$/
            if (!validador.test(valor)) {
                mensaje = 'Ingrese un email valido'
                input.setCustomValidityJS(mensaje,14)
                camposValidos[0] = false
                //button.disabled = algunCampoNoValido()
                return null
            }

            camposValidos[0] = true
            //button.disabled = algunCampoNoValido()
            input.setCustomValidityJS(mensaje,14)
            return valor
        }

        function validarTelefono(valor) {
            let mensaje = ''

            let validador = /^\d{10}$/
            if (!validador.test(valor)) {
                mensaje = 'Ingrese un telefono valido'
                input.setCustomValidityJS(mensaje,16)
                camposValidos[0] = false
                //button.disabled = algunCampoNoValido()
                return null
            }

            camposValidos[0] = true
            //button.disabled = algunCampoNoValido()
            input.setCustomValidityJS(mensaje,16)
            return valor
        }

        /* ---- Registro de Listeners ---- */
        input[0].addEventListener('input', () => {
        validarNombre(input[0].value)
        })

        input[1].addEventListener('input', () => {
        validarApellido(input[1].value)
        })

        input[2].addEventListener('input', () => {
        validarEmail(input[2].value)
        })

        input[3].addEventListener('input', () => {
        validarTelefono(input[3].value)
        })
        //if( !(/^\d{9}$/.test(valor)) )



        //////
        //const testDiv = page.document.getElementById('test')
        //testDiv.textContent = 'Hello world!'
    //})

}


