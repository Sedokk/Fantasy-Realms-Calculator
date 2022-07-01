

import {onClick, hand, render, handNames} from './createCards.js'
import cards from './cards.js'

let points = 0;

const cardsBtn = document.querySelectorAll('.cards__card')
cardsBtn.forEach(e => {
    e.addEventListener('click', onCardBtnClick)
})
function onCardBtnClick(ev) {
    points = 0;
    onClick(ev)
    if (hand.length > 0) count(hand);
    const chooseBtns = document.querySelectorAll('.hand__card-btn')
    // Добавляем события на кнопки Choose
    chooseBtns.forEach(el => {
        el.addEventListener('click', onChoose)
    })
}

//Переменные для отслеживания изменяющей карты
let currentCard;
let currentCardName;
let currentBtn;
// При нажатии на кнопку Choose
function onChoose() {
    currentCard = this.closest('.hand__card');
    currentCardName = currentCard.dataset.cardname;

    if (currentCardName === 'shapeshifter' || currentCardName === 'mirage') {
        cardsBtn.forEach(e => {
            e.removeEventListener('click', onCardBtnClick)
            e.addEventListener('click', onChooseCardBtnClick)
        })
        //Меняю функцию кнопки
        currentBtn = currentCard.querySelector('button')
        currentBtn.removeEventListener('click', onChoose)
        currentBtn.addEventListener('click', onCancel)
        currentBtn.innerText = 'Cancel';
    }
    if (currentCardName === 'book of changes') {
        
    }
    if (currentCardName === 'doppelganger') {

    }
    if (currentCardName === 'island') {

    }

    
}
function onCancel() {
    cardsBtn.forEach(e => {
        e.removeEventListener('click', onChooseCardBtnClick)
        e.addEventListener('click', onCardBtnClick)
    })
    currentBtn.removeEventListener('click', onCancel)
    currentBtn.addEventListener('click', onChoose)
    currentBtn.innerText = 'Choose'
}
// Для shapeshifter и mirage
function onChooseCardBtnClick(ev) {
    //Массивы с мастями для каждого из джокеров
    const shapeshifter = ['artifact', 'leader', 'wizard', 'weeapon', 'beast']
    const mirage = ['army', 'land', 'weather', 'flood', 'flame']
    const name = ev.target.closest('.cards__card').dataset.name
    //Создаю объект карты без силы, бонусов и тд
    const cardObj = cards.find(e => e.name === name);
    if (currentCardName === 'mirage') {
        if (!mirage.includes(cardObj.suit)) return
    }
    if (currentCardName === 'shapeshifter') {
        if (!shapeshifter.includes(cardObj.suit)) return
    }
    const changedCardObj = {
        name,
        suit: cardObj.suit,
        power: 0,
        blanked: false,
        action: ['choose'],
        names: {},
        exeptions: {},
        number: {},
    }
    //Меняю изменяющую карту на новую(выбранную)
    const index = handNames.indexOf(currentCardName)
    handNames.splice(index, 1, name)
    hand.splice(index, 1, changedCardObj)
    const cardNameNode = currentCard.querySelector('.hand__card-name')
    cardNameNode.innerText = name;
    count(hand)
    //Возвращаю всё как было
    cardsBtn.forEach(e => {
        e.removeEventListener('click', onChooseCardBtnClick)
        e.addEventListener('click', onCardBtnClick)
    })
    currentBtn.removeEventListener('click', onCancel)
    currentBtn.addEventListener('click', onChoose)
    currentBtn.innerText = 'Choose'
    currentCard = '';
    currentCardName = '';
    currentBtn = '';
}

const cardsAllowedNode = document.querySelector('.hand__cards-allowed')
const clearBtn = document.querySelector('.hand__clear')
clearBtn.addEventListener('click', onClearHand)

function onClearHand() {
    hand.length = 0;
    handNames.length = 0;
    render();
    points = 0;
    count(hand);
    cardsAllowedNode.innerText = 7;
}

const handNode = document.querySelector('.hand__card-wrapper')
handNode.addEventListener('click', onClearCard)

function onClearCard(ev) {
    if (ev.target.classList.contains('hand__card') || ev.target.tagName === 'SPAN') {
        const deletingCard = ev.target.closest('.hand__card');
        const cardName = deletingCard.dataset.cardname
        deletingCard.remove();
        const cardInd = handNames.indexOf(cardName)
        handNames.splice(cardInd, 1);
        hand.splice(cardInd, 1);
        count(hand);
        if (cardName === 'necromancer') cardsAllowedNode.innerText = 7;
    }
}

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
    points = 0;
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


//=======================
//export
export default onChoose








