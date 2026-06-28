const btn = document.getElementById("idbtn")
const conbtn = document.getElementById("idcontinue")
const form = document.getElementById("idform")
const max = document.getElementById("idmax")
const min = document.getElementById("idmin")
const numdisplay = document.getElementById("idnumberdisplay")
const resetbtn = document.getElementById("idresetbtn")
const timer = document.getElementById("idtimer")
const remselect = document.getElementById("idremselect")
const rembtn = document.getElementById("idrembtn")
const replicated = document.getElementById("idtickbox1")

const date = new Date()
if (date.getHours() < 20) {
    document.body.classList.add("lightmode")
    document.body.classList.remove("darkmode")
}else{
    document.body.classList.add("darkmode")
    document.body.classList.remove("lightmode")
}

const arrayindexmax = (2 ** 26)-1

let numcomplist = []

let debounce = false

let maximum
let minimum

wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function timerloop() {
    for (;;){
    const newdate = new Date()
    let seconds, minutes, hours
    String(newdate.getSeconds()).length < 2 ? seconds = "0" + String(newdate.getSeconds()) : seconds = String(newdate.getSeconds())
    String(newdate.getMinutes()).length < 2 ? minutes = "0" + String(newdate.getMinutes()) : minutes = String(newdate.getMinutes())
    String(newdate.getHours()).length < 2 ? hours = "0" + String(newdate.getHours()) : hours = String(newdate.getHours())
    timer.innerHTML = hours+":"+minutes+":"+seconds
    await wait(100)
}}

timerloop()

function RNGMachine(max){
    const random = Math.floor(Math.random() * (max + 1))
    return random
}

function RNG(max, min) {
    let numselect = RNGMachine(max)

    while (numcomplist.indexOf(numselect) != -1){
        numselect = RNGMachine(max)
    }

    numdisplay.innerHTML = numselect

    if (!replicated.checked){
        numcomplist.push(numselect)
    }
    return
}

async function AddNumberToList(number){
    numberlist.push(number)

    const option = document.createElement("option")
    option.text = number
    option.value = number
    //remselect.add(option)
    wait(500)
}

btn.addEventListener("click", (pe) => {
    pe.preventDefault()
    if (debounce == true) {
        return
    }

    debounce = true

    maximum = Number(max.value)
    minimum = Number(min.value)

    maximum > arrayindexmax ? maximum = arrayindexmax : maximum = maximum
    maximum < arrayindexmax * -1 ? maximum = arrayindexmax * -1 : maximum = maximum
    minimum > arrayindexmax ? minimum = arrayindexmax : minimum = minimum
    minimum < arrayindexmax * -1 ? minimum = arrayindexmax * -1 : minimum = minimum

    max.value = maximum
    min.value = minimum

    if (minimum > maximum) {
        let oldminimum = minimum
        let oldmaximum = maximum

        maximum = oldminimum
        minimum = oldmaximum

        max.value = maximum
        min.value = minimum
    }

    numcomplist.length = 0

    RNG(maximum, minimum)
})

conbtn.addEventListener("click", (pe) => {
    pe.preventDefault()

    if (debounce != true){
        return
    }

    if (numcomplist.length == (maximum+1)) {
        numcomplist.length = 0
        debounce = false
    } else {
        RNG(maximum, minimum)
    }
})

rembtn.addEventListener("click", (pe) => {
    pe.preventDefault()

    if (remselect.value == ""){
        return
    }

    const remnumindex = numberlist.indexOf(Number(remselect.value))
    numberlist.splice(remnumindex, 1)
    remselect.remove(remnumindex)
    remselect.value = ""
})

resetbtn.addEventListener("click", (pe) => {
    debounce = false
})