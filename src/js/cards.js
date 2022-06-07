
const cards = [
    // army =========================
    {
        name: 'rangers',
        suit: 'army',
        power: 5,
        blanked: false,
        action: ['inc each', 'special clear'],
        names: {
            increasing: ['land'],
        },
        exeptions: {
            increasing: [],
        },
        number: {
            increasing: 10,
        },
        special(arr) {
            arr.forEach(e => {
                if (e.suit == 'army') e.blanked = false;
                if (!e.names.decreasing) return
                const index = e.names.decreasing.findIndex(e => e.suit === 'army')
                if (index === -1) return
                namesDec.splice(index, 1)
            })
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
        },
        exeptions: {
            increasing: [],
        },
        number: {
            increasing: 5,
        },
    },
    {
        name: 'dwarvish infantry',
        suit: 'army',
        power: 15,
        blanked: false,
        action: ['dec each'],
        names: {
            decreasing: ['army'],
        },
        exeptions: {
            decreasing: ['dwarvish infantry'],
        },
        number: {
            decreasing: 2,
        },
    },
    {
        name: 'light cavalry',
        suit: 'army',
        power: 17,
        blanked: false,
        action: ['dec each'],
        names: {
            decreasing: ['land'],
        },
        exeptions: {
            decreasing: [],
        },
        number: {
            decreasing: 2,
        },
    },
    {
        name: 'celestial knights',
        suit: 'army',
        power: 20,
        blanked: false,
        action: ['dec each'],
        names: {
            decreasing: ['leader'],
        },
        exeptions: {
            decreasing: [],
        },
        number: {
            decreasing: 8,
        },
    },
    //land =====================
    {
        name: 'forest',
        suit: 'land',
        power: 7,
        blanked: false,
        action: ['inc each'],
        names: {
            increasing: ['beast', 'elven archers'],
        },
        exeptions: {
            increasing: [],
        },
        number: {
            increasing: 12,
        },
    },
    {
        name: 'earth elemental',
        suit: 'land',
        power: 4,
        blanked: false,
        action: ['inc each'],
        names: {
            increasing: ['land'],
        },
        exeptions: {
            increasing: ['earth elemental'],
        },
        number: {
            increasing: 15,
        },
    },
    {
        name: 'underground caverns',
        suit: 'land',
        power: 6,
        blanked: false,
        action: ['inc pres', 'clearing card'],
        names: {
            increasing: ['dragon', 'dwarvish infantry'],
            clearing: ['weather'],
        },
        exeptions: {
            increasing: [],
        },
        number: {
            increasing: 25,
        },
    },
    {
        name: 'bell tower',
        suit: 'land',
        power: 8,
        blanked: false,
        action: ['inc pres'],
        names: {
            increasing: ['wizard'],
        },
        exeptions: {
            increasing: [],
        },
        number: {
            increasing: 15,
        },
    },
    {
        name: 'mountain',
        suit: 'land',
        power: 9,
        blanked: false,
        action: ['inc pres all', 'clearing card'],
        names: {
            increasing: ['smoke', 'wildfire'],
            clearing: ['flood'],
        },
        exeptions: {
            increasing: [],
        },
        number: {
            increasing: 50,
        },
    },
    //flame =====================
    {
        name: 'lightning',
        suit: 'flame',
        power: 11,
        blanked: false,
        action: ['inc pres'],
        names: {
            increasing: ['rainstorm'],
        },
        exeptions: {
            increasing: [],
        },
        number: {
            increasing: 30,
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
        exeptions: {},
        number: {
            increasing: 100,
        },
    },
    //weather ==================
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
        exeptions: {
            increasing: [],
            blanking: ['lightning'],
        },
        number: {
            increasing: 10,
        },
    },
    {
        name: 'whirlwind',
        suit: 'weather',
        power: 13,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: {},
        number: {},
        special(arr) {
            const hasRainstorm = arr.some(e => e.name === 'rainstorm')
            const hasBlizzOrGF = arr.some(e => e.name === 'blizzard' || e.name === 'great flood')
            if (hasRainstorm && hasBlizzOrGF) return 40
            else return 0
        },
    },
    //weapon =======================
    {
        name: 'elven longbow',
        suit: 'weapon',
        power: 3,
        blanked: false,
        action: ['inc pres'],
        names: {
            increasing: ['elven archers', 'warlord', 'beastmaster'],
        },
        exeptions: {
            increasing: [],
        },
        number: {
            increasing: 30,
        },
    },
    {
        name: 'sword of keth',
        suit: 'weapon',
        power: 7,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: {},
        number: {},
        special(arr) {
            const hasLeader = arr.some(e => e.suit === 'leader')
            const hasShield = arr.some(e => e.name === 'shield of keth')
            if(hasLeader && hasShield) return 40
            if(hasLeader) return 15
            else return 0
        },
    },
    //artifact ====================
    {
        name: 'world tree',
        suit: 'artifact',
        power: 2,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: {},
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
        exeptions: {},
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
        name: 'protection rune',
        suit: 'artifact',
        power: 1,
        blanked: false,
        action: ['special clear'],
        names: {},
        exeptions: {},
        number: {},
        special(arr) {
            arr.forEach(e => {
                e.blanked = false;
                e.cleared = true;
            });
        },
    },
    //beast =====================
    {
        name: 'unicorn',
        suit: 'beast',
        power: 9,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: {},
        number: {},
        special(arr) {
            const hasPrincess = arr.some(e => e.name === 'princess')
            const hasOtherWomen = arr.some(e => e.name === 'empress' || e.name === 'queen' || e.name === 'elemental enchantress')
            if(hasPrincess) return 30
            if(hasOtherWomen) return 15
            else return 0
        },
    },
    //flood ====================
    {
        name: 'fountain of life',
        suit: 'flood',
        power: 1,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: {},
        number: {},
        special(arr) {
            const powersOfNeededSuits = arr
                .filter(e => e.suit === 'weapon' || e.suit === 'flood' || e.suit === 'flame' || e.suit === 'land' || e.suit === 'weather')
                .map(e => new Number(e.power))
            if(powersOfNeededSuits.length > 0) return Math.max(...powersOfNeededSuits)
            else return 0
        },
    },
    //leader ================
    {
        name: 'king',
        suit: 'leader',
        power: 8,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: {},
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
        exeptions: {},
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
        exeptions: {},
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
    //wizard ===================
    {
        name: 'collector',
        suit: 'wizard',
        power: 7,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: {},
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
        exeptions: {},
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