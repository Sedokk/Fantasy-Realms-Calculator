import cards from './cards.js'

let hand;
const handNames = new Set;

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
}

export {onClick, hand}