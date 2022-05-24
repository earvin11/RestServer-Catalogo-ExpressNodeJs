    
const url = 'http://localhost:4000/api/articulos'

//Referencias HTML

const formEnviar = document.querySelector('form');

formEnviar.addEventListener('submit', ev =>{
    ev.preventDefault();

    const formData = {};
    

    for( let el of formEnviar.elements ) {

        if(el.name.length > 0) {

            formData[el.name] = el.value;
        }

    }

    fetch( url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
    })
    .then( console.log(formData))
    .then( console.log(formData) )
    .catch( err => {
        console.log(err)
    })
    
})