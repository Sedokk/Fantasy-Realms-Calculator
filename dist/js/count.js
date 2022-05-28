
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
            unblanking: ['army'],
            pardoning: ['weapon'],
        },
        exeptions: [],
        number: {
            increasing: 10,
            decreasing: 0,
            extra: 0,
        },
    },
    {
        name: 'basilisk',
        suit: 'beast',
        power: 35,
        blanked: false,
        action: ['bl'],
        names: {
            increasing: [],
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
        name: 'great flood',
        suit: 'flood',
        power: 32,
        blanked: false,
        action: ['bl'],
        names: {
            increasing: [],
            unblanking: [],
            blanking: ['army', 'land', 'flame']
        },
        exeptions: ['mountain', 'lightning'],
        number: {
            increasing: 0,
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
        name: 'war dirigible',
        suit: 'weapon',
        power: 35,
        blanked: false,
        action: ['bl self'],
        names: {
            increasing: [],
            unblanking: [],
            blanking: ['army']
        },
        exeptions: ['weather'],
        number: {
            increasing: 10,
            decreasing: 0,
            extra: 0,
        },
    },
    
]

hand = ['rangers', 'great flood', 'lightning', 'candle', 'basilisk', 'war dirigible', 'rainstorm']

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
            const matchedArr = arr.filter(el => namesInc.includes(el.name) || namesInc.includes(el.suit))
            points += matchedArr.length * pointsInc
        }

        if (actions.includes('inc pres')) {
            const matched = arr.some(el => namesInc.includes(el.name) || namesInc.includes(el.suit));
            if (matched) points += pointsInc
        }

        if (actions.includes('inc abs')) {
            const matched = arr.some(el => namesInc.includes(el.name) || namesInc.includes(el.suit));
            if (!matched) points += pointsInc
        }

        if (actions.includes('inc pres all')) {
            const matched = namesInc.filter(el => arr.find(elem => elem.name === el || elem.suit === el))
            if (matched.length === namesInc.length) points += pointsInc
        }
    })
}
function countingDec(arr) {

    arr.forEach(e => {
        const actions = e.action;
        const namesDec = e.names.decreasing;
        const pointsDec = e.number.decreasing;

        if (actions.includes('dec each')) {
            const matchedArr = arr.filter(el => namesDec.includes(el.name) || namesDec.includes(el.suit))
            points -= matchedArr.length * pointsDec
        }

        if (actions.includes('dec pres')) {
            const matched = arr.some(el => namesDec.includes(el.name) || namesDec.includes(el.suit));
            if (matched) points -= pointsDec
        }

        if (actions.includes('dec abs')) {
            const matched = arr.some(el => namesDec.includes(el.name) || namesDec.includes(el.suit));
            if (!matched) points -= pointsDec
        }
    })
}

function countingBasePower(arr) {
    arr.forEach(e => {
        if(e.blanked === false) {
            points += e.power
        }
    })
}

blanking(handObj);
pardoning(handObj);
countingBasePower(handObj);
countingInc(handObj);
console.log(handObj);
console.log(points);