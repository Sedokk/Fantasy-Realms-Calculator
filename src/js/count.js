

import {onClick, hand} from './createCards.js'
import cards from './cards.js'

let points = 0;

let cardsInHand;

const cardsSuits = document.querySelectorAll('.cards__suit-wrapper')
const cardsBtn = document.querySelectorAll('.cards__card')
const handNode = document.querySelector('.hand__card-wrapper')
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
    cardsInHand = handNode.querySelectorAll('.hand__card');
}

// Удаление карт
const cardsAllowedNode = document.querySelector('.hand__cards-allowed')
const clearBtn = document.querySelector('.hand__clear')
clearBtn.addEventListener('click', onClearHand)
handNode.addEventListener('click', onClearCard)

function onClearHand() {
    hand.length = 0;
    handNode.innerHTML = '';
    points = 0;
    count(hand);
    cardsAllowedNode.innerText = 7;
}

function onClearCard(ev) {
    if (ev.target.classList.contains('hand__card') || ev.target.tagName === 'SPAN') {
        const deletingCard = ev.target.closest('.hand__card');
        const cardName = deletingCard.dataset.cardname
        deletingCard.remove();
        const cardInd = hand.findIndex(e => e.name === cardName)
        hand.splice(cardInd, 1);
        cardsRecovery(cardName)
        count(hand);
        if (cardName === 'necromancer') cardsAllowedNode.innerText = 7;
    }
}
function cardsRecovery(name) {
    //warship
    if(name === 'warship') {
        hand.forEach(e => {
            if (e.suit !== 'flood') return
            if (e.exeptions.blanking.includes('added')) {
                const armyIndex = e.exeptions.blanking.indexOf('added')
                e.exeptions.blanking.splice(armyIndex, 2)
            }
            if (e.exeptions.decreasing.includes('added')) {
                const armyIndex = e.exeptions.decreasing.indexOf('added')
                e.exeptions.decreasing.splice(armyIndex, 2)
            }
        })
    }
    // blocked
    // cleared
    // rangers
    // protection rune
    // island
    // wilds!!!
}

