//Referencia

const form = document.querySelector('form');

form.addEventListener('submit', () => {

    fetch('http://localhost:4000/api/articulos', {
        method: 'GET'
    }).then(resp=> resp.json())

});