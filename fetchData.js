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