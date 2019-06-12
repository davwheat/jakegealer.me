// The release timestamp of animal crossing.
const animalCrossingTimestamp = 1584662400

// The JS date item for animal crossing.
const dateAnimalCrossing = new Date(animalCrossingTimestamp * 1000)

// Defines the state of the countdown.
let state

// Allows me to easily remove elements. From https://stackoverflow.com/questions/3387427/remove-element-by-id.
Element.prototype.remove = function() {
    this.parentElement.removeChild(this)
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i])
        }
    }
}

// Handles the timer.
const handleTimer = () => {
    if (Date.now() > dateAnimalCrossing) {
        if (!state) {
            document.getElementById("GameIsNotOut").remove()
            document.getElementById("GameIsOut").classList.remove("inactive")
        }
        return
    }
    let dateSub = Math.floor((dateAnimalCrossing - Date.now()) / 1000)
    const dateParts = []
    const yearDiv = Math.floor(dateSub / 31622400)
    dateSub %= 31622400
    if (yearDiv !== 0) {
        dateParts.push(`${yearDiv} year${yearDiv !== 1 ? "s" : ""}`)
    }
    const monthDiv = Math.floor(dateSub / 2592000)
    dateSub %= 2592000
    if (monthDiv !== 0) {
        dateParts.push(`${monthDiv} month${monthDiv !== 1 ? "s" : ""}`)
    }
    const weekDiv = Math.floor(dateSub / 604800)
    dateSub %= 604800
    if (weekDiv !== 0) {
        dateParts.push(`${weekDiv} week${weekDiv !== 1 ? "s" : ""}`)
    }
    const dayDiv = Math.floor(dateSub / 86400)
    dateSub %= 86400
    if (dayDiv !== 0) {
        dateParts.push(`${dayDiv} day${dayDiv !== 1 ? "s" : ""}`)
    }
    const hourDiv = Math.floor(dateSub / 3600)
    dateSub %= 3600
    if (hourDiv !== 0) {
        dateParts.push(`${hourDiv} hour${hourDiv !== 1 ? "s" : ""}`)
    }
    const minDiv = Math.floor(dateSub / 60)
    dateSub %= 60
    if (minDiv !== 0) {
        dateParts.push(`${minDiv} minute${minDiv !== 1 ? "s" : ""}`)
    }
    const secDiv = Math.floor(dateSub)
    if (secDiv !== 0) {
        dateParts.push(`${secDiv} second${secDiv !== 1 ? "s" : ""}`)
    }
    document.getElementById("ReleaseDate").textContent = `Release Date: ${dateParts.join(", ")}`
}
handleTimer()
setInterval(handleTimer, 1000)
