

const handNode = document.querySelector('.hand__card-wrapper');

const cardBtns = document.querySelectorAll('.cards__card');


function onCardClick(e) {
    
    const name = e.target.innerText.replace(/\d/g, '')
    const value = e.target.innerText.replace(/\D/g, '')

    console.log(name, value);
}



[...cardBtns].forEach(e => {
    e.addEventListener('click', onCardClick)
})