

import {onClick, hand} from './createCards.js'

let points = 0;

const cardsBtn = document.querySelectorAll('.cards__card')
cardsBtn.forEach(e => {
    e.addEventListener('click', (ev) => {
        points = 0;
        onClick(ev)
        if (hand.length > 0) count(hand);
    })
})


//==========================
//base functions

function blanking(arr) {
    arr.forEach(e => {
        if(!e.action.includes('bl')) return

        arr.forEach(el => {
            if(e.exeptions.blanking.includes(el.name) || e.exeptions.blanking.includes(el.suit)) return
            if(e.names.blanking.includes(el.name) || e.names.blanking.includes(el.suit)) el.blanked = true;
        })
    });

    blankingSelf(arr);
}

function blankingSelf(arr) {
    arr.forEach(e => {
        if(!e.action.includes('bl self')) return

        const exeptions = arr.some(el => e.exeptions.blanking.includes(el.name) || e.exeptions.blanking.includes(el.suit))
        const names = arr.some(el => e.names.blanking.includes(el.name) || e.names.blanking.includes(el.suit))
        if(exeptions || !names) e.blanked = true;
        
    });
}

function clearing(arr) {
    arr.forEach(e => {
        if(!e.action.includes('clearing card')) return
        arr.forEach(el => {
            if(e.names.clearing.includes(el.name) || e.names.clearing.includes(el.suit)) {
                el.blanked = false;
                el.cleared = true;
                console.log('pardoned: ', el.name);
            }
        })
    });
}

function countingInc(arr) {

    arr.forEach(e => {
        const actions = e.action;
        const namesInc = e.names.increasing;
        const pointsInc = e.number.increasing;
        const exeptionsInc = e.exeptions.increasing;

        if (actions.includes('inc each')) {
            const matchedArr = arr.filter(el => (namesInc.includes(el.name) || namesInc.includes(el.suit)) && (!exeptionsInc.includes(el.name) && !exeptionsInc.includes(el.suit)))
            points += matchedArr.length * pointsInc
            console.log('increased: ', matchedArr.length * pointsInc + ' points by', e.name);
        }

        if (actions.includes('inc pres')) {
            const matched = arr.some(el => namesInc.includes(el.name) || namesInc.includes(el.suit));
            if (matched) points += pointsInc
            if (matched) console.log('increased: ', pointsInc + ' points by', e.name);
        }

        if (actions.includes('inc abs')) {
            const matched = arr.some(el => namesInc.includes(el.name) || namesInc.includes(el.suit));
            if (!matched) points += pointsInc
            if (!matched) console.log('increased: ', pointsInc + ' points by', e.name);
        }

        if (actions.includes('inc pres all')) {
            const matched = namesInc.filter(el => arr.find(elem => elem.name === el || elem.suit === el))
            if (matched.length === namesInc.length) points += pointsInc
            if (matched.length === namesInc.length) console.log('increased: ', pointsInc + ' points by', e.name);
        }
    })
}
function countingDec(arr) {

    arr.forEach(e => {
        const actions = e.action;
        const namesDec = e.names.decreasing;
        const pointsDec = e.number.decreasing;
        const exeptionsDec = e.exeptions.decreasing;

        if (e.cleared) return

        if (actions.includes('dec each')) {
            const matchedArr = arr.filter(el => (namesDec.includes(el.name) || namesDec.includes(el.suit)) && (!exeptionsDec.includes(el.name) && !exeptionsDec.includes(el.suit)))
            points -= matchedArr.length * pointsDec
            console.log('decreased: ', matchedArr.length * pointsDec + ' points by', e.name);
        }

        if (actions.includes('dec pres')) {
            const matched = arr.some(el => namesDec.includes(el.name) || namesDec.includes(el.suit));
            if (matched) points -= pointsDec
            if (matched) console.log('decreased: ', pointsDec + ' points by', e.name);
        }

        if (actions.includes('dec abs')) {
            const matched = arr.some(el => namesDec.includes(el.name) || namesDec.includes(el.suit));
            if (!matched) points -= pointsDec
            if (!matched) console.log('decreased: ', pointsDec + ' points by', e.name);
        }
    })
}

function countingBasePower(arr) {
    arr.forEach(e => {
        if(e.blanked === false) {
            points += e.power
        }
    })
    console.log('base:', points);
}


function specialsPlus(arr) {
    arr.forEach(e => {
        if(!e.action.includes('special plus')) return
        points += e.special(arr)
    })
}

function specialsClear(arr) {
    arr.forEach(e => {
        if(!e.action.includes('special clear')) return
        e.special(arr)
    })
}

function specialsBefore(arr) {
    arr.forEach(e => {
        if(!e.action.includes('special before')) return
        e.special(arr)
    })
}



//=================================
//call

const pointsNode = document.querySelector('.hand__points')
const cardCountNode = document.querySelector('.hand__cards-amount')

function count(arr) {
    specialsBefore(arr);
    blanking(arr);
    clearing(arr);
    specialsClear(arr);
    countingBasePower(arr);
    countingInc(arr);
    specialsPlus(arr);
    countingDec(arr);
    console.log(points);
    console.log(hand);
    pointsNode.innerText = points;
    cardCountNode.innerText = hand.length
}









