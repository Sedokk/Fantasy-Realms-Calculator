

const handNode = document.querySelector('.hand__card-wrapper');
const cardBtns = document.querySelectorAll('.cards__card');
const cardsAmount = document.querySelector('.hand__cards-amount');


function onCardClick(e) {

    if (isSevenCards()) {

        createCard(e)

    }
    
    cardsAmount.innerText = handNode.childNodes.length;

    console.log(handNode.childNodes.length);
}

function isSevenCards() {
    return handNode.childNodes.length < 7
}

function createCard(e) {
    const name = e.target.innerText.replace(/\d/g, '')
    const value = e.target.innerText.replace(/\D/g, '')

    const handBlock = document.createElement('div')
    const handName = document.createElement('span')
    const handValue = document.createElement('span')

    handName.innerText = name;
    handValue.innerText = value;

    handBlock.classList.add('hand__card')
    handName.classList.add('hand__card-name')
    handValue.classList.add('hand__card-power')

    handBlock.prepend(handName)
    handBlock.append(handValue)

    handNode.prepend(handBlock)
}



[...cardBtns].forEach(e => {
    e.addEventListener('click', onCardClick)
})