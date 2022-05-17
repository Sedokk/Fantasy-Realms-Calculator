

const handNode = document.querySelector('.hand__card-wrapper');
const cardBtns = document.querySelectorAll('.cards__card');
const cardsAmount = document.querySelector('.hand__cards-amount');


function onCardClick(e) {

    if (handNode.childNodes.length < 7) {

        createCard(e)

    }


    //=========================
    //Counts amount of cards in hand
    const nodesInHand = handNode.childNodes;
    const cardsInHand = [...nodesInHand].filter(e => {
        return e.classList.contains('hand__card')
    })
    cardsAmount.innerText = cardsInHand.length;
    //===========================

    console.log();
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