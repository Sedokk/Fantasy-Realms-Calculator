import cards from './cards.js'

let hand;
const handNames = new Set();

function onClick(e) {
    if (handNames.size > 6) return

    let name;
    
    if (!e.target.classList.contains('cards__card')) name = e.target.closest('.cards__card').dataset.name
    else name = e.target.dataset.name

    handNames.add(name)

    hand = [...handNames].map(e => {
        const obj = cards.find(el => el.name == e)
        return e = obj
    })
    function insertion() {
        const handNode = document.querySelector('.hand__card-wrapper')
        const html = `
        <div class="hand__card">
            <span class="hand__card-name">${e.target.innerText.replace(/\d/g, '')}</span>
            <span class="hand__card-power">${hand.find(e => e.name === name).power}</span></span>
        </div>`
        handNode.insertAdjacentHTML('afterbegin', html)
    }
    insertion();
}

export {onClick, hand}