import fs from 'fs' ;
import csv from 'csvtojson' ;

const csvFilePath = './population_pyramid_1950-2022.csv';
const jsonFilePath = 'studentJson.json';
const convertCsvToJson = async () => {
  try {
    const jsonArray = await csv().fromFile(csvFilePath);
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2));
    console.log(`JSON file saved as ${jsonFilePath}`);
  } catch (error) {
    console.error('Error while converting CSV to JSON:', error);
  }
};

convertCsvToJson();
