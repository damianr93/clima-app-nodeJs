import fs from 'fs'
import axios from "axios"


export class Busquedas {

    historial = [];
    dbPath = './db/database.json'

    constructor() {
        this.leerDB()
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es',
            'autocomplete':'false',
            'limit' : 5
        }
    }

    get paramsWeather() {
        return {
            'appid': process.env.OPENWATHER,
            'units': 'metric',
            'lang':'es'
        }
    }

    async ciudad (lugar) {
        try {
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();
            
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))

        }catch (error) {
            return []
        }  
    }

    async climaLugar( lat, lon ) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon},
            })

            const resp = await instance.get()

            const {weather, main, wind} = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
                windy: wind.speed,
                deg: wind.deg
            }

        } catch (error) {
            console.log(error) 
        }
    }

    agregarHistorial(lugar = ''){

        if(this.historial.includes( lugar.toLocaleLowerCase() )) {
            return
        }

        this.historial.unshift( lugar.toLocaleLowerCase() )

        this.guardarDB()
    }

    guardarDB(){

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB() {

        if(!fs.existsSync(this.dbPath)) return

        const info = fs.readFileSync(this.dbPath, {encoding:'utf-8'})
        const data = JSON.parse(info)
        this.historial = data.historial
    }
}