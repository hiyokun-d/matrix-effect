const title = document.getElementById("judul")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let onOffline = false

function offline() {
    onOffline = true
    alert("lu offline loh")
}

if (onOffline) {
    title.innerHTML = "lu offline"
} else title.innerHTML = "matrix effect"

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = "1=-3=5'15'48791394][];];dlfahjabswdba√˚√˚≈ßß∑åojq√¨π∫†¥ƒ?BLB|{{^R&}}11203dhad001011awi]>>>qwjdwd<,ckjawbabw137`07038~~172731720173++2=40293==jaw|||[]a[l\]awdawd"
        this.x = x
        this.y = y
        this.fontSize = fontSize
        this.text = ""
        this.canvasHeight = canvasHeight
   }

    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length))
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize)
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0
        } else {
            this.y += 1
        }
    }
}

class Effect {
    /**
     * 
     * @param {canvasWidth} cw 
     * @param {canvasHeight} ch 
     */
    constructor(cw, ch) {
        this.cw = cw
        this.ch = ch
        this.fontSize = 25
        this.collums = this.cw / this.fontSize
        this.symbol = []
        this.#initialize()
    }

    #initialize() {
        for (let i = 0; i < this.collums; i++) {
            this.symbol[i] = new Symbol(i, 0, this.fontSize ,this.ch);
        }
    }

    resize(width, height) {
        this.cw = width;
        this.ch = height;
        this.collums = this.cw / this.fontSize
        this.symbol = []
        this.#initialize()
    }
}


const effect = new Effect(canvas.width, canvas.height)
let lastime = 0
const fps = 30
const nextFrame = 1000 / fps
let timer = 0


function animate(timestamp) {
    const deltaTime = timestamp - lastime
    lastime = timestamp

    if (timer > nextFrame) {
        ctx.fillStyle = "RGBA(0, 0, 0, 0.05)"
        ctx.textAlign = "center"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle =  "#33FF33"
        ctx.font = effect.fontSize + "px monospace"
        effect.symbol.forEach(symbol => symbol.draw(ctx))
        timer = 0
    } else {
        timer += deltaTime
    }

    requestAnimationFrame(animate)
}


animate(0)
window.addEventListener("resize", function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    effect.resize(canvas.width, canvas.height)
})