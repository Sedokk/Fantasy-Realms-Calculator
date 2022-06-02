
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
    {
        name: 'world tree',
        suit: 'artifact',
        power: 2,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: [],
        number: {},
        special: function(arr) {
            const suits = arr
            .filter(e => e.blanked == false)
            .map(e => e.suit)
            const suitsUnic = [... new Set(suits)]
            if(suits.length === suitsUnic.length) return 50
            else return 0
        },
    },
]


export default cards