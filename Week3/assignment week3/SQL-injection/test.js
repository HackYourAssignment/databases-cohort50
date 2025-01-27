import getPopulation from './sanitazed.js'; 

const Country = 'country'; 
const name = 'USA'; 
const code = 'USA';

getPopulation(Country, name, code, (err, population) => {
  if (err) {
    console.error("Error:", err.message);
  } else {
    console.log("Population of", name, ":", population);
  }
});