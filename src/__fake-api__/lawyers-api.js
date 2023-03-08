
// LEGACY - replaced by server side API

// // import lawyersOld from './lawyers-list.json';
// import lawyers from './lawyers-list.min.json';
// // const lawyers = [];

// import { forUrl } from '../utils/text-normaliser';
// import reviews from './reviews.json'
// // const forUrl = town => decodeURIComponent(town.toLowerCase().replace(/ /g, '').replace(/-/g, ''));

// // THIS IS FOR TESTING MOCK LAWYERS
// process.env.NEXT_PUBLIC_LOCAL_TESTY && lawyers.push(
//   {
//     "query": "John Beasley Test",
//     "name": "John Beasley Test",
//     "site": "http:\/\/www.fake.hotmail.com\/",
//     "type": "Law firm",
//     "subtypes": "Law firm",
//     "category": "Law firm",
//     "phone": "+61 2 6180 5111",
//     "full_address": "level 2\/97 Northbourne Ave, Turner ACT 2612",
//     "street": "level 2\/97 Northbourne Ave",
//     "city": "Turner",
//     "postal_code": 2612,
//     "state": "Australian Capital Territory",
//     "country": "Australia",
//     "latitude": -35.2719034,
//     "longitude": 149.1297849,
//     "rating": 4.8,
//     "reviews": 5.0,
//     "working_hours": {
//       "Monday": "9am\u20135pm",
//       "Tuesday": "9am\u20135pm",
//       "Wednesday": "9am\u20135pm",
//       "Thursday": "9am\u20135pm",
//       "Friday": "9am\u20135pm",
//       "Saturday": "Closed",
//       "Sunday": "Closed"
//     },
//     "logo": "https:\/\/lh3.googleusercontent.com\/-pkA_S5LXDFs\/AAAAAAAAAAI\/AAAAAAAAAAA\/vznM9Ph8jrU\/s44-p-k-no-ns-nd\/photo.jpg",
//     "place_id": "abc123",
//   }
// )

// const getReviewsByPlaceId = (placeId) => reviews.filter(review => review.place_id === placeId);

// class LawyerApi {

//   getLawyersByTown = (townName, postcode) => {
//     // const lawyers = require(`./lawyers-by-postcode/${postcode}.json`);
//     return lawyers.filter(lawyer =>
//     forUrl(lawyer.city) === forUrl(townName) && lawyer.postal_code == postcode)
//   };

//   // preprocess into postcode files?
//   // [postcode].js only uses: logo, city, name
//   getLawyersByPostcode = (postcode) => {
//     // const lawyers = require(`./lawyers-by-postcode/${postcode}.json`);
//     return lawyers.filter(lawyer => lawyer.postal_code.toString() === postcode);
//   };

//   getLawyerByName = (lawyerName, townName, postcode) => {
//     // const lawyers = require(`./lawyers-by-postcode/${postcode}.json`);
//     const lawyer = lawyers.find(lawyer =>
//     forUrl(lawyer.name) === forUrl(lawyerName) 
//     && forUrl(lawyer.city) === forUrl(townName) 
//     && lawyer.postal_code == postcode);
//     if (lawyer && lawyer.place_id) {
//       const reviews = getReviewsByPlaceId(lawyer.place_id);
//       lawyer.fullReviewDetails = reviews;
//     }
//     return lawyer;
//   };

// }

// export const lawyerApi = new LawyerApi();
