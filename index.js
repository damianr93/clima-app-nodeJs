import 'dotenv/config'
import { inquirerMenu, leerInput, listadoDeLugares, pausa } from "./inquirer.js"
import { Busquedas } from "./models/busquedas.js";

const main = async() => {
    
    const busquedas = new Busquedas();
    let opt;

    do { 
        opt = await inquirerMenu()
        
        console.log('La opcion seleccionada es:', opt)

        switch( opt ) {
            case 1:
        
                const termino = await leerInput('Ciudad: ');

                const lugares = await busquedas.ciudad(termino)
            
                const idLugar = await listadoDeLugares(lugares)
                
                if(idLugar !== '0' ) {
                
                    const lugarSel = lugares.find(l => l.id === idLugar)
                
                    busquedas.agregarHistorial(lugarSel.nombre)
                    
                    console.log('Loading...')
                    
                    const weatherLugar = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)
                    
                    console.clear()
                    console.log('\nInformacion de la Ciudad\n'.green)
                    console.log('Ciudad:',lugarSel.nombre)
                    console.log('Lat:',lugarSel.lng)
                    console.log('Long:', lugarSel.lat)
                    console.log('Temp:', weatherLugar.temp)
                    console.log('Mínima:', weatherLugar.min)
                    console.log('Máxima:', weatherLugar.max)
                    console.log('Descripcion:', weatherLugar.desc.green)
                    console.log('Vel. del Viento:', weatherLugar.windy)
                    console.log('Dir. del Viento:', weatherLugar.deg)

                }

            break
            case 2:

                busquedas.historial.forEach((lugar, id) => {
                    const idx = `${id + 1}`.green

                    console.log(idx, lugar)

                })

            break
        }

        if(opt !== 0 ) await pausa()

    } while(opt !== 0)
    
}

main()