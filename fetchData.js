export async function fetchFuel(){
    try {
        const res = await fetch('https://mikolajjkrol.pythonanywhere.com/paliwo/lubartow')
        
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const data = await res.json()
        return data
    } catch (error) {
        console.error('Błąd pobierania danych paliw:', error)
    }
    console.log(data)
    return data
}

export function changeBackgroundWithFade(element, imageUrl) {
    element.style.transition = 'opacity 0.3s ease-in';
    element.style.opacity = '0.7';
    
    setTimeout(() => {
        element.style.backgroundImage = `url('${imageUrl}')`;
        element.style.opacity = '1';
    }, 200);
}

export function get(id){
    return document.getElementById(id)
}

export class Trip {
    constructor(distance, pricePerLiter, fuelConsumption){
        this.distance = distance
        this.pricePerLiter = pricePerLiter
        this.fuelConsumption = fuelConsumption
    }
    tripCost(){
        return (this.pricePerLiter*this.fuelConsumption*this.distance)/100
    }
    costOfKm(){
        return this.pricePerLiter*this.fuelConsumption/100 
    }
    fuelCount(){
        return this.fuelConsumption/100 * this.distance
    }
}