import cards from './cards.js'
import onChoose from './count.js'

let hand;
const handNames = [];
const cardsAllowedNode = document.querySelector('.hand__cards-allowed')
const handNode = document.querySelector('.hand__card-wrapper')

function onClick(e) {

    let allowedAmount;
    if (e.target.dataset.name === 'necromancer' || handNames.includes('necromancer')) {
        allowedAmount = 7;
        cardsAllowedNode.innerText = 8;
    } else {
        allowedAmount = 6;
        cardsAllowedNode.innerText = 7;
    }

    if (handNames.length > allowedAmount) return

    let name;
    
    if (!e.target.classList.contains('cards__card')) name = e.target.closest('.cards__card').dataset.name
    else name = e.target.dataset.name
    if (handNames.includes(name)) return

    handNames.push(name)

    hand = [...handNames].map(e => {
        const obj = cards.find(el => el.name == e)
        return e = obj
    })
    
    render();
}

function render() {
    handNode.innerHTML = '';
    hand.forEach(elem => {
        
        let btnHTML = '';
        if (elem.action.includes('choose')) {
            btnHTML = '<button class="hand__card-btn">Choose</button>'
        }
        const html = `
        <div class="hand__card" data-cardname = "${elem.name}">
            <span class="hand__card-name">${elem.name}</span>
            <span class="hand__card-power">${elem.power}</span></span>
            ${btnHTML}
        </div>`
        
        handNode.insertAdjacentHTML('afterbegin', html)
    });
    
}


export {onClick, hand, render, handNames}