// import { postcodes } from './postcode-list.js';
import { australianStates } from './australianStates.js';
import { forUrl } from '../utils/text-normaliser.js';
// import lgas from './lag-reduced.json';

// const forUrl = town => decodeURIComponent(town.toLowerCase().replace(/ /g, '').replace(/-/g, ''));

import postcodes from "./postcodes-reduced.json";

const countItemOccuranceInArray = (item, array) => {
  const count = 0;
  return array.reduce((acc, curr) => {
    if (curr === item) {
      acc++;
    }
    return acc;
  }, 0
  )
};

class PostcodeApi {
  getTowns = () => {
    // TODO uncomment for go live
    return Promise.resolve(postcodes);
    // return Promise.resolve(postcodes.filter(postcode => postcode.postcode == "3000"));
  };

  // getLGAs = () => Promise.resolve(lgas);

  // getTown = (name, postcode) => Promise.resolve(postcodes.find(town => town.postcode === postcode && forUrl(town.locality) === forUrl(name)));

  getTown = (name, state) => Promise.resolve(postcodes.find(town =>
    town.state.toLowerCase() === state.toLowerCase()
    && forUrl(town.locality) === forUrl(name))
    // SA2_NAME_2016
  );

  // getLGA = (name) => Promise.resolve(lgas.find(lga => forUrl(lga.name) === forUrl(name)));
  
  getTownsInState = (state) => {
    const towns = postcodes.filter(town => {
      // TODO uncomment for go live
      return town.state === state
      // return town.state === state && town.postcode === '3000';
    }).map(town => {
      // SA2_NAME_2016
      const { locality, postcode, numLawyers, specializations } = town;

      // SA2_NAME_2016
      return { l: locality, p: postcode, n: numLawyers, s: specializations };
    }).sort((a, b) => a.l.localeCompare(b.l));
    // return Promise.resolve(towns);
    return towns;
  }
  

  getNearbyTowns = (locality, state, group) => {
    // get locality
    // console.log('getNearbyTowns', locality, state, group);
    const town = postcodes.find(town => town.locality === locality && town.state === state);
    // console.log('town', town);
    const searchGroup = town[group];
    const nearbyTowns = postcodes.filter(town => {
      return town[group] === searchGroup;
    }).map(town => { 
      const { locality, state } = town;
      const city_key = `${forUrl(state)}:::-:::${forUrl(locality)}`;
      return city_key;
    });
    // unique nearbyTowns
    const uniqueNearbyTowns = nearbyTowns.filter((town, index) => {
      return nearbyTowns.indexOf(town) === index;
    });
    console.log('uniqueNearbyTowns', uniqueNearbyTowns);


    // console.log('nearbyTowns', nearbyTowns);
    return uniqueNearbyTowns;
  }
  // getStates = () => {
  //   console.log(postcodeDetail.length);
  //   const states = postcodeDetail.map(town => ({short: town.state, long: town.SA4_NAME_2016})).filter((state, index, arr) =>  index === arr.findIndex((t) => t.long === state.long && t.short === state.short) );
  //   console.log("STATE", states);
  //   return Promise.resolve(states);
  //   // return st
  // }

  getStates = () => Promise.resolve(australianStates);

  getStatesSync = () => australianStates;

  getState = (state) => Promise.resolve(australianStates.find(stateObj => stateObj.short === state));

  getShortState = (state) => {
    const found = australianStates.find(stateObj => (forUrl(stateObj.short) === state || forUrl(stateObj.long) === state ));
    return found ? found.short : state;
  }

  getPostcodes = () => {
    // TODO uncomment for go live
    return [...new Map(postcodes.map(item=>([item.postcode,item]))).values()];
    // const melbPostcodes = postcodes.filter(town => town.postcode == '3000');
    // return [...new Map(melbPostcodes.map(item => ([item.postcode, item]))).values()];
  };

}

export const postcodeApi = new PostcodeApi();
