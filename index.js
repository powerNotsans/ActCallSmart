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

const date = new Date()
if (date.getHours() < 20) {
    document.body.classList.add("lightmode")
    document.body.classList.remove("darkmode")
}else{
    document.body.classList.add("darkmode")
    document.body.classList.remove("lightmode")
}

const arrayindexmax = (2 ** 26)-1

let numberlist = []

let debounce = false

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

function RNG() {
    let random = Math.floor(Math.random() * numberlist.length)
    numdisplay.innerHTML = numberlist[random]
    numberlist.splice(random, 1)
    remselect.remove(random)
    remselect.value = ""
    return
}

btn.addEventListener("click", (pe) => {
    pe.preventDefault()
    if (debounce != false){
        return
    }
    debounce = true

    let maximum = Number(max.value)
    let minimum = Number(min.value)

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

    numberlist.length = 0

    for (let i = minimum; i <= maximum; i ++) {
        numberlist.push(i)

        const option = document.createElement("option")
        option.text = i
        option.value = i
        remselect.add(option)
        wait(500)
    }

    RNG()
})

conbtn.addEventListener("click", (pe) => {
    pe.preventDefault()

    if (debounce != true){
        return
    }

    if (numberlist.length == 0) {
        numberlist.length = 0
        debounce = false
    } else {
        RNG()
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