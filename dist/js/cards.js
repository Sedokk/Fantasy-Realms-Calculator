
const cards = [
    // army =========================
    {
        name: 'rangers',
        suit: 'army',
        power: 5,
        status: [],
        action: ['inc each', 'special before'],
        names: {
            increasing: ['land'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 10,
        },
        special(arr) {
            arr.forEach(e => {
                if (e.exeptions.blanking.includes('rangers')) return
                e.exeptions.blanking.push('rangers', 'army')
                e.exeptions.decreasing.push('rangers', 'army')
            });
        },
    },
    {
        name: 'elven archers',
        suit: 'army',
        power: 10,
        status: [],
        action: ['inc abs'],
        names: {
            increasing: ['weather'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 5,
        },
    },
    {
        name: 'dwarvish infantry',
        suit: 'army',
        power: 15,
        status: [],
        action: ['dec each'],
        names: {
            decreasing: ['army'],
        },
        exeptions: {
            decreasing: ['dwarvish infantry'],
            increasing: [],
            blanking: [],
        },
        number: {
            decreasing: 2,
        },
    },
    {
        name: 'light cavalry',
        suit: 'army',
        power: 17,
        status: [],
        action: ['dec each'],
        names: {
            decreasing: ['land'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            decreasing: 2,
        },
    },
    {
        name: 'celestial knights',
        suit: 'army',
        power: 20,
        status: [],
        action: ['dec abs'],
        names: {
            decreasing: ['leader'],
            increasing: [],
            blanking: [],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
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
        status: [],
        action: ['inc each'],
        names: {
            increasing: ['beast', 'elven archers'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 12,
        },
    },
    {
        name: 'earth elemental',
        suit: 'land',
        power: 4,
        status: [],
        action: ['inc each'],
        names: {
            increasing: ['land'],
        },
        exeptions: {
            increasing: ['earth elemental'],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 15,
        },
    },
    {
        name: 'underground caverns',
        suit: 'land',
        power: 6,
        status: [],
        action: ['inc pres', 'clearing card'],
        names: {
            increasing: ['dragon', 'dwarvish infantry'],
            clearing: ['weather'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 25,
        },
    },
    {
        name: 'bell tower',
        suit: 'land',
        power: 8,
        status: [],
        action: ['inc pres'],
        names: {
            increasing: ['wizard'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 15,
        },
    },
    {
        name: 'mountain',
        suit: 'land',
        power: 9,
        status: [],
        action: ['inc pres all', 'clearing card'],
        names: {
            increasing: ['smoke', 'wildfire'],
            clearing: ['flood'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
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
        status: [],
        action: ['inc pres'],
        names: {
            increasing: ['rainstorm'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 30,
        },
    },
    {
        name: 'candle',
        suit: 'flame',
        power: 2,
        status: [],
        action: ['inc pres all'],
        names: {
            increasing: ['book of changes', 'bell tower', 'wizard']
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 100,
        },
    },
    {
        name: 'fire elemental',
        suit: 'flame',
        power: 4,
        status: [],
        action: ['inc each'],
        names: {
            increasing: ['flame']
        },
        exeptions: {
            increasing: ['fire elemental'],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 15,
        },
    },
    {
        name: 'forge',
        suit: 'flame',
        power: 9,
        status: [],
        action: ['inc each'],
        names: {
            increasing: ['weapon', 'artifact']
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 9,
        },
    },
    {
        name: 'wildfire',
        suit: 'flame',
        power: 40,
        status: [],
        action: ['bl'],
        names: {
            blanking: ['flood', 'land', 'beast', 'army', 'leader'],
        },
        exeptions: {
            blanking: ['great flood', 'island', 'mountain', 'unicorn', 'dragon'],
            increasing: [],
            decreasing: [],
        },
        number: {},
    },
    //weather ==================
    {
        name: 'rainstorm',
        suit: 'weather',
        power: 8,
        status: [],
        action: ['inc each', 'bl'],
        names: {
            increasing: ['flood'],
            blanking: ['flame'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
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
        status: [],
        action: ['special plus'],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
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
        status: [],
        action: ['inc each'],
        names: {
            increasing: ['weather'],
        },
        exeptions: {
            increasing: ['air elemental'],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 15,
        },
    },
    {
        name: 'smoke',
        suit: 'weather',
        power: 27,
        status: [],
        action: ['bl self'],
        names: {
            blanking: ['flame'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {},
    },
    {
        name: 'blizzard',
        suit: 'weather',
        power: 30,
        status: [],
        action: ['bl', 'dec each'],
        names: {
            blanking: ['flood'],
            decreasing: ['army', 'leader', 'beast', 'flame'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
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
        status: [],
        action: ['inc pres'],
        names: {
            increasing: ['elven archers', 'warlord', 'beastmaster'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 30,
        },
    },
    {
        name: 'sword of keth',
        suit: 'weapon',
        power: 7,
        status: [],
        action: ['special plus'],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
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
        status: [],
        action: ['bl self', 'special before'],
        names: {
            blanking: ['flood'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {},
        special(arr) {
            arr.forEach(e => {
                if (e.suit !== 'flood' || e.exeptions.blanking.includes('warship')) return
                e.exeptions.blanking.push('warship', 'army')
                e.exeptions.decreasing.push('warship', 'army')
            });
        }
    },
    {
        name: 'magic wand',
        suit: 'weapon',
        power: 1,
        status: [],
        action: ['inc pres'],
        names: {
            increasing: ['wizard'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 25,
        },
    },
    {
        name: 'war dirigible',
        suit: 'weapon',
        power: 35,
        status: [],
        action: ['bl self'],
        names: {
            blanking: ['army'],
        },
        exeptions: {
            blanking: ['weather'],
            increasing: [],
            decreasing: [],
        },
        number: {},
    },
    //artifact ====================
    {
        name: 'world tree',
        suit: 'artifact',
        power: 2,
        status: [],
        action: ['special plus'],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {},
        special(arr) {
            const suits = arr
                .filter(e => !e.status.includes('blanked'))
                .map(e => e.suit)
            const suitsUnic = [... new Set(suits)]
            if(suits.length === suitsUnic.length) return 50
            else return 0
        },
    },
    {
        name: 'book of changes',
        suit: 'artifact',
        power: 3,
        status: [],
        action: ['choose'],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {},
        special(arr) {
            console.log(this.name);
        },
    },
    {
        name: 'shield of keth',
        suit: 'artifact',
        power: 4,
        status: [],
        action: ['special plus'],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
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
        status: [],
        action: ['special clear'],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {},
        special(arr) {
            arr.forEach(e => {
                e.status.push('cleared');
            });
        },
    },
    {
        name: 'gem of order',
        suit: 'artifact',
        power: 5,
        status: [],
        action: ['special plus'],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
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
            if (maxValue > 6) return 150
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
        status: [],
        action: ['special plus'],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
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
        status: [],
        action: ['inc pres'],
        names: {
            increasing: ['leader', 'wizard'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 14,
        },
    },
    {
        name: 'hydra',
        suit: 'beast',
        power: 12,
        status: [],
        action: ['inc pres'],
        names: {
            increasing: ['swamp'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 28,
        },
    },
    {
        name: 'hydra',
        suit: 'beast',
        power: 12,
        status: [],
        action: ['inc pres'],
        names: {
            increasing: ['swamp'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 28,
        },
    },
    {
        name: 'dragon',
        suit: 'beast',
        power: 30,
        status: [],
        action: ['dec abs'],
        names: {
            decreasing: ['wizard'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            decreasing: 40,
        },
    },
    {
        name: 'basilisk',
        suit: 'beast',
        power: 35,
        status: [],
        action: ['bl'],
        names: {
            blanking: ['army', 'leader', 'beast'],
        },
        exeptions: {
            blanking: ['basilisk'],
            increasing: [],
            decreasing: [],
        },
        number: {},
    },
    //flood ====================
    {
        name: 'fountain of life',
        suit: 'flood',
        power: 1,
        status: [],
        action: ['special plus'],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
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
        name: 'island',
        suit: 'flood',
        power: 14,
        status: [],
        action: ['choose'],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {},
        special(arr) {
            console.log(this.name);
        },
    },
    {
        name: 'water elemental',
        suit: 'flood',
        power: 4,
        status: [],
        action: ['inc each'],
        names: {
            increasing: ['flood'],
        },
        exeptions: {
            increasing: ['water elemental'],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 15,
        },
    },
    {
        name: 'swamp',
        suit: 'flood',
        power: 18,
        status: [],
        action: ['dec each'],
        names: {
            decreasing: ['army', 'flame'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            decreasing: 3,
        },
    },
    {
        name: 'great flood',
        suit: 'flood',
        power: 32,
        status: [],
        action: ['bl'],
        names: {
            blanking: ['army', 'flame', 'land'],
        },
        exeptions: {
            blanking: ['lightning', 'mountain'],
            increasing: [],
            decreasing: [],
        },
        number: {},
    },
    //leader ================
    {
        name: 'king',
        suit: 'leader',
        power: 8,
        status: [],
        action: ['special plus'],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
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
        status: [],
        action: ['special plus'],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
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
        status: [],
        action: ['special plus'],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
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
        status: [],
        action: ['inc each'],
        names: {
            increasing: ['wizard', 'leader', 'army'],
        },
        exeptions: {
            increasing: ['princess'],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 8,
        },
    },
    {
        name: 'empress',
        suit: 'leader',
        power: 10,
        status: [],
        action: ['inc each', 'dec each'],
        names: {
            increasing: ['army'],
            decreasing: ['leader'],
        },
        exeptions: {
            increasing: [],
            blanking: [],
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
        status: [],
        action: ['special plus'],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
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
        status: [],
        action: ['special plus'],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
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
        name: 'necromancer',
        suit: 'wizard',
        power: 3,
        status: [],
        action: [],
        names: {},
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {},
    },
    {
        name: 'elemental enchantress',
        suit: 'wizard',
        power: 5,
        status: [],
        action: ['inc each'],
        names: {
            increasing: ['land', 'weather', 'flood', 'flame'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 5,
        },
    },
    {
        name: 'beastmaster',
        suit: 'wizard',
        power: 9,
        status: [],
        action: ['inc each', 'clearing card'],
        names: {
            increasing: ['beast'],
            clearing: ['beast'],
        },
        exeptions: {
            increasing: [],
            decreasing: [],
            blanking: [],
        },
        number: {
            increasing: 9,
        },
    },
    {
        name: 'warlock lord',
        suit: 'wizard',
        power: 25,
        status: [],
        action: ['dec each'],
        names: {
            decreasing: ['leader', 'wizard'],
        },
        exeptions: {
            decreasing: ['warlock lord'],
            increasing: [],
            blanking: [],
        },
        number: {
            decreasing: 10,
        },
    },
    //wild =====================
    {
        name: 'shapeshifter',
        suit: 'wild',
        power: 0,
        status: [],
        action: ['choose'],
        names: {},
        exeptions: {},
        number: {},
        special(arr) {
            console.log(this.name);
        },
    },
    {
        name: 'mirage',
        suit: 'wild',
        power: 0,
        status: [],
        action: ['choose'],
        names: {},
        exeptions: {},
        number: {},
        special(arr) {
            console.log(this.name);
        },
    },
    {
        name: 'doppelganger',
        suit: 'wild',
        power: 0,
        status: [],
        action: ['choose'],
        names: {},
        exeptions: {},
        number: {},
        special(arr) {
            console.log(this.name);
        },
    },
]


export default cards