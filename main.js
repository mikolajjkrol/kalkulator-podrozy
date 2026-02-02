import { fetchFuel, changeBackgroundWithFade, get, Trip } from "./fetchData.js";

let step = 0;
let distance = 1;
let avgFuelConsumption = 1;
let pricePerLiter = 1;

async function render(){
    if(step == 0){
        get('step').innerHTML = `
        <label for="length">Podaj dystans: </label>
        <input type="text" id="length" placeholder="[km]">
        <div id="error" class="error"></div>`
    } else if (step == 1){
        const value = get('length').value.trim();

        if (value === "" || isNaN(value)) {
            get('error').textContent = "Podaj poprawną wartość";
            step--;
            return;
        }
        get('error').textContent = "";
        distance = parseFloat(value);
        changeBackgroundWithFade(document.getElementById('image'), 'car2.jpg');
        get('step').innerHTML = `
            <label for="fuel">Podaj średnie spalanie: </label>
            <input type="text" id="fuelConsumption" placeholder="[l/100 km]" />
            <div class="error" id="error"></div>
            `
    } else if(step == 2){
        const fuelConsumption = get('fuelConsumption').value
        
        if (fuelConsumption === "" || isNaN(fuelConsumption)) {
            get('error').textContent = "Podaj poprawną wartość";
            step--;
            return;
        }
        get('error').textContent = null;
        
        avgFuelConsumption = parseFloat(fuelConsumption)
        changeBackgroundWithFade(document.getElementById('image'), 'car3.jpg');
        get('step').innerHTML = `
            <label for="price">Podaj cenę paliwa: </label>
            <select name="price" id="price">
                <option>LPG</option>
                <option>Benzyna</option>
                <option>Diesel</option>
            </select>
            <div class="error" id="error"></div>
            `
    } else if(step == 3){
        const fuelType = get('price').value.toLowerCase();
        
        get('guzik').style.visibility = 'hidden'
        get('step').innerHTML = `
            <div class="loading">
                <div class="results">Pobieranie cen paliw...</div>
                <br>
            </div>`;
        
        try {
            const data = await fetchFuel();
            pricePerLiter = data.paliwo[fuelType] || 5.50;    
            showResults();
        } catch(error) {
            get('step').innerHTML = `
                <div class="error">
                    Błąd ładowania cen.
                </div>`;
        }
        
        const trip = new Trip(distance, pricePerLiter, avgFuelConsumption)
        changeBackgroundWithFade(document.getElementById('image'), 'car4.jpg');
        get('step').innerHTML = `
            <div class="results">
            <h3>Wyniki: </h3>
                Koszt jednego kilometra: <div class="result">${Math.round(trip.costOfKm() * 100) / 100} zł</div>
                <br>Koszt całego dystansu: <div class="result">${Math.round(trip.tripCost() * 100) / 100} zł</div>
                <br>Ilość spalonego paliwa: <div class="result">${Math.round(trip.fuelCount() * 100) / 100} l</div>
                <button class="restart" onclick="location.reload()"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M482-160q-134 0-228-93t-94-227v-7l-64 64-56-56 160-160 160 160-56 56-64-64v7q0 100 70.5 170T482-240q26 0 51-6t49-18l60 60q-38 22-78 33t-82 11Zm278-161L600-481l56-56 64 64v-7q0-100-70.5-170T478-720q-26 0-51 6t-49 18l-60-60q38-22 78-33t82-11q134 0 228 93t94 227v7l64-64 56 56-160 160Z"/></svg></button>
            </div>`
    }
}

render()

get('guzik').addEventListener('click', () => {
    step++;
    render()
})