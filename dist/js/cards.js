
let hand = []

let points = 0;

class Card {
    constructor(name, suit, power, act, actingNames, actingExeptions) {
        this.name = name;
        this.suit = suit;
        this.power = power;
        this.blocked = false;
        this.act = act;
        this.actingNames = actingNames;
        this.actingExeptions = actingExeptions;
        
    }

    
}

const rangers = new Card('rangers', 'army', 5)
const earthElemental = new Card('earth elemental', 'land', 4)
const undergroundCaverns = new Card('warship', 'weapon', 23, 'blanking self', [], ['flood'])
const basilisk = new Card('basilisk', 'beast', 35, 'blanking', ['army', 'leader', 'beast'], ['basilisk'], true)
const dragon = new Card('dragon', 'beast', 30)
const elvenLongbow = new Card('elven longbow', 'flood', 3)
const elvenArchers = new Card('elven archers', 'army', 10)

hand = [rangers, earthElemental, undergroundCaverns, basilisk, dragon, elvenLongbow, elvenArchers]

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