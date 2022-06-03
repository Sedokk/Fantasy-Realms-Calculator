
import cards from './cards.js'

let hand = []

let points = 0;



hand = ['world tree', 'forest', 'candle', 'shield of keth', 'elven archers', 'elven longbow', 'rainstorm']

const handObj = hand.map(e => {
    const obj = cards.find(el => el.name == e)
    return e = obj
})


//==========================
//base functions

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

// function pardoning(arr) {
//     arr.forEach(e => {
//         if(!e.action.includes('pardon')) {
//             return
//         }

//         arr.forEach(el => {

//             if(e.names.pardoning.includes(el.name) || e.names.pardoning.includes(el.suit)) {
//                 el.blanked = false;
//                 el.pardoned = true;
//                 console.log('pardoned: ', el.name);
//             }
            
//         })
        
        
//     });
// }

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


function specials(arr) {
    arr.forEach(e => {
        if(e.action.includes('special plus')) {
            points += e.special(arr)
        }
        if(e.action.includes('special')) {
            e.special(arr)
        }
    })
}



//=================================
//call

blanking(handObj);
// pardoning(handObj);
countingBasePower(handObj);
countingInc(handObj);
countingDec(handObj);
specials(handObj, points);
console.log(handObj);
console.log(points);