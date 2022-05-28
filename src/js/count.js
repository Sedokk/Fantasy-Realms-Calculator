
let hand = []

let points = 0;

const cards = [
    {
        name: 'rangers',
        suit: 'army',
        power: 5,
        blanked: false,
        action: ['inc each', 'pardon'],
        names: {
            increasing: ['land'],
            pardoning: ['army'],
        },
        exeptions: [],
        number: {
            increasing: 10,
            decreasing: 0,
            extra: 0,
        },
    },
    {
        name: 'forest',
        suit: 'land',
        power: 7,
        blanked: false,
        action: ['inc each'],
        names: {
            increasing: ['beast', 'elven archers'],
            unblanking: [],
            blanking: ['army', 'leader', 'beast']
        },
        exeptions: ['basilisk'],
        number: {
            increasing: 0,
            decreasing: 0,
            extra: 0,
        },
    },
    {
        name: 'elven archers',
        suit: 'army',
        power: 10,
        blanked: false,
        action: ['inc abs'],
        names: {
            increasing: ['weather'],
            unblanking: [],
            blanking: []
        },
        exeptions: [],
        number: {
            increasing: 5,
            decreasing: 0,
            extra: 0,
        },
    },
    {
        name: 'lightning',
        suit: 'flame',
        power: 11,
        blanked: false,
        action: ['inc pres'],
        names: {
            increasing: ['rainstorm'],
            unblanking: [],
        },
        exeptions: [],
        number: {
            increasing: 30,
            decreasing: 0,
            extra: 0,
        },
    },
    {
        name: 'rainstorm',
        suit: 'weather',
        power: 8,
        blanked: false,
        action: ['inc each', 'bl'],
        names: {
            increasing: ['flood'],
            blanking: ['flame'],
        },
        exeptions: ['lightning'],
        number: {
            increasing: 10,
            decreasing: 0,
            extra: 0,
        },
    },
    {
        name: 'candle',
        suit: 'flame',
        power: 2,
        blanked: false,
        action: ['inc pres all'],
        names: {
            increasing: ['book of changes', 'bell tower', 'wizard']
        },
        exeptions: [],
        number: {
            increasing: 100,
            decreasing: 0,
            extra: 0,
        },
    },
    {
        name: 'elven longbow',
        suit: 'weapon',
        power: 3,
        blanked: false,
        action: ['inc pres'],
        names: {
            increasing: ['elven archers', 'warlord', 'beastmaster'],
            unblanking: [],
            blanking: []
        },
        exeptions: [],
        number: {
            increasing: 30,
            decreasing: 0,
            extra: 0,
        },
    },
    
]

hand = ['rangers', 'forest', 'lightning', 'candle', 'elven archers', 'elven longbow', 'rainstorm']

const handObj = hand.map(e => {
    const obj = cards.find(el => el.name == e)
    return e = obj
})




function blanking(arr) {
    arr.forEach(e => {
        if(!e.action.includes('bl')) {
            return
        }

        arr.forEach(el => {
            
            if(e.exeptions.includes(el.name) || e.exeptions.includes(el.suit)) {
                return
            }

            if(e.names.blanking.includes(el.name) || e.names.blanking.includes(el.suit)) {
                el.blanked = true;
            }
            
        })
    });
    blankingSelf(arr);
}

function blankingSelf(arr) {
    arr.forEach(e => {
        if(!e.action.includes('bl self')) {
            return
        }

        const exeptions = arr.some(el => {
            if(e.exeptions.includes(el.name) || e.exeptions.includes(el.suit)) {
                return true;
            }
        })
        const names = arr.some(el => {
            if(e.names.blanking.includes(el.name) || e.names.blanking.includes(el.suit)) {
                return true;
            }
        })
        if(exeptions || !names) e.blanked = true;
        
    });
}

function pardoning(arr) {
    arr.forEach(e => {
        if(!e.action.includes('pardon')) {
            return
        }

        arr.forEach(el => {

            if(e.names.pardoning.includes(el.name) || e.names.pardoning.includes(el.suit)) {
                el.blanked = false;
                el.pardoned = true;
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

        if (actions.includes('inc each')) {
            const matchedArr = arr.filter(el => (namesInc.includes(el.name) || namesInc.includes(el.suit)) && (!e.exeptions.includes(el.name) && !e.exeptions.includes(el.suit)))
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

        if (actions.includes('dec each')) {
            const matchedArr = arr.filter(el => (namesDec.includes(el.name) || namesDec.includes(el.suit)) && (!e.exeptions.includes(el.name) && !e.exeptions.includes(el.suit)))
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

blanking(handObj);
pardoning(handObj);
countingBasePower(handObj);
countingInc(handObj);
countingDec(handObj);
console.log(handObj);
console.log(points);