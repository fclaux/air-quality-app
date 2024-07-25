const loader = document.querySelector(".loader")
const emojiLogo = document.querySelector(".emoji-logo")
const situationText = document.querySelector(".user-information")
const tabInfos = document.querySelectorAll(".information-tab td")
const pointer = document.querySelector("#pointer")

const MAX_AQIUS = 500
const API_KEY = "b6d0ba53-0911-42b1-b496-8ae1f3fd7463"

async function getAirQualityData() {
    let airQuality;

    try {
        const response = await fetch(`http://api.airvisual.com/v2/nearest_city?key=${API_KEY}`)
        if(!response.ok) throw new Error (`Error ${response.status}, ${response.statusText}`)
        airQuality = await response.json()
        if(airQuality.status!=="success") throw new Error (`Erreur api : ${airQuality.status}`)
    } catch(error) {
        situationText.textContent = error.message
        emojiLogo.src = "ressources/browser.svg"
        loader.classList.remove("active")
    }
    if(airQuality) {
        fillWithData(airQuality.data);
        loader.classList.remove("active")
    }
}

function fillWithData(airQualityData) {
    const aqiUS = airQualityData.current.pollution.aqius
    const city = airQualityData.city

    situationText.textContent = `Here is ${city} situation.`

    tabInfos[0].textContent = city
    switch (true) {
        case (aqiUS >= 0 && aqiUS <= 50):
            tabInfos[1].textContent = "Good"
            emojiLogo.src = "ressources/happy.svg"
            document.body.style.background = "linear-gradient(to right, #45B649, #DCE35B)"
            break;
        case (aqiUS >= 51 && aqiUS <= 100):
            tabInfos[1].textContent = "Moderate"
            emojiLogo.src = "ressources/thinking.svg"
            document.body.style.background = "linear-gradient(to right, #F3F9A7, #CAC531)"
            break;
        case (aqiUS >= 101 && aqiUS <= 150):
            tabInfos[1].textContent = "Unhealthy"
            emojiLogo.src = "ressources/unhealthy.svg"
            document.body.style.background = "linear-gradient(to right, #F16529, #E44D26)"
            break;
        case (aqiUS >= 151 && aqiUS <= 200):
            tabInfos[1].textContent = "Bad"
            emojiLogo.src = "ressources/bad.svg"
            document.body.style.background = "linear-gradient(to right, #ef473a, #cb2d3e)"
            break;
        case (aqiUS >= 201 && aqiUS <= 300):
            tabInfos[1].textContent = "Very bad"
            emojiLogo.src = "ressources/mask.svg"
            document.body.style.background = "linear-gradient(to right, #8E54E9, #4776E6)"
            break;
        case (aqiUS >= 301 && aqiUS <= 500):
            tabInfos[1].textContent = "Terrible"
            emojiLogo.src = "ressources/terrible.svg"
            document.body.style.background = "linear-gradient(to right, #7a2828, #a73737)"
            break;
        default:
    }
    
    tabInfos[2].textContent = aqiUS

    pointerPlacement(aqiUS)
}

function pointerPlacement(aqiUS) {
    const scaleContainer = document.querySelector(".scale-container")
    pointer.style.transform = `translateX(${scaleContainer.offsetWidth/MAX_AQIUS*aqiUS}px) rotate(180deg)`
}

getAirQualityData()

