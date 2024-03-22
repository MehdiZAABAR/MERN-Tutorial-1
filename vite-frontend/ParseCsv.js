import fs from 'fs';
import axios from 'axios';
import csv from 'csv-parser';
const BackendURL = "http://localhost:8090"
const seeds = [];
let hasError = false;
let counter = 0;

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
};
fs.createReadStream('seeds.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    if (hasError) return;
    const seed = {
      propId: row['ID'],
      plantType: row['Type'],
      easyName: row['Legume'],
      botanicName: row['Nom botanique'],
      variety: row['Nom Commercial'],
      culturePeriods: {
        germination: {
          start: parseInt(row['Préculture Start']),
          end: parseInt(row['Préculture End'])
        },
        transfer: {
          start: parseInt(row['Transfert Start']),
          end: parseInt(row['Transfert End'])
        },
        harvesting: {
          start: parseInt(row['Harvest Start']),
          end: parseInt(row['Harvest End'])
        }
      },
      shop: row['Shop'],
      brand: row['Brand'],
      shoppingDate: parseDate(row['Date']),
      origin: row['Country']
    };
    seeds.push(seed);
    // Make POST request to backend endpoint to insert seed
    axios.post(`${BackendURL}/seeds`, seed)
      .then(response => {
        console.log('Seed inserted:', response.data);
        counter = counter+1;
      })
      .catch(error => {
        console.error('Error inserting seed:', error);
        hasError = true;
            });
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
    console.log( `${counter} seeds inserted`);
    console.log(seeds);
    // Now seeds array contains JavaScript objects representing each row in the CSV file
    // Next step: map each object to a seed document
  });