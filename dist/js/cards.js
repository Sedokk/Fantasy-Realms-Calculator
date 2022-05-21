
let hand = []

let points = 0;

const cards = [
    {
        name: 'rangers',
        suit: 'army',
        power: 5,
        blanked: false,
        action: ['increasing for each', 'unblanking'],
        names: {
            increasing: ['land'],
            unblanking: ['army'],
        },
        exeptions: {},
        number: {
            increasing: 10,
            decreasing: 0,
            extra: 0,
        },
    }
]




function blanking(arr) {
    arr.forEach(e => {
        if(e.act != 'blanking') {
            return
        }

        arr.forEach(el => {
            if (e.actingExeptions.includes(el.name) || e.actingExeptions.includes(el.suit)) {
                return
            }
            if (e.actingNames.includes(el.name) || e.actingNames.includes(el.suit)) {
                el.blocked = true;
            }
            
        })
    });
}

function blankingSelf(arr) {
    arr.forEach(e => {
        if(e.act != 'blanking self') {
            return
        }
        e.blocked = true;

        const hasNames = arr.some(el => {
            return e.actingNames.includes(el.suit) || e.actingNames.includes(el.name)
        })
        if (hasNames) return

        const hasExeptions = arr.some(el => {
            return e.actingExeptions.includes(el.suit) || e.actingExeptions.includes(el.name)
        })
        if (hasExeptions) e.blocked = false;
    });
}


blanking(hand);
blankingSelf(hand);
console.log(hand);