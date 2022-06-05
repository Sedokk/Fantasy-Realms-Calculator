
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
        special(arr) {
            const suits = arr
                .filter(e => e.blanked == false)
                .map(e => e.suit)
            const suitsUnic = [... new Set(suits)]
            if(suits.length === suitsUnic.length) return 50
            else return 0
        },
    },
    {
        name: 'shield of keth',
        suit: 'artifact',
        power: 4,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: [],
        number: {},
        special(arr) {
            const hasLeader = arr.some(e => e.suit === 'leader')
            const hasSword = arr.some(e => e.name === 'sword of keth')
            if(hasLeader && hasSword) return 40
            if(hasLeader) return 15
            else return 0
        },
    },
    {
        name: 'sword of keth',
        suit: 'weapon',
        power: 7,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: [],
        number: {},
        special(arr) {
            const hasLeader = arr.some(e => e.suit === 'leader')
            const hasShield = arr.some(e => e.name === 'shield of keth')
            if(hasLeader && hasShield) return 40
            if(hasLeader) return 15
            else return 0
        },
    },
    {
        name: 'unicorn',
        suit: 'beast',
        power: 9,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: [],
        number: {},
        special(arr) {
            const hasPrincess = arr.some(e => e.name === 'princess')
            const hasOtherWomen = arr.some(e => e.name === 'empress' || e.name === 'queen' || e.name === 'elemental enchantress')
            if(hasPrincess) return 30
            if(hasOtherWomen) return 15
            else return 0
        },
    },
    {
        name: 'fountain of life',
        suit: 'flood',
        power: 1,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: [],
        number: {},
        special(arr) {
            const powersOfNeededSuits = arr
                .filter(e => e.suit === 'weapon' || e.suit === 'flood' || e.suit === 'flame' || e.suit === 'land' || e.suit === 'weather')
                .map(e => new Number(e.power))
            if(powersOfNeededSuits.length > 0) return Math.max(...powersOfNeededSuits)
            else return 0
        },
    },
    {
        name: 'king',
        suit: 'leader',
        power: 8,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: [],
        number: {},
        special(arr) {
            const hasQueen = arr.some(e => e.name === 'queen')
            const armies = arr.filter(e => e.suit === 'army')
            if (hasQueen) return armies.length * 20
            else return armies.length * 5
        },
    },
    {
        name: 'queen',
        suit: 'leader',
        power: 6,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: [],
        number: {},
        special(arr) {
            const hasKing = arr.some(e => e.name === 'king')
            const armies = arr.filter(e => e.suit === 'army')
            if (hasKing) return armies.length * 20
            else return armies.length * 5
        },
    },
    {
        name: 'warlord',
        suit: 'leader',
        power: 4,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: [],
        number: {},
        special(arr) {
            const armies = arr.filter(e => e.suit === 'army')
            if(armies.length > 0) {
                const armiesBasePower = armies
                    .map(e => e.power)
                    .reduce((acc, e) => acc + e)
                return armiesBasePower;
            }  
            return 0
        },
    },
    {
        name: 'whirlwind',
        suit: 'weather',
        power: 13,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: [],
        number: {},
        special(arr) {
            const hasRainstorm = arr.some(e => e.name === 'rainstorm')
            const hasBlizzOrGF = arr.some(e => e.name === 'blizzard' || e.name === 'great flood')
            if (hasRainstorm && hasBlizzOrGF) return 40
            else return 0
        },
    },
    {
        name: 'collector',
        suit: 'wizard',
        power: 7,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: [],
        number: {},
        special(arr) {
            const suits = arr.map(e => e.suit)
            const suitsAmount = suits.reduce((acc, e) => {
                acc[e] = (acc[e] || 0) + 1
                return acc
            }, {})
            const amounts = Object.values(suitsAmount)
            const largest = Math.max(...amounts)
            if (largest > 4) return 100
            if (largest === 4) return 40
            if (largest === 3) return 10
            else return 0
        },
    },
    {
        name: 'jester',
        suit: 'wizard',
        power: 3,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: [],
        number: {},
        special(arr) {
            const powers = arr.map(e => e.power)
            const areOdd = powers.filter(e => e % 2 === 1)
            if(areOdd.length === powers.length) return 50
            if(areOdd.length > 0) return 3 * areOdd.length
            else return 0
        },
    },
]


export default cards