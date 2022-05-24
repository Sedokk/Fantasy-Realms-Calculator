
let hand = []

let points = 0;

const cards = [
    {
        name: 'rangers',
        suit: 'army',
        power: 5,
        blanked: false,
        action: ['inc each', 'unbl'],
        names: {
            increasing: ['land'],
            unblanking: ['army'],
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
        name: 'warship',
        suit: 'weapon',
        power: 23,
        blanked: false,
        action: ['bl self', 'unb'],
        names: {
            blanking: ['flood'],
            unblanking: ['hz'],
        },
        exeptions: [],
        number: {
            increasing: 0,
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
            increasing: ['land'],
            unblanking: ['army'],
        },
        exeptions: [],
        number: {
            increasing: 10,
            decreasing: 0,
            extra: 0,
        },
    },
    
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