//Карты с выбором
//======================================================================
//Переменные для отслеживания изменяющей карты
let currentCard;
let currentCardName;
let currentBtn;
// При нажатии на кнопку Choose
function onChoose(ev) {
    ev.stopPropagation()
    currentCard = this.closest('.hand__card');
    currentCardName = currentCard.dataset.cardname;

    if (currentCardName === 'shapeshifter' || currentCardName === 'mirage') {
        //Массивы с мастями для каждого из джокеров
        const shapeshifter = ['artifact', 'leader', 'wizard', 'weapon', 'beast']
        const mirage = ['army', 'land', 'weather', 'flood', 'flame']
        cardsBtn.forEach(e => {
            e.removeEventListener('click', onCardBtnClick)
            e.addEventListener('click', onShapeshifterMirage)
        })
        //Убираю лишние масти
        cardsSuits.forEach(e => {
            if (currentCardName === 'mirage') {
                if (mirage.includes(e.dataset.suit)) return
                e.style.display = 'none'
            }
            if (currentCardName === 'shapeshifter') {
                if (shapeshifter.includes(e.dataset.suit)) return
                e.style.display = 'none'
            }
        })
        //Меняю функцию кнопки
        currentBtn = currentCard.querySelector('button')
        currentBtn.removeEventListener('click', onChoose)
        currentBtn.addEventListener('click', onCancelShapeshMirage)
        currentBtn.innerText = 'Cancel';
    }
    if (currentCardName === 'book of changes') {
        
    }
    if (currentCardName === 'doppelganger') {
        cardsBtn.forEach(e => {
            e.removeEventListener('click', onCardBtnClick)
        })
        handNode.removeEventListener('click', onClearCard)
        cardsInHand.forEach(e => {
            e.addEventListener('click', onDoppelganger)
        })
        //Меняю функцию кнопки
        currentBtn = currentCard.querySelector('button')
        currentBtn.removeEventListener('click', onChoose)
        currentBtn.addEventListener('click', onCancelDoppelganger)
        currentBtn.innerText = 'Cancel';
    }
    if (currentCardName === 'island') {

    }

    
}
function onDoppelganger(ev) {
    ev.stopPropagation();
    const name = ev.target.dataset.cardname;
    const obj = cards.find(e => e.name === name);
    const penalties = ['bl', 'bl self', 'dec each', 'dec pres', 'dec abs']
    const allowedActions = obj.action.filter(e => penalties.includes(e))
    const changedObj = {
        name,
        suit: obj.suit,
        power: obj.power,
        blanked: false,
        action: ['choose', ...allowedActions],
        names: {...obj.names},
        exeptions: {...obj.exeptions},
        number: {...obj.number},
    }
    const index = hand.findIndex(e => e.name === currentCardName)
    hand.splice(index, 1, changedObj)
    const cardNameNode = currentCard.querySelector('.hand__card-name')
    const cardPowerNode = currentCard.querySelector('.hand__card-power')
    cardNameNode.innerText = name;
    cardPowerNode.innerText = changedObj.power;
    count(hand)
    //Возвращаю всё как было
    cardsBtn.forEach(e => {
        e.addEventListener('click', onCardBtnClick)
    })
    cardsInHand.forEach(e => {
        e.removeEventListener('click', onDoppelganger)
    })
    currentBtn.removeEventListener('click', onCancelDoppelganger)
    currentBtn.addEventListener('click', onChoose)
    currentBtn.innerText = 'Choose'
    currentCard = '';
    currentCardName = '';
    currentBtn = '';
    handNode.addEventListener('click', onClearCard)
}
function onCancelDoppelganger(ev) {
    ev.stopPropagation()
    cardsBtn.forEach(e => {
        e.addEventListener('click', onCardBtnClick)
    })
    cardsInHand.forEach(e => {
        e.removeEventListener('click', onDoppelganger)
    })
    currentBtn.removeEventListener('click', onCancelDoppelganger)
    currentBtn.addEventListener('click', onChoose)
    currentBtn.innerText = 'Choose'
    handNode.addEventListener('click', onClearCard)
}
function onCancelShapeshMirage() {
    cardsBtn.forEach(e => {
        e.removeEventListener('click', onShapeshifterMirage)
        e.addEventListener('click', onCardBtnClick)
    })
    currentBtn.removeEventListener('click', onCancelShapeshMirage)
    currentBtn.addEventListener('click', onChoose)
    currentBtn.innerText = 'Choose'
    //Возвращаю масти
    cardsSuits.forEach(e => {
        e.style.display = '';
    })
}
// Для shapeshifter и mirage
function onShapeshifterMirage(ev) {
    const name = ev.target.closest('.cards__card').dataset.name
    //Создаю объект карты без силы, бонусов и тд
    const cardObj = cards.find(e => e.name === name);

    
    const changedCardObj = {
        name,
        suit: cardObj.suit,
        power: 0,
        status: [],
        action: ['choose'],
        names: {},
        exeptions: {},
        number: {},
    }
    //Меняю изменяющую карту на новую(выбранную)
    const index = hand.findIndex(e => e.name === currentCardName)
    hand.splice(index, 1, changedCardObj)
    const cardNameNode = currentCard.querySelector('.hand__card-name')
    cardNameNode.innerText = name;
    count(hand)
    //Возвращаю всё как было
    cardsBtn.forEach(e => {
        e.removeEventListener('click', onShapeshifterMirage)
        e.addEventListener('click', onCardBtnClick)
    })
    currentBtn.removeEventListener('click', onCancelShapeshMirage)
    currentBtn.addEventListener('click', onChoose)
    currentBtn.innerText = 'Choose'
    cardsSuits.forEach(e => {
        e.style.display = '';
    })
    currentCard = '';
    currentCardName = '';
    currentBtn = '';
}



//=====================================================
//base functions

function blanking(arr) {
    arr.forEach(e => {
        if(!e.action.includes('bl')) return

        arr.forEach(el => {
            if(e.exeptions.blanking.includes(el.name) || e.exeptions.blanking.includes(el.suit)) return;
            if(e.names.blanking.includes(el.name) || e.names.blanking.includes(el.suit)) el.status.push('blanked');  
        })
    });

    blankingSelf(arr);
}

function blankingSelf(arr) {
    arr.forEach(e => {
        if(!e.action.includes('bl self')) return

        const exeptions = arr.some(el => e.exeptions.blanking.includes(el.name) || e.exeptions.blanking.includes(el.suit))
        const names = arr.some(el => e.names.blanking.includes(el.name) || e.names.blanking.includes(el.suit))
        if(exeptions || !names) e.status.push('blanked');
    });
}

function clearing(arr) {
    arr.forEach(e => {
        if(!e.action.includes('clearing card')) return
        arr.forEach(el => {
            if(e.names.clearing.includes(el.name) || e.names.clearing.includes(el.suit)) {
                el.blanked = false;
                el.cleared = true;
                console.log('cleared: ', el.name);
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
        if (e.status.includes('blanked') && !e.status.includes('cleared')) return

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

        if (e.status.includes('blanked') || e.status.includes('cleared')) return

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
        if(!e.status.includes('blanked') || e.status.includes('cleared')) {
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
    if (arr.length > 0) {
        arr.forEach(e => e.status = [])
    }
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








