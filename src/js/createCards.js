import cards from './cards.js'

let hand;
const handNames = [];

function onClick(e) {
    if (handNames.length > 6) return

    let name;
    
    if (!e.target.classList.contains('cards__card')) name = e.target.closest('.cards__card').dataset.name
    else name = e.target.dataset.name
    if (handNames.includes(name)) return

    handNames.push(name)

    hand = [...handNames].map(e => {
        const obj = cards.find(el => el.name == e)
        return e = obj
    })
    function insertion() {
        const handNode = document.querySelector('.hand__card-wrapper')
        handNode.innerHTML = '';
        hand.forEach(elem => {
            
            let btnHTML = '';
            if (elem.action.includes('choose')) {
                btnHTML = '<button class="hand__card-btn">Choose</button>'
            }
            const html = `
            <div class="hand__card">
                <span class="hand__card-name">${elem.name}</span>
                <span class="hand__card-power">${elem.power}</span></span>
                ${btnHTML}
            </div>`
            
            handNode.insertAdjacentHTML('afterbegin', html)
        });
        
    }
    insertion();
    
}

export {onClick, hand}