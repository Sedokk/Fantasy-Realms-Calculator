
const cards = [
    // army =========================
    {
        name: 'rangers',
        suit: 'army',
        power: 5,
        blanked: false,
        action: ['inc each', 'special before'],
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
                if (e.names.decreasing) {
                    const index = e.names.decreasing.indexOf('army')
                    if (index !== -1) e.names.decreasing.splice(index, 1)
                }
                if (e.names.blanking) {
                    const index = e.names.blanking.indexOf('army')
                    if (index !== -1) e.names.blanking.splice(index, 1)
                }
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
        action: ['dec abs'],
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
    {
        name: 'fire elemental',
        suit: 'flame',
        power: 4,
        blanked: false,
        action: ['inc each'],
        names: {
            increasing: ['flame']
        },
        exeptions: {
            increasing: ['fire elemental'],
        },
        number: {
            increasing: 15,
        },
    },
    {
        name: 'forge',
        suit: 'flame',
        power: 9,
        blanked: false,
        action: ['inc each'],
        names: {
            increasing: ['weapon', 'artifact']
        },
        exeptions: {
            increasing: [],
        },
        number: {
            increasing: 9,
        },
    },
    {
        name: 'wildfire',
        suit: 'flame',
        power: 40,
        blanked: false,
        action: ['bl'],
        names: {
            blanking: ['flood', 'land', 'beast', 'army', 'leader'],
        },
        exeptions: {
            blanking: ['great flood', 'island', 'mountain', 'unicorn', 'dragon'],
        },
        number: {},
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
    {
        name: 'air elemental',
        suit: 'weather',
        power: 4,
        blanked: false,
        action: ['inc each'],
        names: {
            increasing: ['weather'],
        },
        exeptions: {
            increasing: ['air elemental'],
        },
        number: {
            increasing: 15,
        },
    },
    {
        name: 'smoke',
        suit: 'weather',
        power: 27,
        blanked: false,
        action: ['bl self'],
        names: {
            blanking: ['flame'],
        },
        exeptions: {
            blanking: [],
        },
        number: {},
    },
    {
        name: 'blizzard',
        suit: 'weather',
        power: 30,
        blanked: false,
        action: ['bl', 'dec each'],
        names: {
            blanking: ['flood'],
            decreasing: ['army', 'leader', 'beast', 'flame'],
        },
        exeptions: {
            blanking: [],
            decreasing: [],
        },
        number: {
            decreasing: 5,
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
    {
        name: 'warship',
        suit: 'weapon',
        power: 23,
        blanked: false,
        action: ['bl self', 'special before'],
        names: {
            blanking: ['flood'],
        },
        exeptions: {
            blanking: [],
        },
        number: {},
        special(arr) {
            arr.forEach(e => {
                let index;
                if (e.name === 'great flood') {
                    index = e.names.blanking.indexOf('army')
                    e.names.blanking.splice(index, 1)
                }
                if (e.name === 'swamp') {
                    index = e.names.decreasing.indexOf('army')
                    e.names.decreasing.splice(index, 1)
                }
            })
        },
    },
    {
        name: 'magic wand',
        suit: 'weapon',
        power: 1,
        blanked: false,
        action: ['inc pres'],
        names: {
            increasing: ['wizard'],
        },
        exeptions: {
            increasing: [],
        },
        number: {
            increasing: 25,
        },
    },
    {
        name: 'war dirigible',
        suit: 'weapon',
        power: 35,
        blanked: false,
        action: ['bl self'],
        names: {
            blanking: ['flood'],
        },
        exeptions: {
            blanking: ['weather'],
        },
        number: {},
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
    {
        name: 'gem of order',
        suit: 'artifact',
        power: 5,
        blanked: false,
        action: ['special plus'],
        names: {},
        exeptions: {},
        number: {},
        special(arr) {
            const sortedArr = arr
                .map(e => e.power)
                .sort((a, b) => a - b)
            let label = 0;
            let indicator = 0
            const subsequenceArr = sortedArr.reduce((acc, e, ind, arr) => {
                const next = arr[ind + 1]
                if (e === next - 1 && (acc.length === 0 || label === 0)) {
                    acc.push(1)
                    label = 1
                }
                if (e === next - 1 && label === 1) acc[indicator]++
                if (e !== next - 1 && label === 0) {
                    acc.push(1)
                    indicator++
                }
                if (e !== next - 1 && label === 1) {
                    label = 0
                    indicator++
                }
                return acc
            }, [])
            const maxValue = Math.max(...subsequenceArr)
            if (maxValue === 7) return 150
            if (maxValue === 6) return 100
            if (maxValue === 5) return 60
            if (maxValue === 4) return 30
            if (maxValue === 3) return 10
            if (maxValue < 3) return 0
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
    {
        name: 'warhorse',
        suit: 'beast',
        power: 6,
        blanked: false,
        action: ['inc pres'],
        names: {
            increasing: ['leader', 'wizard'],
        },
        exeptions: {
            increasing: [],
        },
        number: {
            increasing: 14,
        },
    },
    {
        name: 'hydra',
        suit: 'beast',
        power: 12,
        blanked: false,
        action: ['inc pres'],
        names: {
            increasing: ['swamp'],
        },
        exeptions: {
            increasing: [],
        },
        number: {
            increasing: 28,
        },
    },
    {
        name: 'hydra',
        suit: 'beast',
        power: 12,
        blanked: false,
        action: ['inc pres'],
        names: {
            increasing: ['swamp'],
        },
        exeptions: {
            increasing: [],
        },
        number: {
            increasing: 28,
        },
    },
    {
        name: 'dragon',
        suit: 'beast',
        power: 30,
        blanked: false,
        action: ['dec abs'],
        names: {
            decreasing: ['wizard'],
        },
        exeptions: {
            decreasing: [],
        },
        number: {
            decreasing: 40,
        },
    },
    {
        name: 'basilisk',
        suit: 'beast',
        power: 35,
        blanked: false,
        action: ['bl'],
        names: {
            blanking: ['army', 'leader', 'beast'],
        },
        exeptions: {
            blanking: ['basilisk'],
        },
        number: {},
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
    {
        name: 'water elemental',
        suit: 'flood',
        power: 4,
        blanked: false,
        action: ['inc each'],
        names: {
            increasing: ['flood'],
        },
        exeptions: {
            increasing: ['water elemental'],
        },
        number: {
            increasing: 15,
        },
    },
    {
        name: 'swamp',
        suit: 'flood',
        power: 18,
        blanked: false,
        action: ['dec each'],
        names: {
            decreasing: ['army', 'flame'],
        },
        exeptions: {
            decreasing: [],
        },
        number: {
            increasing: 3,
        },
    },
    {
        name: 'great flood',
        suit: 'flood',
        power: 32,
        blanked: false,
        action: ['bl'],
        names: {
            blanking: ['army', 'flame', 'land'],
        },
        exeptions: {
            blanking: ['lightning', 'mountain'],
        },
        number: {},
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
    {
        name: 'princess',
        suit: 'leader',
        power: 2,
        blanked: false,
        action: ['inc each'],
        names: {
            increasing: ['wizard', 'leader', 'army'],
        },
        exeptions: {
            increasing: ['princess'],
        },
        number: {
            increasing: 8,
        },
    },
    {
        name: 'empress',
        suit: 'leader',
        power: 10,
        blanked: false,
        action: ['inc each', 'dec each'],
        names: {
            increasing: ['army'],
            decreasing: ['leader'],
        },
        exeptions: {
            increasing: [],
            decreasing: ['empress'],
        },
        number: {
            increasing: 10,
            decreasing: 5,
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
    {
        name: 'elemental enchantress',
        suit: 'wizard',
        power: 5,
        blanked: false,
        action: ['inc each'],
        names: {
            increasing: ['land', 'weather', 'flood', 'flame'],
        },
        exeptions: {
            increasing: [],
        },
        number: {
            increasing: 5,
        },
    },
    {
        name: 'beastmaster',
        suit: 'wizard',
        power: 9,
        blanked: false,
        action: ['inc each', 'clear card'],
        names: {
            increasing: ['beast'],
            clearing: ['beast'],
        },
        exeptions: {
            increasing: [],
        },
        number: {
            increasing: 9,
        },
    },
    {
        name: 'warlock lord',
        suit: 'wizard',
        power: 25,
        blanked: false,
        action: ['dec each'],
        names: {
            decreasing: ['leader', 'wizard'],
        },
        exeptions: {
            increasing: ['warlock lord'],
        },
        number: {
            decreasing: 10,
        },
    },
]


export default cards