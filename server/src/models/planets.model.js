const path = require('path');
const { parse } = require('csv-parse');
const fs = require('fs');


const isHabitablePlanets = []; 

// habitable if right energy and if confirmed
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === "CONFIRMED" 
        && planet["koi_insol"] > 0.36  && planet["koi_insol"] < 1.11
        && planet["koi_prad"] < 1.6
}

// const promise = new Promise((resolve, reject) => {
//     resolve(42)
// });
// // the result is the value from the resolve in the promise
// promise.then((result) => {

// });
// const result = await promise;  //code will wait to have resolve

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true,
        }))
        .on('data', (data) => {
            if (isHabitablePlanet(data)) {
                isHabitablePlanets.push(data);
            }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err)
        })
        .on('end', () =>{
            console.log(`${isHabitablePlanets.length} habitable planets`)
            console.log('done');
            resolve();
        }); //chaining of event listener
    });
}


module.exports = { 
    planets: isHabitablePlanets,
    loadPlanetsData
};