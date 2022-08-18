import cards from './cards.js'

let hand = [];
const cardsAllowedNode = document.querySelector('.hand__cards-allowed')
const handNode = document.querySelector('.hand__card-wrapper')

function onClick(e) {

    let allowedAmount;
    if (e.target.dataset.name === 'necromancer' || hand.some(e => e.name === 'necromancer')) {
        allowedAmount = 7;
        cardsAllowedNode.innerText = 8;
    } else {
        allowedAmount = 6;
        cardsAllowedNode.innerText = 7;
    }

    if (hand.length > allowedAmount) return

    const name = e.target.closest('.cards__card').dataset.name

    if (hand.some(e => e.name === name)) return

    const obj = _.cloneDeep(cards.find(e => e.name === name))
    hand.push(obj)
    
    render(obj);
}

function render(obj) {
        
    let btnHTML = '';
    if (obj.action.includes('choose')) {
        btnHTML = '<button class="hand__card-btn">Choose</button>'
    }
    const html = `
    <div class="hand__card" data-cardname = "${obj.name}">
        <span class="hand__card-name">${obj.name}</span>
        <span class="hand__card-power">${obj.power}</span></span>
        <div class="hand__card-color hand__card-color_${obj.suit}"></div>
        ${btnHTML}
    </div>`
    
    handNode.insertAdjacentHTML('beforeend', html)
    
    
}


export {onClick, hand, render}